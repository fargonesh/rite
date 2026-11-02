import { useEffect, useRef } from 'react';

const GLYPHS = '◉▚✕▲▪◆◇◌01<>[]{}=+*^?#@$%&';

export function scrambleTo(el: HTMLElement, target: string, duration = 700): () => void {
  let raf = 0;
  const start = performance.now();
  const from = el.textContent ?? '';
  const len = Math.max(from.length, target.length);

  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    let out = '';
    for (let i = 0; i < len; i++) {
      const revealAt = (i / len) * 0.7;
      if (p >= revealAt + 0.3 || i >= target.length) {
        if (i < target.length) out += target[i];
      } else if (p >= revealAt) {
        out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      } else if (i < from.length) {
        out += from[i];
      }
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
    else el.textContent = target;
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export function useScrambleOnView<T extends HTMLElement>(text: string, duration = 800) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }
    let cancel: (() => void) | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            cancel?.();
            cancel = scrambleTo(el, text, duration);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancel?.();
    };
  }, [text, duration]);
  return ref;
}

export function Scramble({
  text,
  as: Tag = 'span',
  className,
  duration = 800,
  hover = false,
}: {
  text: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'div';
  className?: string;
  duration?: number;
  hover?: boolean;
}) {
  const ref = useScrambleOnView<HTMLElement>(text, duration);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      onMouseEnter={
        hover
          ? (e) => {
              scrambleTo(e.currentTarget as HTMLElement, text, Math.min(500, duration));
            }
          : undefined
      }
    >
      {text}
    </Tag>
  );
}

/**
 * Quiet terminal resolve for the hero, with proximity shimmer:
 * on mount each character flips through 2–3 faint glyphs then locks.
 * Afterwards, characters nearest the cursor shimmer while it lingers
 * and settle when it leaves. One big calm moment — not violence.
 */
const QUIET_GLYPHS = ['·', '∙', '◦', '○', '—', '–', '…', '=', '+', '÷', ':'];

const pickQuiet = () => QUIET_GLYPHS[Math.floor(Math.random() * QUIET_GLYPHS.length)];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PROXIMITY_RADIUS = 110;

export function DecryptText({
  text,
  className,
  delay = 0,
  charStagger = 35,
}: {
  text: string;
  className?: string;
  delay?: number;
  charStagger?: number;
}) {
  const chars = text.split('');
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hot = useRef(new Map<number, number>());
  const coolTimers = useRef(new Map<number, number>());

  const settle = (i: number, c: string) => {
    const iv = hot.current.get(i);
    if (iv !== undefined) {
      window.clearInterval(iv);
      hot.current.delete(i);
    }
    const cur = spanRefs.current[i];
    if (cur) {
      cur.textContent = c === ' ' ? ' ' : c;
      cur.style.opacity = '';
      cur.style.textShadow = '';
    }
  };

  const settleAll = () => {
    chars.forEach((c, i) => {
      if (c === ' ') return;
      const pending = coolTimers.current.get(i);
      if (pending !== undefined) {
        window.clearTimeout(pending);
        coolTimers.current.delete(i);
      }
      settle(i, c);
    });
  };

  // gentle mount: a couple of faint flips per char, staggered left-to-right
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers: number[] = [];
    chars.forEach((c, i) => {
      if (c === ' ') return;
      const t = window.setTimeout(() => {
        const s = spanRefs.current[i];
        if (!s || hot.current.has(i)) return;
        let flips = 0;
        const max = 2 + Math.floor(Math.random() * 2);
        const iv = window.setInterval(() => {
          flips += 1;
          const cur = spanRefs.current[i];
          if (!cur) {
            window.clearInterval(iv);
            return;
          }
          if (flips >= max) {
            window.clearInterval(iv);
            if (!hot.current.has(i)) cur.textContent = c;
          } else {
            cur.textContent = pickQuiet();
          }
        }, 90);
      }, delay + i * charStagger);
      timers.push(t);
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, charStagger]);

  // clear any lingering shimmer on unmount
  useEffect(() => {
    const h = hot.current;
    const cl = coolTimers.current;
    return () => {
      h.forEach((iv) => window.clearInterval(iv));
      cl.forEach((t) => window.clearTimeout(t));
      h.clear();
      cl.clear();
    };
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const mx = e.clientX;
    const my = e.clientY;
    chars.forEach((c, i) => {
      if (c === ' ') return;
      const s = spanRefs.current[i];
      if (!s) return;
      const r = s.getBoundingClientRect();
      const d = Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my);
      // gradient over the text: the nearer the cursor, the darker the char;
      // far enough away and it lightens into a soft halo instead
      const influence = Math.max(0, 1 - d / 170);
      s.style.opacity = String(1 - influence * influence * 0.78);
      s.style.textShadow = d > 250 ? '0 0 18px rgba(233, 231, 226, 0.55)' : '';
      if (d < PROXIMITY_RADIUS) {
        const pending = coolTimers.current.get(i);
        if (pending !== undefined) {
          window.clearTimeout(pending);
          coolTimers.current.delete(i);
        }
        if (!hot.current.has(i)) {
          const iv = window.setInterval(() => {
            const cur = spanRefs.current[i];
            if (cur) cur.textContent = pickQuiet();
          }, 80);
          hot.current.set(i, iv);
        }
      } else if (hot.current.has(i)) {
        const iv = hot.current.get(i);
        if (iv !== undefined) window.clearInterval(iv);
        hot.current.delete(i);
        const t = window.setTimeout(() => {
          coolTimers.current.delete(i);
          const cur = spanRefs.current[i];
          if (cur) cur.textContent = c;
        }, 160);
        coolTimers.current.set(i, t);
      }
    });
  };

  return (
    <span
      className={className}
      aria-label={text}
      onMouseMove={handleMove}
      onMouseLeave={settleAll}
    >
      {chars.map((c, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          aria-hidden="true"
          style={{ transition: 'opacity 0.25s ease, text-shadow 0.35s ease' }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}
