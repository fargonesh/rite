export const docs1: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Accordion: {
    usage: `import { Accordion } from '@fargone/rite';\n\n<Accordion\n  defaultValue="protocol"\n  items={[\n    { value: 'protocol', label: 'Entry protocol', content: 'Knock twice, then enter.' },\n    { value: 'ledger', label: 'Ledger rules', content: 'Log every crossing in ink.' },\n  ]}\n/>`,
    props: [
      { name: 'items', type: 'AccordionItem[]', notes: 'Each item needs value, label, and content. Optional disabled per item.' },
      { name: 'allowMultiple', type: 'boolean', default: 'false', notes: 'Single open panel by default; true lets several stay open.' },
      { name: 'value', type: 'string | string[]', notes: 'Controlled open value. Pair with onChange.' },
      { name: 'defaultValue', type: 'string | string[]', notes: 'Uncontrolled initial open value.' },
      { name: 'onChange', type: '(value: string | string[]) => void', notes: 'Fires with the next open value after each toggle.' },
    ],
  },
  ActionBar: {
    usage: `import { ActionBar } from '@fargone/rite';\n\n<ActionBar\n  selected={rows.length}\n  onClear={clearSelection}\n  actions={[\n    { label: 'Export', onSelect: exportRows },\n    { label: 'Delete', onSelect: deleteRows, destructive: true },\n  ]}\n/>`,
    props: [
      { name: 'selected', type: 'number', notes: 'Count shown in the slab. Renders nothing when 0 or below.' },
      { name: 'actions', type: 'ActionBarAction[]', notes: 'Each action needs label and onSelect. Set destructive for red delete.' },
      { name: 'onClear', type: '() => void', notes: 'Optional. Shows the X dismiss button when provided.' },
    ],
  },
  ActionIcon: {
    usage: `import { ActionIcon } from '@fargone/rite';\nimport { Settings } from 'lucide-react';\n\n<ActionIcon aria-label="Settings" variant="primary" size="md">\n  <Settings size={14} />\n</ActionIcon>`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'secondary'", notes: 'Controls visual emphasis. The destructive variant indicates a potentially harmful action.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Fixed square: 28, 36, or 44 px.' },
      { name: 'children', type: 'ReactNode', notes: 'Pass a single lucide icon. Always set aria-label.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims to 40% opacity via native button disabled.' },
    ],
  },
  Affix: {
    usage: `import { Affix } from '@fargone/rite';\n\n<Affix position={{ bottom: 16, right: 16 }}>\n  <button type="button" aria-label="Quick add">Add</button>\n</Affix>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Pinned content, usually a button or badge.' },
      { name: 'position', type: 'AffixPosition', default: '{ bottom: 16, right: 16 }', notes: 'Top, right, bottom, left offsets in px. Portals to document.body.' },
    ],
  },
  AgendaView: {
    usage: `import { AgendaView } from '@fargone/rite';\n\n<AgendaView\n  events={[\n    { id: 'a1', title: 'Standup', start: new Date(2026, 4, 1, 9), end: new Date(2026, 4, 1, 9, 30) },\n    { id: 'a2', title: 'Design review', start: new Date(2026, 4, 1, 13), end: new Date(2026, 4, 1, 14) },\n  ]}\n/>`,
    props: [
      { name: 'events', type: 'AgendaViewEvent[]', notes: 'Each event needs id, title, start, and end Dates. Sorted and grouped by day.' },
    ],
  },
  Alert: {
    usage: `import { Alert } from '@fargone/rite';\n\n<Alert tone="warning" title="Fog incoming">\n  Visibility fails past the second marker.\n</Alert>`,
    props: [
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", notes: 'Sets border, label, and icon. Danger renders a red left rule.' },
      { name: 'title', type: 'string', notes: 'Optional headline appended after the tone label.' },
      { name: 'children', type: 'ReactNode', notes: 'Body copy rendered below the tone kicker.' },
    ],
  },
  AlphaSlider: {
    usage: `import { AlphaSlider } from '@fargone/rite';\n\n<AlphaSlider\n  label="Opacity"\n  color="#d42b1e"\n  value={alpha}\n  onChange={setAlpha}\n/>`,
    props: [
      { name: 'label', type: 'string', default: "'Alpha'", notes: 'Caption above the track. Also used for the input label.' },
      { name: 'value', type: 'number', notes: 'Controlled 0-1 opacity. Clamped and rounded to 2 decimals.' },
      { name: 'defaultValue', type: 'number', default: '1', notes: 'Uncontrolled starting opacity.' },
      { name: 'onChange', type: '(value: number) => void', notes: 'Receives the clamped 0-1 value.' },
      { name: 'color', type: 'string', default: "'#0a0a0b'", notes: 'Opaque end of the gradient over a checkerboard.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims track and blocks input.' },
    ],
  },
  Anchor: {
    usage: `import { Anchor } from '@fargone/rite';\n\n<p>\n  Consult the <Anchor href="#">field manual</Anchor> or open the\n  <Anchor href="https://example.com" external>outer archive</Anchor>.\n</p>`,
    props: [
      { name: 'href', type: 'string', notes: 'Required link target. Passed straight to the anchor.' },
      { name: 'external', type: 'boolean', notes: 'Adds target blank, noopener noreferrer, and an arrow icon.' },
      { name: 'children', type: 'ReactNode', notes: 'Link text. The link color changes on hover.' },
    ],
  },
  AngleSlider: {
    usage: `import { AngleSlider } from '@fargone/rite';\n\n<AngleSlider\n  label="Rotation"\n  size={120}\n  value={angle}\n  onChange={setAngle}\n/>`,
    props: [
      { name: 'label', type: 'string', default: "'Angle'", notes: 'Caption plus slider aria-label. 0 deg points up.' },
      { name: 'value', type: 'number', notes: 'Controlled degrees. Normalized to 0-359.' },
      { name: 'defaultValue', type: 'number', default: '0', notes: 'Uncontrolled starting angle.' },
      { name: 'onChange', type: '(value: number) => void', notes: 'Fires on drag and arrow keys. Shift steps by 10.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Removes from tab order and blocks pointer input.' },
      { name: 'size', type: 'number', default: '120', notes: 'Dial diameter in px.' },
    ],
  },
  AppShell: {
    usage: `import { AppShell } from '@fargone/rite';\n\n<AppShell header={<div>Vesper Manual</div>} navbar={<nav>Dossier</nav>} footer={<div>p. 01</div>}>\n  <p>Main content goes here.</p>\n</AppShell>`,
    props: [
      { name: 'header', type: 'ReactNode', notes: 'Sticky top bar with hairline border. Omit to skip.' },
      { name: 'navbar', type: 'ReactNode', notes: 'Fixed 208px left column. Hidden below lg.' },
      { name: 'aside', type: 'ReactNode', notes: 'Fixed 240px right column. Hidden below lg.' },
      { name: 'footer', type: 'ReactNode', notes: 'Bottom hairline strip.' },
      { name: 'children', type: 'ReactNode', notes: 'Main content column. Always rendered.' },
    ],
  },
  AreaChart: {
    usage: `import { AreaChart } from '@fargone/rite';\n\n<AreaChart\n  height={220}\n  showGrid\n  data={[\n    { label: 'OCT', value: 12 },\n    { label: 'NOV', value: 19 },\n    { label: 'DEC', value: 28 },\n  ]}\n/>`,
    props: [
      { name: 'data', type: 'AreaChartDatum[]', notes: 'Label plus numeric value per point. Line is Catmull-Rom smoothed.' },
      { name: 'height', type: 'number', default: '220', notes: 'SVG height in px. Width is always fluid.' },
      { name: 'showGrid', type: 'boolean', default: 'true', notes: 'Toggles the four dashed gridlines and y ticks.' },
      { name: 'ariaLabel', type: 'string', default: "'Area chart'", notes: 'Accessible name and svg title.' },
    ],
  },
  AspectRatio: {
    usage: `import { AspectRatio } from '@fargone/rite';\n\n<AspectRatio ratio="16/9">\n  <img src="/harbor.jpg" alt="Harbor at dusk" className="h-full w-full object-cover" />\n</AspectRatio>`,
    props: [
      { name: 'ratio', type: "'16/9' | '4/3' | '1/1'", default: "'16/9'", notes: 'Maps to aspect-video, aspect 4/3, or aspect-square.' },
      { name: 'children', type: 'ReactNode', notes: 'Fills the box. Media should use h-full w-full object-cover.' },
    ],
  },
  Autocomplete: {
    usage: `import { Autocomplete } from '@fargone/rite';\n\n<Autocomplete\n  label="Rite"\n  description="Type to filter the rites."\n  data={['vesper', 'matins', 'compline']}\n  value={rite}\n  onChange={setRite}\n/>`,
    props: [
      { name: 'data', type: 'string[]', notes: 'Suggestion pool filtered case-insensitively by input.' },
      { name: 'label', type: 'string', notes: 'Optional field label rendered above the input.' },
      { name: 'description', type: 'string', notes: 'Helper text. Hidden when error is set.' },
      { name: 'error', type: 'string', notes: 'Displays an error message and marks the input as invalid.' },
      { name: 'value', type: 'string', notes: 'Controlled text. Falls back to defaultValue when omitted.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled starting text.' },
      { name: 'onChange', type: '(value: string) => void', notes: 'Fires on typing and on suggestion commit.' },
      { name: 'placeholder', type: 'string', default: "'Search…'", notes: 'Input placeholder.' },
    ],
  },
  Avatar: {
    usage: `import { Avatar } from '@fargone/rite';\n\n<div className="flex items-center gap-2">\n  <Avatar name="Ada Lovelace" size="md" />\n  <Avatar name="Edgar Degas" size="lg" src="https://i.pravatar.cc/96?img=12" />\n</div>`,
    props: [
      { name: 'src', type: 'string', notes: 'Photo URL. Falls back to initials when omitted.' },
      { name: 'name', type: 'string', notes: 'Used for initials, title, and accessible label.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: '32, 40, or 48 px square with matching mono text.' },
      { name: 'variant', type: "'square'", default: "'square'", notes: 'Accepted but currently always square.' },
    ],
  },
  BackgroundImage: {
    usage: `import { BackgroundImage } from '@fargone/rite';\n\n<BackgroundImage src="/archive.jpg" dim={0.55}>\n  <div className="p-5 text-white">Annex archive, sublevel two</div>\n</BackgroundImage>`,
    props: [
      { name: 'src', type: 'string', notes: 'Cover-positioned image. Falls back to a dark gradient when omitted.' },
      { name: 'children', type: 'ReactNode', notes: 'Foreground content rendered above the scrim. Use white text.' },
      { name: 'dim', type: 'number', default: '0.5', notes: 'Black overlay opacity 0-1. Clamped; 0.55-0.8 reads best.' },
    ],
  },
};
