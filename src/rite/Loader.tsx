import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type LoaderVariant = 'bars' | 'dots' | 'ring';
export type LoaderSize = 'xs' | 'sm' | 'md';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  variant?: LoaderVariant;
  label?: string;
}

const boxSize: Record<LoaderSize, string> = {
  xs: 'h-4',
  sm: 'h-6',
  md: 'h-8',
};

const dotSize: Record<LoaderSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
};

const ringSize: Record<LoaderSize, string> = {
  xs: 'h-4 w-4 border-2',
  sm: 'h-6 w-6 border-2',
  md: 'h-8 w-8 border-[3px]',
};

const barWidth: Record<LoaderSize, string> = {
  xs: 'w-1',
  sm: 'w-1.5',
  md: 'w-2',
};

export function Loader({ size = 'sm', variant = 'bars', label, className, ...rest }: LoaderProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label ?? 'Loading'}
      className={cx('inline-flex items-center gap-3', className)}
      {...rest}
    >
      {variant === 'ring' && (
        <span
          aria-hidden
          className={cx(
            'animate-spin rounded-full border-[#0a0a0b]/15 border-t-[#0a0a0b] dark:border-white/15 dark:border-t-[#e9e7e2]',
            ringSize[size],
          )}
        />
      )}
      {variant === 'bars' && (
        <span aria-hidden className={cx('flex items-end gap-1', boxSize[size])}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cx(
                'h-full animate-pulse bg-[#0a0a0b] dark:bg-[#e9e7e2]',
                barWidth[size],
                i === 3 && 'bg-[#d42b1e] dark:bg-[#d42b1e]',
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
      )}
      {variant === 'dots' && (
        <span aria-hidden className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cx('animate-bounce rounded-full bg-[#0a0a0b] dark:bg-[#e9e7e2]', dotSize[size])}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
      )}
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          {label}
        </span>
      )}
    </div>
  );
}

export function LoaderDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Loader variant="bars" label="Fetching" />
      <Loader variant="dots" label="Indexing" />
      <Loader variant="ring" label="Loading" />
      <div className="flex items-end gap-4">
        <Loader variant="bars" size="xs" />
        <Loader variant="bars" size="sm" />
        <Loader variant="bars" size="md" />
      </div>
    </div>
  );
}
