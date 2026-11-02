import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface CenterProps {
  children: ReactNode;
  className?: string;
  inline?: boolean;
}

export function Center({ children, className, inline = false }: CenterProps) {
  return (
    <div
      className={cx(
        inline ? 'inline-flex' : 'flex',
        'min-h-[inherit] items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function CenterDemo() {
  return (
    <Center>
      <div className={cell}>Centered content</div>
    </Center>
  );
}
