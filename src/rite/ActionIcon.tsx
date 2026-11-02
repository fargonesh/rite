import type { ButtonHTMLAttributes } from 'react';
import { Bell, Circle, Plus, Settings, Star, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type ActionIconVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ActionIconSize = 'sm' | 'md' | 'lg';

export interface ActionIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionIconVariant;
  size?: ActionIconSize;
}

const variantStyles: Record<ActionIconVariant, string> = {
  primary:
    'bg-[#0a0a0b] text-[#e9e7e2] border border-[#0a0a0b] hover:bg-[#1c0b0a] hover:border-[#d42b1e] hover:text-white active:bg-black dark:bg-[#e9e7e2] dark:text-black dark:border-[#e9e7e2] dark:hover:bg-white dark:hover:border-white',
  secondary:
    'bg-transparent text-[#0a0a0b] border border-[#0a0a0b]/25 hover:border-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:text-[#e9e7e2] dark:border-white/25 dark:hover:border-white dark:hover:bg-white/5',
  outline:
    'border border-dashed border-[#0a0a0b]/40 bg-transparent text-[#0a0a0b] hover:border-solid hover:border-[#d42b1e] hover:text-[#d42b1e] dark:text-[#e9e7e2] dark:border-white/30 dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]',
  ghost:
    'bg-transparent border border-transparent text-[#0a0a0b]/70 hover:text-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5',
  destructive:
    'bg-[#d42b1e] text-white border border-[#d42b1e] hover:bg-[#a81e14] hover:border-[#a81e14] active:bg-[#7d150e]',
};

const sizeStyles: Record<ActionIconSize, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
};

export function ActionIcon({ variant = 'secondary', size = 'md', className, children, ...rest }: ActionIconProps) {
  return (
    <button
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[2px] font-mono leading-none',
        'outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

export function ActionIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionIcon aria-label="Settings" variant="primary">
        <Settings size={14} strokeWidth={2} />
      </ActionIcon>
      <ActionIcon aria-label="Notifications" variant="secondary">
        <Bell size={14} strokeWidth={2} />
      </ActionIcon>
      <ActionIcon aria-label="More options" variant="outline">
        <Plus size={14} strokeWidth={2} />
      </ActionIcon>
      <ActionIcon aria-label="Star" variant="ghost">
        <Star size={14} strokeWidth={2} fill="currentColor" />
      </ActionIcon>
      <ActionIcon aria-label="Delete" variant="destructive">
        <X size={14} strokeWidth={2} />
      </ActionIcon>
      <ActionIcon aria-label="Small action" variant="secondary" size="sm">
        <Plus size={12} strokeWidth={2} />
      </ActionIcon>
      <ActionIcon aria-label="Large action" variant="secondary" size="lg">
        <Circle size={14} strokeWidth={2} />
      </ActionIcon>
    </div>
  );
}
