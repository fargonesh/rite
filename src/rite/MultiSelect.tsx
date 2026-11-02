import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ChevronDown, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MultiSelectProps {
  label?: string;
  error?: string;
  data: string[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function MultiSelect({
  label,
  error,
  data,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Pick…',
  disabled = false,
  className,
  id,
}: MultiSelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errId = error ? `${inputId}-err` : undefined;
  const listId = `${inputId}-listbox`;

  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : uncontrolled;
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = search.trim().toLowerCase();
  const available = data.filter((d) => !current.includes(d));
  const filtered =
    query === '' ? available : available.filter((d) => d.toLowerCase().includes(query));
  const active = highlight >= 0 && highlight < filtered.length ? highlight : -1;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  function emit(next: string[]) {
    if (!controlled) setUncontrolled(next);
    onChange?.(next);
  }

  function select(opt: string) {
    emit([...current, opt]);
    setSearch('');
    setHighlight(-1);
    inputRef.current?.focus();
  }

  function remove(opt: string) {
    emit(current.filter((c) => c !== opt));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlight((h) => (filtered.length === 0 ? -1 : (h + 1) % filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlight((h) => (filtered.length === 0 ? -1 : (h - 1 + filtered.length) % filtered.length));
    } else if (e.key === 'Enter') {
      if (open && active >= 0) {
        e.preventDefault();
        select(filtered[active]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHighlight(-1);
    } else if (e.key === 'Backspace' && search === '' && current.length > 0) {
      remove(current[current.length - 1]);
    }
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
        <div
          onClick={() => {
            if (!disabled) {
              setOpen(true);
              inputRef.current?.focus();
            }
          }}
          className={cx(
            'flex min-h-9 items-center gap-1.5 rounded-[2px] border bg-transparent py-1 pl-2 pr-1.5 outline-none transition-colors',
            'focus-within:ring-1 focus-within:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus-within:border-[#0a0a0b] dark:border-white/20 dark:focus-within:border-white/60',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {current.map((c) => (
            <span
              key={c}
              className="inline-flex max-w-full items-center gap-1 rounded-[2px] bg-[#0a0a0b]/8 py-0.5 pl-2 pr-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]"
            >
              <span className="truncate">{c}</span>
              <button
                type="button"
                aria-label={`Remove ${c}`}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  remove(c);
                }}
                className="flex items-center rounded-[1px] p-0.5 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed dark:hover:text-[#ff6b5e]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            aria-describedby={errId}
            aria-invalid={Boolean(error)}
            type="text"
            autoComplete="off"
            value={search}
            placeholder={current.length === 0 ? placeholder : undefined}
            disabled={disabled}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
              setHighlight(-1);
            }}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className="h-7 min-w-[6rem] flex-1 bg-transparent font-mono text-[13px] text-[#0a0a0b] outline-none placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:text-[#e9e7e2] dark:placeholder:text-white/30"
          />
          </div>
          <ChevronDown
            size={14}
            aria-hidden
            className={cx(
              'shrink-0 text-[#0a0a0b]/40 transition-transform dark:text-white/40',
              open && 'rotate-180',
            )}
          />
        </div>
        {open && !disabled && (
          <ul
            role="listbox"
            id={listId}
            aria-label={label ?? 'Options'}
            aria-multiselectable="true"
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] py-1 dark:border-white/15 dark:bg-[#08090b]"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/40">
                No options
              </li>
            )}
            {filtered.map((opt, i) => (
              <li
                key={opt}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={false}
                onClick={() => select(opt)}
                onMouseEnter={() => setHighlight(i)}
                className={cx(
                  'cursor-pointer px-3 py-2 font-mono text-[13px] text-[#0a0a0b] dark:text-[#e9e7e2]',
                  i === active
                    ? 'bg-[#0a0a0b]/8 dark:bg-white/10'
                    : 'hover:bg-[#0a0a0b]/5 dark:hover:bg-white/5',
                )}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          <TriangleAlert size={12} strokeWidth={2} aria-hidden />
          omen — {error}
        </p>
      )}
    </div>
  );
}

export function MultiSelectDemo() {
  const [val, setVal] = useState<string[]>(['vesper']);
  return (
    <div className="w-full max-w-xs space-y-4">
      <MultiSelect
        label="Rites"
        data={['vesper', 'matins', 'compline', 'lauds']}
        value={val}
        onChange={setVal}
        placeholder="Pick rites…"
      />
      <MultiSelect label="Omen" error="Choose at least one." data={['ash', 'salt']} placeholder="Pick…" />
    </div>
  );
}
