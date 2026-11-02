import type { HTMLAttributes } from 'react';
import { Circle, Sparkles, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title?: string;
}

const toneStyles: Record<AlertTone, string> = {
  info: 'border-[#0a0a0b]/20 dark:border-white/15',
  success: 'border-[#1d3a2a]/40 dark:border-emerald-400/30',
  warning: 'border-[#4a3a12]/40 dark:border-amber-400/30',
  danger: 'border-[#d42b1e] dark:border-[#d42b1e]',
};

const toneLabel: Record<AlertTone, string> = {
  info: 'DIRECTIVE',
  success: 'CONFIRMED',
  warning: 'OMEN',
  danger: 'BREACH',
};

const toneIcon: Record<AlertTone, typeof Circle> = {
  info: Circle,
  success: Sparkles,
  warning: TriangleAlert,
  danger: X,
};

export function Alert({ tone = 'info', title, className, children, ...rest }: AlertProps) {
  const Icon = toneIcon[tone];
  return (
    <div
      role="alert"
      className={cx(
        'relative rounded-[2px] border border-l-2 bg-white pl-4 dark:bg-[#0e0f11]',
        tone === 'danger' ? 'border-l-[#d42b1e]' : 'border-l-[#0a0a0b] dark:border-l-white/60',
        toneStyles[tone],
        'p-3.5 text-[13px] leading-5',
        className,
      )}
      {...rest}
    >
      <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
        <Icon size={12} strokeWidth={2} aria-hidden />
        {toneLabel[tone]}
        {title ? <span className="ml-2 normal-case tracking-normal opacity-100">— {title}</span> : null}
      </p>
      <div className="mt-1 text-[#0a0a0b]/85 dark:text-white/85">{children}</div>
    </div>
  );
}

export function AlertDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert tone="info" title="Curfew at dusk">
        All vessels return to harbor before the bell.
      </Alert>
      <Alert tone="success" title="Ledger balanced">
        Twelve names accounted for and witnessed.
      </Alert>
      <Alert tone="warning" title="Fog incoming">
        Visibility fails past the second marker.
      </Alert>
      <Alert tone="danger" title="Breach confirmed">
        The thirteenth name is still writing itself.
      </Alert>
    </div>
  );
}
