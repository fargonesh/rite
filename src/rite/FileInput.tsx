import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface FileInputProps {
  label?: string;
  description?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  value?: FileList | null;
  onChange?: (files: FileList | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function fileNames(files: FileList | null): string {
  if (!files || files.length === 0) return '';
  return Array.from(files)
    .map((f) => f.name)
    .join(', ');
}

export function FileInput({
  label,
  description,
  error,
  accept,
  multiple = false,
  value,
  onChange,
  placeholder = 'No file chosen',
  disabled = false,
  className,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internal, setInternal] = useState<FileList | null>(null);
  const files = value !== undefined ? value : internal;
  const display = fileNames(files);

  function handleChange(next: FileList | null) {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click();
  }

  const describedBy = description ? 'fileinput-desc' : undefined;

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] opacity-70">
          {label}
        </label>
      )}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={label ?? 'Choose file'}
        onClick={openPicker}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            openPicker();
          }
        }}
        className={cx(
          'flex h-9 items-stretch overflow-hidden rounded-[2px] border bg-white outline-none transition-colors duration-150 dark:bg-[#0e0f11]',
          error
            ? 'border-[#d42b1e]'
            : 'border-[#0a0a0b]/25 focus-within:border-[#0a0a0b] hover:border-[#0a0a0b]/50 dark:border-white/25 dark:focus-within:border-white dark:hover:border-white/50',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
          disabled && 'cursor-not-allowed opacity-40',
          !disabled && 'cursor-pointer',
        )}
      >
        <span
          className={cx(
            'flex min-w-0 flex-1 items-center truncate px-3 font-mono text-[11px] tracking-wide',
            display ? 'text-[#0a0a0b] dark:text-[#e9e7e2]' : 'opacity-50',
          )}
        >
          {display || placeholder}
        </span>
        <span
          aria-hidden
          className="flex shrink-0 items-center border-l border-[#0a0a0b]/15 bg-[#0a0a0b]/5 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] dark:border-white/15 dark:bg-white/5"
        >
          Browse
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        aria-describedby={describedBy}
        onChange={(e) => {
          handleChange(e.target.files);
          e.target.value = '';
        }}
      />
      {description && !error && (
        <p id="fileinput-desc" className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-50">
          {description}
        </p>
      )}
      {error && (
        <p role="alert" className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#d42b1e] dark:text-[#ff6b5e]">
          <X size={12} strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function FileInputDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <FileInput label="Exhibit" description="PDF or image, one file" placeholder="Select exhibit…" />
      <FileInput label="Rejected" error="File required for filing" placeholder="Select exhibit…" />
      <FileInput label="Locked" disabled placeholder="Select exhibit…" />
    </div>
  );
}
