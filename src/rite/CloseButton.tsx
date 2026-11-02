import type { ButtonHTMLAttributes } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type CloseButtonSize = 'sm' | 'md' | 'lg';

export interface CloseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: CloseButtonSize;
}

const sizeStyles: Record<CloseButtonSize, string> = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm',
};

export function CloseButton({ size = 'md', className, disabled, onClick, ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="Close"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[2px] border border-transparent font-mono leading-none',
        'bg-transparent text-[#0a0a0b]/70 hover:text-[#0a0a0b] hover:bg-[#0a0a0b]/5 active:bg-[#0a0a0b]/10',
        'dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 dark:active:bg-white/10',
        'outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center justify-center">
        <X size={14} strokeWidth={2} />
      </span>
    </button>
  );
}

export function CloseButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 border border-[#0a0a0b]/15 p-4 dark:border-white/15">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">Dialog row</span>
      <span className="flex-1" />
      <CloseButton size="sm" onClick={() => {}} />
      <CloseButton size="md" onClick={() => {}} />
      <CloseButton size="lg" onClick={() => {}} />
      <CloseButton size="md" disabled onClick={() => {}} />
    </div>
  );
}
