import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export type IndicatorTone = 'blood' | 'ink';
export type IndicatorPosition = 'top-right';

export interface IndicatorProps {
  children: ReactNode;
  label?: string | number;
  tone?: IndicatorTone;
  position?: IndicatorPosition;
  className?: string;
}

const toneStyles: Record<IndicatorTone, string> = {
  blood: 'bg-[#d42b1e] text-white',
  ink: 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black',
};

export function Indicator({ children, label, tone = 'blood', position = 'top-right', className }: IndicatorProps) {
  void position;
  const isDot = label === undefined;
  return (
    <span className={cx('relative inline-flex', className)}>
      {children}
      <span
        aria-label={isDot ? 'New' : String(label)}
        className={cx(
          'absolute -right-1.5 -top-1.5 flex items-center justify-center rounded-[2px] border border-white font-mono font-medium dark:border-[#0a0a0b]',
          toneStyles[tone],
          isDot ? 'h-2.5 w-2.5 rounded-full' : 'min-h-5 min-w-5 px-1 text-[10px] leading-5 tracking-[0.08em]',
        )}
      >
        {isDot ? null : label}
      </span>
    </span>
  );
}

export function IndicatorDemo() {
  return (
    <div className="flex items-center gap-6">
      <span className="flex flex-col items-center gap-3">
        <Indicator tone="blood">
          <span className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 font-mono text-[10px] text-[#0a0a0b]/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            IN
          </span>
        </Indicator>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">dot</span>
      </span>
      <span className="flex flex-col items-center gap-3">
        <Indicator label={7} tone="blood">
          <span className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 font-mono text-[10px] text-[#0a0a0b]/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            IN
          </span>
        </Indicator>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          blood — 7
        </span>
      </span>
      <span className="flex flex-col items-center gap-3">
        <Indicator label={12} tone="ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 font-mono text-[10px] text-[#0a0a0b]/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            IN
          </span>
        </Indicator>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          ink — 12
        </span>
      </span>
    </div>
  );
}
