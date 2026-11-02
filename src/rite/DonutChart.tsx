import { cx } from '../lib/cx.ts';

export type DonutChartTone = 'ink' | 'blood' | 'dim';

export interface DonutChartDatum {
  label: string;
  value: number;
  tone?: DonutChartTone;
}

export interface DonutChartProps {
  data: DonutChartDatum[];
  size?: number;
  thickness?: number;
  /** Alias for size; accepted so radial charts share the cartesian prop shape. */
  height?: number;
  /** Accepted for API parity; radial charts render no grid. */
  showGrid?: boolean;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function swatch(tone: DonutChartTone): string {
  if (tone === 'blood') return 'bg-[#d42b1e]';
  if (tone === 'dim') return 'bg-[#0a0a0b]/20 dark:bg-white/20';
  return 'bg-[#0a0a0b] dark:bg-[#e9e7e2]';
}

export function DonutChart({
  data,
  size: sizeProp,
  thickness = 22,
  height,
  ariaLabel = 'Donut chart',
  className,
}: DonutChartProps) {
  const size = sizeProp ?? height ?? 180;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const r = (size - thickness) / 2;
  const c = size / 2;
  const C = 2 * Math.PI * r;
  const gap = data.length > 1 ? 3 : 0;
  let acc = 0;
  const segs = data.map((d) => {
    const len = total === 0 ? 0 : (d.value / total) * C;
    const start = acc;
    acc += len;
    return { d, len, start };
  });

  return (
    <div className={cx('flex items-center gap-6 text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg role="img" aria-label={ariaLabel} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0">
        <title>{ariaLabel}</title>
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          strokeWidth={thickness}
          className="stroke-[#0a0a0b]/10 dark:stroke-white/10"
        />
        {segs.map(({ d, len, start }) =>
          len <= 0 ? null : (
            <circle
              key={d.label}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={d.tone === 'blood' ? BLOOD : 'currentColor'}
              strokeOpacity={d.tone === 'dim' ? 0.2 : 1}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(len - gap, 0.5).toFixed(2)} ${(C - Math.max(len - gap, 0.5)).toFixed(2)}`}
              strokeDashoffset={(-start).toFixed(2)}
              transform={`rotate(-90 ${c} ${c})`}
            />
          ),
        )}
        <text
          x={c}
          y={c - 6}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.16}
          fill="currentColor"
          className="font-mono"
        >
          {fmt(total)}
        </text>
        <text
          x={c}
          y={c + size * 0.1}
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
        {data.map(({ label, value, tone = 'ink' }) => (
          <li key={label} className="flex items-baseline gap-2.5">
            <span aria-hidden className={cx('h-2.5 w-2.5 shrink-0', swatch(tone))} />
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/55">
              {label}
            </span>
            <span className="ml-auto font-mono text-[11px] text-[#0a0a0b] tabular-nums dark:text-[#e9e7e2]">
              {fmt(value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEMO: DonutChartDatum[] = [
  { label: 'Bound', value: 42, tone: 'ink' },
  { label: 'Loose', value: 18, tone: 'dim' },
  { label: 'Missing', value: 7, tone: 'blood' },
];

export function DonutChartDemo() {
  return (
    <div className="space-y-2">
      <DonutChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Sigil bindings — the missing are marked in blood
      </p>
    </div>
  );
}
