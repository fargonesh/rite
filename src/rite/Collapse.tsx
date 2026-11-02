import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface CollapseProps {
  in: boolean;
  children: ReactNode;
  className?: string;
}

export function Collapse({ in: inProp, children, className }: CollapseProps) {
  return (
    <div
      aria-hidden={!inProp}
      className={cx(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
        inProp ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className,
      )}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function CollapseDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">in=true — expanded dossier</p>
      <Collapse in>
        <div className="rounded-[2px] border border-[#0a0a0b]/20 bg-white p-3.5 text-[13px] leading-5 text-[#0a0a0b]/85 dark:border-white/15 dark:bg-[#0e0f11] dark:text-white/85">
          The north line holds at dawn. Witnesses posted, ledger open — file the crossing before the fog lifts.
        </div>
      </Collapse>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">in=false — sealed (empty)</p>
      <Collapse in={false}>
        <div className="p-3.5 text-[13px]">You should not see this.</div>
      </Collapse>
    </div>
  );
}
