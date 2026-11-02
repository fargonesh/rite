import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Docs pages scroll inside <main class="overflow-y-auto">, not the window.
 *  ScrollTrigger defaults to the viewport scroller, which leaves
 *  below-the-fold reveals stuck at opacity 0 (the big-gap bug).
 *  Example sites render flat on the window, so there this finds nothing
 *  and the default applies. */
function scrollParent(el: HTMLElement): Element | undefined {
  let p: HTMLElement | null = el.parentElement;
  while (p) {
    const oy = window.getComputedStyle(p).overflowY;
    if (oy === 'auto' || oy === 'scroll') return p;
    p = p.parentElement;
  }
  return undefined;
}

/** Hero entrance: banner types, giant words clip-rise, side panel fades. Scoped to root. */
export function useHeroIntro(root: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-word]',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.15 },
      );
      gsap.fromTo(
        '[data-hero-fade]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.4 },
      );
    }, root);
    return () => ctx.revert();
  }, [root]);
}

/** Generic scroll reveals: any [data-reveal] rises + fades on enter. */
export function useScrollReveals(root: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', scroller: scrollParent(el) },
          },
        );
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, [root]);
}

/** Count-up for [data-count] with data-to + optional data-decimals. */
export function useCountUp(root: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.to ?? '0');
        const decimals = parseInt(el.dataset.decimals ?? '0', 10);
        const suffix = el.dataset.suffix ?? '';
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          scroller: scrollParent(el),
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: to,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = obj.v.toFixed(decimals) + suffix;
              },
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [root]);
}

/** Mouse tilt for [data-tilt] cards: rotate + holo shift, reset on leave. */
export function useTilt(root: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((el) => {
        gsap.set(el, { transformPerspective: 800 });
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 10);
          ry(px * 12);
        });
        el.addEventListener('mouseleave', () => {
          rx(0);
          ry(0);
        });
      });
    }, root);
    return () => ctx.revert();
  }, [root]);
}

/** Self-typing boot log: types lines into [data-boot] one char at a time, loops. */
export function useBootType(root: React.RefObject<HTMLElement | null>, lines: string[]) {
  useLayoutEffect(() => {
    if (!root.current || reduceMotion()) return;
    const el = root.current.querySelector<HTMLElement>('[data-boot]');
    if (!el) return;
    let cancelled = false;
    let timer = 0;
    const typeAll = async () => {
      while (!cancelled) {
        el.innerHTML = '';
        for (const line of lines) {
          if (cancelled) return;
          const p = document.createElement('p');
          p.className = 'whitespace-nowrap';
          el.appendChild(p);
          for (let i = 0; i <= line.length; i++) {
            if (cancelled) return;
            p.textContent = line.slice(0, i);
            await new Promise((r) => {
              timer = window.setTimeout(r, 8 + Math.random() * 22);
            });
          }
        }
        const cur = document.createElement('p');
        cur.innerHTML = '<span class="animate-blink">▚</span>';
        el.appendChild(cur);
        await new Promise((r) => {
          timer = window.setTimeout(r, 4000);
        });
      }
    };
    typeAll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [root, lines]);
}
