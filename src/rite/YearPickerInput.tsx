import { useEffect, useId, useRef, useState, type KeyboardEvent as RKeyboardEvent, type MouseEvent as RMouseEvent } from 'react';
import { cx } from '../lib/cx.ts';
import { YearPicker } from './YearPicker.tsx';

export interface YearPickerInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (year: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function YearPickerInput({
  label,
  description,
  error,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'YYYY',
  disabled = false,
  id,
  className,
}: YearPickerInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  const controlled = value !== undefined;
  const [inner, setInner] = useState<number | null>(defaultValue);
  const selected = controlled ? (value as number | null) : inner;

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

  function pick(y: number) {
    if (!controlled) setInner(y);
    onChange?.(y);
    setOpen(false);
  }

  function clear(e: RMouseEvent | RKeyboardEvent) {
    e.stopPropagation();
    if (!controlled) setInner(null);
    onChange?.(null);
  }

  const display = selected != null ? String(selected) : '';

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
            {selected != null && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear year"
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
            aria-label={label ?? 'Choose year'}
            className="absolute z-10 mt-1 w-full min-w-60 rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-3 dark:border-white/15 dark:bg-[#08090b]"
          >
            <YearPicker value={selected} onChange={pick} defaultDecade={selected ?? undefined} />
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

export function YearPickerInputDemo() {
  const [val, setVal] = useState<number | null>(2026);
  return (
    <div className="w-full max-w-xs space-y-4">
      <YearPickerInput label="Vintage year" description="Field with year dropdown." value={val} onChange={setVal} />
      <YearPickerInput label="Omen" error="A year is required." placeholder="YYYY" />
    </div>
  );
}
