import { Fragment } from 'react';
import { cx } from '../lib/cx.ts';
import { Mark } from './Mark.tsx';

export interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

function splitMatches(text: string, query: string): Array<{ match: boolean; value: string }> {
  const q = query.trim();
  if (!q) return [{ match: false, value: text }];
  const lowerText = text.toLowerCase();
  const lowerQ = q.toLowerCase();
  const parts: Array<{ match: boolean; value: string }> = [];
  let i = 0;
  for (;;) {
    const j = lowerText.indexOf(lowerQ, i);
    if (j === -1) {
      parts.push({ match: false, value: text.slice(i) });
      break;
    }
    if (j > i) parts.push({ match: false, value: text.slice(i, j) });
    parts.push({ match: true, value: text.slice(j, j + q.length) });
    i = j + q.length;
  }
  return parts.filter((p) => p.value.length > 0);
}

export function Highlight({ text, query, className }: HighlightProps) {
  const parts = splitMatches(text, query);
  return (
    <span className={cx('tracking-tight', className)}>
      {parts.map((part, idx) =>
        part.match ? (
          <Mark key={idx}>{part.value}</Mark>
        ) : (
          <Fragment key={idx}>{part.value}</Fragment>
        ),
      )}
    </span>
  );
}

export function HighlightDemo() {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <p className="font-sans text-[15px] leading-7 text-[#0a0a0b] dark:text-[#e9e7e2]">
        <Highlight text="The survey team marked the blood-red door twice on the survey map." query="survey" />
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-[#0a0a0b]/60 dark:text-[#e9e7e2]/55">
        query: “survey” — every occurrence flagged
      </p>
    </div>
  );
}
