import type { TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { cx } from '../lib/cx.ts';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  fileNo?: string;
  rows?: number;
}

export function Textarea({ label, description, error, fileNo, id, rows = 4, className, ...rest }: TextareaProps) {
  const autoId = useId();
  const areaId = id ?? autoId;
  const descId = description ? `${areaId}-desc` : undefined;
  const errId = error ? `${areaId}-err` : undefined;

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={areaId}
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
      <textarea
        id={areaId}
        rows={rows}
        aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
        aria-invalid={Boolean(error)}
        className={cx(
          'w-full resize-y rounded-[2px] border bg-transparent px-3 py-2 font-mono text-[13px] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30',
          'focus:ring-1 focus:ring-[#d42b1e]',
          error
            ? 'border-[#d42b1e] focus:border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
          rest.disabled && 'cursor-not-allowed opacity-40',
        )}
        {...rest}
      />
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

export function TextareaDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea label="Epitaph" fileNo="F-014" placeholder="Carve the record…" description="Fixed rows=4. Set rows to resize the rite." />
      <Textarea label="Omen log" error="ERR — the page rejects silence" defaultValue="" placeholder="Confess…" />
      <Textarea label="Dormant" disabled defaultValue="Sealed by the house." />
    </div>
  );
}
