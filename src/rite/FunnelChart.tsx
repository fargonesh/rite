import { cx } from '../lib/cx.ts';

export interface FunnelChartDatum {
  label: string;
  value: number;
}

export interface FunnelChartProps {
  data: FunnelChartDatum[];
  className?: string;
  ariaLabel?: string;
}

const W = 320;
const STAGE_H = 30;
const GAP = 6;
const TOP = 8;
const X0 = 100;
const X1 = 272;
const CXM = (X0 + X1) / 2;
const BLOOD = '#d42b1e';

export function FunnelChart({ data, className, ariaLabel }: FunnelChartProps) {
  const height = data.length > 0 ? TOP + data.length * (STAGE_H + GAP) - GAP + TOP : 48;
  const values = data.map((d) => d.value);
  const maxV = values.length > 0 ? Math.max(...values) : 1;
  const minV = values.length > 0 ? Math.min(...values) : 0;
  const first = values.length > 0 ? values[0] : 0;
  const span = X1 - X0;
  const label =
    ariaLabel ??
    (data.length > 0
      ? `Funnel chart: ${data.map((d) => `${d.label} ${d.value} (${first === 0 ? '0' : ((d.value / first) * 100).toFixed(0)}%)`).join(', ')}`
      : 'Funnel chart: no data');
  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg role="img" aria-label={label} width="100%" height={height} viewBox={`0 0 ${W} ${height}`} className="block">
        {data.map((d, i) => {
          const y = TOP + i * (STAGE_H + GAP);
          const topW = maxV === 0 ? 0 : (d.value / maxV) * span;
          const nextV = i + 1 < data.length ? data[i + 1].value : d.value * 0.6;
          const botW = maxV === 0 ? 0 : Math.max((nextV / maxV) * span, 12);
          const isSmallest = d.value === minV && data.length > 1;
          const pct = first === 0 ? '0%' : `${((d.value / first) * 100).toFixed(0)}%`;
          return (
            <g key={d.label}>
              <polygon
                points={`${CXM - topW / 2},${y} ${CXM + topW / 2},${y} ${CXM + botW / 2},${y + STAGE_H} ${CXM - botW / 2},${y + STAGE_H}`}
                fill={isSmallest ? BLOOD : 'currentColor'}
                fillOpacity={isSmallest ? 0.9 : 0.85}
              >
                <title>{`${d.label}: ${d.value} (${pct})`}</title>
              </polygon>
              <text
                x={X0 - 8}
                y={y + STAGE_H / 2}
                textAnchor="end"
                dominantBaseline="central"
                fontSize={9}
                className="fill-[#0a0a0b]/60 font-mono uppercase dark:fill-white/55"
              >
                {d.label}
              </text>
              <text
                x={W - 4}
                y={y + STAGE_H / 2}
                textAnchor="end"
                dominantBaseline="central"
                fontSize={10}
                className="fill-[#0a0a0b] font-mono tabular-nums dark:fill-[#e9e7e2]"
              >
                {pct}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const DEMO: FunnelChartDatum[] = [
  { label: 'Called', value: 120 },
  { label: 'Bound', value: 84 },
  { label: 'Held', value: 46 },
  { label: 'Kept', value: 18 },
];

export function FunnelChartDemo() {
  return <FunnelChart data={DEMO} />;
}
