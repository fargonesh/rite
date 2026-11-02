import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  // black slab. hover summons blood. unsettling on purpose.
  primary:
    'bg-[#0a0a0b] text-[#e9e7e2] border border-[#0a0a0b] hover:bg-[#1c0b0a] hover:border-[#d42b1e] hover:text-white active:bg-black dark:bg-[#e9e7e2] dark:text-black dark:border-[#e9e7e2] dark:hover:bg-white dark:hover:border-white',
  secondary:
    'bg-transparent text-[#0a0a0b] border border-[#0a0a0b]/25 hover:border-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:text-[#e9e7e2] dark:border-white/25 dark:hover:border-white dark:hover:bg-white/5',
  outline:
    'border border-dashed border-[#0a0a0b]/40 bg-transparent hover:border-solid hover:border-[#d42b1e] hover:text-[#d42b1e] dark:border-white/30 dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]',
  ghost:
    'bg-transparent text-[#0a0a0b]/70 hover:text-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5',
  destructive:
    'bg-[#d42b1e] text-white border border-[#d42b1e] hover:bg-[#a81e14] hover:border-[#a81e14] active:bg-[#7d150e]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-[11px]',
  md: 'h-9 px-4 text-[11px]',
  lg: 'h-11 px-5 text-xs',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      disabled={isDisabled}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-[2px] font-mono font-medium uppercase tracking-[0.18em]',
        'outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Summoning</Button>
    </div>
  );
}
