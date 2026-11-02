import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface GroupProps {
  children: ReactNode;
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
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

export function Group({
  children,
  className,
  gap = 'md',
  justify = 'flex-start',
  align = 'center',
  wrap = true,
}: GroupProps) {
  return (
    <div
      className={cx('flex flex-row', gapMap[gap], className)}
      style={{ justifyContent: justify, alignItems: align, flexWrap: wrap ? 'wrap' : 'nowrap' }}
    >
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function GroupDemo() {
  return (
    <Group gap="sm" justify="flex-start" align="center" wrap>
      <div className={cell}>Alpha</div>
      <div className={cell}>Beta</div>
      <div className={cell}>Gamma</div>
    </Group>
  );
}
