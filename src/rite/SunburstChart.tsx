import { cx } from '../lib/cx.ts';

export interface SunburstDatum {
  label: string;
  value: number;
  children?: SunburstDatum[];
}

export interface SunburstChartProps {
  data: SunburstDatum[];
  size?: number;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';

function polar(cx0: number, cy0: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx0 + r * Math.cos(a), cy0 + r * Math.sin(a)];
}

function sectorPath(cx0: number, cy0: number, rOuter: number, rInner: number, a0: number, a1: number): string {
  const [ox0, oy0] = polar(cx0, cy0, rOuter, a0);
  const [ox1, oy1] = polar(cx0, cy0, rOuter, a1);
  const [ix1, iy1] = polar(cx0, cy0, rInner, a1);
  const [ix0, iy0] = polar(cx0, cy0, rInner, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${ox0} ${oy0} A ${rOuter} ${rOuter} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${rInner} ${rInner} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

export function SunburstChart({ data, size = 220, ariaLabel = 'Sunburst chart', className }: SunburstChartProps) {
  const c = size / 2;
  const r0 = size * 0.16;
  const r1 = size * 0.32;
  const r2 = size * 0.48;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const maxTop = data.reduce((m, d) => Math.max(m, d.value), 0);

  let cursor = 0;
  const rings: { d: SunburstDatum; a0: number; a1: number; depth: 0 | 1; parentMax?: boolean }[] = [];
  for (const d of data) {
    const span = (d.value / total) * 360;
    const a0 = cursor;
    const a1 = cursor + span;
    rings.push({ d, a0, a1, depth: 0, parentMax: d.value === maxTop });
    const kids = d.children ?? [];
    const kidTotal = kids.reduce((s, k) => s + k.value, 0) || 1;
    let kc = a0;
    for (const k of kids) {
      const ks = (k.value / kidTotal) * span;
      rings.push({ d: k, a0: kc, a1: kc + ks, depth: 1 });
      kc += ks;
    }
    cursor = a1;
  }

  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg role="img" aria-label={ariaLabel} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <title>{ariaLabel}</title>
        {rings.map(({ d, a0, a1, depth, parentMax }, i) => {
          if (a1 - a0 <= 0) return null;
          const fill = parentMax && depth === 0 ? BLOOD : 'currentColor';
          const opacity = depth === 0 ? 0.85 : 0.35;
          return (
            <path
              // eslint-disable-next-line react/no-array-index-key
              key={`${d.label}-${i}`}
              d={sectorPath(c, c, depth === 0 ? r1 : r2, depth === 0 ? r0 : r1, a0 + 0.6, a1 - 0.6)}
              fill={fill}
              fillOpacity={opacity}
              strokeWidth={1}
              className="stroke-[#e9e7e2] dark:stroke-[#08090b]"
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </path>
          );
        })}
        <text x={c} y={c - 6} textAnchor="middle" fontSize={size * 0.09} fontWeight={600} fill="currentColor" fontFamily="inherit">
          {total}
        </text>
        <text x={c} y={c + size * 0.07} textAnchor="middle" fontSize={size * 0.045} fill="currentColor" opacity={0.55} fontFamily="inherit">
          TOTAL
        </text>
      </svg>
      <ul className="mt-2 space-y-1 font-mono text-[11px]">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-2 w-2"
              style={{ backgroundColor: d.value === maxTop ? BLOOD : 'currentColor', opacity: d.value === maxTop ? 1 : 0.6 }}
            />
            <span>{d.label}</span>
            <span className="opacity-50">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SunburstChartDemo() {
  return (
    <SunburstChart
      ariaLabel="Operations demo sunburst"
      data={[
        { label: 'Vigil', value: 40, children: [{ label: 'Night', value: 25 }, { label: 'Day', value: 15 }] },
        { label: 'Foundry', value: 30, children: [{ label: 'Pipes', value: 18 }, { label: 'Models', value: 12 }] },
        { label: 'Archive', value: 20 },
      ]}
    />
  );
}
