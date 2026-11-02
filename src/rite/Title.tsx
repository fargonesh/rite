import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
}

const orderStyles: Record<number, string> = {
  1: 'text-4xl sm:text-5xl',
  2: 'text-3xl sm:text-4xl',
  3: 'text-2xl sm:text-3xl',
  4: 'text-xl sm:text-2xl',
  5: 'text-lg',
  6: 'font-mono text-xs font-medium uppercase tracking-[0.16em]',
};

export function Title({ order = 2, className, children, ...rest }: TitleProps) {
  const Tag = `h${order}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag
      className={cx(
        'font-sans font-medium tracking-tight text-[#0a0a0b] dark:text-[#e9e7e2]',
        orderStyles[order],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function TitleDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Title order={1}>The rite begins at midnight</Title>
      <Title order={2}>The rite begins at midnight</Title>
      <Title order={3}>The rite begins at midnight</Title>
      <Title order={4}>The rite begins at midnight</Title>
    </div>
  );
}
