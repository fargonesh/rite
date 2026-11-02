import { useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface PillProps {
  children: ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Pill({ children, onRemove, disabled = false, className }: PillProps) {
  return (
    <span
      className={cx(
        'inline-flex max-w-full items-center gap-1.5 rounded-[2px] bg-[#0a0a0b]/8 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]',
        disabled && 'opacity-40',
        className,
      )}
    >
      <span className="truncate">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          className="flex items-center rounded-[1px] p-0.5 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed dark:hover:text-[#ff6b5e]"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}

export function PillDemo() {
  const [tags, setTags] = useState<string[]>(['vesper', 'dossier', 'omen']);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((t) => (
        <Pill key={t} onRemove={() => setTags((prev) => prev.filter((p) => p !== t))}>
          {t}
        </Pill>
      ))}
      <Pill>sealed</Pill>
      <Pill disabled>locked</Pill>
    </div>
  );
}
