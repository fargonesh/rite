import { cx } from '../lib/cx.ts';

export interface TableOfContentsItem {
  id: string;
  label: string;
  depth?: number;
}

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeId?: string;
  className?: string;
}

/**
 * List of headings with hairline rail; active gets the blood edge.
 */
export function TableOfContents({ items, activeId, className }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Table of contents"
      className={cx('rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10', className)}
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/40">
        Contents / {String(items.length).padStart(2, '0')}
      </p>
      <ol className="border-l border-[#0a0a0b]/15 dark:border-white/10">
        {items.map((item) => {
          const active = item.id === activeId;
          const depth = Math.min(Math.max(item.depth ?? 1, 1), 4);
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? 'true' : undefined}
                style={{ paddingLeft: `${(depth - 1) * 12 + 12}px` }}
                className={cx(
                  'block border-l-2 py-1.5 pr-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors',
                  active
                    ? '-ml-px border-[#d42b1e] text-[#0a0a0b] dark:text-[#e9e7e2]'
                    : '-ml-px border-transparent text-[#0a0a0b]/50 hover:border-[#0a0a0b]/30 hover:text-[#0a0a0b] dark:text-white/40 dark:hover:border-white/30 dark:hover:text-white',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function TableOfContentsDemo() {
  return (
    <TableOfContents
      activeId="methods"
      items={[
        { id: 'overview', label: 'Overview', depth: 1 },
        { id: 'survey', label: 'Survey protocol', depth: 1 },
        { id: 'methods', label: 'Methods', depth: 2 },
        { id: 'chain', label: 'Chain of custody', depth: 2 },
        { id: 'appendix', label: 'Appendix', depth: 1 },
      ]}
    />
  );
}
