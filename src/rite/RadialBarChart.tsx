import { cx } from '../lib/cx.ts';

export type RadialBarChartTone = 'ink' | 'blood' | 'dim';

export interface RadialBarChartDatum {
  label: string;
  /** Progress value, 0-100. */
  value: number;
  tone?: RadialBarChartTone;
}

export interface RadialBarChartProps {
  data: RadialBarChartDatum[];
  size?: number;
  thickness?: number;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';

function clamp(v: number): number {
  return Math.min(100, Math.max(0, v));
}

function swatch(tone: RadialBarChartTone): string {
  if (tone === 'blood') return 'bg-[#d42b1e]';
  if (tone === 'dim') return 'bg-[#0a0a0b]/20 dark:bg-white/20';
  return 'bg-[#0a0a0b] dark:bg-[#e9e7e2]';
}

export function RadialBarChart({
  data,
  size = 180,
  thickness = 12,
  ariaLabel,
  className,
}: RadialBarChartProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const c = size / 2;
  const gap = thickness + 6;
  const label =
    ariaLabel ??
    (data.length > 0
      ? `Radial bar chart: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`
      : 'Radial bar chart: no data');

  return (
    <div className={cx('flex items-center gap-6 text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg
        role="img"
        aria-label={label}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block shrink-0"
      >
        <title>{label}</title>
        {data.map((d, i) => {
          const r = c - thickness / 2 - i * gap;
          if (r <= 0) return null;
          const C = 2 * Math.PI * r;
          const frac = clamp(d.value) / 100;
          const len = frac * C;
          return (
            <g key={d.label}>
              <circle
                cx={c}
                cy={c}
                r={r}
                fill="none"
                strokeWidth={thickness}
                className="stroke-[#0a0a0b]/10 dark:stroke-white/10"
              />
              {len > 0 ? (
                <circle
                  cx={c}
                  cy={c}
                  r={r}
                  fill="none"
                  stroke={d.tone === 'blood' ? BLOOD : 'currentColor'}
                  strokeOpacity={d.tone === 'dim' ? 0.25 : 1}
                  strokeWidth={thickness}
                  strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${c} ${c})`}
                >
                  <title>{`${d.label}: ${d.value}`}</title>
                </circle>
              ) : null}
            </g>
          );
        })}
        <text
          x={c}
          y={c - 6}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.13}
          fill="currentColor"
          className="font-mono"
        >
          {total}
        </text>
        <text
          x={c}
          y={c + size * 0.09}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={9}
          fill="currentColor"
          opacity={0.55}
          className="font-mono uppercase"
          letterSpacing={2}
        >
          Total
        </text>
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {data.map(({ label: name, value, tone = 'ink' }) => (
          <li key={name} className="flex items-baseline gap-2.5">
            <span aria-hidden className={cx('h-2.5 w-2.5 shrink-0', swatch(tone))} />
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/55">
              {name}
            </span>
            <span className="ml-auto font-mono text-[11px] tabular-nums text-[#0a0a0b] dark:text-[#e9e7e2]">
              {clamp(value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEMO: RadialBarChartDatum[] = [
  { label: 'Sigils', value: 82, tone: 'ink' },
  { label: 'Wards', value: 54, tone: 'dim' },
  { label: 'Breaches', value: 31, tone: 'blood' },
];

export function RadialBarChartDemo() {
  return (
    <div className="space-y-2">
      <RadialBarChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Vault integrity — breaches marked in blood
      </p>
    </div>
  );
}
