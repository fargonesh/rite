import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type ProgressSize = 'xs' | 'sm' | 'md';
export type ProgressTone = 'ink' | 'blood';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: ProgressSize;
  tone?: ProgressTone;
  showLabel?: boolean;
  striped?: boolean;
}

const heights: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
};

function clamp(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.min(100, Math.max(0, v));
}

export function Progress({
  value,
  size = 'sm',
  tone = 'ink',
  showLabel = false,
  striped = false,
  className,
  ...rest
}: ProgressProps) {
  const pct = clamp(value);
  const critical = pct >= 90;
  const fillTone =
    tone === 'blood' || (tone === 'ink' && critical && value >= 90)
      ? 'bg-[#d42b1e]'
      : 'bg-[#0a0a0b] dark:bg-[#e9e7e2]';
  return (
    <div className={cx('w-full', className)} {...rest}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          <span>Progress</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cx(
          'w-full overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 dark:border-white/15 dark:bg-white/5',
          heights[size],
        )}
      >
        <div
          className={cx('h-full rounded-none transition-[width] duration-500', fillTone)}
          style={{
            width: `${pct}%`,
            ...(striped
              ? {
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, rgba(255,255,255,0.22) 0 4px, transparent 4px 8px)',
                }
              : {}),
          }}
        />
      </div>
    </div>
  );
}

export function ProgressDemo() {
  return (
    <div className="space-y-4">
      <Progress value={34} showLabel />
      <Progress value={68} striped showLabel />
      <Progress value={96} tone="blood" size="md" showLabel striped />
      <div className="flex gap-4">
        <div className="flex-1"><Progress value={22} size="xs" /></div>
        <div className="flex-1"><Progress value={55} size="sm" /></div>
        <div className="flex-1"><Progress value={82} size="md" /></div>
      </div>
    </div>
  );
}
