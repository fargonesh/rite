import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface StackProps {
  children: ReactNode;
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
}

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
} as const;

export function Stack({ children, className, gap = 'md', justify, align = 'stretch' }: StackProps) {
  return (
    <div
      className={cx('flex flex-col', gapMap[gap], className)}
      style={{ justifyContent: justify, alignItems: align }}
    >
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function StackDemo() {
  return (
    <Stack gap="sm" align="stretch">
      <div className={cell}>First row</div>
      <div className={cell}>Second row</div>
      <div className={cell}>Third row</div>
    </Stack>
  );
}
