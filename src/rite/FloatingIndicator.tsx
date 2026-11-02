import { useEffect, useRef, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface FloatingIndicatorItem {
  id: string | number;
  label: string;
}

export interface FloatingIndicatorProps {
  active: string | number;
  items: FloatingIndicatorItem[];
  onSelect?: (id: string | number) => void;
  className?: string;
}

export function FloatingIndicator({ active, items, onSelect, className }: FloatingIndicatorProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slab, setSlab] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const el = track.querySelector<HTMLElement>(`[data-tab-id="${CSS.escape(String(active))}"]`);
      if (!el) return;
      setSlab({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, items]);

  return (
    <div
      ref={trackRef}
      role="tablist"
      aria-label="Sections"
      className={cx(
        'relative flex gap-px rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-1',
        'dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <span
        aria-hidden
        style={{ left: slab.left, width: slab.width }}
        className="absolute bottom-1 top-1 rounded-[2px] bg-[#0a0a0b] transition-all duration-200 ease-out dark:bg-[#e9e7e2]"
      />
      {items.map((item) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={selected}
            data-tab-id={item.id}
            onClick={() => onSelect?.(item.id)}
            className={cx(
              'relative z-10 flex-1 rounded-[2px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] outline-none transition-colors duration-200',
              'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
              selected
                ? 'text-[#e9e7e2] dark:text-black'
                : 'text-[#0a0a0b]/55 hover:text-[#0a0a0b] dark:text-white/50 dark:hover:text-white',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function FloatingIndicatorDemo() {
  const [active, setActive] = useState<string | number>('witness');
  const items: FloatingIndicatorItem[] = [
    { id: 'witness', label: 'Witness' },
    { id: 'ledger', label: 'Ledger' },
    { id: 'seal', label: 'Seal' },
  ];
  return (
    <div>
      <FloatingIndicator active={active} items={items} onSelect={setActive} />
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/45 dark:text-white/35">
        Active tab: {active}
      </p>
    </div>
  );
}
