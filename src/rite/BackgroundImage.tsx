import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface BackgroundImageProps {
  src?: string;
  children: ReactNode;
  dim?: number;
  className?: string;
}

function clampDim(dim: number): number {
  if (Number.isNaN(dim)) return 0.5;
  return Math.min(1, Math.max(0, dim));
}

export function BackgroundImage({ src, children, dim = 0.5, className }: BackgroundImageProps) {
  const scrim = clampDim(dim);
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#2b3440] via-[#0a0a0b] to-[#4a1210] dark:from-[#1a2230] dark:via-[#0a0a0b] dark:to-[#3a1512]"
        style={src ? { backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      />
      <div aria-hidden className="absolute inset-0 bg-black" style={{ opacity: scrim }} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function BackgroundImageDemo() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <BackgroundImage dim={0.55}>
        <div className="flex flex-col gap-1 p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">dossier — 1147</span>
          <span className="text-sm font-medium text-white">Annex archive, sublevel two</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">dim 0.55</span>
        </div>
      </BackgroundImage>
      <BackgroundImage dim={0.8}>
        <div className="flex items-center justify-between p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">sealed record</span>
          <span className="rounded-[2px] border border-white/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
            dim 0.8
          </span>
        </div>
      </BackgroundImage>
    </div>
  );
}
