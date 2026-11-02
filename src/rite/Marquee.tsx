import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Continuous scrolling animation for content — seamless x2 loop.
 */
export function Marquee({ children, speed = 20, pauseOnHover = true, className }: MarqueeProps) {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-white/[0.02]',
        className,
      )}
    >
      <style>{`@keyframes vesper-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="border-b border-dashed border-[#0a0a0b]/10 px-3 py-1.5 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/40">
          Marquee / {speed}s
        </span>
      </div>
      <div
        className={cx('flex w-max items-center gap-8 px-4 py-3', pauseOnHover && '[&:hover_.vesper-marquee-track]:[animation-play-state:paused]')}
      >
        <div
          className="vesper-marquee-track flex w-max items-center gap-8"
          style={{ animation: `vesper-marquee ${speed}s linear infinite` }}
        >
          <div className="flex items-center gap-8">{children}</div>
          <div className="flex items-center gap-8" aria-hidden>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarqueeDemo() {
  const tags = ['SURVEYED', 'SEALED', 'WITNESSED', 'FILED', 'INDEXED', 'ARCHIVED'];
  return (
    <Marquee speed={20}>
      {tags.map((t) => (
        <span key={t} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0b]/70 dark:text-white/60">
            {t}
          </span>
          <span aria-hidden className="text-[10px] text-[#d42b1e]">
            +
          </span>
        </span>
      ))}
    </Marquee>
  );
}
