import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface DateInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

function fmt(d: Date | null): string {
  if (!d || Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parse(raw: string): Date | null | 'invalid' {
  const t = raw.trim();
  if (t === '') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (!m) return 'invalid';
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return 'invalid';
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return 'invalid';
  return dt;
}

function same(a: Date | null, b: Date | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DateInput({
  label,
  description,
  error,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'YYYY-MM-DD',
  disabled = false,
  id,
  name,
  className,
}: DateInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = `${inputId}-err`;
  const controlled = value !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const current = controlled ? (value as Date | null) : inner;

  const [text, setText] = useState<string | null>(null);
  const [parseError, setParseError] = useState(false);
  const shown = text ?? fmt(current);
  const errMsg = error ?? (parseError ? 'unreadable date' : undefined);

  function commit(raw: string) {
    const res = parse(raw);
    if (res === 'invalid') {
      setParseError(true);
      setText(raw);
      return;
    }
    setParseError(false);
    setText(null);
    if (!controlled) setInner(res);
    if (!same(current, res)) onChange?.(res);
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
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[#d42b1e]">
          &gt;
        </span>
        <input
          id={inputId}
          name={name}
          value={shown}
          disabled={disabled}
          placeholder={placeholder}
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
          aria-describedby={[descId, errMsg ? errId : undefined].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(errMsg)}
          onChange={(e) => {
            setText(e.target.value);
            if (parseError) setParseError(false);
          }}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit((e.target as HTMLInputElement).value);
            if (e.key === 'Escape') {
              setText(null);
              setParseError(false);
              (e.target as HTMLInputElement).blur();
            }
          }}
          className={cx(
            'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-3 font-mono text-[13px] outline-none transition-colors placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
            'focus:ring-1 focus:ring-[#d42b1e]',
            errMsg
              ? 'border-[#d42b1e] focus:border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        />
      </div>
      {description && !errMsg && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {errMsg && (
        <p id={errId} role="alert" className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          {errMsg}
        </p>
      )}
    </div>
  );
}

export function DateInputDemo() {
  const [val, setVal] = useState<Date | null>(new Date(2026, 10, 2));
  return (
    <div className="w-full max-w-xs space-y-4">
      <DateInput label="Rite date" description="Free text. Format YYYY-MM-DD." value={val} onChange={setVal} />
      <DateInput label="Uncontrolled" defaultValue={new Date(2026, 2, 14)} />
      <DateInput label="Omen" error="A date is required." placeholder="YYYY-MM-DD" />
    </div>
  );
}
