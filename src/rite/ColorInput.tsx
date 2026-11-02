import { useId, useRef, useState } from 'react';
import { Pipette } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ColorInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const CHECKER = 'conic-gradient(#a1a1aa 25%, #ffffff 0 50%, #a1a1aa 0 75%, #ffffff 0)';

function pickerSafe(hex: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#000000';
}

export function ColorInput({
  label,
  description,
  error,
  value,
  defaultValue = '#000000',
  onChange,
  placeholder = '#000000',
  disabled = false,
  className,
  id,
  name,
}: ColorInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const pickerRef = useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value ?? uncontrolled;

  const commit = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onChange?.(next);
  };

  const openPicker = () => {
    if (disabled) return;
    pickerRef.current?.click();
  };

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
      <div className="flex gap-2">
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          aria-label="Open color picker"
          style={{ backgroundImage: CHECKER, backgroundSize: '8px 8px' }}
          className={cx(
            'relative h-9 w-9 shrink-0 overflow-hidden rounded-[2px] border border-[#0a0a0b]/30 dark:border-white/20',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          <span aria-hidden className="absolute inset-0" style={{ backgroundColor: current }} />
        </button>
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[#0a0a0b]/40 dark:text-white/30"
          >
            #
          </span>
          <input
            id={inputId}
            name={name}
            value={current}
            placeholder={placeholder}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
            aria-invalid={Boolean(error)}
            onChange={(e) => commit(e.target.value)}
            className={cx(
              'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-9 font-mono text-[13px] uppercase outline-none transition-colors placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
              'focus:ring-1 focus:ring-[#d42b1e]',
              error
                ? 'border-[#d42b1e] focus:border-[#d42b1e]'
                : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
              disabled && 'cursor-not-allowed opacity-40',
            )}
          />
          <button
            type="button"
            onClick={openPicker}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Open native color picker"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-[2px] p-1.5 text-[#0a0a0b]/50 hover:text-[#0a0a0b] disabled:pointer-events-none dark:text-white/40 dark:hover:text-white"
          >
            <Pipette size={14} aria-hidden />
          </button>
          <input
            ref={pickerRef}
            type="color"
            tabIndex={-1}
            aria-hidden
            value={pickerSafe(current)}
            disabled={disabled}
            onChange={(e) => commit(e.target.value)}
            className="pointer-events-none absolute h-px w-px opacity-0"
          />
        </div>
      </div>
      {description && !error && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          ERR — {error}
        </p>
      )}
    </div>
  );
}

export function ColorInputDemo() {
  const [val, setVal] = useState('#d42b1e');
  return (
    <div className="w-full max-w-xs space-y-4">
      <ColorInput label="Accent" description="Hex color value" value={val} onChange={setVal} />
      <ColorInput label="Invalid" defaultValue="#zzzzzz" error="Use #rrggbb format" />
    </div>
  );
}
