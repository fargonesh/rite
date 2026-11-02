import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function Breadcrumbs({ items, separator, ariaLabel = 'Breadcrumb', className }: BreadcrumbsProps) {
  const sep = separator ?? <ChevronRight size={12} aria-hidden className="shrink-0 opacity-40" />;
  return (
    <nav aria-label={ariaLabel} className={cx('min-w-0', className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <span aria-hidden className="flex items-center">{sep}</span>}
              {last || !item.href ? (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cx(
                    'truncate',
                    last
                      ? 'text-[#0a0a0b] dark:text-[#e9e7e2]'
                      : 'text-[#0a0a0b]/50 dark:text-white/40',
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="truncate text-[#0a0a0b]/50 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/40 dark:hover:text-[#ff6b5e]"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BreadcrumbsDemo() {
  return (
    <div className="max-w-md space-y-3">
      <Breadcrumbs
        items={[
          { label: 'Archive', href: '#' },
          { label: 'Dossiers', href: '#' },
          { label: 'Vesper-09' },
        ]}
      />
      <Breadcrumbs
        separator={<span aria-hidden className="opacity-40">/</span>}
        items={[
          { label: 'Index', href: '#' },
          { label: 'Night', href: '#' },
          { label: 'Entry-12' },
        ]}
      />
    </div>
  );
}
