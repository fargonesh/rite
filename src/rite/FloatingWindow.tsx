import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface FloatingWindowProps {
  title?: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  className?: string;
}

export function FloatingWindow({ title = 'Dossier', children, defaultPosition, className }: FloatingWindowProps) {
  const [pos, setPos] = useState({ x: defaultPosition?.x ?? 16, y: defaultPosition?.y ?? 16 });
  const [dismissed, setDismissed] = useState(false);
  const drag = useRef<{ dx: number; dy: number; active: boolean }>({ dx: 0, dy: 0, active: false });

  const onHeaderPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onHeaderPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    setPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy });
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label={title}
      style={{ left: pos.x, top: pos.y }}
      className={cx(
        'absolute z-20 w-64 rounded-[2px] border border-[#0a0a0b]/25 bg-[#e9e7e2] shadow-[0_8px_40px_rgba(0,0,0,0.35)]',
        'dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <span aria-hidden className="absolute -top-2 left-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="absolute -top-2 right-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="absolute -bottom-2.5 left-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <span aria-hidden className="absolute -bottom-2.5 right-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
      <div
        onPointerDown={onHeaderPointerDown}
        onPointerMove={onHeaderPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-move touch-none items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10"
      >
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]">{title}</p>
        <button
          onClick={() => setDismissed(true)}
          aria-label={`Close ${title}`}
          className="rounded-[2px] p-1 text-[#0a0a0b]/60 outline-none hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:text-white"
        >
          <X size={13} strokeWidth={2} aria-hidden />
        </button>
      </div>
      <div className="px-3 py-3 text-[12px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">
        {children}
      </div>
    </div>
  );
}

export function FloatingWindowDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="relative h-56 overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2]/40 dark:border-white/15">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
          Drag by the header
        </p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="h-7 rounded-[2px] border border-[#0a0a0b]/25 px-3 font-mono text-[10px] uppercase tracking-[0.18em] outline-none hover:border-[#d42b1e] hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25"
        >
          Restore
        </button>
      </div>
      <FloatingWindow key={key} title="FILE 047 — VESPER" defaultPosition={{ x: 24, y: 44 }}>
        <p>Draggable survey panel. Grip the header to reposition; the seal closes it.</p>
      </FloatingWindow>
    </div>
  );
}
