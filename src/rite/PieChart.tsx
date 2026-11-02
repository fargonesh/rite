import { cx } from '../lib/cx.ts';

export type PieChartTone = 'ink' | 'blood' | 'dim';

export interface PieChartDatum {
  label: string;
  value: number;
  tone?: PieChartTone;
}

export interface PieChartProps {
  data: PieChartDatum[];
  size?: number;
  /** Alias for size; accepted so radial charts share the cartesian prop shape. */
  height?: number;
  /** Accepted for API parity; radial charts render no grid. */
  showGrid?: boolean;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';
/** Angular pad per slice edge (radians); gaps double as hairline separators on any background. */
const PAD = 0.035;

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function swatch(tone: PieChartTone): string {
  if (tone === 'blood') return 'bg-[#d42b1e]';
  if (tone === 'dim') return 'bg-[#0a0a0b]/20 dark:bg-white/20';
  return 'bg-[#0a0a0b] dark:bg-[#e9e7e2]';
}

export function PieChart({ data, size: sizeProp, height, ariaLabel = 'Pie chart', className }: PieChartProps) {
  const size = sizeProp ?? height ?? 180;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const c = size / 2;
  const r = (size - 8) / 2;
  let angle = -Math.PI / 2;
  const slices = data.map((d) => {
    const frac = total === 0 ? 0 : d.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    return { d, frac, a0, a1 };
  });

  const pt = (a: number): [number, number] => [c + r * Math.cos(a), c + r * Math.sin(a)];

  return (
    <div className={cx('flex items-center gap-6 text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg role="img" aria-label={ariaLabel} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0">
        <title>{ariaLabel}</title>
        {total === 0 && (
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            strokeWidth={1}
            className="stroke-[#0a0a0b]/20 dark:stroke-white/20"
          />
        )}
        {slices.map(({ d, frac, a0, a1 }) => {
          if (frac <= 0) return null;
          const fill = d.tone === 'blood' ? BLOOD : 'currentColor';
          const fillOpacity = d.tone === 'dim' ? 0.2 : 1;
          if (frac >= 1) {
            return <circle key={d.label} cx={c} cy={c} r={r} fill={fill} fillOpacity={fillOpacity} />;
          }
          const s0 = a0 + PAD / 2;
          const s1 = a1 - PAD / 2;
          if (s1 <= s0) return null;
          const [x0, y0] = pt(s0);
          const [x1, y1] = pt(s1);
          const large = s1 - s0 > Math.PI ? 1 : 0;
          return (
            <path
              key={d.label}
              d={`M ${c} ${c} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`}
              fill={fill}
              fillOpacity={fillOpacity}
            />
          );
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {slices.map(({ d, frac }) => (
          <li key={d.label} className="flex items-baseline gap-2.5">
            <span aria-hidden className={cx('h-2.5 w-2.5 shrink-0', swatch(d.tone ?? 'ink'))} />
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/55">
              {d.label}
            </span>
            <span className="ml-auto font-mono text-[11px] text-[#0a0a0b] tabular-nums dark:text-[#e9e7e2]">
              {fmt(d.value)} · {total === 0 ? '0' : Math.round(frac * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEMO: PieChartDatum[] = [
  { label: 'Parchment', value: 34, tone: 'ink' },
  { label: 'Vellum', value: 21, tone: 'dim' },
  { label: 'Flesh', value: 9, tone: 'blood' },
];

export function PieChartDemo() {
  return (
    <div className="space-y-2">
      <PieChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Pact mediums by folio — flesh takes its cut
      </p>
    </div>
  );
}
