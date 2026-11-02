import { cx } from '../lib/cx.ts';

export interface SankeyChartLink {
  /** Index into nodes (source). */
  from: number;
  /** Index into nodes (target). */
  to: number;
  value: number;
}

export interface SankeyChartProps {
  nodes: string[];
  links: SankeyChartLink[];
  height?: number;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';
const WIDTH = 320;
const PAD = { top: 8, right: 96, bottom: 8, left: 96 };
const NODE_W = 10;

function uniqInOrder(items: number[]): number[] {
  const seen = new Set<number>();
  const out: number[] = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

export function SankeyChart({
  nodes,
  links,
  height = 220,
  ariaLabel,
  className,
}: SankeyChartProps) {
  const innerH = height - PAD.top - PAD.bottom;
  const leftIds = uniqInOrder(links.map((l) => l.from));
  const rightIds = uniqInOrder(links.map((l) => l.to));
  const maxLink = links.length > 0 ? Math.max(...links.map((l) => l.value)) : 0;
  const totals = new Map<number, number>();
  for (const l of links) {
    totals.set(l.from, (totals.get(l.from) ?? 0) + l.value);
    totals.set(l.to, (totals.get(l.to) ?? 0) + l.value);
  }

  const leftX = PAD.left - NODE_W;
  const rightX = WIDTH - PAD.right;
  const midLeft = PAD.left + 4;
  const midRight = WIDTH - PAD.right - 4;

  const leftPos = new Map<number, number>();
  leftIds.forEach((id, i) => {
    leftPos.set(id, leftIds.length <= 1 ? PAD.top + innerH / 2 : PAD.top + 14 + (i * (innerH - 28)) / (leftIds.length - 1));
  });
  const rightPos = new Map<number, number>();
  rightIds.forEach((id, i) => {
    rightPos.set(id, rightIds.length <= 1 ? PAD.top + innerH / 2 : PAD.top + 14 + (i * (innerH - 28)) / (rightIds.length - 1));
  });

  // Stack multiple flows leaving/entering the same node so beziers do not overlap.
  const outCursor = new Map<number, number>();
  const inCursor = new Map<number, number>();
  const flows = links.map((l, i) => {
    const y0base = leftPos.get(l.from) ?? PAD.top;
    const y1base = rightPos.get(l.to) ?? PAD.top;
    const spread = 3;
    const k0 = (outCursor.get(l.from) ?? 0) - (links.filter((m) => m.from === l.from).length - 1) / 2;
    const k1 = (inCursor.get(l.to) ?? 0) - (links.filter((m) => m.to === l.to).length - 1) / 2;
    outCursor.set(l.from, (outCursor.get(l.from) ?? 0) + 1);
    inCursor.set(l.to, (inCursor.get(l.to) ?? 0) + 1);
    const y0 = y0base + k0 * spread;
    const y1 = y1base + k1 * spread;
    const w = maxLink === 0 ? 1 : 2 + (l.value / maxLink) * 12;
    const isMax = l.value === maxLink && maxLink > 0;
    const mx = (midLeft + midRight) / 2;
    return { l, i, y0, y1, w, isMax, d: `M ${midLeft} ${y0.toFixed(1)} C ${mx.toFixed(1)} ${y0.toFixed(1)}, ${mx.toFixed(1)} ${y1.toFixed(1)}, ${midRight} ${y1.toFixed(1)}` };
  });

  const label =
    ariaLabel ??
    (links.length > 0
      ? `Sankey chart: ${links.map((l) => `${nodes[l.from] ?? l.from} to ${nodes[l.to] ?? l.to}: ${l.value}`).join('; ')}`
      : 'Sankey chart: no flows');

  return (
    <svg
      role="img"
      aria-label={label}
      width="100%"
      height={height}
      viewBox={`0 0 ${WIDTH} ${height}`}
      className={cx('block text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
    >
      <title>{label}</title>
      {[PAD.top, PAD.top + innerH].map((y) => (
        <line
          key={y}
          x1={PAD.left}
          y1={y}
          x2={WIDTH - PAD.right}
          y2={y}
          strokeWidth={1}
          className="stroke-[#0a0a0b]/15 dark:stroke-white/10"
        />
      ))}
      {flows.map(({ l, i, w, isMax, d }) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={isMax ? BLOOD : 'currentColor'}
          strokeOpacity={isMax ? 0.85 : 0.25}
          strokeWidth={w}
        >
          <title>{`${nodes[l.from] ?? l.from} to ${nodes[l.to] ?? l.to}: ${l.value}`}</title>
        </path>
      ))}
      {leftIds.map((id) => {
        const y = leftPos.get(id) ?? PAD.top;
        return (
          <g key={`l-${id}`}>
            <rect
              x={leftX}
              y={y - 9}
              width={NODE_W}
              height={18}
              fill="currentColor"
            />
            <text
              x={leftX - 6}
              y={y}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={9}
              className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
            >
              {`${nodes[id] ?? id} ${totals.get(id) ?? 0}`}
            </text>
          </g>
        );
      })}
      {rightIds.map((id) => {
        const y = rightPos.get(id) ?? PAD.top;
        return (
          <g key={`r-${id}`}>
            <rect
              x={rightX}
              y={y - 9}
              width={NODE_W}
              height={18}
              fill="currentColor"
            />
            <text
              x={rightX + NODE_W + 6}
              y={y}
              dominantBaseline="central"
              fontSize={9}
              className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
            >
              {`${nodes[id] ?? id} ${totals.get(id) ?? 0}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const DEMO_NODES = ['Coven', 'Chantry', 'Archive', 'Vault', 'Reliquary'];

const DEMO_LINKS: SankeyChartLink[] = [
  { from: 0, to: 3, value: 42 },
  { from: 0, to: 4, value: 12 },
  { from: 1, to: 3, value: 18 },
  { from: 2, to: 4, value: 27 },
];

export function SankeyChartDemo() {
  return (
    <div className="space-y-2">
      <SankeyChart nodes={DEMO_NODES} links={DEMO_LINKS} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Relic flows — largest flow marked in blood
      </p>
    </div>
  );
}
