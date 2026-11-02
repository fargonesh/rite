import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Kbd({ className, children, ...rest }: KbdProps) {
  return (
    <kbd
      className={cx(
        'inline-flex min-w-[1.5rem] items-center justify-center rounded-[2px] border border-[#0a0a0b]/25 bg-white px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none text-[#0a0a0b]',
        'shadow-[0_3px_0_rgba(10,10,11,0.25)]',
        'dark:border-white/25 dark:bg-white/10 dark:text-[#e9e7e2] dark:shadow-[0_3px_0_rgba(255,255,255,0.12)]',
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}

export function KbdDemo() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#0a0a0b]/60 dark:text-white/50">
      <Kbd>Ctrl</Kbd>
      <span aria-hidden>+</span>
      <Kbd>K</Kbd>
    </div>
  );
}
