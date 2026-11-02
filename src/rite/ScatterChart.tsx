import type { SVGAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface ScatterDatum {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterChartProps extends SVGAttributes<SVGSVGElement> {
  data: ScatterDatum[];
  height?: number;
}

const PAD = { top: 8, right: 12, bottom: 22, left: 30 };

export function ScatterChart({ data, height = 180, className, ...rest }: ScatterChartProps) {
  const width = 320;
  const innerW = width - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = xs.length > 0 ? Math.min(...xs) : 0;
  const maxX = xs.length > 0 ? Math.max(...xs) : 1;
  const minY = ys.length > 0 ? Math.min(...ys) : 0;
  const maxY = ys.length > 0 ? Math.max(...ys) : 1;
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const top = ys.length > 0 ? Math.max(...ys) : Number.NaN;
  const label =
    data.length > 0
      ? `Scatter chart: ${data.map((d) => (d.label ? `${d.label} (${d.x}, ${d.y})` : `(${d.x}, ${d.y})`)).join(', ')}`
      : 'Scatter chart: no data';
  const px = (x: number) => PAD.left + ((x - minX) / spanX) * innerW;
  const py = (y: number) => PAD.top + (1 - (y - minY) / spanY) * innerH;
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
        y1={PAD.top}
        x2={PAD.left}
        y2={PAD.top + innerH}
        className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
        strokeWidth={1}
      />
      <line
        x1={PAD.left}
        y1={PAD.top + innerH}
        x2={PAD.left + innerW}
        y2={PAD.top + innerH}
        className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
        strokeWidth={1}
      />
      <text
        x={PAD.left}
        y={height - 6}
        fontSize={9}
        className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
      >
        {minX}
      </text>
      <text
        x={PAD.left + innerW}
        y={height - 6}
        textAnchor="end"
        fontSize={9}
        className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
      >
        {maxX}
      </text>
      <text x={4} y={PAD.top + 8} fontSize={9} className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50">
        {maxY}
      </text>
      {data.map((d, i) => {
        const isTop = d.y === top && data.length > 1;
        return (
          <g key={i}>
            <rect
              x={px(d.x) - 3}
              y={py(d.y) - 3}
              width={6}
              height={6}
              fill={isTop ? '#d42b1e' : 'currentColor'}
              opacity={isTop ? 1 : 0.85}
            >
              {d.label ? <title>{`${d.label} (${d.x}, ${d.y})`}</title> : null}
            </rect>
          </g>
        );
      })}
    </svg>
  );
}

export function ScatterChartDemo() {
  return (
    <ScatterChart
      data={[
        { x: 1, y: 4, label: 'A' },
        { x: 2, y: 7, label: 'B' },
        { x: 3, y: 5, label: 'C' },
        { x: 4, y: 11, label: 'D' },
        { x: 5, y: 8, label: 'E' },
        { x: 6, y: 13, label: 'F' },
        { x: 7, y: 9, label: 'G' },
      ]}
    />
  );
}
