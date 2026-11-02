import { useEffect, useState } from 'react';
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger';

export interface NoticeItem {
  id: number;
  title?: string;
  message?: string;
  tone: NoticeTone;
}

export interface ShowNoticeOptions {
  title?: string;
  message?: string;
  tone?: NoticeTone;
}

type Listener = () => void;

let nextId = 1;
let items: NoticeItem[] = [];
const listeners = new Set<Listener>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot(): NoticeItem[] {
  return items;
}

export const notifications = {
  show(options: ShowNoticeOptions = {}): number {
    const id = nextId++;
    items = [...items, { id, title: options.title, message: options.message, tone: options.tone ?? 'info' }];
    emit();
    return id;
  },
  hide(id: number): void {
    items = items.filter((notice) => notice.id !== id);
    emit();
  },
  clear(): void {
    items = [];
    emit();
  },
};

const toneIcon: Record<NoticeTone, typeof Info> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
};

const toneLabel: Record<NoticeTone, string> = {
  info: 'Directive',
  success: 'Confirmed',
  warning: 'Omen',
  danger: 'Breach',
};

const toneBorder: Record<NoticeTone, string> = {
  info: 'border-[#0a0a0b]/20 dark:border-white/15',
  success: 'border-[#1d3a2a]/40 dark:border-emerald-400/30',
  warning: 'border-[#4a3a12]/40 dark:border-amber-400/30',
  danger: 'border-[#d42b1e] dark:border-[#d42b1e]',
};

export interface NotificationsProps {
  className?: string;
}

export function Notifications({ className }: NotificationsProps) {
  const [notices, setNotices] = useState<NoticeItem[]>(snapshot);

  useEffect(() => subscribe(() => setNotices(snapshot())), []);

  return (
    <div
      aria-live="polite"
      className={cx('fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2', className)}
    >
      {notices.map((notice) => {
        const Icon = toneIcon[notice.tone];
        return (
          <div
            key={notice.id}
            role="status"
            className={cx(
              'relative flex overflow-hidden rounded-[2px] border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:bg-[#0e0f11]',
              toneBorder[notice.tone],
            )}
          >
            <div className="flex w-8 shrink-0 items-start justify-center border-r border-dashed border-[#0a0a0b]/15 pt-3 dark:border-white/10">
              <Icon
                size={14}
                aria-hidden
                className={notice.tone === 'danger' ? 'text-[#d42b1e]' : 'opacity-70'}
              />
            </div>
            <div className="min-w-0 flex-1 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
                  {toneLabel[notice.tone]}
                </p>
                <button
                  type="button"
                  onClick={() => notifications.hide(notice.id)}
                  aria-label="Dismiss notification"
                  className="rounded-[2px] p-0.5 opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
                >
                  <X size={12} aria-hidden />
                </button>
              </div>
              {notice.title && (
                <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
                  {notice.title}
                </p>
              )}
              {notice.message && (
                <p className="mt-1 text-[13px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">
                  {notice.message}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NotificationsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            notifications.show({
              title: 'Filed under seal',
              message: 'Exhibit 12 archived. No further action required.',
              tone: 'success',
            })
          }
          className="h-8 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black"
        >
          File success
        </button>
        <button
          type="button"
          onClick={() =>
            notifications.show({
              title: 'Seal broken',
              message: 'Vault integrity compromised. Quarantine the east wing.',
              tone: 'danger',
            })
          }
          className="h-8 rounded-[2px] bg-[#d42b1e] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
        >
          Raise breach
        </button>
        <button
          type="button"
          onClick={() => notifications.clear()}
          className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
        >
          Clear
        </button>
      </div>
      <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
        Notices land in the fixed bottom-right stack. Dismiss each with its close control.
      </p>
      <Notifications />
    </div>
  );
}
