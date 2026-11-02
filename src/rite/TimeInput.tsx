import { useId, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TimeInputProps {
  label?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function parseTime(v: string): { h: number; m: number } | null {
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(v.trim());
  if (!m) return null;
  return { h: Number(m[1]), m: Number(m[2]) };
}

function shiftTime(v: string, deltaMin: number): string {
  const p = parseTime(v) ?? { h: 0, m: 0 };
  const total = (p.h * 60 + p.m + deltaMin + 1440) % 1440;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

function sanitize(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function TimeInput({
  label,
  error,
  value,
  defaultValue = '',
  onChange,
  disabled,
  className,
}: TimeInputProps) {
  const autoId = useId();
  const errId = error ? `${autoId}-err` : undefined;
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = isControlled ? (value as string) : inner;

  const commit = (next: string) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const stepBtn =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[#0a0a0b]/30 font-mono text-[#0a0a0b]/70 outline-none transition-colors hover:border-[#0a0a0b] hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white';

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={autoId}
          className="mb-1.5 flex items-baseline font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span aria-hidden className="mr-1.5 text-[#d42b1e]">
            REQ
          </span>
          {label}
        </label>
      )}
      <div className="flex items-stretch gap-1.5">
        <button
          type="button"
          aria-label="Decrease time by one minute"
          disabled={disabled}
          onClick={() => commit(shiftTime(current || '00:00', -1))}
          className={stepBtn}
        >
          <ChevronLeft size={14} aria-hidden className="-rotate-90" />
        </button>
        <div className="relative min-w-0 flex-1">
          <span aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[#d42b1e]">
            &gt;
          </span>
          <input
            id={autoId}
            value={current}
            disabled={disabled}
            placeholder="HH:MM"
            inputMode="numeric"
            maxLength={5}
            aria-describedby={errId}
            aria-invalid={Boolean(error)}
            onChange={(e) => commit(sanitize(e.target.value))}
            onBlur={() => {
              const p = parseTime(current);
              if (p) commit(`${pad(p.h)}:${pad(p.m)}`);
            }}
            className={cx(
              'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-3 text-center font-mono text-[13px] tracking-[0.2em] outline-none transition-colors placeholder:tracking-normal placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
              'focus:ring-1 focus:ring-[#d42b1e]',
              error
                ? 'border-[#d42b1e] focus:border-[#d42b1e]'
                : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
              disabled && 'cursor-not-allowed opacity-40',
            )}
          />
        </div>
        <button
          type="button"
          aria-label="Increase time by one minute"
          disabled={disabled}
          onClick={() => commit(shiftTime(current || '00:00', 1))}
          className={stepBtn}
        >
          <ChevronLeft size={14} aria-hidden className="rotate-90" />
        </button>
      </div>
      {error && (
        <p id={errId} className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          ERR — {error}
        </p>
      )}
    </div>
  );
}

export function TimeInputDemo() {
  const [t, setT] = useState('09:30');
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <TimeInput label="Bell time" value={t} onChange={setT} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        rung at — {t || 'unset'}
      </p>
      <TimeInput label="Sealed hour" error="out of service" defaultValue="25:99" disabled />
    </div>
  );
}
