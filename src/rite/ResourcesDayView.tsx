import { Clock, User } from 'lucide-react';
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

export interface ResourcesDayViewProps {
  events: Event[];
  resources: Resource[];
  date?: Date;
  className?: string;
}

const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i);

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function fmtHour(h: number): string {
  return `${String(h).padStart(2, '0')}:00`;
}

function fmtTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function ResourcesDayView({ events, resources, date, className }: ResourcesDayViewProps) {
  const current = date ?? new Date();
  const dayEvents = events.filter((e) => sameDay(e.start, current));
  const firstIdByResource: Record<string, string> = {};
  for (const r of resources) {
    const first = dayEvents
      .filter((e) => e.resourceId === r.id)
      .sort((a, b) => a.start.getTime() - b.start.getTime())[0];
    if (first) firstIdByResource[r.id] = first.id;
  }

  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 bg-white font-mono dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          <Clock className="h-3.5 w-3.5" />
          {current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
          {dayEvents.length} bookings
        </span>
      </div>
      {resources.length === 0 ? (
        <p className="px-3 py-4 text-[11px] text-[#0a0a0b]/60 dark:text-white/60">
          No resources registered.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="grid min-w-[560px]"
            style={{ gridTemplateColumns: `3.5rem repeat(${resources.length}, minmax(0, 1fr))` }}
          >
            <div className="border-b border-[#0a0a0b]/15 px-2 py-2 dark:border-white/10" />
            {resources.map((r) => {
              const count = dayEvents.filter((e) => e.resourceId === r.id).length;
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-1.5 border-b border-l border-[#0a0a0b]/15 px-2 py-2 dark:border-white/10"
                >
                  <User className="h-3 w-3 shrink-0 text-[#0a0a0b]/50 dark:text-white/50" />
                  <span className="truncate text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b] dark:text-[#e9e7e2]">
                    {r.label}
                  </span>
                  <span
                    className={cx(
                      'ml-auto rounded-[2px] px-1 text-[10px]',
                      count > 0
                        ? 'bg-[#d42b1e]/10 text-[#a81e14] dark:bg-[#d42b1e]/15 dark:text-[#ff6b5e]'
                        : 'text-[#0a0a0b]/40 dark:text-white/40',
                    )}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
            {HOURS.map((h) => (
              <div key={h} className="contents">
                <div className="border-b border-[#0a0a0b]/10 px-2 py-2 text-[10px] text-[#0a0a0b]/45 dark:border-white/10 dark:text-white/45">
                  {fmtHour(h)}
                </div>
                {resources.map((r) => {
                  const slot = dayEvents
                    .filter((e) => e.resourceId === r.id && e.start.getHours() === h)
                    .sort((a, b) => a.start.getTime() - b.start.getTime());
                  return (
                    <div
                      key={r.id}
                      className="min-h-[44px] space-y-1 border-b border-l border-[#0a0a0b]/10 p-1 dark:border-white/10"
                    >
                      {slot.map((e) => (
                        <div
                          key={e.id}
                          title={`${e.title} ${fmtTime(e.start)}-${fmtTime(e.end)}`}
                          className={cx(
                            'rounded-[2px] border border-[#0a0a0b]/15 border-l-2 px-1.5 py-1 dark:border-white/15',
                            firstIdByResource[r.id] === e.id
                              ? 'border-l-[#d42b1e] dark:border-l-[#d42b1e]'
                              : 'border-l-[#0a0a0b]/30 dark:border-l-white/30',
                          )}
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
  { id: 'd1', title: 'Standup', start: new Date(2026, 10, 4, 9, 0), end: new Date(2026, 10, 4, 9, 30), resourceId: 'r1' },
  { id: 'd2', title: 'Dossier review', start: new Date(2026, 10, 4, 11, 0), end: new Date(2026, 10, 4, 12, 0), resourceId: 'r1' },
  { id: 'd3', title: 'Client call', start: new Date(2026, 10, 4, 9, 30), end: new Date(2026, 10, 4, 10, 30), resourceId: 'r2' },
  { id: 'd4', title: 'Survey pass', start: new Date(2026, 10, 4, 14, 0), end: new Date(2026, 10, 4, 15, 0), resourceId: 'r2' },
  { id: 'd5', title: 'Focus block', start: new Date(2026, 10, 4, 10, 0), end: new Date(2026, 10, 4, 12, 0), resourceId: 'r3' },
  { id: 'd6', title: 'Handoff', start: new Date(2026, 10, 4, 16, 0), end: new Date(2026, 10, 4, 16, 30), resourceId: 'r3' },
];

export function ResourcesDayViewDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Day roster - 3 resources, 6 bookings
      </p>
      <ResourcesDayView events={DEMO_EVENTS} resources={DEMO_RESOURCES} date={new Date(2026, 10, 4)} />
    </div>
  );
}
