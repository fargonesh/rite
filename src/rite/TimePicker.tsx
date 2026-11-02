import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TimePickerProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  step?: number;
  className?: string;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function buildOptions(step: number): string[] {
  const safe = step > 0 && step <= 60 ? Math.floor(step) : 30;
  const out: string[] = [];
  for (let t = 0; t < 24 * 60; t += safe) out.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`);
  return out;
}

export function TimePicker({ label, value, defaultValue = '', onChange, step = 30, className }: TimePickerProps) {
  const autoId = useId();
  const listId = `${autoId}-list`;
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = isControlled ? (value as string) : inner;
  const options = useMemo(() => buildOptions(step), [step]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  const commit = (next: string) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cx('relative w-full', className)}>
      {label && (
        <span className="mb-1.5 flex items-baseline font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          <span aria-hidden className="mr-1.5 text-[#d42b1e]">
            REQ
          </span>
          {label}
        </span>
      )}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center gap-2 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-2.5 text-left font-mono text-[13px] tracking-[0.2em] text-[#0a0a0b] outline-none transition-colors hover:border-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/20 dark:text-white dark:hover:border-white/60"
      >
        <Clock size={14} aria-hidden className="shrink-0 text-[#d42b1e]" />
        <span className={cx('flex-1 truncate', !current && 'font-sans tracking-normal text-[#0a0a0b]/35 dark:text-white/30')}>
          {current || 'HH:MM'}
        </span>
        <ChevronRight size={14} aria-hidden className={cx('shrink-0 text-[#0a0a0b]/50 transition-transform dark:text-white/40', open && 'rotate-90')} />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Choose time"
          className="absolute z-10 mt-1.5 max-h-56 w-full overflow-y-auto rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-1 dark:border-white/20 dark:bg-[#08090b]"
        >
          {options.map((opt) => {
            const active = opt === current;
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => commit(opt)}
                  className={cx(
                    'flex w-full items-center justify-between rounded-[2px] px-2.5 py-1.5 font-mono text-[12px] tracking-[0.2em] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                    active
                      ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                      : 'text-[#0a0a0b]/80 hover:bg-[#0a0a0b]/5 dark:text-white/70 dark:hover:bg-white/10',
                  )}
                >
                  {opt}
                  {active && (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-[#d42b1e] dark:bg-[#d42b1e]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function TimePickerDemo() {
  const [t, setT] = useState('18:00');
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <TimePicker label="Vigil hour" value={t} onChange={setT} step={30} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        kept at — {t || 'unset'}
      </p>
      <TimePicker label="Quarter toll" defaultValue="12:15" step={15} />
    </div>
  );
}
