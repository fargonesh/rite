import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface NumberInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

function clamp(n: number, min?: number, max?: number): number {
  if (min !== undefined && n < min) return min;
  if (max !== undefined && n > max) return max;
  return n;
}

export function NumberInput({
  label,
  description,
  error,
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  id,
  name,
  className,
}: NumberInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = isControlled ? (value as number) : inner;

  const commit = (next: number) => {
    const clamped = clamp(next, min, max);
    if (!isControlled) setInner(clamped);
    onChange?.(clamped);
  };

  const stepBtn =
    'flex h-9 w-9 shrink-0 items-center justify-center border font-mono text-sm outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40 border-[#0a0a0b]/30 text-[#0a0a0b]/70 hover:border-[#0a0a0b] hover:text-[#0a0a0b] dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white';

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span>
            <span aria-hidden className="mr-1.5 text-[#d42b1e]">
              REQ
            </span>
            {label}
          </span>
        </label>
      )}
      <div className="flex items-stretch gap-1.5">
        <button
          type="button"
          aria-label="Decrement"
          disabled={disabled || (min !== undefined && current <= min)}
          onClick={() => commit(current - step)}
          className={cx(stepBtn, 'rounded-[2px]')}
        >
          <Minus size={14} strokeWidth={2} aria-hidden />
        </button>
        <input
          id={inputId}
          name={name}
          type="number"
          value={Number.isNaN(current) ? '' : current}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            const next = e.target.value === '' ? (min ?? 0) : Number(e.target.value);
            if (!Number.isNaN(next)) commit(next);
          }}
          className={cx(
            'h-9 w-full min-w-0 rounded-[2px] border bg-transparent px-3 text-center font-mono text-[13px] outline-none transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            'focus:ring-1 focus:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e] focus:border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        />
        <button
          type="button"
          aria-label="Increment"
          disabled={disabled || (max !== undefined && current >= max)}
          onClick={() => commit(current + step)}
          className={cx(stepBtn, 'rounded-[2px]')}
        >
          <Plus size={14} strokeWidth={2} aria-hidden />
        </button>
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

export function NumberInputDemo() {
  const [candles, setCandles] = useState(3);
  return (
    <div className="flex flex-col gap-4">
      <NumberInput label="Candles" value={candles} onChange={setCandles} min={0} max={13} step={1} description="Controlled. Clamped 0–13." />
      <NumberInput label="Uncontrolled toll" defaultValue={7} min={1} max={99} />
      <NumberInput label="Severed count" error="ERR — out of bounds" defaultValue={99} disabled />
    </div>
  );
}
