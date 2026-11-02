import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export type TransitionPreset = 'fade' | 'slide-up' | 'slide-down' | 'scale';

export interface TransitionProps {
  in: boolean;
  preset?: TransitionPreset;
  duration?: number;
  children: ReactNode;
  className?: string;
}

const hidden: Record<TransitionPreset, string> = {
  fade: 'opacity-0',
  'slide-up': 'translate-y-2 opacity-0',
  'slide-down': '-translate-y-2 opacity-0',
  scale: 'scale-95 opacity-0',
};

/**
 * Mount/unmount wrapper with CSS opacity+transform transitions.
 * Stays mounted through the exit timeout, then unmounts.
 */
export function Transition({ in: inProp, preset = 'fade', duration = 200, children, className }: TransitionProps) {
  const [mounted, setMounted] = useState(inProp);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inProp) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [inProp, duration]);

  if (!mounted) return null;

  return (
    <div
      className={cx('transition-all ease-out', !visible && hidden[preset], className)}
      style={{ transitionDuration: `${duration}ms`, opacity: visible ? 1 : undefined }}
    >
      {children}
    </div>
  );
}

const presets: TransitionPreset[] = ['fade', 'slide-up', 'slide-down', 'scale'];

export function TransitionDemo() {
  const [show, setShow] = useState(true);
  const [preset, setPreset] = useState<TransitionPreset>('slide-up');
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setPreset(name);
              setShow(true);
            }}
            aria-pressed={preset === name}
            className={cx(
              'rounded-[2px] border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
              preset === name
                ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                : 'border-[#0a0a0b]/30 text-[#0a0a0b]/70 hover:border-[#0a0a0b] dark:border-white/25 dark:text-white/60 dark:hover:border-white',
            )}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-[2px] border border-dashed border-[#d42b1e]/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d42b1e] outline-none transition-colors hover:border-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-[#ff6b5e]"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="min-h-[76px] rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-4 dark:border-white/20">
        <Transition in={show} preset={preset} duration={250}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
            Preset: {preset}
          </p>
          <p className="mt-2 text-[13px] leading-6 text-[#0a0a0b]/80 dark:text-white/80">
            The exhibit enters and exits on opacity plus transform, unmounting only after the
            exit timeout elapses.
          </p>
        </Transition>
      </div>
    </div>
  );
}
