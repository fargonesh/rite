import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ label, orientation = 'horizontal', className, ...rest }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cx('mx-2 w-px self-stretch bg-[#0a0a0b]/15 dark:bg-white/15', className)}
        {...rest}
      />
    );
  }

  if (!label) {
    return (
      <div
        role="separator"
        className={cx('h-px w-full bg-[#0a0a0b]/15 dark:bg-white/15', className)}
        {...rest}
      />
    );
  }

  return (
    <div role="separator" className={cx('flex w-full items-center gap-3', className)} {...rest}>
      <span aria-hidden className="h-px flex-1 bg-[#0a0a0b]/15 dark:bg-white/15" />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/40">
        {label}
      </span>
      <span aria-hidden className="h-px flex-1 bg-[#0a0a0b]/15 dark:bg-white/15" />
    </div>
  );
}

export function DividerDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Divider label="FILE 02 / 09" />
      <div className="flex h-10 items-stretch">
        <span className="font-mono text-[11px] text-[#0a0a0b]/60 dark:text-white/50">LEFT</span>
        <Divider orientation="vertical" />
        <span className="font-mono text-[11px] text-[#0a0a0b]/60 dark:text-white/50">RIGHT</span>
      </div>
    </div>
  );
}
