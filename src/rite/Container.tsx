import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  centered?: boolean;
}

const sizeMap = {
  xs: 'max-w-md',
  sm: 'max-w-xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
} as const;

export function Container({ children, className, size = 'md', centered = true }: ContainerProps) {
  return (
    <div className={cx('w-full px-4', sizeMap[size], centered && 'mx-auto', className)}>
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function ContainerDemo() {
  return (
    <Container size="sm">
      <div className={cell}>Contained content (size=&quot;sm&quot;, centered)</div>
    </Container>
  );
}
