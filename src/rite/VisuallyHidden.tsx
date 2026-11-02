import type { ReactNode } from 'react';

export interface VisuallyHiddenProps {
  children: ReactNode;
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>;
}

export function VisuallyHiddenDemo() {
  return (
    <div className="max-w-md">
      <button
        type="button"
        className="cursor-pointer border border-[#0a0a0b]/20 px-3 py-2 font-mono text-xs uppercase tracking-widest text-[#0a0a0b] dark:border-[#e9e7e2]/20 dark:text-[#e9e7e2]"
      >
        Read more
        <VisuallyHidden> about the night survey, entry 12</VisuallyHidden>
      </button>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[#0a0a0b]/60 dark:text-[#e9e7e2]/55">
        Extra context above is clipped — screen readers still announce it.
      </p>
    </div>
  );
}
