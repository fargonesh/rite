import type { SVGAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface BubbleDatum {
  x: number;
  y: number;
  size: number;
  label?: string;
}

export interface BubbleChartProps extends SVGAttributes<SVGSVGElement> {
  data: BubbleDatum[];
  height?: number;
}

const PAD = { top: 8, right: 12, bottom: 22, left: 30 };
const MIN_R = 4;
const MAX_R = 18;
const BLOOD = '#d42b1e';

export function BubbleChart({ data, height = 180, className, ...rest }: BubbleChartProps) {
  const width = 320;
  const innerW = width - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const ss = data.map((d) => d.size);
  const minX = xs.length > 0 ? Math.min(...xs) : 0;
  const maxX = xs.length > 0 ? Math.max(...xs) : 1;
  const minY = ys.length > 0 ? Math.min(...ys) : 0;
  const maxY = ys.length > 0 ? Math.max(...ys) : 1;
  const minS = ss.length > 0 ? Math.min(...ss) : 0;
  const maxS = ss.length > 0 ? Math.max(...ss) : 1;
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const spanS = maxS - minS;
  const label =
    data.length > 0
      ? `Bubble chart: ${data.map((d) => (d.label ? `${d.label} (${d.x}, ${d.y}, size ${d.size})` : `(${d.x}, ${d.y}, size ${d.size})`)).join(', ')}`
      : 'Bubble chart: no data';
  const px = (x: number) => PAD.left + ((x - minX) / spanX) * innerW;
  const py = (y: number) => PAD.top + (1 - (y - minY) / spanY) * innerH;
  const pr = (s: number) => (spanS === 0 ? (MIN_R + MAX_R) / 2 : MIN_R + ((s - minS) / spanS) * (MAX_R - MIN_R));
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
        const isMax = d.size === maxS && data.length > 1;
        return (
          <circle
            key={i}
            cx={px(d.x)}
            cy={py(d.y)}
            r={pr(d.size)}
            fill={isMax ? BLOOD : 'currentColor'}
            opacity={isMax ? 0.9 : 0.35}
          >
            {d.label ? <title>{`${d.label} (${d.x}, ${d.y}, size ${d.size})`}</title> : null}
          </circle>
        );
      })}
    </svg>
  );
}

export function BubbleChartDemo() {
  return (
    <BubbleChart
      data={[
        { x: 1, y: 4, size: 6, label: 'A' },
        { x: 2, y: 7, size: 14, label: 'B' },
        { x: 3, y: 5, size: 9, label: 'C' },
        { x: 4, y: 11, size: 22, label: 'D' },
        { x: 5, y: 8, size: 12, label: 'E' },
        { x: 6, y: 9, size: 17, label: 'F' },
      ]}
    />
  );
}
