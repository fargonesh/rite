import { useState } from 'react';
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export type ScheduleView = 'day' | 'week' | 'month';

export interface ScheduleProps {
  events: ScheduleEvent[];
  view?: ScheduleView;
  defaultView?: ScheduleView;
  onViewChange?: (view: ScheduleView) => void;
  date?: Date;
  defaultDate?: Date;
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfWeekMonday(d: Date): Date {
  const c = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = (c.getDay() + 6) % 7;
  c.setDate(c.getDate() - dow);
  return c;
}

function monthCells(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - lead);
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

const VIEWS: Array<{ id: ScheduleView; label: string; Icon: typeof Calendar }> = [
  { id: 'day', label: 'Day', Icon: Calendar },
  { id: 'week', label: 'Week', Icon: CalendarDays },
  { id: 'month', label: 'Month', Icon: LayoutGrid },
];

export function Schedule({
  events,
  view,
  defaultView = 'week',
  onViewChange,
  date,
  defaultDate,
  className,
}: ScheduleProps) {
  const [internalView, setInternalView] = useState<ScheduleView>(defaultView);
  const [internalDate] = useState<Date>(() => defaultDate ?? new Date());
  const activeView = view ?? internalView;
  const activeDate = date ?? internalDate;

  function handleView(v: ScheduleView): void {
    if (view === undefined) setInternalView(v);
    onViewChange?.(v);
  }

  const weekStart = startOfWeekMonday(activeDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  const cells = monthCells(activeDate.getFullYear(), activeDate.getMonth());

  return (
    <div className={cx('overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-[#0d0e11]', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0a0a0b]/10 px-3 py-2 dark:border-white/10">
        <div className="flex items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/15">
            <ChevronLeft className="h-3.5 w-3.5 text-[#0a0a0b]/60 dark:text-white/60" aria-hidden />
          </span>
          <p className="px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b] dark:text-[#e9e7e2]">
            {activeDate.getFullYear()}-{pad(activeDate.getMonth() + 1)}-{pad(activeDate.getDate())}
          </p>
          <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/15">
            <ChevronRight className="h-3.5 w-3.5 text-[#0a0a0b]/60 dark:text-white/60" aria-hidden />
          </span>
        </div>
        <div role="tablist" aria-label="Schedule view" className="flex rounded-[2px] border border-[#0a0a0b]/15 p-0.5 dark:border-white/15">
          {VIEWS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeView === id}
              type="button"
              onClick={() => handleView(id)}
              className={cx(
                'flex items-center gap-1.5 rounded-[2px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]',
                activeView === id
                  ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'text-[#0a0a0b]/60 hover:text-[#0a0a0b] dark:text-white/60 dark:hover:text-white',
              )}
            >
              <Icon className="h-3 w-3" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'day' && (
        <ol className="divide-y divide-[#0a0a0b]/10 dark:divide-white/10">
          {events.filter((e) => sameDay(e.start, activeDate)).length === 0 && (
            <li className="px-3 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/50">
              No events
            </li>
          )}
          {events
            .filter((e) => sameDay(e.start, activeDate))
            .map((e) => (
              <li key={e.id} className="flex items-center gap-3 px-3 py-2">
                <span className="w-11 shrink-0 font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/60 dark:text-white/60">
                  {fmtTime(e.start)}
                </span>
                <span className="rounded-[2px] bg-[#0a0a0b] px-2 py-1 text-xs text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black">
                  {e.title}
                </span>
              </li>
            ))}
        </ol>
      )}

      {activeView === 'week' && (
        <div className="grid grid-cols-7 divide-x divide-[#0a0a0b]/10 dark:divide-white/10">
          {weekDays.map((d) => {
            const dayEvents = events.filter((e) => sameDay(e.start, d));
            const isToday = sameDay(d, new Date());
            return (
              <div key={dateKey(d)} className="min-h-24 px-1 py-2">
                <p className={cx('text-center font-mono text-[10px] tracking-[0.12em]', isToday ? 'text-[#d42b1e] dark:text-[#ff6b5e]' : 'text-[#0a0a0b]/60 dark:text-white/60')}>
                  {pad(d.getDate())}
                </p>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <p key={e.id} className="truncate rounded-[2px] bg-[#0a0a0b]/8 px-1 py-0.5 text-[11px] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]">
                      {e.title}
                    </p>
                  ))}
                  {dayEvents.length > 3 && (
                    <p className="font-mono text-[10px] text-[#0a0a0b]/50 dark:text-white/50">+{dayEvents.length - 3}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeView === 'month' && (
        <div className="grid grid-cols-7">
          {cells.slice(0, 35).map((d) => {
            const count = events.filter((e) => sameDay(e.start, d)).length;
            const inMonth = d.getMonth() === activeDate.getMonth();
            return (
              <div key={dateKey(d) + d.getMonth()} className="flex min-h-10 flex-col items-center justify-center border-t border-l border-[#0a0a0b]/10 first:border-t-0 dark:border-white/10">
                <span className={cx('font-mono text-[10px]', inMonth ? 'text-[#0a0a0b] dark:text-[#e9e7e2]' : 'text-[#0a0a0b]/30 dark:text-white/30')}>
                  {d.getDate()}
                </span>
                {count > 0 && <span className="mt-0.5 h-1 w-1 rounded-full bg-[#0a0a0b]/60 dark:bg-white/60" aria-label={`${count} events`} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ScheduleDemo() {
  const now = new Date();
  const at = (h: number, m = 0) => new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  return (
    <div className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
      <Schedule
        defaultView="week"
        events={[
          { id: 'e1', title: 'Standup', start: at(9), end: at(9, 30) },
          { id: 'e2', title: 'Design review', start: at(13), end: at(14) },
          { id: 'e3', title: 'Ship log', start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10), end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11) },
        ]}
      />
    </div>
  );
}
