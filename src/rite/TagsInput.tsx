import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TagsInputProps {
  label?: string;
  error?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function TagsInput({
  label,
  error,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Type + Enter…',
  disabled = false,
  className,
  id,
}: TagsInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errId = error ? `${inputId}-err` : undefined;

  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : uncontrolled;
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function emit(next: string[]) {
    if (!controlled) setUncontrolled(next);
    onChange?.(next);
  }

  function commit(raw: string) {
    const parts = raw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '' && !current.includes(t));
    setDraft('');
    if (parts.length === 0) return;
    emit([...current, ...parts]);
  }

  function remove(tag: string) {
    emit(current.filter((t) => t !== tag));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit(e.currentTarget.value);
    } else if (e.key === 'Backspace' && e.currentTarget.value === '' && current.length > 0) {
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
      <div
        onClick={() => {
          if (!disabled) inputRef.current?.focus();
        }}
        className={cx(
          'flex min-h-9 flex-wrap items-center gap-1.5 rounded-[2px] border bg-transparent px-2 py-1 outline-none transition-colors',
          'focus-within:ring-1 focus-within:ring-[#d42b1e]',
          error
            ? 'border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 focus-within:border-[#0a0a0b] dark:border-white/20 dark:focus-within:border-white/60',
          disabled && 'cursor-not-allowed opacity-40',
        )}
      >
        {current.map((tag) => (
          <span
            key={tag}
            className="inline-flex max-w-full items-center gap-1 rounded-[2px] bg-[#0a0a0b]/8 py-0.5 pl-2 pr-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]"
          >
            <span className="truncate">{tag}</span>
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                remove(tag);
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
          aria-describedby={errId}
          aria-invalid={Boolean(error)}
          type="text"
          autoComplete="off"
          value={draft}
          placeholder={current.length === 0 ? placeholder : undefined}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            if (draft.trim() !== '') commit(draft);
          }}
          className="h-7 min-w-[8rem] flex-1 bg-transparent font-mono text-[13px] text-[#0a0a0b] outline-none placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:text-[#e9e7e2] dark:placeholder:text-white/30"
        />
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

export function TagsInputDemo() {
  const [tags, setTags] = useState<string[]>(['vesper', 'omen']);
  return (
    <div className="w-full max-w-xs space-y-4">
      <TagsInput label="Sigils" value={tags} onChange={setTags} placeholder="Type + Enter…" />
      <TagsInput label="Omen" error="Add at least one sigil." placeholder="Type + Enter…" />
    </div>
  );
}
