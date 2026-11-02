import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface AppShellProps {
  header?: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Responsive app frame — sticky hairline header, fixed-width
 * navbar/aside columns that collapse below lg, main content area.
 */
export function AppShell({ header, navbar, aside, footer, children, className }: AppShellProps) {
  return (
    <div
      className={cx(
        'flex min-h-[360px] flex-col overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/15',
        className,
      )}
    >
      {header && (
        <header className="sticky top-0 z-30 border-b border-[#0a0a0b]/15 bg-[#e9e7e2] dark:border-white/15 dark:bg-[#08090b]">
          {header}
        </header>
      )}
      <div className="flex min-h-0 flex-1">
        {navbar && (
          <nav
            aria-label="Primary"
            className="hidden w-52 shrink-0 border-r border-[#0a0a0b]/15 dark:border-white/15 lg:block"
          >
            {navbar}
          </nav>
        )}
        <main className="min-w-0 flex-1">{children}</main>
        {aside && (
          <aside
            aria-label="Complementary"
            className="hidden w-60 shrink-0 border-l border-[#0a0a0b]/15 dark:border-white/15 lg:block"
          >
            {aside}
          </aside>
        )}
      </div>
      {footer && (
        <footer className="border-t border-[#0a0a0b]/15 dark:border-white/15">{footer}</footer>
      )}
    </div>
  );
}

const micro = 'font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40';

export function AppShellDemo() {
  return (
    <AppShell
      header={
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className={micro}>Vesper — Field Manual</span>
          <span className={micro}>Rev. 06</span>
        </div>
      }
      navbar={
        <div className="space-y-1 p-3">
          {['Dossier', 'Survey', 'Witnesses'].map((item) => (
            <div
              key={item}
              className="rounded-[2px] border border-transparent px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 first:border-[#0a0a0b]/15 first:bg-[#0a0a0b]/5 dark:text-white/60 dark:first:border-white/15 dark:first:bg-white/5"
            >
              {item}
            </div>
          ))}
        </div>
      }
      aside={
        <div className="p-3">
          <p className={micro}>Margin notes</p>
          <p className="mt-2 text-[12px] leading-5 text-[#0a0a0b]/70 dark:text-white/60">
            Collapses below lg. Header sticks, footer holds the line.
          </p>
        </div>
      }
      footer={
        <div className="flex items-center justify-between px-4 py-2">
          <span className={micro}>Footer — witnessed</span>
          <span className={micro}>p. 01</span>
        </div>
      }
    >
      <div className="p-4">
        <p className={micro}>Main content</p>
        <p className="mt-2 max-w-md text-[13px] leading-6 text-[#0a0a0b]/80 dark:text-white/80">
          Resize below lg and the navbar / aside columns fold away, leaving header, main and
          footer in a single surveyed column.
        </p>
      </div>
    </AppShell>
  );
}
