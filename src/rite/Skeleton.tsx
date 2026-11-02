import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

function toCss(v: string | number | undefined): string | number | undefined {
  return typeof v === 'number' ? `${v}px` : v;
}

export function Skeleton({ width, height, lines = 1, animate = true, className, style, ...rest }: SkeletonProps) {
  const count = Math.max(1, Math.floor(lines));
  if (count === 1) {
    return (
      <div
        aria-hidden
        aria-busy="true"
        className={cx(
          'rounded-[2px] bg-[#0a0a0b]/10 dark:bg-white/10',
          animate && 'animate-pulse',
          className,
        )}
        style={{ width: toCss(width) ?? '100%', height: toCss(height) ?? 12, ...style }}
        {...rest}
      />
    );
  }
  return (
    <div aria-hidden aria-busy="true" className={cx('space-y-2', className)} style={{ width: toCss(width) ?? '100%', ...style }} {...rest}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cx(
            'rounded-[2px] bg-[#0a0a0b]/10 dark:bg-white/10',
            animate && 'animate-pulse',
            i === count - 1 && 'w-2/3',
          )}
          style={{ height: toCss(height) ?? 12 }}
        />
      ))}
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} />
        <div className="flex-1">
          <Skeleton width="60%" height={12} />
          <div className="h-2" />
          <Skeleton width="40%" height={10} animate={false} />
        </div>
      </div>
      <Skeleton lines={3} />
    </div>
  );
}
