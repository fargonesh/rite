import { Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface DayViewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface DayViewProps {
  events: DayViewEvent[];
  date?: Date;
  className?: string;
}

const HOUR_PX = 48;
const HOURS = Array.from({ length: 24 }, (_, h) => h);

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toFraction(d: Date): number {
  return d.getHours() + d.getMinutes() / 60;
}

export function DayView({ events, date, className }: DayViewProps) {
  const active = date ?? new Date();
  const dayEvents = events.filter((e) => sameDay(e.start, active));
  const now = new Date();
  const isToday = sameDay(active, now);
  const nowTop = toFraction(now) * HOUR_PX;

  return (
    <div className={cx('overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-[#0d0e11]', className)}>
      <div className="flex items-center gap-2 border-b border-[#0a0a0b]/10 px-3 py-2 dark:border-white/10">
        <Clock className="h-3.5 w-3.5 text-[#0a0a0b]/50 dark:text-white/50" aria-hidden />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          {active.getFullYear()}-{pad(active.getMonth() + 1)}-{pad(active.getDate())}
        </p>
      </div>
      <div className="relative">
        {HOURS.map((h) => (
          <div key={h} className="flex border-b border-[#0a0a0b]/10 last:border-b-0 dark:border-white/10" style={{ height: HOUR_PX }}>
            <span className="w-12 shrink-0 border-r border-[#0a0a0b]/10 px-2 pt-1 text-right font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/50 dark:border-white/10 dark:text-white/50">
              {pad(h)}
            </span>
            <span className="flex-1" />
          </div>
        ))}
        {dayEvents.map((e) => {
          const top = toFraction(e.start) * HOUR_PX;
          const height = Math.max(20, (e.end.getTime() - e.start.getTime()) / 3600000 * HOUR_PX);
          return (
            <div
              key={e.id}
              className="absolute right-2 left-14 overflow-hidden rounded-[2px] bg-[#0a0a0b] px-2 py-1 dark:bg-[#e9e7e2]"
              style={{ top, height }}
            >
              <p className="truncate text-xs font-medium text-[#e9e7e2] dark:text-black">{e.title}</p>
              <p className="font-mono text-[10px] tracking-[0.12em] text-[#e9e7e2]/70 dark:text-black/60">
                {fmtTime(e.start)}-{fmtTime(e.end)}
              </p>
            </div>
          );
        })}
        {isToday && (
          <div className="pointer-events-none absolute right-0 left-12" style={{ top: nowTop }} aria-hidden>
            <div className="h-px bg-[#d42b1e]" />
            <span className="absolute top-0 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#d42b1e]" />
          </div>
        )}
      </div>
    </div>
  );
}

export function DayViewDemo() {
  const now = new Date();
  const at = (h: number, m = 0) => new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  return (
    <div className="max-h-96 overflow-auto rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
      <DayView
        events={[
          { id: 'd1', title: 'Standup', start: at(9), end: at(9, 30) },
          { id: 'd2', title: 'Deep work', start: at(10), end: at(12) },
          { id: 'd3', title: 'Review', start: at(15, 30), end: at(16, 30) },
        ]}
      />
    </div>
  );
}
