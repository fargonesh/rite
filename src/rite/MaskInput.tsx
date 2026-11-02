import { useId, useState, type InputHTMLAttributes } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MaskInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  mask: string;
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (displayed: string) => void;
}

function applyMask(mask: string, raw: string): string {
  const chars = raw.replace(/[^A-Za-z0-9]/g, '').split('');
  let ci = 0;
  let out = '';
  for (const m of mask) {
    if (m === '_') {
      out += ci < chars.length ? chars[ci] : '_';
      ci += 1;
    } else {
      out += m;
    }
  }
  return out;
}

export function MaskInput({
  mask,
  label,
  description,
  error,
  value,
  defaultValue = '',
  onChange,
  id,
  className,
  ...rest
}: MaskInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const [inner, setInner] = useState(() => applyMask(mask, defaultValue));
  const displayed = value !== undefined ? applyMask(mask, value) : inner;

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
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[#d42b1e]"
        >
          &gt;
        </span>
        <input
          id={inputId}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          value={displayed}
          onChange={(e) => {
            const next = applyMask(mask, e.target.value);
            if (value === undefined) setInner(next);
            onChange?.(next);
          }}
          className={cx(
            'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-3 font-mono text-[13px] tracking-[0.08em] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
            'focus:ring-1 focus:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e] focus:border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
            rest.disabled && 'cursor-not-allowed opacity-40',
          )}
          {...rest}
        />
      </div>
      {description && !error && (
        <p id={descId} className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {error && (
        <p
          id={errId}
          className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]"
        >
          <AlertTriangle size={12} aria-hidden />
          <span>omen — {error}</span>
        </p>
      )}
    </div>
  );
}

export function MaskInputDemo() {
  return (
    <div className="w-full max-w-xs">
      <MaskInput label="Case ref" mask="__-__" description="Two slots, dash, two slots." placeholder="__-__" />
    </div>
  );
}
