import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronUp, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type SelectItem = string | { value: string; label: string; disabled?: boolean };

export interface SelectProps {
  label?: string;
  description?: string;
  error?: string;
  data: SelectItem[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  id?: string;
}

function norm(data: SelectItem[]): { value: string; label: string; disabled?: boolean }[] {
  return data.map((d) => (typeof d === 'string' ? { value: d, label: d } : d));
}

export function Select({
  label,
  description,
  error,
  data,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  clearable = false,
  className,
  id,
}: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const items = norm(data);

  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue);
  const controlled = value !== undefined;
  const selected = controlled ? value : uncontrolled;
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
  }, [open ]);

  const selectedLabel = items.find((i) => i.value === selected)?.label;

  function pick(v: string | null) {
    if (!controlled) setUncontrolled(v);
    onChange?.(v);
    setOpen(false);
  }

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
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          onClick={() => setOpen((o) => !o)}
          className={cx(
            'flex h-9 w-full items-center justify-between gap-2 rounded-[2px] border bg-transparent px-3 font-mono text-[13px] outline-none transition-colors',
            'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 dark:border-white/20',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          <span className={cx('truncate', !selectedLabel && 'text-[#0a0a0b]/35 dark:text-white/30')}>
            {selectedLabel ?? placeholder}
          </span>
          <span className="flex items-center gap-1.5" aria-hidden>
            {clearable && selected != null && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear selection"
                onClick={(e) => {
                  e.stopPropagation();
                  pick(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    pick(null);
                  }
                }}
                className="text-[#0a0a0b]/40 hover:text-[#d42b1e] dark:text-white/40 dark:hover:text-[#ff6b5e]"
              >
                <X size={12} strokeWidth={2} />
              </span>
            )}
            <span className="inline-flex text-[10px] opacity-60">
              {open ? <ChevronUp size={12} strokeWidth={2} /> : <ChevronDown size={12} strokeWidth={2} />}
            </span>
          </span>
        </button>
        {open && !disabled && (
          <ul
            role="listbox"
            aria-labelledby={label ? inputId : undefined}
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] py-1 dark:border-white/15 dark:bg-[#08090b]"
          >
            {items.length === 0 && (
              <li className="px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/40">
                No options
              </li>
            )}
            {items.map((item) => {
              const isSel = item.value === selected;
              return (
                <li
                  key={item.value}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) pick(item.value);
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
                      e.preventDefault();
                      pick(item.value);
                    }
                  }}
                  tabIndex={item.disabled ? undefined : 0}
                  className={cx(
                    'flex items-center justify-between px-3 py-2 font-mono text-[13px] outline-none',
                    item.disabled
                      ? 'cursor-not-allowed opacity-40'
                      : 'cursor-pointer hover:bg-[#0a0a0b]/5 focus-visible:bg-[#0a0a0b]/5 dark:hover:bg-white/5 dark:focus-visible:bg-white/5',
                    isSel && 'bg-[#0a0a0b]/5 dark:bg-white/5',
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  {isSel && (
                    <span aria-hidden className="inline-flex text-[#d42b1e]">
                      <Check size={12} strokeWidth={2} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {description && !error && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          <TriangleAlert size={12} strokeWidth={2} aria-hidden />
          omen — {error}
        </p>
      )}
    </div>
  );
}

export function SelectDemo() {
  const [val, setVal] = useState<string | null>('vesper');
  return (
    <div className="w-full max-w-xs space-y-4">
      <Select
        label="Rite"
        description="Choose the evening rite."
        data={['vesper', 'matins', 'compline']}
        value={val}
        onChange={setVal}
        placeholder="Pick a rite…"
        clearable
      />
      <Select label="Omen" error="A choice is required." data={[{ value: 'a', label: 'Ash' }, { value: 'b', label: 'Salt', disabled: true }]} placeholder="Pick…" />
    </div>
  );
}
