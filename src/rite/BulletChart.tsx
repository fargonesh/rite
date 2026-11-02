import { cx } from '../lib/cx.ts';

export interface BulletChartProps {
  value: number;
  target: number;
  ranges: number[];
  label?: string;
  max?: number;
  className?: string;
  ariaLabel?: string;
}

const W = 320;
const H = 40;
const PAD_X = 4;
const BAND_Y = 8;
const BAND_H = 20;
const BAR_H = 10;
const BLOOD = '#d42b1e';

export function BulletChart({ value, target, ranges, label, max, className, ariaLabel }: BulletChartProps) {
  const bands = [...ranges].sort((a, b) => a - b);
  const effMax = max ?? Math.max(...bands, value, target, 1);
  const x = (v: number) => PAD_X + (Math.min(Math.max(v, 0), effMax) / effMax) * (W - PAD_X * 2);
  const bounds = [0, ...bands.map((b) => Math.min(b, effMax))];
  if (bounds[bounds.length - 1] < effMax) bounds.push(effMax);
  const tones = [0.08, 0.15, 0.24, 0.32];
  const desc = `${label ? `${label}: ` : ''}value ${value}, target ${target}`;
  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      {label ? (
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/55">
          {label}
        </p>
      ) : null}
      <svg
        role="img"
        aria-label={ariaLabel ?? `Bullet chart: ${desc}`}
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="block"
      >
        {bounds.slice(0, -1).map((b0, i) => (
          <rect
            key={i}
            x={x(b0)}
            y={BAND_Y}
            width={Math.max(x(bounds[i + 1]) - x(b0), 0)}
            height={BAND_H}
            fill="currentColor"
            fillOpacity={tones[Math.min(i, tones.length - 1)]}
          />
        ))}
        <rect
          x={x(0)}
          y={BAND_Y + (BAND_H - BAR_H) / 2}
          width={Math.max(x(value) - x(0), 0)}
          height={BAR_H}
          fill="currentColor"
          fillOpacity={0.9}
        />
        <line x1={x(target)} y1={BAND_Y - 4} x2={x(target)} y2={BAND_Y + BAND_H + 4} stroke={BLOOD} strokeWidth={2.5} />
      </svg>
      <p className="mt-1.5 font-mono text-[11px] tabular-nums text-[#0a0a0b]/70 dark:text-white/60">
        {value} <span className="text-[#0a0a0b]/40 dark:text-white/35">/ {target}</span>
      </p>
    </div>
  );
}

export function BulletChartDemo() {
  return <BulletChart label="Sigil charge" value={72} target={85} ranges={[40, 70, 100]} />;
}
