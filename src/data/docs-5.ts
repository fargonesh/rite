export const docs5: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Flex: {
    usage: `import { Flex } from '@fargone/rite';\n\n<Flex gap="sm" direction="row" justify="space-between" align="center">\n  <span>Left</span>\n  <span>Right</span>\n</Flex>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Flex items laid out in a row or column.' },
      { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Spacing scale mapped to Tailwind gap utilities.' },
      { name: 'direction', type: "'row' | 'column'", default: "'row'", notes: 'Main axis of the flex container.' },
      { name: 'justify', type: "CSSProperties['justifyContent']", notes: 'Passed straight to justify-content style.' },
      { name: 'align', type: "CSSProperties['alignItems']", notes: 'Passed straight to align-items style.' },
      { name: 'wrap', type: 'boolean', default: 'false', notes: 'Toggles flex-wrap between wrap and nowrap.' },
    ],
  },
  FloatingIndicator: {
    usage: `import { FloatingIndicator } from '@fargone/rite';\n\nconst items = [\n  { id: 'witness', label: 'Witness' },\n  { id: 'ledger', label: 'Ledger' },\n];\n<FloatingIndicator active="witness" items={items} onSelect={(id) => console.log(id)} />`,
    props: [
      { name: 'active', type: 'string | number', default: '—', notes: 'Id of the selected item; the sliding slab tracks it.' },
      { name: 'items', type: 'FloatingIndicatorItem[]', default: '—', notes: 'Each item is { id, label } rendered as a tab.' },
      { name: 'onSelect', type: '(id: string | number) => void', notes: 'Fired when a tab is clicked; pair with state for active.' },
    ],
  },
  FloatingWindow: {
    usage: `import { FloatingWindow } from '@fargone/rite';\n\n<FloatingWindow title="FILE 047 — VESPER" defaultPosition={{ x: 24, y: 44 }}>\n  <p>Draggable survey panel sealed for review.</p>\n</FloatingWindow>`,
    props: [
      { name: 'title', type: 'string', default: "'Dossier'", notes: 'Header label and dialog aria-label; also used for the close button.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Panel body content.' },
      { name: 'defaultPosition', type: '{ x: number; y: number }', notes: 'Initial offset in px; drag the header to reposition after mount.' },
    ],
  },
  FocusTrap: {
    usage: `import { FocusTrap } from '@fargone/rite';\n\n<FocusTrap active>\n  <button>First</button>\n  <button>Second</button>\n</FocusTrap>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Region Tab cycles within while the trap is engaged.' },
      { name: 'active', type: 'boolean', default: 'true', notes: 'Engages the trap; on unmount focus returns to the prior element.' },
      { name: 'className', type: 'string', notes: 'Passthrough for the wrapper div styling.' },
    ],
  },
  FunnelChart: {
    usage: `import { FunnelChart } from '@fargone/rite';\n\nconst data = [\n  { label: 'Called', value: 120 },\n  { label: 'Bound', value: 84 },\n  { label: 'Kept', value: 18 },\n];\n<FunnelChart data={data} ariaLabel="Intake funnel" />`,
    props: [
      { name: 'data', type: 'FunnelChartDatum[]', default: '—', notes: 'Ordered stages; each datum is { label, value } top to bottom.' },
      { name: 'ariaLabel', type: 'string', notes: 'Defaults to an auto summary with per-stage values and percentages.' },
      { name: 'className', type: 'string', notes: 'Passthrough for the chart wrapper.' },
    ],
  },
  GaugeChart: {
    usage: `import { GaugeChart } from '@fargone/rite';\n\n<GaugeChart value={68} label="Sigil integrity" size={180} />`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Clamped to 0-100; drives the arc sweep, needle, and readout.' },
      { name: 'label', type: 'string', notes: 'Caption rendered under the dial.' },
      { name: 'size', type: 'number', default: '180', notes: 'Dial width in px; height derives from the radius.' },
      { name: 'ariaLabel', type: 'string', notes: 'Defaults to a gauge summary including label and value of 100.' },
    ],
  },
  Grid: {
    usage: `import { Grid, GridCol } from '@fargone/rite';\n\n<Grid gap="sm" columns={12}>\n  <GridCol span={6}>Alpha</GridCol>\n  <GridCol span={6}>Beta</GridCol>\n</Grid>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Usually GridCol cells with span and offset.' },
      { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Spacing scale mapped to Tailwind gap utilities.' },
      { name: 'columns', type: 'number', default: '12', notes: 'Column count for the repeat() track template.' },
      { name: 'span', type: 'number', notes: 'GridCol prop: how many tracks the cell spans.' },
      { name: 'offset', type: 'number', notes: 'GridCol prop: empty tracks skipped before the cell.' },
    ],
  },
  Group: {
    usage: `import { Group } from '@fargone/rite';\n\n<Group gap="sm" justify="flex-start" align="center" wrap>\n  <span>Alpha</span>\n  <span>Beta</span>\n</Group>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Inline items kept on one axis with wrapping.' },
      { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Spacing scale mapped to Tailwind gap utilities.' },
      { name: 'justify', type: "CSSProperties['justifyContent']", default: "'flex-start'", notes: 'Main-axis distribution of the row.' },
      { name: 'align', type: "CSSProperties['alignItems']", default: "'center'", notes: 'Cross-axis alignment of the row.' },
      { name: 'wrap', type: 'boolean', default: 'true', notes: 'Toggles flex-wrap; true by default unlike Flex.' },
    ],
  },
  Heatmap: {
    usage: `import { Heatmap } from '@fargone/rite';\n\nconst data = [\n  [3, 7, 12],\n  [8, 14, 6],\n];\n<Heatmap data={data} labels={{ rows: ['Mon', 'Tue'], cols: ['A', 'B', 'C'] }} />`,
    props: [
      { name: 'data', type: 'number[][]', default: '—', notes: 'Row-major matrix; opacity scales with each value in range.' },
      { name: 'labels', type: 'HeatmapLabels', default: '—', notes: 'Optional { rows, cols } captions; falls back to R1/C1 style.' },
      { name: 'ariaLabel', type: 'string', notes: 'Defaults to a summary of rows, columns, and value range.' },
    ],
  },
  Highlight: {
    usage: `import { Highlight } from '@fargone/rite';\n\n<Highlight text="The survey team marked the blood-red door twice." query="survey" />`,
    props: [
      { name: 'text', type: 'string', default: '—', notes: 'Full source string to search within.' },
      { name: 'query', type: 'string', default: '—', notes: 'Case-insensitive match; every occurrence is wrapped in Mark.' },
      { name: 'className', type: 'string', notes: 'Passthrough for the wrapping span.' },
    ],
  },
  HoverCard: {
    usage: `import { HoverCard } from '@fargone/rite';\n\n<HoverCard target={<button>VESPER-07</button>} openDelay={200}>\n  Codename NIGHTJAR. Last seen crossing the north witness line.\n</HoverCard>`,
    props: [
      { name: 'target', type: 'ReactNode', default: '—', notes: 'The element that reveals the card when hovered or focused.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Panel body rendered above the target.' },
      { name: 'openDelay', type: 'number', default: '200', notes: 'Hover delay in ms before the panel opens.' },
    ],
  },
  HueSlider: {
    usage: `import { useState } from 'react';\nimport { HueSlider } from '@fargone/rite';\n\nconst [hue, setHue] = useState(12);\n<HueSlider label="Hue" value={hue} onChange={setHue} />`,
    props: [
      { name: 'label', type: 'string', default: "'Hue'", notes: 'Caption paired with the live degree readout.' },
      { name: 'value', type: 'number', default: '—', notes: 'Controlled hue 0-360; omit for uncontrolled use.' },
      { name: 'defaultValue', type: 'number', default: '0', notes: 'Initial hue for uncontrolled use.' },
      { name: 'onChange', type: '(value: number) => void', notes: 'Receives the clamped and rounded hue.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims the rainbow track and blocks input.' },
    ],
  },
  Image: {
    usage: `import { Image } from '@fargone/rite';\n\n<Image src="/plates/north-line.jpg" alt="North witness line plate" ratio="16/9" />`,
    props: [
      { name: 'src', type: 'string', notes: 'Empty or failed loads render the fallback instead.' },
      { name: 'alt', type: 'string', default: '—', notes: 'Required; doubles as the fallback region label.' },
      { name: 'fallback', type: 'ReactNode', notes: 'Custom placeholder; default is a dark no-signal panel.' },
      { name: 'ratio', type: "'16/9' | '1/1' | '4/3'", default: "'16/9'", notes: 'Aspect-ratio frame the image or fallback fills.' },
    ],
  },
  Indicator: {
    usage: `import { Indicator } from '@fargone/rite';\n\n<Indicator label={7} tone="blood">\n  <span>Inbox</span>\n</Indicator>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Anchor the badge pins to the top-right of this element.' },
      { name: 'label', type: 'string | number', notes: 'Omit for a plain dot; otherwise renders the count text.' },
      { name: 'tone', type: "'blood' | 'ink'", default: "'blood'", notes: 'Sets the alert color. The ink tone adapts to the active color scheme.' },
      { name: 'position', type: "'top-right'", default: "'top-right'", notes: 'Reserved for future placements; only top-right today.' },
    ],
  },
  InlineDateTimePicker: {
    usage: `import { useState } from 'react';\nimport { InlineDateTimePicker } from '@fargone/rite';\n\nconst [when, setWhen] = useState<Date | null>(null);\n<InlineDateTimePicker value={when} onChange={setWhen} withTime />`,
    props: [
      { name: 'value', type: 'Date | null', notes: 'Controlled selection; omit for uncontrolled use.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Initial selection for uncontrolled use.' },
      { name: 'onChange', type: '(value: Date | null) => void', notes: 'Fired on day or time-slot picks; preserves the other half.' },
      { name: 'withTime', type: 'boolean', default: 'true', notes: 'Set false to render the calendar without the time row.' },
    ],
  },
};
