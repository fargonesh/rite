import type { HTMLAttributes } from 'react';
import { Circle, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type ThemeIconSize = 'sm' | 'md' | 'lg';
export type ThemeIconVariant = 'solid' | 'soft' | 'outline';

export interface ThemeIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: ThemeIconSize;
  variant?: ThemeIconVariant;
  color?: 'zinc' | 'blood';
}

const sizeStyles: Record<ThemeIconSize, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-lg',
};

const variantColorStyles: Record<ThemeIconVariant, Record<'zinc' | 'blood', string>> = {
  solid: {
    zinc: 'bg-[#0a0a0b] text-[#e9e7e2] border border-[#0a0a0b] dark:bg-[#e9e7e2] dark:text-black dark:border-[#e9e7e2]',
    blood: 'bg-[#d42b1e] text-white border border-[#d42b1e]',
  },
  soft: {
    zinc: 'bg-[#0a0a0b]/5 text-[#0a0a0b] border border-[#0a0a0b]/15 dark:bg-white/5 dark:text-[#e9e7e2] dark:border-white/15',
    blood: 'bg-[#d42b1e]/10 text-[#d42b1e] border border-[#d42b1e]/30 dark:text-[#ff6b5e]',
  },
  outline: {
    zinc: 'bg-transparent text-[#0a0a0b] border border-[#0a0a0b]/40 dark:text-[#e9e7e2] dark:border-white/30',
    blood: 'bg-transparent text-[#d42b1e] border border-[#d42b1e]/60 dark:text-[#ff6b5e]',
  },
};

export function ThemeIcon({ size = 'md', variant = 'solid', color = 'zinc', className, children, ...rest }: ThemeIconProps) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[2px] font-mono leading-none',
        sizeStyles[size],
        variantColorStyles[variant][color],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}

export function ThemeIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ThemeIcon variant="solid" color="zinc">
        <Circle size={14} strokeWidth={2} aria-hidden />
      </ThemeIcon>
      <ThemeIcon variant="soft" color="zinc">
        <TriangleAlert size={14} strokeWidth={2} aria-hidden />
      </ThemeIcon>
      <ThemeIcon variant="outline" color="zinc">
        <Circle size={14} strokeWidth={2} fill="currentColor" aria-hidden />
      </ThemeIcon>
      <ThemeIcon variant="solid" color="blood">
        <X size={14} strokeWidth={2} aria-hidden />
      </ThemeIcon>
      <ThemeIcon variant="soft" color="blood">
        <Circle size={14} strokeWidth={2} aria-hidden />
      </ThemeIcon>
      <ThemeIcon variant="outline" color="blood" size="lg">
        <TriangleAlert size={14} strokeWidth={2} aria-hidden />
      </ThemeIcon>
    </div>
  );
}
