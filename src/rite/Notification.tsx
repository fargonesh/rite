import type { HTMLAttributes, ReactNode } from 'react';
import { Circle, Sparkles, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type NotificationTone = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
  tone?: NotificationTone;
  onClose?: () => void;
  /** Accepted for API parity — VESPER notifications are manual-close only, no timers. */
  autoClose?: number | false;
}

const toneLabel: Record<NotificationTone, string> = {
  info: 'NOTICE',
  success: 'CONFIRMED',
  warning: 'OMEN',
  danger: 'BREACH',
};

const toneIcon: Record<NotificationTone, typeof Circle> = {
  info: Circle,
  success: Sparkles,
  warning: TriangleAlert,
  danger: X,
};

const toneBar: Record<NotificationTone, string> = {
  info: 'bg-[#0a0a0b] dark:bg-white/60',
  success: 'bg-[#1d3a2a] dark:bg-emerald-400/70',
  warning: 'bg-[#4a3a12] dark:bg-amber-400/70',
  danger: 'bg-[#d42b1e]',
};

const toneBorder: Record<NotificationTone, string> = {
  info: 'border-[#0a0a0b]/20 dark:border-white/15',
  success: 'border-[#1d3a2a]/40 dark:border-emerald-400/30',
  warning: 'border-[#4a3a12]/40 dark:border-amber-400/30',
  danger: 'border-[#d42b1e] dark:border-[#d42b1e]',
};

export function Notification({
  title,
  children,
  tone = 'info',
  onClose,
  autoClose: _autoClose,
  className,
  ...rest
}: NotificationProps) {
  void _autoClose;
  const Icon = toneIcon[tone];
  return (
    <div
      role="status"
      className={cx(
        'relative flex w-80 max-w-full overflow-hidden rounded-[2px] border bg-white dark:bg-[#0e0f11]',
        toneBorder[tone],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={cx('w-1 shrink-0', toneBar[tone])} />
      <div className="min-w-0 flex-1 p-3.5">
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
            <Icon size={12} strokeWidth={2} aria-hidden />
            {toneLabel[tone]}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="rounded-[2px] font-mono text-[11px] leading-none opacity-60 outline-none transition-colors hover:opacity-100 focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
            >
              <X size={12} strokeWidth={2} aria-hidden />
            </button>
          )}
        </div>
        {title && (
          <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#0a0a0b] dark:text-[#e9e7e2]">
            {title}
          </p>
        )}
        <div className="mt-1 text-[13px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">
          {children}
        </div>
      </div>
    </div>
  );
}

export function NotificationDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Notification title="Dossier filed" tone="success" onClose={() => undefined}>
        Exhibit 12 archived under seal. No further action required.
      </Notification>
      <Notification title="Margin thinning" tone="warning">
        Ink reserves below threshold. Requisition advised before dusk.
      </Notification>
      <Notification title="Seal broken" tone="danger" onClose={() => undefined}>
        Vault integrity compromised. Quarantine the east wing at once.
      </Notification>
    </div>
  );
}
