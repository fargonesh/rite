import { useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface SpoilerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  maxHeight?: number;
  showLabel?: string;
  hideLabel?: string;
  children: ReactNode;
}

export function Spoiler({
  maxHeight = 120,
  showLabel = 'Show more',
  hideLabel = 'Show less',
  children,
  className,
  ...rest
}: SpoilerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cx(className)} {...rest}>
      <div className="relative">
        <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open ? 2000 : maxHeight }}>
          {children}
        </div>
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-[#0a0a0b]"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center gap-2 rounded-[2px] border border-[#0a0a0b]/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/70 transition-colors hover:border-[#0a0a0b]/40 hover:text-[#0a0a0b] dark:border-white/15 dark:text-white/60 dark:hover:border-white/30 dark:hover:text-white"
      >
        <span aria-hidden>{open ? '−' : '+'}</span>
        {open ? hideLabel : showLabel}
      </button>
    </div>
  );
}

export function SpoilerDemo() {
  return (
    <Spoiler maxHeight={72}>
      <p className="text-sm leading-6 text-[#0a0a0b]/80 dark:text-white/70">
        Field report 1147 — the annex archive spans four sublevels of surveyed stacks. Each folio is
        witnessed, stamped, and cross-indexed against the master ledger before release. Redactions
        apply only where the record is sealed by order. Consult the on-duty registrar for sealed
        items; all other holdings circulate under standard survey protocol with hairline audit
        trails attached to every checkout event.
      </p>
      <p className="mt-2 text-sm leading-6 text-[#0a0a0b]/80 dark:text-white/70">
        Retention schedule follows the cold-storage rotation. Fragile media are duplicated before
        handling, and no original leaves the reading room without a signed chit.
      </p>
    </Spoiler>
  );
}
