import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

type PageToken = number | 'ellipsis-start' | 'ellipsis-end';

function range(page: number, total: number, siblings: number): PageToken[] {
  if (total <= 1) return [1];
  const s = Math.max(0, siblings);
  const start = Math.max(2, page - s);
  const end = Math.min(total - 1, page + s);
  const tokens: PageToken[] = [1];
  if (start > 2) tokens.push('ellipsis-start');
  for (let p = start; p <= end; p += 1) tokens.push(p);
  if (end < total - 1) tokens.push('ellipsis-end');
  tokens.push(total);
  return tokens;
}

export function Pagination({ page, total, onChange, siblings = 1, className }: PaginationProps) {
  const safePage = Math.min(Math.max(1, page), Math.max(1, total));
  const tokens = range(safePage, Math.max(1, total), siblings);
  const btn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-[2px] border px-2 font-mono text-[11px] tracking-[0.12em] transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav aria-label="Pagination" className={cx('flex items-center gap-1', className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={safePage <= 1}
        onClick={() => onChange(safePage - 1)}
        className={cx(btn, 'border-[#0a0a0b]/25 text-[#0a0a0b] hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white')}
      >
        <ArrowLeft size={12} strokeWidth={2} aria-hidden />
      </button>
      {tokens.map((t) =>
        typeof t !== 'number' ? (
          <span key={t} aria-hidden className="px-1 font-mono text-[11px] text-[#0a0a0b]/40 dark:text-white/40">
            …
          </span>
        ) : t === safePage ? (
          <button
            key={t}
            type="button"
            aria-current="page"
            aria-label={`Page ${t}`}
            onClick={() => onChange(t)}
            className={cx(btn, 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black')}
          >
            {t}
          </button>
        ) : (
          <button
            key={t}
            type="button"
            aria-label={`Go to page ${t}`}
            onClick={() => onChange(t)}
            className={cx(btn, 'border-[#0a0a0b]/25 text-[#0a0a0b] hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white')}
          >
            {t}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={safePage >= total}
        onClick={() => onChange(safePage + 1)}
        className={cx(btn, 'border-[#0a0a0b]/25 text-[#0a0a0b] hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white')}
      >
        <ArrowRight size={12} strokeWidth={2} aria-hidden />
      </button>
    </nav>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(4);
  return (
    <div className="flex flex-col gap-3">
      <Pagination page={page} total={9} onChange={setPage} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Page {page} of 9
      </p>
    </div>
  );
}
