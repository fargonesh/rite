import { useId, useState } from 'react';
import { ChevronDown, TriangleAlert } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type NativeSelectItem = string | { value: string; label: string; disabled?: boolean };

export interface NativeSelectProps {
  label?: string;
  description?: string;
  error?: string;
  data: NativeSelectItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

function norm(data: NativeSelectItem[]): { value: string; label: string; disabled?: boolean }[] {
  return data.map((d) => (typeof d === 'string' ? { value: d, label: d } : d));
}

export function NativeSelect({
  label,
  description,
  error,
  data,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className,
  id,
  name,
}: NativeSelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const items = norm(data);

  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const controlled = value !== undefined;
  const current = controlled ? value : uncontrolled;

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
        <select
          id={inputId}
          name={name}
          disabled={disabled}
          value={current}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            if (!controlled) setUncontrolled(e.target.value);
            onChange?.(e.target.value);
          }}
          className={cx(
            'h-9 w-full appearance-none rounded-[2px] border bg-transparent pl-3 pr-8 font-mono text-[13px] outline-none transition-colors',
            'focus:ring-1 focus:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 dark:border-white/20',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] opacity-60"
        >
          <ChevronDown size={12} strokeWidth={2} />
        </span>
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

export function NativeSelectDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <NativeSelect
        label="Choir"
        description="Native voice, no conjuring."
        data={['soprano', 'alto', 'tenor', 'bass']}
        defaultValue="alto"
      />
      <NativeSelect label="Omen" error="Pick a voice." data={['soprano', 'alto']} defaultValue="soprano" />
    </div>
  );
}
