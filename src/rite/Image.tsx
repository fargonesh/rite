import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ImageIcon } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type ImageRatio = '16/9' | '1/1' | '4/3';

export interface ImageProps {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  ratio?: ImageRatio;
  className?: string;
}

const ratioStyles: Record<ImageRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
};

function DefaultFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#2b3440] via-[#0a0a0b] to-[#4a1210] dark:from-[#1a2230] dark:via-[#0a0a0b] dark:to-[#3a1512]">
      <ImageIcon aria-hidden className="h-5 w-5 text-white/40" strokeWidth={1.5} />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">no signal</span>
    </div>
  );
}

export function Image({ src, alt, fallback, ratio = '16/9', className }: ImageProps) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  const showFallback = !src || failed;
  return (
    <div
      role={showFallback ? 'img' : undefined}
      aria-label={showFallback ? alt : undefined}
      className={cx(
        'relative overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-[#0a0a0b]/5 dark:border-white/15 dark:bg-white/5',
        ratioStyles[ratio],
        className,
      )}
    >
      {showFallback ? (
        fallback ?? <DefaultFallback />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export function ImageDemo() {
  return (
    <div className="grid max-w-md grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Image src="" alt="Missing plate scan" ratio="16/9" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          16/9 — empty
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Image src="" alt="Sealed record" ratio="1/1" fallback={<DefaultFallback />} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          1/1 — fallback
        </span>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Image
          src="__broken__"
          alt="Custom fallback plate"
          ratio="4/3"
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2b3440] to-[#0a0a0b]">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                sealed — ref 1147
              </span>
            </div>
          }
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          4/3 — custom fallback
        </span>
      </div>
    </div>
  );
}
