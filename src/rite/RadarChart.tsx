import type { SVGAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface RadarDatum {
  label: string;
  value: number;
}

export interface RadarChartProps extends SVGAttributes<SVGSVGElement> {
  data: RadarDatum[];
  max?: number;
}

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 78;
const RINGS = [0.25, 0.5, 0.75, 1];

function polar(angle: number, r: number): [number, number] {
  return [CENTER + r * Math.cos(angle - Math.PI / 2), CENTER + r * Math.sin(angle - Math.PI / 2)];
}

export function RadarChart({ data, max, className, ...rest }: RadarChartProps) {
  const axes = Math.min(8, Math.max(3, data.length));
  const trimmed = data.slice(0, axes);
  const peak = max ?? Math.max(1, ...trimmed.map((d) => (Number.isFinite(d.value) ? d.value : 0)));
  const scale = peak > 0 ? peak : 1;
  const angleAt = (i: number) => (i / trimmed.length) * Math.PI * 2;
  const ringPoints = (f: number) =>
    trimmed.map((_, i) => polar(angleAt(i), RADIUS * f).join(',')).join(' ');
  const dataPoints = trimmed
    .map((d, i) => {
      const v = Number.isFinite(d.value) ? d.value : 0;
      const f = Math.min(1, Math.max(0, v / scale));
      return polar(angleAt(i), RADIUS * f).join(',');
    })
    .join(' ');
  const label =
    trimmed.length > 0
      ? `Radar chart: ${trimmed.map((d) => `${d.label} ${d.value}`).join(', ')}`
      : 'Radar chart: no data';
  return (
    <svg
      role="img"
      aria-label={label}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cx('block text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
      {...rest}
    >
      {RINGS.map((f) => (
        <polygon
          key={f}
          points={ringPoints(f)}
          fill="none"
          className="stroke-[#0a0a0b]/20 dark:stroke-white/15"
          strokeWidth={1}
        />
      ))}
      {trimmed.map((d, i) => {
        const [ex, ey] = polar(angleAt(i), RADIUS);
        const [lx, ly] = polar(angleAt(i), RADIUS + 14);
        return (
          <g key={d.label}>
            <line
              x1={CENTER}
              y1={CENTER}
              x2={ex}
              y2={ey}
              className="stroke-[#0a0a0b]/20 dark:stroke-white/15"
              strokeWidth={1}
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={9}
              className="fill-[#0a0a0b]/60 font-mono uppercase dark:fill-white/50"
            >
              {d.label}
            </text>
          </g>
        );
      })}
      {trimmed.length > 0 && (
        <polygon
          points={dataPoints}
          fill="rgba(212,43,30,0.12)"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="miter"
        />
      )}
      {trimmed.map((d, i) => {
        const v = Number.isFinite(d.value) ? d.value : 0;
        const f = Math.min(1, Math.max(0, v / scale));
        const [cxp, cyp] = polar(angleAt(i), RADIUS * f);
        return <rect key={`pt-${i}`} x={cxp - 2.5} y={cyp - 2.5} width={5} height={5} fill="#d42b1e" />;
      })}
    </svg>
  );
}

export function RadarChartDemo() {
  return (
    <RadarChart
      data={[
        { label: 'Spd', value: 82 },
        { label: 'Pwr', value: 64 },
        { label: 'Agl', value: 91 },
        { label: 'End', value: 55 },
        { label: 'Tct', value: 73 },
      ]}
    />
  );
}
