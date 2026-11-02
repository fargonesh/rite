import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface DataListItem {
  label: string;
  value: ReactNode;
}

export interface DataListProps {
  items: DataListItem[];
  striped?: boolean;
  className?: string;
}

export function DataList({ items, striped = false, className }: DataListProps) {
  return (
    <dl
      className={cx(
        'overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15',
        'divide-y divide-dashed divide-[#0a0a0b]/15 dark:divide-white/10',
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={cx(
            'flex items-baseline justify-between gap-6 px-3 py-2',
            striped && i % 2 === 1 && 'bg-[#0a0a0b]/[0.04] dark:bg-white/[0.04]',
          )}
        >
          <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
            {item.label}
          </dt>
          <dd className="text-right text-sm text-[#0a0a0b] dark:text-[#e9e7e2]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DataListDemo() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <DataList
        items={[
          { label: 'ref', value: 'VES-1147' },
          { label: 'status', value: 'Witnessed' },
          { label: 'sublevel', value: '02 — cold storage' },
        ]}
      />
      <DataList
        striped
        items={[
          { label: 'folios', value: '1,204' },
          { label: 'sealed', value: '3' },
          { label: 'registrar', value: 'On duty' },
        ]}
      />
    </div>
  );
}
