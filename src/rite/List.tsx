import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  items: ReactNode[];
  icon?: ReactNode;
}

export function List({ ordered, items, icon = '—', className, ...rest }: ListProps) {
  if (ordered) {
    return (
      <ol
        className={cx(
          'flex flex-col gap-2 font-sans text-[15px] leading-7 text-[#0a0a0b] dark:text-[#e9e7e2]',
          className,
        )}
        {...rest}
      >
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="shrink-0 font-mono text-xs leading-7 text-[#d42b1e]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul
      className={cx(
        'flex flex-col gap-2 font-sans text-[15px] leading-7 text-[#0a0a0b] dark:text-[#e9e7e2]',
        className,
      )}
      {...rest}
    >
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="shrink-0 leading-7 text-[#d42b1e]">
            {icon}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ListDemo() {
  return (
    <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
      <List items={['Mark the perimeter in salt', 'Light nothing until the second bell', 'Record every instrument by hand']} />
      <List
        ordered
        items={['Enter the chamber alone', 'Read the passage aloud, once', 'Leave before the echo answers']}
      />
    </div>
  );
}
