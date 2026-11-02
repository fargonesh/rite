import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ActionBarAction {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
}

export interface ActionBarProps {
  selected: number;
  actions: ActionBarAction[];
  onClear?: () => void;
  className?: string;
}

/**
 * Floating bottom-center ink slab for bulk selection actions.
 * Appears only when selected > 0.
 */
export function ActionBar({ selected, actions, onClear, className }: ActionBarProps) {
  if (selected <= 0) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx('fixed bottom-4 left-1/2 z-50 -translate-x-1/2', className)}
    >
      <div className="flex items-center gap-2 rounded-[2px] border border-[#0a0a0b] bg-[#0a0a0b] py-2 pl-3 pr-2 shadow-[0_8px_24px_rgba(10,10,11,0.35)] dark:border-white/25 dark:bg-[#e9e7e2] dark:shadow-none">
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#e9e7e2] dark:text-black">
          {selected} selected
        </span>
        <span aria-hidden className="h-4 w-px bg-white/20 dark:bg-black/20" />
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onSelect}
            className={cx(
              'whitespace-nowrap rounded-[2px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] outline-none transition-colors',
              'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
              action.destructive
                ? 'text-[#ff6b5e] hover:bg-[#d42b1e] hover:text-white'
                : 'text-[#e9e7e2]/80 hover:bg-white/10 hover:text-white dark:text-black/70 dark:hover:bg-black/10 dark:hover:text-black',
            )}
          >
            {action.label}
          </button>
        ))}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear selection"
            className="rounded-[2px] p-1 text-[#e9e7e2]/60 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-black/60 dark:hover:bg-black/10 dark:hover:text-black"
          >
            <X size={14} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

export function ActionBarDemo() {
  const [count, setCount] = useState(2);
  const [log, setLog] = useState('awaiting orders');
  return (
    <div className="rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-4 dark:border-white/20">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Selection count: {count}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#0a0a0b]/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b] transition-colors hover:border-[#0a0a0b] dark:border-white/25 dark:text-white dark:hover:border-white"
        >
          <Plus size={12} aria-hidden /> Add row
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="rounded-[2px] border border-[#0a0a0b]/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b] transition-colors hover:border-[#0a0a0b] dark:border-white/25 dark:text-white dark:hover:border-white"
        >
          Remove row
        </button>
      </div>
      <p className="mt-3 text-[12px] text-[#0a0a0b]/60 dark:text-white/50">
        Last action: <span className="font-mono">{log}</span>
      </p>
      <ActionBar
        selected={count}
        onClear={() => {
          setCount(0);
          setLog('cleared');
        }}
        actions={[
          { label: 'Export', onSelect: () => setLog(`exported ${count}`) },
          { label: 'Delete', onSelect: () => setLog(`deleted ${count}`), destructive: true },
        ]}
      />
    </div>
  );
}
