import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface CarouselProps {
  slides: ReactNode[];
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

function readout(n: number): string {
  return String(n).padStart(2, '0');
}

export function Carousel({ slides, showArrows = true, showDots = true, className }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  if (count === 0) return null;

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + count) % count);
  };

  return (
    <div className={cx('relative rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15', className)}>
      <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/50">
          Witness — {readout(index + 1)} / {readout(count)}
        </p>
        {showArrows && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-[#0a0a0b]/25 text-[#0a0a0b]/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:text-white/70"
            >
              <ChevronLeft size={14} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-[#0a0a0b]/25 text-[#0a0a0b]/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:text-white/70"
            >
              <ChevronRight size={14} aria-hidden />
            </button>
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0" aria-hidden={i !== index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div className="flex items-center justify-center gap-1.5 border-t border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={cx(
                'h-1.5 rounded-[2px] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                i === index ? 'w-5 bg-[#d42b1e]' : 'w-1.5 bg-[#0a0a0b]/25 hover:bg-[#0a0a0b]/50 dark:bg-white/25',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const demoGradients = [
  'bg-gradient-to-br from-[#1a1b1e] via-[#3a1410] to-[#d42b1e]',
  'bg-gradient-to-br from-[#0a0a0b] via-[#1c2a3a] to-[#4a6a8a]',
  'bg-gradient-to-br from-[#2a1a0a] via-[#6a3a10] to-[#d4932b]',
];

export function CarouselDemo() {
  return (
    <Carousel
      slides={demoGradients.map((g, i) => (
        <div key={i} className={cx('flex h-40 items-end justify-between p-3', g)}>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
            Exhibit {readout(i + 1)}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/50">FIG.0{i + 1}</span>
        </div>
      ))}
    />
  );
}
