import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface SimpleGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
} as const;

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
} as const;

export function SimpleGrid({ children, className, cols = 3, gap = 'md' }: SimpleGridProps) {
  return <div className={cx('grid', colsMap[cols], gapMap[gap], className)}>{children}</div>;
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function SimpleGridDemo() {
  return (
    <SimpleGrid cols={3} gap="sm">
      <div className={cell}>1</div>
      <div className={cell}>2</div>
      <div className={cell}>3</div>
      <div className={cell}>4</div>
      <div className={cell}>5</div>
      <div className={cell}>6</div>
    </SimpleGrid>
  );
}
