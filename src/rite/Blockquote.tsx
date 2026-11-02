import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface BlockquoteProps extends HTMLAttributes<HTMLElement> {
  cite?: string;
}

export function Blockquote({ cite, className, children, ...rest }: BlockquoteProps) {
  return (
    <blockquote
      className={cx(
        'border-l-2 border-[#d42b1e] pl-4 text-[#0a0a0b] dark:text-[#e9e7e2]',
        className,
      )}
      {...rest}
    >
      <div className="font-omen text-lg italic leading-8">{children}</div>
      {cite && (
        <cite className="mt-2 block font-mono text-[11px] not-italic uppercase tracking-[0.16em] text-[#0a0a0b]/55 dark:text-[#e9e7e2]/55">
          — {cite}
        </cite>
      )}
    </blockquote>
  );
}

export function BlockquoteDemo() {
  return (
    <div className="max-w-md">
      <Blockquote cite="Field log VII, the surveyor">
        What was measured did not wish to be measured, and the instruments knew it first.
      </Blockquote>
    </div>
  );
}
