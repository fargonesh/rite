import { useState } from 'react';
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
}

interface Resource {
  id: string;
  label: string;
}

export type ResourceScheduleView = 'day' | 'week' | 'month';

export interface ResourcesScheduleProps {
  events: Event[];
  resources: Resource[];
  view?: ResourceScheduleView;
  defaultView?: ResourceScheduleView;
  className?: string;
}

const VIEWS: Array<{ key: ResourceScheduleView; label: string; icon: typeof Clock }> = [
  { key: 'day', label: 'Day', icon: Clock },
  { key: 'week', label: 'Week', icon: CalendarDays },
  { key: 'month', label: 'Month', icon: Calendar },
];

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function fmtTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function DayLanes({ events, resources, anchor }: { events: Event[]; resources: Resource[]; anchor: Date }) {
  const dayEvents = events.filter((e) => sameDay(e.start, anchor));
  return (
    <div className="grid gap-2 p-3 sm:grid-cols-3">
      {resources.map((r) => {
        const col = dayEvents
          .filter((e) => e.resourceId === r.id)
          .sort((a, b) => a.start.getTime() - b.start.getTime());
        return (
          <div key={r.id} className="rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10">
            <p className="border-b border-dashed border-[#0a0a0b]/15 px-2 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b] dark:border-white/10 dark:text-[#e9e7e2]">
              {r.label} - {col.length}
            </p>
            <div className="space-y-1 p-1.5">
              {col.length === 0 && (
                <p className="px-1 py-1 text-[10px] text-[#0a0a0b]/45 dark:text-white/45">Open</p>
              )}
              {col.map((e) => (
                <div
                  key={e.id}
                  className="rounded-[2px] border border-[#0a0a0b]/15 border-l-2 border-l-[#0a0a0b]/30 px-1.5 py-1 dark:border-white/15 dark:border-l-white/30"
                >
                  <p className="truncate text-[10px] uppercase tracking-[0.08em] text-[#0a0a0b] dark:text-[#e9e7e2]">
                    {e.title}
                  </p>
                  <p className="text-[9px] text-[#0a0a0b]/50 dark:text-white/50">
                    {fmtTime(e.start)}-{fmtTime(e.end)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeekLanes({ events, resources, anchor }: { events: Event[]; resources: Resource[]; anchor: Date }) {
  const weekStart = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay());
  const days = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  return (
    <div className="space-y-2 p-3">
      {resources.map((r) => (
        <div key={r.id} className="rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10">
          <p className="border-b border-dashed border-[#0a0a0b]/15 px-2 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b] dark:border-white/10 dark:text-[#e9e7e2]">
            {r.label}
          </p>
          <div className="grid grid-cols-7 gap-1 p-1.5">
            {days.map((d) => {
              const cell = events
                .filter((e) => e.resourceId === r.id && sameDay(e.start, d))
                .sort((a, b) => a.start.getTime() - b.start.getTime());
              return (
                <div key={d.toISOString()} className="min-h-[44px] space-y-0.5">
                  <p className="text-center text-[9px] text-[#0a0a0b]/45 dark:text-white/45">{d.getDate()}</p>
                  {cell.slice(0, 2).map((e) => (
                    <p
                      key={e.id}
                      title={e.title}
                      className="truncate rounded-[2px] bg-[#0a0a0b]/[0.06] px-1 py-px text-[9px] uppercase tracking-[0.06em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]"
                    >
                      {e.title}
                    </p>
                  ))}
                  {cell.length > 2 && (
                    <p className="px-1 text-[9px] text-[#a81e14] dark:text-[#ff6b5e]">+{cell.length - 2}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthLanes({ events, resources, anchor }: { events: Event[]; resources: Resource[]; anchor: Date }) {
  const y = anchor.getFullYear();
  const m = anchor.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(y, m, i + 1));
  return (
    <div className="space-y-2 p-3">
      {resources.map((r) => {
        const lane = events.filter((e) => e.resourceId === r.id);
        return (
          <div key={r.id} className="rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10">
            <p className="border-b border-dashed border-[#0a0a0b]/15 px-2 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b] dark:border-white/10 dark:text-[#e9e7e2]">
              {r.label} - {lane.length}
            </p>
            <div className="flex flex-wrap gap-[3px] p-2">
              {days.map((d) => {
                const cell = lane.filter((e) => sameDay(e.start, d));
                return (
                  <span
                    key={d.toISOString()}
                    title={cell.length > 0 ? cell.map((e) => e.title).join(', ') : 'Open'}
                    className={cx(
                      'h-3 w-3 rounded-[1px] border',
                      cell.length > 0
                        ? 'border-[#d42b1e]/60 bg-[#d42b1e]/20 dark:border-[#d42b1e]/60 dark:bg-[#d42b1e]/25'
                        : 'border-[#0a0a0b]/15 dark:border-white/15',
                    )}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ResourcesSchedule({ events, resources, view, defaultView, className }: ResourcesScheduleProps) {
  const [internalView, setInternalView] = useState<ResourceScheduleView>(() => defaultView ?? 'week');
  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const locked = view !== undefined;
  const active: ResourceScheduleView = view ?? internalView;

  function shift(delta: number): void {
    const y = anchor.getFullYear();
    const m = anchor.getMonth();
    const d = anchor.getDate();
    if (active === 'day') setAnchor(new Date(y, m, d + delta));
    else if (active === 'week') setAnchor(new Date(y, m, d + delta * 7));
    else setAnchor(new Date(y, m + delta, 1));
  }

  const rangeLabel =
    active === 'day'
      ? anchor.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      : active === 'week'
        ? anchor.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : anchor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 bg-white font-mono dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <div className="flex items-center gap-1" role="tablist" aria-label="Schedule view">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            const selected = active === v.key;
            return (
              <button
                key={v.key}
                type="button"
                role="tab"
                aria-selected={selected}
                disabled={locked}
                onClick={() => setInternalView(v.key)}
                className={cx(
                  'flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-[10px] uppercase tracking-[0.14em] disabled:opacity-40',
                  selected
                    ? 'border-[#d42b1e] text-[#a81e14] dark:border-[#d42b1e] dark:text-[#ff6b5e]'
                    : 'border-[#0a0a0b]/20 text-[#0a0a0b]/60 dark:border-white/15 dark:text-white/60',
                )}
              >
                <Icon className="h-3 w-3" />
                {v.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
            {rangeLabel}
          </span>
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous period"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next period"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {resources.length === 0 ? (
        <p className="px-3 py-4 text-[11px] text-[#0a0a0b]/60 dark:text-white/60">
          No resources registered.
        </p>
      ) : active === 'day' ? (
        <DayLanes events={events} resources={resources} anchor={anchor} />
      ) : active === 'week' ? (
        <WeekLanes events={events} resources={resources} anchor={anchor} />
      ) : (
        <MonthLanes events={events} resources={resources} anchor={anchor} />
      )}
    </div>
  );
}

const DEMO_RESOURCES: Resource[] = [
  { id: 'r1', label: 'Room A' },
  { id: 'r2', label: 'Room B' },
  { id: 'r3', label: 'Desk C' },
];

function demoDate(day: number, hour: number, minute = 0): Date {
  return new Date(2026, 10, day, hour, minute);
}

const DEMO_EVENTS: Event[] = [
  { id: 's1', title: 'Standup', start: demoDate(2, 9), end: demoDate(2, 9, 30), resourceId: 'r1' },
  { id: 's2', title: 'Dossier review', start: demoDate(4, 11), end: demoDate(4, 12), resourceId: 'r1' },
  { id: 's3', title: 'Filing deadline', start: demoDate(12, 9), end: demoDate(12, 10), resourceId: 'r1' },
  { id: 's4', title: 'Client call', start: demoDate(3, 9, 30), end: demoDate(3, 10, 30), resourceId: 'r2' },
  { id: 's5', title: 'Survey pass', start: demoDate(5, 14), end: demoDate(5, 15), resourceId: 'r2' },
  { id: 's6', title: 'Focus block', start: demoDate(6, 10), end: demoDate(6, 12), resourceId: 'r3' },
  { id: 's7', title: 'Archive run', start: demoDate(20, 13), end: demoDate(20, 14), resourceId: 'r3' },
];

export function ResourcesScheduleDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Resource schedule - 3 resources, 7 bookings
      </p>
      <ResourcesSchedule events={DEMO_EVENTS} resources={DEMO_RESOURCES} defaultView="week" />
    </div>
  );
}
