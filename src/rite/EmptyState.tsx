import type { HTMLAttributes, ReactNode } from 'react';
import { CircleDashed } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = <CircleDashed size={20} strokeWidth={2} aria-hidden />, title, description, action, className, children, ...rest }: EmptyStateProps) {
  return (
    <div
      className={cx(
        'flex w-full flex-col items-center rounded-[2px] border border-dashed border-[#0a0a0b]/25 px-6 py-10 text-center',
        'dark:border-white/20',
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="font-mono text-[20px] leading-none text-[#0a0a0b]/40 dark:text-white/30">
        {icon}
      </span>
      <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#0a0a0b] dark:text-[#e9e7e2]">
        {title}
      </p>
      {description && (
        <p className="mt-1.5 max-w-xs font-mono text-[11px] leading-relaxed text-[#0a0a0b]/55 dark:text-white/45">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
      {children}
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="NO RECORDS FOUND"
      description="No entries match this filter. Clear the query or file a new record."
      action={
        <button
          type="button"
          className="rounded-[2px] border border-[#0a0a0b]/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b] transition-colors hover:border-[#d42b1e] hover:text-[#d42b1e] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]"
        >
          Clear filter
        </button>
      }
    />
  );
}
