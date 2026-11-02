import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface GridProps {
  children: ReactNode;
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  columns?: number;
}

export interface GridColProps {
  children: ReactNode;
  className?: string;
  span?: number;
  offset?: number;
}

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
} as const;

export function Grid({ children, className, gap = 'md', columns = 12 }: GridProps) {
  return (
    <div
      className={cx('grid', gapMap[gap], className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

export function GridCol({ children, className, span, offset }: GridColProps) {
  const style: CSSProperties = {};
  if (span !== undefined) {
    style.gridColumn = `span ${span} / span ${span}`;
  }
  if (offset !== undefined) {
    style.gridColumnStart = offset + 1;
    if (span !== undefined) {
      style.gridColumnEnd = `span ${span}`;
    }
  }
  return (
    <div className={cx(className)} style={style}>
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-center text-xs dark:border-white/25';

export function GridDemo() {
  return (
    <Grid gap="sm" columns={12}>
      <GridCol span={4}>
        <div className={cell}>span 4</div>
      </GridCol>
      <GridCol span={4}>
        <div className={cell}>span 4</div>
      </GridCol>
      <GridCol span={4}>
        <div className={cell}>span 4</div>
      </GridCol>
      <GridCol span={6}>
        <div className={cell}>span 6</div>
      </GridCol>
      <GridCol span={6}>
        <div className={cell}>span 6</div>
      </GridCol>
      <GridCol span={3} offset={3}>
        <div className={cell}>span 3 + offset 3</div>
      </GridCol>
      <GridCol span={3}>
        <div className={cell}>span 3</div>
      </GridCol>
    </Grid>
  );
}
