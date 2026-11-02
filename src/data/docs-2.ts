export const docs2: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Badge: {
    usage: `import { Badge } from '@fargone/rite';\n\n<Badge variant="soft" color="indigo">\n  Survey\n</Badge>`,
    props: [
      { name: 'variant', type: "'solid' | 'soft' | 'outline'", default: "'soft'", notes: 'Controls the badge style.' },
      { name: 'color', type: "'zinc' | 'indigo' | 'emerald' | 'amber' | 'red'", default: "'zinc'", notes: 'Sets the badge color. Use red to emphasize an alert or error.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Uppercase mono label, kept short.' },
    ],
  },
  BarChart: {
    usage: `import { BarChart } from '@fargone/rite';\n\n<BarChart\n  data={[{ label: 'WAX', value: 8 }, { label: 'MYRRH', value: 22 }]}\n  height={220}\n  showGrid\n/>`,
    props: [
      { name: 'data', type: 'BarChartDatum[]', default: '—', notes: 'Each datum is label plus numeric value.' },
      { name: 'height', type: 'number', default: '220', notes: 'SVG viewBox height; width is fluid.' },
      { name: 'showGrid', type: 'boolean', default: 'true', notes: 'Toggles the four quartile gridlines.' },
      { name: 'ariaLabel', type: 'string', default: "'Bar chart'", notes: 'Announced by the svg role=img wrapper.' },
    ],
  },
  BarsList: {
    usage: `import { BarsList } from '@fargone/rite';\n\n<BarsList\n  data={[{ label: 'Alpha', value: 42 }, { label: 'Delta', value: 96 }]}\n/>`,
    props: [
      { name: 'data', type: 'BarsListDatum[]', default: '—', notes: 'Each row renders label, bar, and value.' },
      { name: 'max', type: 'number', default: 'peak of data', notes: 'Scale ceiling; defaults to the largest value.' },
    ],
  },
  Blockquote: {
    usage: `import { Blockquote } from '@fargone/rite';\n\n<Blockquote cite="Field log VII, the surveyor">\n  What was measured did not wish to be measured.\n</Blockquote>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Quoted text displayed in a blockquote.' },
      { name: 'cite', type: 'string', default: '—', notes: 'Optional attribution rendered as a mono caption.' },
    ],
  },
  Box: {
    usage: `import { Box } from '@fargone/rite';\n\n<Box padding="md" className="border border-dashed">\n  Surveyed content\n</Box>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Any content; Box adds no semantics.' },
      { name: 'padding', type: "'xs' | 'sm' | 'md'", default: '—', notes: 'Maps to p-1, p-2, or p-4.' },
      { name: 'className', type: 'string', default: '—', notes: 'Merged after the padding class.' },
    ],
  },
  Breadcrumbs: {
    usage: `import { Breadcrumbs } from '@fargone/rite';\n\n<Breadcrumbs\n  items={[{ label: 'Archive', href: '#' }, { label: 'Vesper-09' }]}\n/>`,
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', default: '—', notes: 'Last item renders as current page; href makes a link.' },
      { name: 'separator', type: 'ReactNode', default: 'chevron icon', notes: 'Custom divider, e.g. a slash span.' },
      { name: 'ariaLabel', type: 'string', default: "'Breadcrumb'", notes: 'Landmark label for the nav element.' },
    ],
  },
  BubbleChart: {
    usage: `import { BubbleChart } from '@fargone/rite';\n\n<BubbleChart\n  data={[{ x: 1, y: 4, size: 6, label: 'A' }, { x: 4, y: 11, size: 22, label: 'D' }]}\n  height={180}\n/>`,
    props: [
      { name: 'data', type: 'BubbleDatum[]', default: '—', notes: 'x/y position the bubble; size scales its radius.' },
      { name: 'height', type: 'number', default: '180', notes: 'SVG height; width is fixed at a 320 viewBox.' },
    ],
  },
  BulletChart: {
    usage: `import { BulletChart } from '@fargone/rite';\n\n<BulletChart\n  label="Sigil charge"\n  value={72}\n  target={85}\n  ranges={[40, 70, 100]}\n/>`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Filled bar length against the scale.' },
      { name: 'target', type: 'number', default: '—', notes: 'Target value shown as a marker line.' },
      { name: 'ranges', type: 'number[]', default: '—', notes: 'Sorted into qualitative background bands.' },
      { name: 'label', type: 'string', default: '—', notes: 'Caption above the chart.' },
      { name: 'max', type: 'number', default: 'max of bands/value/target', notes: 'Override the scale ceiling.' },
      { name: 'ariaLabel', type: 'string', default: 'auto description', notes: 'Defaults to label plus value and target.' },
    ],
  },
  Burger: {
    usage: `import { Burger } from '@fargone/rite';\n\n<Burger opened={false} size="md" aria-label="Open navigation" />`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Required. Morphs the three lines into an X.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Button box and line proportions.' },
      { name: 'aria-label', type: 'string', default: 'Open/Close navigation', notes: 'Defaults flip with the opened state.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Inherited button prop; dims the control.' },
    ],
  },
  Button: {
    usage: `import { Button } from '@fargone/rite';\n\n<Button variant="primary" size="md">\n  Confirm\n</Button>`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", notes: 'Controls visual emphasis. The destructive variant indicates a potentially harmful action.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Height and padding scale; labels stay uppercase mono.' },
      { name: 'loading', type: 'boolean', default: 'false', notes: 'Shows a spinner and disables the button.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Inherited button prop; dims and blocks clicks.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Short uppercase label works best.' },
    ],
  },
  Calendar: {
    usage: `import { Calendar } from '@fargone/rite';\n\n<Calendar\n  value={selected}\n  onChange={setSelected}\n/>`,
    props: [
      { name: 'value', type: 'Date | null', default: '—', notes: 'Controlled selection; clicking it again clears it.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Uncontrolled initial selection.' },
      { name: 'onChange', type: '(date: Date | null) => void', default: '—', notes: 'Fires with the new selection or null.' },
      { name: 'month', type: 'Date', default: '—', notes: 'Controlled visible month.' },
      { name: 'defaultMonth', type: 'Date', default: 'today', notes: 'Uncontrolled initial visible month.' },
      { name: 'onMonthChange', type: '(month: Date) => void', default: '—', notes: 'Fires when prev/next arrows change the view.' },
    ],
  },
  CandlestickChart: {
    usage: `import { CandlestickChart } from '@fargone/rite';\n\n<CandlestickChart\n  data={[{ label: 'M1', open: 42, high: 51, low: 38, close: 48 }]}\n  height={220}\n/>`,
    props: [
      { name: 'data', type: 'CandleDatum[]', default: '—', notes: 'Each candle needs open, high, low, and close.' },
      { name: 'height', type: 'number', default: '220', notes: 'Chart height in pixels. Decreasing candles use the red series color.' },
    ],
  },
  Card: {
    usage: `import { Card, CardHeader, CardBody, CardFooter } from '@fargone/rite';\n\n<Card className="max-w-sm">\n  <CardHeader>Dossier 047</CardHeader>\n  <CardBody>Recovered manifest lists thirteen names.</CardBody>\n  <CardFooter>Witnessed</CardFooter>\n</Card>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Compose with CardHeader, CardBody, and CardFooter.' },
      { name: 'className', type: 'string', default: '—', notes: 'Additional CSS classes for the card.' },
      { name: 'id', type: 'string', default: '—', notes: 'Standard div attribute for anchoring.' },
      { name: 'style', type: 'CSSProperties', default: '—', notes: 'Standard div attribute for inline tweaks.' },
    ],
  },
  Carousel: {
    usage: `import { Carousel } from '@fargone/rite';\n\n<Carousel\n  slides={[<div>Exhibit 01</div>, <div>Exhibit 02</div>]}\n  showDots\n/>`,
    props: [
      { name: 'slides', type: 'ReactNode[]', default: '—', notes: 'Each slide fills the viewport; wraps around at the ends.' },
      { name: 'showArrows', type: 'boolean', default: 'true', notes: 'Prev/next buttons in the header bar.' },
      { name: 'showDots', type: 'boolean', default: 'true', notes: 'Shows or hides the pagination dots. The active dot uses the accent color.' },
    ],
  },
  Cascader: {
    usage: `import { Cascader } from '@fargone/rite';\n\n<Cascader\n  label="Path"\n  data={options}\n  defaultValue={['archive', 'dossiers']}\n/>`,
    props: [
      { name: 'data', type: 'TreeNodeData[]', default: '—', notes: 'Nested options; leaf nodes commit the path.' },
      { name: 'value', type: 'string[]', default: '—', notes: 'Controlled path of selected node values.' },
      { name: 'defaultValue', type: 'string[]', default: '[]', notes: 'Uncontrolled initial path.' },
      { name: 'onChange', type: '(value: string[]) => void', default: '—', notes: 'Fires when a leaf node is picked.' },
      { name: 'label', type: 'string', default: '—', notes: 'Caption above the trigger button.' },
      { name: 'placeholder', type: 'string', default: "'Select…'", notes: 'Shown when no path is selected.' },
    ],
  },
};
