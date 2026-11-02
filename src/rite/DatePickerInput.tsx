import { useEffect, useId, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';
import { Calendar } from './Calendar.tsx';

export interface DatePickerInputProps {
  label?: string;
  error?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatYMD(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function DatePickerInput({
  label,
  error,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'YYYY-MM-DD',
  className,
}: DatePickerInputProps) {
  const autoId = useId();
  const errId = error ? `${autoId}-err` : undefined;
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = isControlled ? (value as Date | null) : inner;

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

  const commit = (next: Date | null) => {
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
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={errId}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((o) => !o)}
        className={cx(
          'flex h-9 w-full items-center gap-2 rounded-[2px] border bg-transparent pl-7 pr-2.5 text-left font-mono text-[13px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
          error
            ? 'border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 focus-visible:border-[#0a0a0b] dark:border-white/20 dark:focus-visible:border-white/60',
        )}
      >
        <span aria-hidden className="pointer-events-none absolute left-2.5 font-mono text-sm text-[#d42b1e]">
          &gt;
        </span>
        <span className={cx('flex-1 truncate', selected ? 'text-[#0a0a0b] dark:text-white' : 'font-sans text-[#0a0a0b]/35 dark:text-white/30')}>
          {selected ? formatYMD(selected) : placeholder}
        </span>
        <ChevronRight size={14} aria-hidden className={cx('shrink-0 text-[#0a0a0b]/50 transition-transform dark:text-white/40', open && 'rotate-90')} />
      </button>
      {open && (
        <div role="dialog" aria-label="Choose date" className="absolute z-10 mt-1.5 w-64 rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-2 dark:border-white/20 dark:bg-[#08090b]">
          <Calendar value={selected} onChange={commit} />
        </div>
      )}
      {error && (
        <p id={errId} className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          ERR — {error}
        </p>
      )}
    </div>
  );
}

export function DatePickerInputDemo() {
  const [day, setDay] = useState<Date | null>(null);
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <DatePickerInput label="Rite date" value={day} onChange={setDay} placeholder="YYYY-MM-DD" />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        filed — {day ? `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}` : 'empty'}
      </p>
      <DatePickerInput label="Doomed date" error="required field" defaultValue={new Date()} />
    </div>
  );
}
