export const docs3: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Center: {
    usage: `import { Center } from '@fargone/rite';\n\n<Center>\n  <div>Centered dossier card</div>\n</Center>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Content to center on both axes.' },
      { name: 'inline', type: 'boolean', default: 'false', notes: 'Use inline-flex instead of flex.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes merged onto the wrapper.' },
    ],
  },
  Checkbox: {
    usage: `import { Checkbox } from '@fargone/rite';\n\n<Checkbox\n  label="Sigil bound"\n  description="Bind this filing to the ledger."\n  checked={agreed}\n  onCheckedChange={setAgreed}\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'Clickable label rendered beside the box.' },
      { name: 'description', type: 'string', default: '—', notes: 'Helper text shown below the label.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
      { name: 'checked', type: 'boolean', default: '—', notes: 'Controlled state. Omit for uncontrolled.' },
      { name: 'defaultChecked', type: 'boolean', default: '—', notes: 'Initial state for uncontrolled use.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '—', notes: 'Fires on every toggle.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', notes: 'Partial-selection dash state.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Dims the row and blocks input.' },
    ],
  },
  Chip: {
    usage: `import { Chip } from '@fargone/rite';\n\n<Chip checked={active} onChange={setActive}>\n  vesper\n</Chip>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Chip label text.' },
      { name: 'checked', type: 'boolean', default: '—', notes: 'Controlled state. Omit for uncontrolled.' },
      { name: 'defaultChecked', type: 'boolean', default: 'false', notes: 'Initial state for uncontrolled use.' },
      { name: 'onChange', type: '(checked: boolean) => void', default: '—', notes: 'Fires on every toggle.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims the chip and blocks toggling.' },
    ],
  },
  CloseButton: {
    usage: `import { CloseButton } from '@fargone/rite';\n\n<div>\n  <span>Dialog row</span>\n  <CloseButton size="md" onClick={close} />\n</div>`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Box size: 24, 32, or 40px.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Dims the button and blocks clicks.' },
      { name: 'onClick', type: 'MouseEventHandler<HTMLButtonElement>', default: '—', notes: 'Close handler. Label is fixed to Close.' },
    ],
  },
  Code: {
    usage: `import { Code } from '@fargone/rite';\n\n<p>\n  Run <Code>vesper build</Code> to ship the dossier.\n</p>\n<Code block language="tsx">const sigil = "VESPER";</Code>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', notes: 'Inline snippet or block source text.' },
      { name: 'block', type: 'boolean', default: 'false', notes: 'Render a full block panel instead of inline.' },
      { name: 'language', type: 'string', default: '—', notes: 'Block header label, e.g. tsx.' },
    ],
  },
  CodeHighlight: {
    usage: `import { CodeHighlight } from '@fargone/rite';\n\n<CodeHighlight\n  code="const sigil = 42;"\n  language="tsx"\n  showLineNumbers\n/>`,
    props: [
      { name: 'code', type: 'string', default: '—', notes: 'Raw source text to tokenize and render.' },
      { name: 'language', type: 'string', default: '—', notes: 'Header label shown above the block.' },
      { name: 'showLineNumbers', type: 'boolean', default: 'false', notes: 'Prefix each line with its number.' },
      { name: 'maxHeight', type: 'number | string', default: '—', notes: 'Cap pre height; overflow scrolls.' },
    ],
  },
  Collapse: {
    usage: `import { Collapse } from '@fargone/rite';\n\n<Collapse in={open}>\n  <div>The north line holds at dawn.</div>\n</Collapse>`,
    props: [
      { name: 'in', type: 'boolean', default: '—', notes: 'True expands, false collapses to zero height.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Collapsible content.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra classes on the grid wrapper.' },
    ],
  },
  ColorInput: {
    usage: `import { ColorInput } from '@fargone/rite';\n\n<ColorInput\n  label="Accent"\n  description="Hex color value"\n  value={color}\n  onChange={setColor}\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'Field label above the input.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled hex string. Omit for uncontrolled.' },
      { name: 'defaultValue', type: 'string', default: "'#000000'", notes: 'Initial value for uncontrolled use.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires for typed or picked colors.' },
      { name: 'placeholder', type: 'string', default: "'#000000'", notes: 'Placeholder inside the hex field.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables swatch, text, and picker.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
    ],
  },
  ColorPicker: {
    usage: `import { ColorPicker } from '@fargone/rite';\n\n<ColorPicker\n  label="Picker"\n  value={color}\n  onChange={setColor}\n/>`,
    props: [
      { name: 'value', type: 'string', default: '—', notes: 'Controlled hex. Normalized to #rrggbb.' },
      { name: 'defaultValue', type: 'string', default: "'#d42b1e'", notes: 'Initial color for uncontrolled use.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires for square, hue, swatch, hex edits.' },
      { name: 'swatches', type: 'string[]', default: '10 presets', notes: 'Preset grid; defaults to VESPER palette.' },
      { name: 'label', type: 'string', default: '—', notes: 'Heading above the saturation square.' },
    ],
  },
  ColorSwatch: {
    usage: `import { ColorSwatch } from '@fargone/rite';\n\n<div>\n  <ColorSwatch color="#d42b1e" />\n  <ColorSwatch color="#16a34a" size={36} onClick={pick} label="Pick green" />\n</div>`,
    props: [
      { name: 'color', type: 'string', default: '—', notes: 'Any CSS color; checkerboard shows alpha.' },
      { name: 'size', type: 'number', default: '28', notes: 'Square side length in pixels.' },
      { name: 'onClick', type: '() => void', default: '—', notes: 'When set, renders a focusable button.' },
      { name: 'label', type: 'string', default: '—', notes: 'Accessible name; defaults to Color + value.' },
    ],
  },
  Combobox: {
    usage: `import { Combobox } from '@fargone/rite';\n\n<Combobox\n  opened={opened}\n  onOpenChange={setOpened}\n  target={<button>Choose a rite</button>}\n>\n  <button>vesper</button>\n</Combobox>`,
    props: [
      { name: 'target', type: 'ReactNode', default: '—', notes: 'Clickable trigger that toggles the list.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Dropdown option nodes.' },
      { name: 'opened', type: 'boolean', default: '—', notes: 'Controlled open state.' },
      { name: 'defaultOpened', type: 'boolean', default: 'false', notes: 'Initial open state uncontrolled.' },
      { name: 'onOpenChange', type: '(opened: boolean) => void', default: '—', notes: 'Fires on toggle, Escape, outside click.' },
      { name: 'width', type: 'number | string', default: '—', notes: 'Dropdown width; defaults to target width.' },
    ],
  },
  ComboboxPopover: {
    usage: `import { ComboboxPopover } from '@fargone/rite';\n\n<ComboboxPopover buttonLabel={picked}>\n  <button>VES-001</button>\n  <button>VES-002</button>\n</ComboboxPopover>`,
    props: [
      { name: 'buttonLabel', type: 'string', default: '—', notes: 'Trigger button text.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Option buttons inside the panel.' },
      { name: 'opened', type: 'boolean', default: '—', notes: 'Controlled open state.' },
      { name: 'defaultOpened', type: 'boolean', default: 'false', notes: 'Initial open state uncontrolled.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', notes: 'Fires on toggle, Escape, outside click.' },
    ],
  },
  CompositeChart: {
    usage: `import { CompositeChart } from '@fargone/rite';\n\n<CompositeChart\n  bars={[{ label: 'Jan', value: 42 }, { label: 'Feb', value: 68 }]}\n  line={[38, 60]}\n  height={200}\n/>`,
    props: [
      { name: 'bars', type: 'CompositeBarDatum[]', default: '—', notes: 'Bar entries with label and numeric value.' },
      { name: 'line', type: 'number[]', default: '—', notes: 'Line series; index-aligned to bars.' },
      { name: 'height', type: 'number', default: '200', notes: 'SVG height in px; width is fluid.' },
    ],
  },
  Container: {
    usage: `import { Container } from '@fargone/rite';\n\n<Container size="sm">\n  <div>Contained content</div>\n</Container>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Page content constrained to max width.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Max width from md to 5xl.' },
      { name: 'centered', type: 'boolean', default: 'true', notes: 'Auto margins to center the container.' },
    ],
  },
  CopyButton: {
    usage: `import { CopyButton } from '@fargone/rite';\n\n<code>npm i vesper</code>\n<CopyButton value="npm i vesper" timeout={2000} />`,
    props: [
      { name: 'value', type: 'string', default: '—', notes: 'Text written to the clipboard on click.' },
      { name: 'timeout', type: 'number', default: '1200', notes: 'Ms the copied state stays visible.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Blocks copying and dims the button.' },
      { name: 'onClick', type: 'MouseEventHandler<HTMLButtonElement>', default: '—', notes: 'Runs before copy; preventDefault skips it.' },
    ],
  },
};
