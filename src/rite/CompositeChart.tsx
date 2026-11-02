import type { SVGAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface CompositeBarDatum {
  label: string;
  value: number;
}

export interface CompositeChartProps extends SVGAttributes<SVGSVGElement> {
  bars: CompositeBarDatum[];
  line: number[];
  height?: number;
}

const PAD = { top: 10, right: 12, bottom: 22, left: 30 };

export function CompositeChart({ bars, line, height = 200, className, ...rest }: CompositeChartProps) {
  const width = 360;
  const innerW = width - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;
  const n = bars.length;
  const barVals = bars.map((b) => (Number.isFinite(b.value) ? b.value : 0));
  const lineVals = line.map((v) => (Number.isFinite(v) ? v : 0));
  const peak = Math.max(1, ...barVals, ...lineVals);
  const slot = n > 0 ? innerW / n : innerW;
  const barW = Math.max(4, Math.min(28, slot * 0.5));
  const linePts =
    n > 0
      ? lineVals
          .slice(0, n)
          .map((v, i) => {
            const cxp = PAD.left + slot * i + slot / 2;
            const cyp = PAD.top + (1 - Math.min(1, Math.max(0, v / peak))) * innerH;
            return `${cxp.toFixed(2)},${cyp.toFixed(2)}`;
          })
          .join(' ')
      : '';
  const label =
    bars.length > 0
      ? `Composite chart: bars ${bars.map((b) => `${b.label} ${b.value}`).join(', ')}; line ${lineVals.join(', ')}`
      : 'Composite chart: no data';
  return (
    <svg
      role="img"
      aria-label={label}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cx('block text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
      {...rest}
    >
      <line
        x1={PAD.left}
        y1={PAD.top + innerH}
        x2={PAD.left + innerW}
        y2={PAD.top + innerH}
        className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
        strokeWidth={1}
      />
      {bars.map((b, i) => {
        const v = barVals[i];
        const f = Math.min(1, Math.max(0, v / peak));
        const h = f * innerH;
        const cxp = PAD.left + slot * i + slot / 2;
        return (
          <g key={`${b.label}-${i}`}>
            <rect
              x={cxp - barW / 2}
              y={PAD.top + innerH - h}
              width={barW}
              height={h}
              className="fill-[#0a0a0b]/80 dark:fill-white/80"
            />
            <text
              x={cxp}
              y={height - 6}
              textAnchor="middle"
              fontSize={9}
              className="fill-[#0a0a0b]/60 font-mono uppercase dark:fill-white/50"
            >
              {b.label}
            </text>
          </g>
        );
      })}
      {n > 0 && lineVals.length > 0 && (
        <polyline points={linePts} fill="none" stroke="#d42b1e" strokeWidth={1.5} strokeLinejoin="miter" />
      )}
      {n > 0 &&
        lineVals.slice(0, n).map((v, i) => {
          const cxp = PAD.left + slot * i + slot / 2;
          const cyp = PAD.top + (1 - Math.min(1, Math.max(0, v / peak))) * innerH;
          return <rect key={i} x={cxp - 2.5} y={cyp - 2.5} width={5} height={5} fill="#d42b1e" />;
        })}
    </svg>
  );
}

export function CompositeChartDemo() {
  return (
    <CompositeChart
      bars={[
        { label: 'Jan', value: 42 },
        { label: 'Feb', value: 68 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 84 },
        { label: 'May', value: 61 },
      ]}
      line={[38, 60, 52, 78, 70]}
    />
  );
}
