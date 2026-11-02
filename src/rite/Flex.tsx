import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface FlexProps {
  children: ReactNode;
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  wrap?: boolean;
}

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
} as const;

export function Flex({
  children,
  className,
  gap = 'md',
  direction = 'row',
  justify,
  align,
  wrap = false,
}: FlexProps) {
  return (
    <div
      className={cx('flex', direction === 'row' ? 'flex-row' : 'flex-col', gapMap[gap], className)}
      style={{
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function FlexDemo() {
  return (
    <Flex gap="sm" direction="row" justify="space-between" align="center">
      <div className={cell}>Left</div>
      <div className={cell}>Middle</div>
      <div className={cell}>Right</div>
    </Flex>
  );
}
