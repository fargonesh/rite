import { cx } from '../lib/cx.ts';

export interface TimelineItem {
  title: string;
  text?: string;
  time?: string;
  active?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cx('relative ml-1 border-l border-[#0a0a0b]/20 dark:border-white/15', className)}>
      {items.map((item) => (
        <li key={item.title} className="relative pb-6 pl-6 last:pb-0">
          <span
            aria-hidden
            className={cx(
              'absolute top-1 -left-[5px] h-2.5 w-2.5 rounded-[2px] border',
              item.active
                ? 'border-[#d42b1e] bg-[#d42b1e]'
                : 'border-[#0a0a0b]/40 bg-[#e9e7e2] dark:border-white/40 dark:bg-[#08090b]',
            )}
          />
          {item.time && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
              {item.time}
            </p>
          )}
          <p
            className={cx(
              'mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em]',
              item.active ? 'text-[#d42b1e] dark:text-[#ff6b5e]' : 'text-[#0a0a0b] dark:text-[#e9e7e2]',
            )}
          >
            {item.title}
          </p>
          {item.text && (
            <p className="mt-1 max-w-prose text-sm leading-relaxed text-[#0a0a0b]/70 dark:text-white/60">
              {item.text}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function TimelineDemo() {
  return (
    <Timeline
      items={[
        { title: 'Dossier filed', time: '09:41', text: 'Exhibit logged and witnessed.' },
        { title: 'Survey passed', time: '10:15', text: 'Hairlines checked against the grid.' },
        { title: 'Sealed in blood', time: 'Now', text: 'Active exhibit awaiting signature.', active: true },
      ]}
    />
  );
}
