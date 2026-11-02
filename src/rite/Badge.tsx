import type { HTMLAttributes } from 'react';
import { Square, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeColor = 'zinc' | 'indigo' | 'emerald' | 'amber' | 'red';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
}

// Sigil language: sharp chips, uppercase mono, leading mark.
// red is always blood — the only color allowed to shout.
const colorStyles: Record<BadgeColor, Record<BadgeVariant, string>> = {
  zinc: {
    solid: 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black',
    soft: 'bg-[#0a0a0b]/8 text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]',
    outline: 'border border-dashed border-[#0a0a0b]/40 text-[#0a0a0b] dark:border-white/30 dark:text-[#e9e7e2]',
  },
  indigo: {
    solid: 'bg-[#2b3440] text-[#e9e7e2]',
    soft: 'bg-[#2b3440]/15 text-[#2b3440] dark:bg-[#7d8aa0]/15 dark:text-[#aeb9cc]',
    outline: 'border border-dashed border-[#2b3440]/50 text-[#2b3440] dark:border-[#7d8aa0]/50 dark:text-[#aeb9cc]',
  },
  emerald: {
    solid: 'bg-[#1d3a2a] text-[#d7e8dc]',
    soft: 'bg-[#1d3a2a]/12 text-[#1d3a2a] dark:bg-emerald-400/10 dark:text-emerald-200',
    outline: 'border border-dashed border-[#1d3a2a]/50 text-[#1d3a2a] dark:border-emerald-400/40 dark:text-emerald-200',
  },
  amber: {
    solid: 'bg-[#4a3a12] text-[#f2e6c4]',
    soft: 'bg-[#4a3a12]/12 text-[#4a3a12] dark:bg-amber-400/10 dark:text-amber-200',
    outline: 'border border-dashed border-[#4a3a12]/50 text-[#4a3a12] dark:border-amber-400/40 dark:text-amber-200',
  },
  red: {
    solid: 'bg-[#d42b1e] text-white',
    soft: 'bg-[#d42b1e]/12 text-[#a81e14] dark:bg-[#d42b1e]/15 dark:text-[#ff6b5e]',
    outline: 'border border-[#d42b1e] text-[#a81e14] dark:border-[#d42b1e] dark:text-[#ff6b5e]',
  },
};

export function Badge({ variant = 'soft', color = 'zinc', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-[2px] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em]',
        colorStyles[color][variant],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center leading-none">
        {color === 'red' ? (
          <X size={8} strokeWidth={2} />
        ) : (
          <Square size={8} strokeWidth={2} fill="currentColor" />
        )}
      </span>
      {children}
    </span>
  );
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" color="zinc">Filed</Badge>
      <Badge variant="soft" color="indigo">Survey</Badge>
      <Badge variant="outline" color="emerald">Kept</Badge>
      <Badge variant="soft" color="amber">Omen</Badge>
      <Badge variant="outline" color="red">Breach</Badge>
      <Badge variant="solid" color="red">Blood</Badge>
    </div>
  );
}
