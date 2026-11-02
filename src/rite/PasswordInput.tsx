import type { InputHTMLAttributes } from 'react';
import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  fileNo?: string;
}

export function PasswordInput({ label, description, error, fileNo, id, className, ...rest }: PasswordInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const [visible, setVisible] = useState(false);

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
          {fileNo && <span className="text-[10px] opacity-50">{fileNo}</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          className={cx(
            'h-9 w-full rounded-[2px] border bg-transparent pl-3 pr-16 font-mono text-[13px] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
            'focus:ring-1 focus:ring-[#d42b1e]',
            error
              ? 'border-[#d42b1e] focus:border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
            rest.disabled && 'cursor-not-allowed opacity-40',
          )}
          {...rest}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          disabled={rest.disabled}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 outline-none transition-colors hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40 dark:text-white/40 dark:hover:text-white"
        >
          {visible ? 'hide' : 'show'}
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

export function PasswordInputDemo() {
  return (
    <div className="flex flex-col gap-4">
      <PasswordInput label="Seal phrase" fileNo="F-009" placeholder="Enter the words…" description="Toggle show / hide inside the field." />
      <PasswordInput label="Weak seal" error="ERR — too short to bind" defaultValue="ash" />
    </div>
  );
}
