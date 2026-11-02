import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type BurgerSize = 'sm' | 'md' | 'lg';

export interface BurgerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  opened: boolean;
  size?: BurgerSize;
}

const sizeStyles: Record<BurgerSize, { box: string; gap: string; line: string; openTop: string; openBottom: string }> = {
  sm: { box: 'h-7 w-7', gap: 'gap-[3px]', line: 'h-px w-3.5', openTop: 'translate-y-[4px] rotate-45', openBottom: '-translate-y-[4px] -rotate-45' },
  md: { box: 'h-9 w-9', gap: 'gap-1', line: 'h-[1.5px] w-[18px]', openTop: 'translate-y-[5.5px] rotate-45', openBottom: '-translate-y-[5.5px] -rotate-45' },
  lg: { box: 'h-11 w-11', gap: 'gap-[5px]', line: 'h-[2px] w-5', openTop: 'translate-y-[7px] rotate-45', openBottom: '-translate-y-[7px] -rotate-45' },
};

export function Burger({
  opened,
  size = 'md',
  className,
  'aria-label': ariaLabel,
  ...rest
}: BurgerProps) {
  const s = sizeStyles[size];
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? (opened ? 'Close navigation' : 'Open navigation')}
      aria-expanded={opened}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[2px] border font-mono leading-none',
        'border-[#0a0a0b]/25 bg-transparent text-[#0a0a0b] hover:border-[#0a0a0b] hover:bg-[#0a0a0b]/5',
        'dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white dark:hover:bg-white/5',
        'outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        s.box,
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={cx('flex flex-col items-center justify-center', s.gap)}>
        <span
          className={cx(
            'block bg-current transition-transform duration-200',
            s.line,
            opened && s.openTop,
          )}
        />
        <span className={cx('block bg-current transition-opacity duration-200', s.line, opened && 'opacity-0')} />
        <span
          className={cx(
            'block bg-current transition-transform duration-200',
            s.line,
            opened && s.openBottom,
          )}
        />
      </span>
    </button>
  );
}

export function BurgerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Burger opened={false} aria-label="Open navigation" />
      <Burger opened={true} aria-label="Close navigation" />
      <Burger opened={false} size="sm" aria-label="Open menu small" />
      <Burger opened={true} size="lg" aria-label="Close menu large" />
    </div>
  );
}
