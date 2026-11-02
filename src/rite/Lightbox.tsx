import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface LightboxImage {
  src?: string;
  label?: string;
}

export interface LightboxProps {
  opened: boolean;
  onClose: () => void;
  images: LightboxImage[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}

function readout(n: number): string {
  return String(n).padStart(2, '0');
}

const standinGradients = [
  'bg-gradient-to-br from-[#1a1b1e] via-[#3a1410] to-[#d42b1e]',
  'bg-gradient-to-br from-[#0a0a0b] via-[#1c2a3a] to-[#4a6a8a]',
  'bg-gradient-to-br from-[#2a1a0a] via-[#6a3a10] to-[#d4932b]',
];

export function Lightbox({ opened, onClose, images, index, defaultIndex = 0, onIndexChange }: LightboxProps) {
  const [internal, setInternal] = useState(defaultIndex);
  const count = images.length;
  const current = index !== undefined ? index : internal;

  const setCurrent = (next: number) => {
    if (count === 0) return;
    const wrapped = (next + count) % count;
    if (index === undefined) setInternal(wrapped);
    onIndexChange?.(wrapped);
  };

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrent(current - 1);
      if (e.key === 'ArrowRight') setCurrent(current + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  if (!opened) return null;

  const active = count > 0 ? images[current % count] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Lightbox">
      <div className="flex items-center justify-between border-b border-dashed border-white/15 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
          {count > 0 ? `${readout((current % count) + 1)} / ${readout(count)}` : '00 / 00'}
          {active?.label ? ` — ${active.label}` : ''}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-white/20 text-white/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-white focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
        >
          <X size={14} aria-hidden />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center gap-3 p-4">
        <button
          type="button"
          onClick={() => setCurrent(current - 1)}
          aria-label="Previous image"
          disabled={count <= 1}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-white/20 text-white/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-white focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:opacity-30"
        >
          <ChevronLeft size={16} aria-hidden />
        </button>
        <div className="flex max-h-[70vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-[2px] border border-white/15">
          {active?.src ? (
            <img src={active.src} alt={active.label ?? `Image ${current + 1}`} className="max-h-[70vh] w-full object-contain" />
          ) : (
            <div className={cx('flex h-72 w-full items-end justify-between p-4', standinGradients[current % standinGradients.length])}>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
                {active?.label ?? 'No source — stand-in'}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/50">FIG.{readout(current + 1)}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCurrent(current + 1)}
          aria-label="Next image"
          disabled={count <= 1}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-white/20 text-white/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-white focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:opacity-30"
        >
          <ChevronRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function LightboxDemo() {
  const [opened, setOpened] = useState(false);
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="h-9 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black"
      >
        Open exhibit
      </button>
      {opened && (
        <Lightbox
          opened={opened}
          onClose={() => setOpened(false)}
          images={[{ label: 'Exhibit A' }, { label: 'Exhibit B' }, { label: 'Exhibit C' }]}
          index={idx}
          onIndexChange={setIdx}
        />
      )}
    </div>
  );
}
