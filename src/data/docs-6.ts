export const docs6: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Input: {
    usage: `import { Input } from '@fargone/rite';\n\n<Input\n  placeholder="Search the archive"\n  error="Required — stamp before filing"\n/>`,
    props: [
      { name: 'leftSection', type: 'ReactNode', default: '—', notes: 'Icon or adornment pinned to the left edge.' },
      { name: 'rightSection', type: 'ReactNode', default: '—', notes: 'Action pinned right, e.g. a clear button.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message below the field and applies the error style.' },
      { name: 'placeholder', type: 'string', default: '—', notes: 'Standard input placeholder text.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Dims the field and blocks interaction.' },
    ],
  },
  JsonInput: {
    usage: `import { JsonInput } from '@fargone/rite';\n\n<JsonInput\n  label="Payload"\n  description="Must parse as JSON."\n  defaultValue={'{ "file": "VES-001" }'}\n  rows={5}\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'Uppercase mono label rendered above the textarea.' },
      { name: 'description', type: 'string', default: '—', notes: 'Helper text; hidden while a validation error shows.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled raw JSON text.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled initial text.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires with the raw text on every keystroke.' },
      { name: 'rows', type: 'number', default: '6', notes: 'Visible textarea height in rows.' },
    ],
  },
  JsonViewer: {
    usage: `import { JsonViewer } from '@fargone/rite';\n\nconst record = { dossier: 'VESPER', count: 42, active: true };\n\n<JsonViewer data={record} collapsed={false} />`,
    props: [
      { name: 'data', type: 'unknown', default: '—', notes: 'Any JSON-serializable value rendered as a tree.' },
      { name: 'collapsed', type: 'boolean', default: 'false', notes: 'Start with every node collapsed when true.' },
    ],
  },
  Kbd: {
    usage: `import { Kbd } from '@fargone/rite';\n\n<p>\n  Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search\n</p>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', notes: 'Key label, e.g. Ctrl or Esc.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes appended to the kbd element.' },
    ],
  },
  Lightbox: {
    usage: `import { Lightbox } from '@fargone/rite';\n\n<Lightbox\n  opened={opened}\n  onClose={() => setOpened(false)}\n  images={[{ label: 'Exhibit A' }, { label: 'Exhibit B' }]}\n/>`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Mounts the fullscreen dialog when true.' },
      { name: 'onClose', type: '() => void', default: '—', notes: 'Called on close button and Escape key.' },
      { name: 'images', type: 'LightboxImage[]', default: '—', notes: 'Slides with optional src and label.' },
      { name: 'index', type: 'number', default: '—', notes: 'Controlled active slide index.' },
      { name: 'defaultIndex', type: 'number', default: '0', notes: 'Initial slide for uncontrolled use.' },
      { name: 'onIndexChange', type: '(index: number) => void', default: '—', notes: 'Fires after prev/next navigation, wraps around.' },
    ],
  },
  LineChart: {
    usage: `import { LineChart } from '@fargone/rite';\n\nconst data = [{ label: 'DUSK', value: 9 }, { label: 'DAWN', value: 20 }];\n\n<LineChart data={data} threshold={21} height={220} />`,
    props: [
      { name: 'data', type: 'LineChartDatum[]', default: '—', notes: 'Points shaped as label plus numeric value.' },
      { name: 'height', type: 'number', default: '220', notes: 'SVG viewport height in px.' },
      { name: 'showGrid', type: 'boolean', default: 'true', notes: 'Toggle the horizontal gridlines and ticks.' },
      { name: 'threshold', type: 'number', default: '—', notes: 'Displays a dashed reference line and includes the value in the chart scale.' },
      { name: 'ariaLabel', type: 'string', default: "'Line chart'", notes: 'Accessible name for the svg role=img.' },
    ],
  },
  List: {
    usage: `import { List } from '@fargone/rite';\n\n<List\n  ordered\n  items={['Enter alone', 'Read the passage once', 'Leave before the echo']}\n/>`,
    props: [
      { name: 'items', type: 'ReactNode[]', default: '—', notes: 'Row content rendered in order.' },
      { name: 'ordered', type: 'boolean', default: '—', notes: 'Numbered 01-style rows instead of bullets.' },
      { name: 'icon', type: 'ReactNode', default: "'—'", notes: 'Bullet marker for unordered lists.' },
    ],
  },
  Loader: {
    usage: `import { Loader } from '@fargone/rite';\n\n<Loader variant="bars" size="sm" label="Fetching" />`,
    props: [
      { name: 'variant', type: "'bars' | 'dots' | 'ring'", default: "'bars'", notes: 'Selects the loader animation.' },
      { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'sm'", notes: 'Sets the loader size.' },
      { name: 'label', type: 'string', default: '—', notes: 'Accessible loading label. Defaults to Loading.' },
    ],
  },
  LoadingOverlay: {
    usage: `import { LoadingOverlay } from '@fargone/rite';\n\n<div style={{ position: 'relative' }}>\n  <p>Witness ledger</p>\n  <LoadingOverlay visible={busy} label="communing…" />\n</div>`,
    props: [
      { name: 'visible', type: 'boolean', default: '—', notes: 'Renders the absolute veil only when true.' },
      { name: 'label', type: 'string', default: "'communing…'", notes: 'Mono status text under the spinner.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes for the veil container.' },
    ],
  },
  Mark: {
    usage: `import { Mark } from '@fargone/rite';\n\n<p>\n  Flagged <Mark>blood for signal</Mark> in the margin\n</p>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Highlighted inline text.' },
      { name: 'tone', type: "'blood' | 'ink'", default: "'blood'", notes: 'Sets the highlight color.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes appended to the mark element.' },
    ],
  },
  Marquee: {
    usage: `import { Marquee } from '@fargone/rite';\n\n<Marquee speed={20} pauseOnHover>\n  <span>SEALED</span>\n  <span>WITNESSED</span>\n</Marquee>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Track content, duplicated once for a seamless loop.' },
      { name: 'speed', type: 'number', default: '20', notes: 'Loop duration in seconds.' },
      { name: 'pauseOnHover', type: 'boolean', default: 'true', notes: 'Pauses the animation while hovered.' },
    ],
  },
  MaskInput: {
    usage: `import { MaskInput } from '@fargone/rite';\n\n<MaskInput\n  label="Case ref"\n  mask="__-__"\n  description="Two slots, dash, two slots."\n/>`,
    props: [
      { name: 'mask', type: 'string', default: '—', notes: 'Pattern where _ is a slot and other chars are literals.' },
      { name: 'label', type: 'string', default: '—', notes: 'Uppercase mono label above the field.' },
      { name: 'description', type: 'string', default: '—', notes: 'Helper text hidden while error shows.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled raw value, formatted through the mask.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled initial raw value.' },
      { name: 'onChange', type: '(displayed: string) => void', default: '—', notes: 'Fires with the masked display string.' },
    ],
  },
  MatrixChart: {
    usage: `import { MatrixChart } from '@fargone/rite';\n\nconst cells = [{ x: 'Mon', y: 'Build', value: 12 }, { x: 'Tue', y: 'Test', value: 34 }];\n\n<MatrixChart data={cells} cellSize={28} />`,
    props: [
      { name: 'data', type: 'MatrixChartDatum[]', default: '—', notes: 'Cells shaped as x, y plus numeric value.' },
      { name: 'xLabels', type: 'string[]', default: '—', notes: 'Column order; defaults to first-seen order.' },
      { name: 'yLabels', type: 'string[]', default: '—', notes: 'Row order; defaults to first-seen order.' },
      { name: 'cellSize', type: 'number', default: '28', notes: 'Square cell edge in px.' },
      { name: 'ariaLabel', type: 'string', default: '—', notes: 'Override for the generated data summary label.' },
    ],
  },
  Menu: {
    usage: `import { Menu } from '@fargone/rite';\n\n<Menu\n  trigger={<button type="button">Actions</button>}\n  items={[{ label: 'Rename file' }, { label: 'Delete record', destructive: true }]}\n/>`,
    props: [
      { name: 'trigger', type: 'ReactNode', default: '—', notes: 'Clickable element that toggles the dropdown.' },
      { name: 'items', type: 'MenuItem[]', default: '—', notes: 'Rows with label, onSelect, destructive, disabled.' },
      { name: 'opened', type: 'boolean', default: '—', notes: 'Controlled open state.' },
      { name: 'defaultOpened', type: 'boolean', default: 'false', notes: 'Initial open state for uncontrolled use.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', notes: 'Fires on toggle, outside click, and Escape.' },
    ],
  },
  Menubar: {
    usage: `import { Menubar } from '@fargone/rite';\n\n<Menubar\n  menus={[{ label: 'File', items: [{ label: 'New record' }, { label: 'Delete', destructive: true }] }]}\n/>`,
    props: [
      { name: 'menus', type: 'MenubarMenu[]', default: '—', notes: 'Top-level menus each with label plus item rows.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes for the menubar strip.' },
    ],
  },
};
