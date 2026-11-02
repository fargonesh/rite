import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface BoxProps {
  children: ReactNode;
  className?: string;
  padding?: 'xs' | 'sm' | 'md';
}

const paddingMap = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
} as const;

export function Box({ children, className, padding }: BoxProps) {
  return <div className={cx(padding ? paddingMap[padding] : undefined, className)}>{children}</div>;
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function BoxDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Box padding="xs" className={cell}>
        padding=&quot;xs&quot;
      </Box>
      <Box padding="sm" className={cell}>
        padding=&quot;sm&quot;
      </Box>
      <Box padding="md" className={cell}>
        padding=&quot;md&quot;
      </Box>
    </div>
  );
}
