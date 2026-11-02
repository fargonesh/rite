import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface UnstyledButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export function UnstyledButton({ children, onClick, disabled, className }: UnstyledButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        'm-0 appearance-none border-0 bg-transparent p-0 text-left font-[inherit] tracking-tight text-[inherit] cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d42b1e]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function UnstyledButtonDemo() {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <UnstyledButton
        onClick={() => undefined}
        className="font-mono text-xs uppercase tracking-widest text-[#d42b1e] underline underline-offset-4"
      >
        Bare trigger — opens the ledger
      </UnstyledButton>
      <UnstyledButton disabled className="font-mono text-xs uppercase tracking-widest opacity-50">
        Disabled bare trigger
      </UnstyledButton>
    </div>
  );
}
