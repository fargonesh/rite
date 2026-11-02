import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { TriangleAlert } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  fileNo?: string;
}

export function TextInput({ label, description, error, fileNo, id, className, ...rest }: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span>
            <span aria-hidden className="mr-1.5 text-[#d42b1e]">REQ</span>
            {label}
          </span>
          {fileNo && <span className="text-[10px] opacity-50">{fileNo}</span>}
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
          className={cx(
            'h-9 w-full rounded-[2px] border bg-transparent pl-7 pr-3 font-mono text-[13px] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
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
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          <TriangleAlert size={12} strokeWidth={2} aria-hidden />
          omen — {error}
        </p>
      )}
    </div>
  );
}

export function TextInputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextInput label="Witness" placeholder="Name the witness" fileNo="F-001" />
      <TextInput
        label="Ledger"
        placeholder="Case reference"
        description="Filed under the parish ledger, volume nine."
        fileNo="F-002"
      />
      <TextInput label="Confession" placeholder="It was—" error="The record refuses this entry." fileNo="F-003" />
      <TextInput label="Sealed" placeholder="Cannot be opened" disabled fileNo="F-004" />
    </div>
  );
}
