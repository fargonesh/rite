import { useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface ColorSwatchProps {
  color: string;
  size?: number;
  onClick?: () => void;
  label?: string;
  className?: string;
}

const CHECKER = 'conic-gradient(#a1a1aa 25%, #ffffff 0 50%, #a1a1aa 0 75%, #ffffff 0)';

export function ColorSwatch({ color, size = 28, onClick, label, className }: ColorSwatchProps) {
  const accessibleName = label ?? `Color ${color}`;
  const box = (
    <>
      <span aria-hidden className="absolute inset-0" style={{ backgroundImage: CHECKER, backgroundSize: '8px 8px' }} />
      <span aria-hidden className="absolute inset-0" style={{ backgroundColor: color }} />
    </>
  );
  const frame = cx(
    'relative inline-block shrink-0 overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/20',
    className,
  );
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={accessibleName}
        style={{ width: size, height: size }}
        className={cx(
          frame,
          'cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
        )}
      >
        {box}
      </button>
    );
  }
  return (
    <div role="img" aria-label={accessibleName} style={{ width: size, height: size }} className={frame}>
      {box}
    </div>
  );
}

export function ColorSwatchDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-2">
        <ColorSwatch color="#d42b1e" />
        <ColorSwatch color="rgba(212,43,30,0.35)" />
        <ColorSwatch color="transparent" label="Transparent" />
        <ColorSwatch color="#16a34a" size={36} onClick={() => setPicked('#16a34a')} label="Pick green" />
      </div>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/40">
        {picked ? `Picked — ${picked}` : 'No pick'}
      </p>
    </div>
  );
}
