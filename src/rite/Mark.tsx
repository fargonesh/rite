import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export type MarkTone = 'blood' | 'ink';

export interface MarkProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: MarkTone;
}

const toneStyles: Record<MarkTone, string> = {
  blood: 'bg-[#d42b1e]/15 text-[#b11f14] dark:bg-[#d42b1e]/25 dark:text-[#ff7a6b]',
  ink: 'bg-[#0a0a0b]/10 text-[#0a0a0b] dark:bg-[#e9e7e2]/15 dark:text-[#e9e7e2]',
};

export function Mark({ tone = 'blood', className, children, ...rest }: MarkProps) {
  return (
    <mark className={cx('rounded-none px-0.5 tracking-tight', toneStyles[tone], className)} {...rest}>
      {children}
    </mark>
  );
}

export function MarkDemo() {
  return (
    <p className="max-w-md font-sans text-[15px] leading-7 text-[#0a0a0b] dark:text-[#e9e7e2]">
      Field notes flagged <Mark>blood for signal</Mark> and{' '}
      <Mark tone="ink">ink for quiet emphasis</Mark> in the margin.
    </p>
  );
}
