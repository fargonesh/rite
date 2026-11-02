import { CalendarDays, User } from 'lucide-react';
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

export interface ResourcesWeekViewProps {
  events: Event[];
  resources: Resource[];
  date?: Date;
  className?: string;
}

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function ResourcesWeekView({ events, resources, date, className }: ResourcesWeekViewProps) {
  const anchor = date ?? new Date();
  const weekStart = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay());
  const days = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  const today = new Date();
  const weekEnd = days[6];
  const rangeLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 bg-white font-mono dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          <CalendarDays className="h-3.5 w-3.5" />
          {rangeLabel}
        </p>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
          {resources.length} resources
        </span>
      </div>
      {resources.length === 0 ? (
        <p className="px-3 py-4 text-[11px] text-[#0a0a0b]/60 dark:text-white/60">
          No resources registered.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px]" style={{ gridTemplateColumns: '9rem repeat(7, minmax(0, 1fr))' }}>
            <div className="border-b border-[#0a0a0b]/15 px-2 py-2 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/45 dark:border-white/10 dark:text-white/45">
              Resource
            </div>
            {days.map((d) => {
              const isToday = sameDay(d, today);
              return (
                <div key={d.toISOString()} className="border-b border-l border-[#0a0a0b]/15 px-1 py-2 text-center dark:border-white/10">
                  <p className="text-[9px] tracking-[0.18em] text-[#0a0a0b]/45 dark:text-white/45">
                    {WEEKDAYS[d.getDay()]}
                  </p>
                  <p
                    className={cx(
                      'mx-auto mt-0.5 inline-block rounded-[2px] px-1 text-[11px]',
                      isToday
                        ? 'bg-[#d42b1e] text-white'
                        : 'text-[#0a0a0b] dark:text-[#e9e7e2]',
                    )}
                  >
                    {d.getDate()}
                  </p>
                </div>
              );
            })}
            {resources.map((r) => (
              <div key={r.id} className="contents">
                <div className="flex items-center gap-1.5 border-b border-[#0a0a0b]/10 px-2 py-2 dark:border-white/10">
                  <User className="h-3 w-3 shrink-0 text-[#0a0a0b]/50 dark:text-white/50" />
                  <span className="truncate text-[10px] uppercase tracking-[0.12em] text-[#0a0a0b] dark:text-[#e9e7e2]">
                    {r.label}
                  </span>
                </div>
                {days.map((d) => {
                  const cell = events
                    .filter((e) => e.resourceId === r.id && sameDay(e.start, d))
                    .sort((a, b) => a.start.getTime() - b.start.getTime());
                  const rest = cell.length - 2;
                  return (
                    <div
                      key={d.toISOString()}
                      className="min-h-[52px] space-y-0.5 border-b border-l border-[#0a0a0b]/10 p-1 dark:border-white/10"
                    >
                      {cell.slice(0, 2).map((e) => (
                        <p
                          key={e.id}
                          title={e.title}
                          className="truncate rounded-[2px] bg-[#0a0a0b]/[0.06] px-1 py-px text-[9px] uppercase tracking-[0.06em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]"
                        >
                          {e.title}
                        </p>
                      ))}
                      {rest > 0 && (
                        <p className="px-1 text-[9px] text-[#a81e14] dark:text-[#ff6b5e]">+{rest} more</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const DEMO_RESOURCES: Resource[] = [
  { id: 'r1', label: 'Room A' },
  { id: 'r2', label: 'Room B' },
  { id: 'r3', label: 'Desk C' },
];

const DEMO_EVENTS: Event[] = [
  { id: 'w1', title: 'Standup', start: new Date(2026, 10, 2, 9, 0), end: new Date(2026, 10, 2, 9, 30), resourceId: 'r1' },
  { id: 'w2', title: 'Dossier review', start: new Date(2026, 10, 4, 11, 0), end: new Date(2026, 10, 4, 12, 0), resourceId: 'r1' },
  { id: 'w3', title: 'Audit prep', start: new Date(2026, 10, 4, 14, 0), end: new Date(2026, 10, 4, 15, 0), resourceId: 'r1' },
  { id: 'w4', title: 'Spillover call', start: new Date(2026, 10, 4, 16, 0), end: new Date(2026, 10, 4, 16, 30), resourceId: 'r1' },
  { id: 'w5', title: 'Client call', start: new Date(2026, 10, 3, 9, 30), end: new Date(2026, 10, 3, 10, 30), resourceId: 'r2' },
  { id: 'w6', title: 'Survey pass', start: new Date(2026, 10, 5, 14, 0), end: new Date(2026, 10, 5, 15, 0), resourceId: 'r2' },
  { id: 'w7', title: 'Focus block', start: new Date(2026, 10, 6, 10, 0), end: new Date(2026, 10, 6, 12, 0), resourceId: 'r3' },
  { id: 'w8', title: 'Handoff', start: new Date(2026, 10, 7, 16, 0), end: new Date(2026, 10, 7, 16, 30), resourceId: 'r3' },
];

export function ResourcesWeekViewDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Week roster - 3 resources, 8 bookings
      </p>
      <ResourcesWeekView events={DEMO_EVENTS} resources={DEMO_RESOURCES} date={new Date(2026, 10, 4)} />
    </div>
  );
}
