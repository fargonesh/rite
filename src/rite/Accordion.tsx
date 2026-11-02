import { useId, useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface AccordionItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function Accordion({ items, allowMultiple = false, value, defaultValue, onChange, className }: AccordionProps) {
  const [inner, setInner] = useState<string | string[] | undefined>(defaultValue);
  const controlled = value !== undefined;
  const current = toArray(controlled ? value : inner);
  const baseId = useId();

  const toggle = (v: string) => {
    let next: string | string[];
    if (current.includes(v)) {
      const filtered = current.filter((x) => x !== v);
      next = allowMultiple ? filtered : [];
    } else {
      next = allowMultiple ? [...current, v] : v;
    }
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div className={cx('rounded-[2px] border border-[#0a0a0b]/20 bg-white dark:border-white/15 dark:bg-[#0e0f11]', className)}>
      {items.map((item, i) => {
        const open = current.includes(item.value);
        return (
          <div key={item.value} className={cx(i > 0 && 'border-t border-dashed border-[#0a0a0b]/15 dark:border-white/10')}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${baseId}-${item.value}`}
                id={`${baseId}-trigger-${item.value}`}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
                className={cx(
                  'flex w-full items-center justify-between gap-4 px-4 py-3 text-left outline-none transition-colors',
                  'hover:bg-[#0a0a0b]/5 dark:hover:bg-white/5',
                  'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e]',
                  'disabled:cursor-not-allowed disabled:opacity-40',
                )}
              >
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/85 dark:text-white/85">
                  <span aria-hidden className="mr-2 opacity-40">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cx('inline-flex leading-none transition-transform duration-200', open ? 'rotate-90 text-[#d42b1e]' : 'opacity-50')}
                >
                  <ChevronRight size={14} strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-${item.value}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${item.value}`}
              className={cx('grid transition-[grid-template-rows] duration-200 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <div className="border-t border-dashed border-[#0a0a0b]/10 px-4 py-3 text-[13px] leading-5 text-[#0a0a0b]/80 dark:border-white/10 dark:text-white/80">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AccordionDemo() {
  return (
    <Accordion
      defaultValue="protocol"
      items={[
        { value: 'protocol', label: 'Entry protocol', content: 'Knock twice, wait for the chalk mark, then enter. Never skip the mark.' },
        { value: 'ledger', label: 'Ledger rules', content: 'Log every crossing with date, weather, and witness. Ink only — pencil fades.' },
        { value: 'exit', label: 'Exit rites', content: 'Douse the lantern last. The dark should find the room empty, not abandoned.' },
      ]}
    />
  );
}
