import { Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TimeValueProps {
  value: string | Date;
  format?: '12h' | '24h';
  className?: string;
}

function toDate(value: string | Date): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  const s = m[3] ? Number(m[3]) : 0;
  if (h > 23 || min > 59 || s > 59) return null;
  return new Date(2000, 0, 1, h, min, s);
}

export function TimeValue({ value, format = '24h', className }: TimeValueProps) {
  const date = toDate(value);
  const text =
    date === null
      ? '--:--'
      : new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: format === '12h' }).format(date);
  const iso = date === null ? undefined : `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <span className={cx('inline-flex items-center gap-1.5 font-mono text-[13px] text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <Clock aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#d42b1e]" />
      <time dateTime={iso}>{text}</time>
    </span>
  );
}

export function TimeValueDemo() {
  return (
    <div className="flex flex-col gap-2">
      <TimeValue value="09:30" />
      <TimeValue value="14:45" format="12h" />
      <TimeValue value={new Date(2026, 10, 2, 23, 15)} />
      <TimeValue value={new Date(2026, 10, 2, 23, 15)} format="12h" />
      <TimeValue value="not-a-time" />
    </div>
  );
}
