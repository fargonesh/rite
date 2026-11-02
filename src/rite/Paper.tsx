import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'xs' | 'sm' | 'md';
  shadow?: boolean;
}

const paddingStyles: Record<NonNullable<PaperProps['padding']>, string> = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
};

export function Paper({ padding = 'sm', shadow = true, className, children, ...rest }: PaperProps) {
  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-white/[0.04]',
        shadow && 'shadow-[0_1px_2px_rgba(10,10,11,0.08)] dark:shadow-none',
        paddingStyles[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PaperDemo() {
  return (
    <Paper className="w-full max-w-md">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/40">
        EXHIBIT A
      </p>
      <p className="mt-1 font-mono text-[12px] text-[#0a0a0b]/80 dark:text-white/70">
        Plain elevated surface. No ticks, no header chrome.
      </p>
    </Paper>
  );
}
