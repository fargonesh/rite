import { useMemo } from 'react';
import { cx } from '../lib/cx.ts';

export interface NumberFormatterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  className?: string;
}

export function NumberFormatter({ value, decimals, prefix = '', suffix = '', compact = false, className }: NumberFormatterProps) {
  const text = useMemo(() => {
    const options: Intl.NumberFormatOptions =
      decimals === undefined
        ? { notation: compact ? 'compact' : 'standard' }
        : { minimumFractionDigits: decimals, maximumFractionDigits: decimals, notation: compact ? 'compact' : 'standard' };
    return `${prefix}${new Intl.NumberFormat('en-US', options).format(value)}${suffix}`;
  }, [value, decimals, prefix, suffix, compact]);
  return <span className={cx('font-mono tabular-nums', className)}>{text}</span>;
}

export function NumberFormatterDemo() {
  return (
    <div className="flex max-w-md flex-col gap-2 rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15">
      <div className="flex items-baseline justify-between gap-6 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">ledger</span>
        <NumberFormatter value={48210.5} decimals={2} prefix="$" className="text-sm text-[#0a0a0b] dark:text-[#e9e7e2]" />
      </div>
      <div className="flex items-baseline justify-between gap-6 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">yield</span>
        <NumberFormatter value={4.25} decimals={2} suffix="%" className="text-sm text-[#0a0a0b] dark:text-[#e9e7e2]" />
      </div>
      <div className="flex items-baseline justify-between gap-6 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">folios</span>
        <NumberFormatter value={1204000} compact className="text-sm text-[#0a0a0b] dark:text-[#e9e7e2]" />
      </div>
    </div>
  );
}
