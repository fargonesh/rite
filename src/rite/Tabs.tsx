import { useId, useState, type ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, defaultValue, onChange, className }: TabsProps) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.value ?? '');
  const active = value ?? inner;
  const baseId = useId();

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];

  return (
    <div className={className}>
      <div role="tablist" aria-label="Views" className="flex gap-5 border-b border-[#0a0a0b]/20 dark:border-white/15">
        {tabs.map((t) => {
          const selected = t.value === active;
          return (
            <button
              key={t.value}
              role="tab"
              id={`${baseId}-${t.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              aria-disabled={t.disabled}
              disabled={t.disabled}
              onClick={() => select(t.value)}
              onKeyDown={(e) => {
                const idx = tabs.findIndex((x) => x.value === t.value);
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const dir = e.key === 'ArrowRight' ? 1 : -1;
                  const next = tabs[(idx + dir + tabs.length) % tabs.length];
                  if (!next.disabled) select(next.value);
                }
              }}
              className={cx(
                'relative -mb-px pb-2.5 pt-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] outline-none transition-colors',
                'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
                'disabled:cursor-not-allowed disabled:opacity-40',
                selected ? 'text-[#0a0a0b] dark:text-white' : 'text-[#0a0a0b]/50 hover:text-[#0a0a0b] dark:text-white/50 dark:hover:text-white',
              )}
            >
              {t.label}
              <span
                aria-hidden
                className={cx(
                  'absolute inset-x-0 -bottom-px h-0.5 transition-colors',
                  selected ? 'bg-[#d42b1e]' : 'bg-transparent',
                )}
              />
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={activeTab ? `${baseId}-${activeTab.value}` : undefined}
        className="py-4 text-[13px] leading-5 text-[#0a0a0b]/85 dark:text-white/85"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs
      defaultValue="brief"
      tabs={[
        { value: 'brief', label: 'Brief', content: 'Mission brief: survey the north line at dawn. Travel light, log everything.' },
        { value: 'assets', label: 'Assets', content: 'Assets on hand: lantern, cord, ledger. Nothing electronic, nothing loud.' },
        { value: 'omens', label: 'Omens', content: 'Three crows on the wire. Proceed anyway — the ledger demands it.' },
      ]}
    />
  );
}
