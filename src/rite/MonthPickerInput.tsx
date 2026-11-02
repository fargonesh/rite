import { useEffect, useId, useRef, useState, type KeyboardEvent as RKeyboardEvent, type MouseEvent as RMouseEvent } from 'react';
import { cx } from '../lib/cx.ts';
import { MonthPicker, type MonthValue } from './MonthPicker.tsx';

export interface MonthPickerInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: MonthValue | null;
  defaultValue?: MonthValue | null;
  onChange?: (value: MonthValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

function fmt(v: MonthValue | null): string {
  if (!v) return '';
  return `${v.year}-${String(v.month + 1).padStart(2, '0')}`;
}

export function MonthPickerInput({
  label,
  description,
  error,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'YYYY-MM',
  disabled = false,
  id,
  className,
}: MonthPickerInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  const controlled = value !== undefined;
  const [inner, setInner] = useState<MonthValue | null>(defaultValue);
  const selected = controlled ? (value as MonthValue | null) : inner;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function pick(v: MonthValue) {
    if (!controlled) setInner(v);
    onChange?.(v);
    setOpen(false);
  }

  function clear(e: RMouseEvent | RKeyboardEvent) {
    e.stopPropagation();
    if (!controlled) setInner(null);
    onChange?.(null);
  }

  const display = fmt(selected);

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span>{label}</span>
        </label>
      )}
      <div ref={rootRef} className="relative">
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          onClick={() => setOpen((o) => !o)}
          className={cx(
            'flex h-9 w-full items-center justify-between gap-2 rounded-[2px] border bg-transparent px-3 font-mono text-[13px] tabular-nums outline-none transition-colors',
            'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 dark:border-white/20',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          <span className={cx('truncate', !display && 'text-[#0a0a0b]/35 dark:text-white/30')}>{display || placeholder}</span>
          <span className="flex shrink-0 items-center gap-2" aria-hidden>
            {selected && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear month"
                onClick={clear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clear(e);
                  }
                }}
                className="text-[#0a0a0b]/40 hover:text-[#d42b1e] dark:text-white/40 dark:hover:text-[#ff6b5e]"
              >
                ✕
              </span>
            )}
            <span className="text-[10px] opacity-60">{open ? '▲' : '▼'}</span>
          </span>
        </button>
        {open && !disabled && (
          <div
            role="dialog"
            aria-label={label ?? 'Choose month'}
            className="absolute z-10 mt-1 w-full min-w-60 rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-3 dark:border-white/15 dark:bg-[#08090b]"
          >
            <MonthPicker value={selected} onChange={pick} defaultYear={selected?.year} />
          </div>
        )}
      </div>
      {description && !error && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function MonthPickerInputDemo() {
  const [val, setVal] = useState<MonthValue | null>({ year: 2026, month: 2 });
  return (
    <div className="w-full max-w-xs space-y-4">
      <MonthPickerInput label="Issue month" description="Field with month dropdown." value={val} onChange={setVal} />
      <MonthPickerInput label="Omen" error="A month is required." placeholder="YYYY-MM" />
    </div>
  );
}
