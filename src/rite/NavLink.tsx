import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface NavLinkProps {
  label: string;
  description?: string;
  href?: string;
  active?: boolean;
  onClick?: MouseEventHandler;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
}

export function NavLink({ label, description, href, active = false, onClick, leftSection, rightSection, className }: NavLinkProps) {
  const inner = (
    <>
      <span
        aria-hidden
        className={cx(
          'absolute inset-y-0 left-0 w-[2px] transition-colors',
          active ? 'bg-[#d42b1e]' : 'bg-transparent',
        )}
      />
      {leftSection && <span aria-hidden className="flex shrink-0 items-center">{leftSection}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono text-[12px] font-medium uppercase tracking-[0.14em]">
          {label}
        </span>
        {description && (
          <span
            className={cx(
              'mt-0.5 block truncate font-mono text-[11px] normal-case tracking-normal',
              active ? 'text-[#e9e7e2]/60 dark:text-black/60' : 'text-[#0a0a0b]/45 dark:text-white/40',
            )}
          >
            {description}
          </span>
        )}
      </span>
      {rightSection && <span aria-hidden className="flex shrink-0 items-center">{rightSection}</span>}
    </>
  );
  const styles = cx(
    'relative flex w-full items-center gap-2.5 rounded-[2px] border px-3 py-2 text-left outline-none transition-colors',
    'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
    active
      ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
      : 'border-transparent text-[#0a0a0b]/75 hover:border-[#0a0a0b]/20 hover:bg-[#0a0a0b]/5 dark:text-white/70 dark:hover:border-white/15 dark:hover:bg-white/5',
    className,
  );
  if (href) {
    return (
      <a href={href} aria-current={active ? 'page' : undefined} onClick={onClick} className={styles}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" aria-current={active ? 'page' : undefined} onClick={onClick} className={styles}>
      {inner}
    </button>
  );
}

export function NavLinkDemo() {
  return (
    <nav aria-label="Dossier" className="w-full max-w-xs space-y-1">
      <NavLink label="Overview" description="Case summary" active />
      <NavLink label="Evidence" description="14 exhibits filed" href="#" />
      <NavLink label="Night log" description="Entries 01 to 12" href="#" />
    </nav>
  );
}
