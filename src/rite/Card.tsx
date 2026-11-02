import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

/**
 * Dossier card — sharp, hairlined, witnessed.
 * Corner ticks (+) make every card feel surveyed.
 */
export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'mesh-card relative rounded-[3px] border border-[#0a0a0b]/20 shadow-[0_1px_0_rgba(10,10,11,0.08)]',
        'dark:border-white/15 dark:shadow-none',
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="tick absolute -top-2 left-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="tick absolute -top-2 right-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="tick absolute -bottom-2.5 left-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="tick absolute -bottom-2.5 right-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('border-b border-dashed border-[#0a0a0b]/15 px-4 py-3 dark:border-white/10', className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('px-4 py-4', className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('border-t border-[#0a0a0b]/10 px-4 py-3 dark:border-white/10', className)}>{children}</div>
  );
}

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          Dossier 047 — Vessel
        </p>
      </CardHeader>
      <CardBody>
        <p className="text-[13px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">
          Recovered manifest lists thirteen names. Twelve accounted for. The thirteenth is still writing.
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-[2px] border border-[#0a0a0b] bg-[#0a0a0b] px-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black"
          >
            Confirm
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-[2px] border border-[#0a0a0b]/25 bg-transparent px-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2]"
          >
            Defer
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
