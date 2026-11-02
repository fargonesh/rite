import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { TriangleAlert } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface AutocompleteProps {
  label?: string;
  description?: string;
  error?: string;
  data: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Autocomplete({
  label,
  description,
  error,
  data,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Search…',
  disabled = false,
  className,
  id,
}: AutocompleteProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const listId = `${inputId}-listbox`;

  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const controlled = value !== undefined;
  const text = controlled ? value : uncontrolled;
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const query = text.trim().toLowerCase();
  const matches = query === '' ? data : data.filter((d) => d.toLowerCase().includes(query));
  const active = highlight >= 0 && highlight < matches.length ? highlight : -1;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  function commit(next: string) {
    if (!controlled) setUncontrolled(next);
    onChange?.(next);
    setOpen(false);
    setHighlight(-1);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlight((h) => (matches.length === 0 ? -1 : (h + 1) % matches.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlight((h) => (matches.length === 0 ? -1 : (h - 1 + matches.length) % matches.length));
    } else if (e.key === 'Enter') {
      if (open && active >= 0) {
        e.preventDefault();
        commit(matches[active]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHighlight(-1);
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
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[#d42b1e]"
          >
            &gt;
          </span>
          <input
            id={inputId}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
            aria-invalid={Boolean(error)}
            type="text"
            autoComplete="off"
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => {
              const next = e.target.value;
              if (!controlled) setUncontrolled(next);
              onChange?.(next);
              setOpen(true);
              setHighlight(-1);
            }}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className={cx(
              'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-3 font-mono text-[13px] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
              'focus:ring-1 focus:ring-[#d42b1e]',
              error
                ? 'border-[#d42b1e] focus:border-[#d42b1e]'
                : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
              disabled && 'cursor-not-allowed opacity-40',
            )}
          />
        </div>
        {open && !disabled && (
          <ul
            role="listbox"
            id={listId}
            aria-label={label ?? 'Suggestions'}
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] py-1 dark:border-white/15 dark:bg-[#08090b]"
          >
            {matches.length === 0 && (
              <li className="px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/40">
                No matches
              </li>
            )}
            {matches.map((m, i) => (
              <li
                key={`${m}-${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onClick={() => commit(m)}
                onMouseEnter={() => setHighlight(i)}
                className={cx(
                  'cursor-pointer px-3 py-2 font-mono text-[13px] text-[#0a0a0b] dark:text-[#e9e7e2]',
                  i === active
                    ? 'bg-[#0a0a0b]/8 dark:bg-white/10'
                    : 'hover:bg-[#0a0a0b]/5 dark:hover:bg-white/5',
                )}
              >
                {m}
              </li>
            ))}
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

export function AutocompleteDemo() {
  const [val, setVal] = useState('vesper');
  return (
    <div className="w-full max-w-xs space-y-4">
      <Autocomplete
        label="Rite"
        description="Type to filter the rites."
        data={['vesper', 'matins', 'compline', 'lauds', 'none']}
        value={val}
        onChange={setVal}
        placeholder="Search rites…"
      />
      <Autocomplete
        label="Omen"
        error="An omen is required."
        data={['ash', 'salt', 'iron']}
        placeholder="Search…"
      />
    </div>
  );
}
