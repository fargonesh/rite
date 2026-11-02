import type { KeyboardEventHandler, ReactNode } from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface PillsInputCommitProps {
  placeholder?: string;
  onCommit?: (text: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export interface PillsInputProps {
  label?: string;
  error?: string;
  children?: ReactNode;
  inputProps?: PillsInputCommitProps;
  onCommit?: (text: string) => void;
  className?: string;
}

export function PillsInput({ label, error, children, inputProps, onCommit, className }: PillsInputProps) {
  const [draft, setDraft] = useState('');

  const commit = (raw: string): void => {
    const text = raw.trim();
    if (!text) return;
    inputProps?.onCommit?.(text);
    onCommit?.(text);
    setDraft('');
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    inputProps?.onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit(draft);
    }
  };

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {label}
        </p>
      )}
      <div
        className={cx(
          'flex min-h-9 flex-wrap items-center gap-1.5 rounded-[2px] border bg-transparent px-2 py-1.5 outline-none transition-colors focus-within:ring-1 focus-within:ring-[#d42b1e]',
          error
            ? 'border-[#d42b1e] focus-within:border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 focus-within:border-[#0a0a0b] dark:border-white/20 dark:focus-within:border-white/60',
        )}
      >
        {children}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={inputProps?.placeholder}
          aria-invalid={Boolean(error)}
          className="h-6 min-w-24 flex-1 bg-transparent font-mono text-[13px] outline-none placeholder:font-sans placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30"
        />
      </div>
      {error && (
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function PillsInputDemo() {
  const [recipients, setRecipients] = useState<string[]>(['registrar@vesper.io']);

  const add = (text: string): void => {
    const clean = text.replace(/,+$/, '').trim();
    if (!clean || recipients.includes(clean)) return;
    setRecipients((prev) => [...prev, clean]);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PillsInput
        label="Notify list"
        inputProps={{ placeholder: recipients.length ? '' : 'Type an address, press Enter' }}
        onCommit={add}
      >
        {recipients.map((address) => (
          <span
            key={address}
            className="inline-flex h-6 items-center gap-1 rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 px-1.5 font-mono text-[12px] dark:border-white/20 dark:bg-white/5"
          >
            {address}
            <button
              type="button"
              onClick={() => setRecipients((prev) => prev.filter((a) => a !== address))}
              aria-label={`Remove ${address}`}
              className="rounded-[2px] p-0.5 opacity-60 outline-none transition-opacity hover:opacity-100 hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
            >
              <X size={12} aria-hidden />
            </button>
          </span>
        ))}
      </PillsInput>
      <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
        {recipients.length} {recipients.length === 1 ? 'recipient' : 'recipients'} on the list.
      </p>
    </div>
  );
}
