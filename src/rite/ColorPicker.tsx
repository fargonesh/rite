import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  swatches?: string[];
  label?: string;
  className?: string;
}

const DEFAULT_SWATCHES = [
  '#000000',
  '#52525b',
  '#a1a1aa',
  '#e9e7e2',
  '#ffffff',
  '#d42b1e',
  '#f59e0b',
  '#16a34a',
  '#2563eb',
  '#7c3aed',
];

const RAINBOW =
  'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function normalizeHex(hex: string): string {
  const h = hex.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(h)) return h;
  const m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(h);
  if (m) return `#${m[1]}${m[1]}${m[2]}${m[2]}${m[3]}${m[3]}`;
  return '#000000';
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const n = normalizeHex(hex);
  const r = parseInt(n.slice(1, 3), 16) / 255;
  const g = parseInt(n.slice(3, 5), 16) / 255;
  const b = parseInt(n.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  const hn = ((((h % 360) + 360) % 360) / 360) % 1;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const channel = (t: number): string => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    let c = p;
    if (tt < 1 / 6) c = p + (q - p) * 6 * tt;
    else if (tt < 1 / 2) c = q;
    else if (tt < 2 / 3) c = p + (q - p) * (2 / 3 - tt) * 6;
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${channel(hn + 1 / 3)}${channel(hn)}${channel(hn - 1 / 3)}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = normalizeHex(hex);
  return {
    r: parseInt(n.slice(1, 3), 16),
    g: parseInt(n.slice(3, 5), 16),
    b: parseInt(n.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

const WHITE_RGB = { r: 255, g: 255, b: 255 };
const BLACK_RGB = { r: 0, g: 0, b: 0 };

function mixRgb(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): { r: number; g: number; b: number } {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}

// The square renders hue + white overlay (left→right) + black overlay
// (top→bottom). Mixing the exact same way guarantees the committed color
// is the color under the cursor — WYSIWYG, no HSL round-trip drift.
function squareColor(hue: number, x: number, y: number): string {
  const base = hexToRgb(hslToHex(hue, 100, 50));
  const whitened = mixRgb(base, WHITE_RGB, 1 - x);
  const darkened = mixRgb(whitened, BLACK_RGB, y);
  return rgbToHex(darkened.r, darkened.g, darkened.b);
}

function posFromSquareColor(hex: string, hue: number): { x: number; y: number } {
  const c = hexToRgb(hex);
  const h = hexToRgb(hslToHex(hue, 100, 50));
  const peak = Math.max(c.r, c.g, c.b);
  const k = 1 - peak / 255;
  if (k >= 0.999) return { x: 0, y: 1 };
  const inv = 1 - k;
  const c1 = { r: c.r / inv, g: c.g / inv, b: c.b / inv };
  const ws: number[] = [];
  if (h.r < 255) ws.push((c1.r - h.r) / (255 - h.r));
  if (h.g < 255) ws.push((c1.g - h.g) / (255 - h.g));
  if (h.b < 255) ws.push((c1.b - h.b) / (255 - h.b));
  const w = ws.length === 0 ? 0 : clamp(ws.reduce((a, b) => a + b, 0) / ws.length, 0, 1);
  return { x: 1 - w, y: k };
}

function isLight(hex: string): boolean {
  const n = normalizeHex(hex);
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

// Saturation square is an honest approximation: horizontal white overlay
// plus vertical black overlay over the pure-hue base.
export function ColorPicker({
  value,
  defaultValue = '#d42b1e',
  onChange,
  swatches = DEFAULT_SWATCHES,
  label,
  className,
}: ColorPickerProps) {
  const [uncontrolled, setUncontrolled] = useState(normalizeHex(defaultValue));
  const [pos, setPos] = useState(() =>
    posFromSquareColor(normalizeHex(defaultValue), hexToHsl(defaultValue).h),
  );
  const controlled = value !== undefined;
  const current = normalizeHex(controlled ? value : uncontrolled);
  const squareRef = useRef<HTMLDivElement>(null);

  // Hue remembered across gray stops so the slider doesn't snap to red.
  const hueRef = useRef(hexToHsl(current).h);
  const liveHue = hexToHsl(current).h;
  const liveSat = hexToHsl(current).s;
  if (liveSat > 4) hueRef.current = liveHue;
  const hue = hueRef.current;

  const effPos = controlled ? posFromSquareColor(current, hue) : pos;

  const applyColor = (hex: string, p: { x: number; y: number }) => {
    setPos(p);
    if (!controlled) setUncontrolled(hex);
    onChange?.(hex);
  };

  const commit = (hex: string) => {
    const n = normalizeHex(hex);
    applyColor(n, posFromSquareColor(n, hexToHsl(n).h));
  };

  const setFromSquare = (clientX: number, clientY: number) => {
    const el = squareRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = {
      x: clamp((clientX - r.left) / r.width, 0, 1),
      y: clamp((clientY - r.top) / r.height, 0, 1),
    };
    applyColor(squareColor(hue, p.x, p.y), p);
  };

  const nudge = (dx: number, dy: number) => {
    const p = { x: clamp(effPos.x + dx, 0, 1), y: clamp(effPos.y + dy, 0, 1) };
    applyColor(squareColor(hue, p.x, p.y), p);
  };

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {label}
        </p>
      )}
      <div
        ref={squareRef}
        role="group"
        tabIndex={0}
        aria-label="Saturation and lightness. Arrow keys adjust."
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromSquare(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) setFromSquare(e.clientX, e.clientY);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            nudge(-0.02, 0);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nudge(0.02, 0);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            nudge(0, -0.02);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            nudge(0, 0.02);
          }
        }}
        style={{ backgroundColor: `hsl(${hue} 100% 50%)` }}
        className="relative h-40 w-full cursor-crosshair touch-none overflow-hidden rounded-[2px] border border-[#0a0a0b]/30 outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/20"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #ffffff, rgba(255,255,255,0))' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000000)' }}
        />
        <div
          aria-hidden
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-white shadow"
          style={{ left: `${effPos.x * 100}%`, top: `${effPos.y * 100}%`, backgroundColor: current }}
        />
      </div>
      <div className="mb-1.5 mt-3 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        <span>Hue</span>
        <span className="text-[10px] opacity-70">{hue} DEG</span>
      </div>
      <input
        type="range"
        aria-label="Hue"
        min={0}
        max={360}
        step={1}
        value={hue}
        onChange={(e) => {
          const nh = Number(e.target.value);
          hueRef.current = nh;
          applyColor(squareColor(nh, effPos.x, effPos.y), effPos);
        }}
        style={{ background: RAINBOW }}
        className={cx(
          'h-3 w-full cursor-pointer appearance-none rounded-[2px] outline-none',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
          '[&::-webkit-slider-runnable-track]:h-3 [&::-webkit-slider-runnable-track]:bg-transparent',
          '[&::-webkit-slider-thumb]:-mt-[2px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black/60 [&::-webkit-slider-thumb]:bg-white',
          '[&::-moz-range-track]:h-3 [&::-moz-range-track]:bg-transparent',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-black/60 [&::-moz-range-thumb]:bg-white',
        )}
      />
      <div role="group" aria-label="Preset colors" className="mt-3 flex flex-wrap gap-1.5">
        {swatches.map((sw) => {
          const selected = normalizeHex(sw) === normalizeHex(current);
          return (
            <button
              key={sw}
              type="button"
              aria-label={`Select ${sw}`}
              aria-pressed={selected}
              onClick={() => commit(normalizeHex(sw))}
              style={{ backgroundColor: sw }}
              className={cx(
                'flex h-7 w-7 items-center justify-center rounded-[2px] border outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                selected
                  ? 'border-[#0a0a0b] dark:border-white'
                  : 'border-[#0a0a0b]/20 dark:border-white/20',
              )}
            >
              {selected && (
                <Check size={12} aria-hidden className={isLight(sw) ? 'text-black' : 'text-white'} />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          aria-hidden
          className="h-6 w-6 shrink-0 rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/20"
          style={{ backgroundColor: normalizeHex(current) }}
        />
        <input
          aria-label="Hex value"
          value={current}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => commit(e.target.value)}
          className="h-7 w-full rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-2 font-mono text-[12px] uppercase outline-none focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:border-white/20 dark:focus:border-white/60"
        />
      </div>
    </div>
  );
}

export function ColorPickerDemo() {
  const [color, setColor] = useState('#d42b1e');
  return (
    <div className="w-full max-w-xs">
      <ColorPicker label="Picker" value={color} onChange={setColor} />
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/40">
        Selected — {color}
      </p>
    </div>
  );
}
