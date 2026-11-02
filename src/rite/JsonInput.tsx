import { useId, useState, type TextareaHTMLAttributes } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface JsonInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange'> {
  label?: string;
  description?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

function validateJson(raw: string): string | null {
  if (!raw.trim()) return null;
  try {
    JSON.parse(raw);
    return null;
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'invalid JSON';
    const pos = /position (\d+)/i.exec(msg)?.[1];
    if (pos !== undefined) {
      const line = raw.slice(0, Number(pos)).split('\n').length;
      return `invalid JSON — line ${line}: ${msg.split('\n')[0]}`;
    }
    return `invalid JSON — ${msg.split('\n')[0]}`;
  }
}

export function JsonInput({
  label,
  description,
  value,
  defaultValue = '',
  onChange,
  rows = 6,
  id,
  className,
  ...rest
}: JsonInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const errId = `${inputId}-err`;
  const validationError = validateJson(current);

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
      <textarea
        id={inputId}
        rows={rows}
        value={current}
        spellCheck={false}
        aria-describedby={[descId, validationError ? errId : undefined].filter(Boolean).join(' ') || undefined}
        aria-invalid={Boolean(validationError)}
        onChange={(e) => {
          if (value === undefined) setInner(e.target.value);
          onChange?.(e.target.value);
        }}
        className={cx(
          'w-full rounded-[2px] border bg-transparent px-3 py-2 font-mono text-[13px] leading-relaxed outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
          'focus:ring-1 focus:ring-[#d42b1e]',
          validationError
            ? 'border-[#d42b1e] focus:border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
          rest.disabled && 'cursor-not-allowed opacity-40',
        )}
        {...rest}
      />
      {description && !validationError && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {validationError && (
        <p
          id={errId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]"
        >
          <AlertTriangle size={12} aria-hidden />
          <span>{validationError}</span>
        </p>
      )}
    </div>
  );
}

export function JsonInputDemo() {
  return (
    <div className="w-full max-w-sm">
      <JsonInput label="Payload" description="Must parse as JSON." defaultValue={'{\n  "file": "VES-001"\n}'} rows={5} />
    </div>
  );
}
