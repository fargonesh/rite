import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  target?: Element | null;
}

export function Portal({ children, target }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(children, target ?? document.body);
}

export function PortalDemo() {
  return (
    <div className="rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-4 dark:border-white/20">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Parent tree ends here
      </p>
      <p className="mt-2 text-[13px] leading-6 text-[#0a0a0b]/80 dark:text-white/80">
        The blood sigil pinned to the viewport corner is portalled to{' '}
        <span className="font-mono">document.body</span> — inspect the DOM to verify it lives
        outside this box.
      </p>
      <Portal>
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#d42b1e]/60 bg-[#0a0a0b] dark:bg-[#e9e7e2]"
        >
          <span className="block h-3 w-3 rounded-[2px] bg-[#d42b1e]" />
        </div>
      </Portal>
    </div>
  );
}
