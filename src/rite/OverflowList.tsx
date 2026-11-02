import { useState, type ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface OverflowListProps {
  items: ReactNode[];
  maxVisible?: number;
  className?: string;
}

/**
 * Hide items that do not fit and display them as a single collapsed item.
 */
export function OverflowList({ items, maxVisible = 4, className }: OverflowListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, maxVisible);
  const hidden = items.length - maxVisible;

  return (
    <div className={cx('rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10', className)}>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/40">
        Overflow / {items.length} items
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {visible.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-[2px] border border-[#0a0a0b]/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/80 dark:border-white/15 dark:text-white/70"
          >
            {item}
          </span>
        ))}
        {!expanded && hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center rounded-[2px] bg-[#d42b1e] px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#a81e14]"
          >
            +{hidden} more
          </button>
        )}
        {expanded && items.length > maxVisible && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex items-center rounded-[2px] border border-dashed border-[#0a0a0b]/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 hover:border-[#d42b1e] hover:text-[#d42b1e] dark:border-white/20 dark:text-white/50"
          >
            collapse
          </button>
        )}
      </div>
    </div>
  );
}

export function OverflowListDemo() {
  return (
    <OverflowList
      maxVisible={4}
      items={['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel']}
    />
  );
}
