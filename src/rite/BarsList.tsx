import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface BarsListDatum {
  label: string;
  value: number;
}

export interface BarsListProps extends HTMLAttributes<HTMLDivElement> {
  data: BarsListDatum[];
  max?: number;
}

export function BarsList({ data, max, className, ...rest }: BarsListProps) {
  const values = data.map((d) => (Number.isFinite(d.value) ? d.value : 0));
  const peak = max ?? Math.max(0, ...values);
  const scale = peak > 0 ? peak : 1;
  const maxValue = Math.max(...values);
  const label = data.length > 0 ? `Bar list: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}` : 'Bar list: no data';
  return (
    <div role="img" aria-label={label} className={cx('w-full space-y-2', className)} {...rest}>
      {data.map((d, i) => {
        const v = Number.isFinite(d.value) ? d.value : 0;
        const pct = Math.min(100, Math.max(0, (v / scale) * 100));
        const isMax = v === maxValue && data.length > 1;
        return (
          <div key={`${d.label}-${i}`} className="flex items-center gap-3">
            <span className="w-20 shrink-0 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
              {d.label}
            </span>
            <span className="h-3 flex-1 border border-[#0a0a0b]/15 dark:border-white/10">
              <span
                className={cx('block h-full', isMax ? 'bg-[#d42b1e]' : 'bg-[#0a0a0b] dark:bg-[#e9e7e2]')}
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums text-[#0a0a0b] dark:text-[#e9e7e2]">
              {v}
            </span>
          </div>
        );
      })}
      {data.length === 0 && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          No data
        </span>
      )}
    </div>
  );
}

export function BarsListDemo() {
  return (
    <BarsList
      data={[
        { label: 'Alpha', value: 42 },
        { label: 'Bravo', value: 78 },
        { label: 'Charlie', value: 56 },
        { label: 'Delta', value: 96 },
      ]}
    />
  );
}
