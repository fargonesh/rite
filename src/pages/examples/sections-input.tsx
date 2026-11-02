import { useState } from 'react';
import { Alert } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Checkbox } from '@fargone/rite';
import { Chip } from '@fargone/rite';
import { Fieldset } from '@fargone/rite';
import { MultiSelect } from '@fargone/rite';
import { NativeSelect } from '@fargone/rite';
import { NumberInput } from '@fargone/rite';
import { Pill } from '@fargone/rite';
import { PinInput } from '@fargone/rite';
import { Radio } from '@fargone/rite';
import { RangeSlider } from '@fargone/rite';
import { Rating } from '@fargone/rite';
import { SegmentedControl } from '@fargone/rite';
import { Select } from '@fargone/rite';
import { Slider } from '@fargone/rite';
import { TagsInput } from '@fargone/rite';
import { Textarea } from '@fargone/rite';
import { TextInput } from '@fargone/rite';
import type { ExampleSection } from './types.ts';

function ChecksPreview() {
  const [digest, setDigest] = useState(true);
  const [omens, setOmens] = useState(false);
  const [cadence, setCadence] = useState('weekly');
  const cadences = [
    { value: 'daily', label: 'Daily vigil' },
    { value: 'weekly', label: 'Weekly ledger' },
    { value: 'silent', label: 'Silence' },
  ];
  return (
    <div className="grid gap-3 p-5 sm:grid-cols-2">
      <Fieldset legend="Dispatches">
        <Checkbox
          label="Sunday digest"
          description="One sealed letter."
          checked={digest}
          onCheckedChange={setDigest}
        />
        <Checkbox
          label="Omen alerts"
          description="Only verified breaches."
          checked={omens}
          onCheckedChange={setOmens}
        />
      </Fieldset>
      <Fieldset legend="Cadence">
        <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Cadence">
          {cadences.map((o) => (
            <Radio
              key={o.value}
              name="cadence"
              value={o.value}
              label={o.label}
              checked={cadence === o.value}
              onCheckedChange={() => setCadence(o.value)}
            />
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
          Filed under — <span className="text-[#d42b1e]">{cadence}</span>
        </p>
      </Fieldset>
    </div>
  );
}

function SelectsPreview() {
  const [house, setHouse] = useState<string | null>('halden');
  const [rites, setRites] = useState<string[]>(['vesper']);
  const [voice, setVoice] = useState('alto');
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">
        Filter the archive — {rites.length} rite{rites.length === 1 ? '' : 's'} held
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Select
          label="House"
          data={[
            { value: 'halden', label: 'Halden & Co' },
            { value: 'meridian', label: 'Meridian Works' },
            { value: 'anselm', label: 'St. Anselm' },
          ]}
          value={house}
          onChange={setHouse}
          placeholder="Pick a house…"
          clearable
        />
        <MultiSelect
          label="Rites"
          data={['vesper', 'matins', 'compline', 'lauds']}
          value={rites}
          onChange={setRites}
          placeholder="Pick rites…"
        />
        <NativeSelect
          label="Voice"
          data={['soprano', 'alto', 'tenor', 'bass']}
          value={voice}
          onChange={setVoice}
        />
      </div>
    </div>
  );
}

function ContactPreview() {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [party, setParty] = useState(2);
  const valid = name.trim().length >= 2 && note.trim().length >= 4;
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-3">
        <TextInput
          label="Name"
          fileNo="FILE // 02"
          placeholder="state your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          label="Petition"
          fileNo="FILE // 03"
          rows={3}
          placeholder="state your business…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="space-y-3 border-l border-[#0a0a0b]/15 pl-4 dark:border-white/10">
        <NumberInput label="Party" value={party} onChange={setParty} min={1} max={12} />
        <Button size="sm" disabled={!valid}>
          Send petition
        </Button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
          {valid ? 'Ready to file' : 'Name + petition required'}
        </p>
      </div>
    </div>
  );
}

function OtpPreview() {
  const [code, setCode] = useState('');
  const complete = code.length === 4;
  return (
    <div className="mx-auto max-w-sm space-y-3 p-5 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">
        Check the letterbox — 4 glyphs
      </p>
      <div className="flex justify-center">
        <PinInput length={4} value={code} onChange={setCode} ariaLabel="Verification code" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => setCode('')}>
          Resend
        </Button>
        <Button size="sm" disabled={!complete}>
          Verify
        </Button>
      </div>
      <Alert tone={complete ? 'success' : 'warning'} title={complete ? 'Seal matches' : 'Awaiting glyphs'}>
        {complete ? 'The door knows you. Enter quietly.' : `${4 - code.length} glyphs still missing from the record.`}
      </Alert>
    </div>
  );
}

function SlidersPreview() {
  const [lantern, setLantern] = useState(60);
  const [band, setBand] = useState<[number, number]>([25, 70]);
  const [dread, setDread] = useState(3);
  const [watch, setWatch] = useState('dusk');
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2">
      <div className="space-y-3">
        <Slider label="Lantern" value={lantern} onChange={setLantern} />
        <RangeSlider label="Patrol hours" value={band} onChange={setBand} min={0} max={24} />
      </div>
      <div className="space-y-3 border-l border-[#0a0a0b]/15 pl-4 dark:border-white/10">
        <div>
          <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
            Dread
          </p>
          <Rating value={dread} onChange={setDread} />
        </div>
        <SegmentedControl
          ariaLabel="Watch"
          data={[
            { value: 'dusk', label: 'Dusk' },
            { value: 'midnight', label: 'Midnight' },
            { value: 'dawn', label: 'Dawn' },
          ]}
          value={watch}
          onChange={setWatch}
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
          {watch} watch — lantern {lantern}
        </p>
      </div>
    </div>
  );
}

function TagsPreview() {
  const [tags, setTags] = useState<string[]>(['vesper', 'omen']);
  const [active, setActive] = useState<string[]>(['vesper']);
  const options = ['vesper', 'dossier', 'omen'];
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-2">
      <TagsInput
        label="Exhibit tags"
        value={tags}
        onChange={setTags}
        placeholder="Type + Enter…"
      />
      <div className="space-y-3 border-l border-[#0a0a0b]/15 pl-4 dark:border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {options.map((opt) => (
            <Chip
              key={opt}
              checked={active.includes(opt)}
              onChange={(on) =>
                setActive((prev) => (on ? [...prev, opt] : prev.filter((p) => p !== opt)))
              }
            >
              {opt}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Pill key={t} onRemove={() => setTags((prev) => prev.filter((p) => p !== t))}>
              {t}
            </Pill>
          ))}
          {tags.length === 0 && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
              No tags filed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export const INPUT_SECTIONS: ExampleSection[] = [
  {
    id: 'input-checks',
    title: 'Preferences — checks',
    blurb: 'Notification fieldsets: checkbox dispatches beside a radio cadence.',
    components: ['Fieldset', 'Checkbox', 'Radio'],
    code: `import { Checkbox, Fieldset, Radio } from '@fargone/rite';

const [digest, setDigest] = useState(true);
const [cadence, setCadence] = useState('weekly');

<Fieldset legend="Dispatches">
  <Checkbox label="Sunday digest" checked={digest} onCheckedChange={setDigest} />
</Fieldset>
<Fieldset legend="Cadence">
  <Radio name="cadence" value="weekly" label="Weekly ledger"
    checked={cadence === 'weekly'} onCheckedChange={() => setCadence('weekly')} />
</Fieldset>`,
    render: () => <ChecksPreview />,
  },
  {
    id: 'input-selects',
    title: 'Archive filters — selects',
    blurb: 'Three-way filter row: single select, multiselect, and native select.',
    components: ['Select', 'MultiSelect', 'NativeSelect'],
    code: `import { MultiSelect, NativeSelect, Select } from '@fargone/rite';

<Select label="House" data={['halden', 'meridian']} value={house}
  onChange={setHouse} placeholder="Pick a house…" clearable />
<MultiSelect label="Rites" data={['vesper', 'matins']} value={rites} onChange={setRites} />
<NativeSelect label="Voice" data={['alto', 'bass']} value={voice} onChange={setVoice} />`,
    render: () => <SelectsPreview />,
  },
  {
    id: 'input-contact',
    title: 'Contact — petition desk',
    blurb: 'Petition form: name, message, party size, and a gated submit.',
    components: ['TextInput', 'Textarea', 'NumberInput', 'Button'],
    code: `import { Button, NumberInput, Textarea, TextInput } from '@fargone/rite';

<TextInput label="Name" placeholder="state your name" value={name}
  onChange={(e) => setName(e.target.value)} />
<Textarea label="Petition" rows={3} value={note}
  onChange={(e) => setNote(e.target.value)} />
<NumberInput label="Party" value={party} onChange={setParty} min={1} max={12} />
<Button size="sm" disabled={!valid}>Send petition</Button>`,
    render: () => <ContactPreview />,
  },
  {
    id: 'input-otp',
    title: 'Verification — seal code',
    blurb: 'Four-glyph PIN with resend, verify gate, and live alert status.',
    components: ['PinInput', 'Button', 'Alert'],
    code: `import { Alert, Button, PinInput } from '@fargone/rite';

<PinInput length={4} value={code} onChange={setCode} ariaLabel="Verification code" />
<Button size="sm" disabled={code.length !== 4}>Verify</Button>
<Alert tone={code.length === 4 ? 'success' : 'warning'} title="Seal matches">
  The door knows you.
</Alert>`,
    render: () => <OtpPreview />,
  },
  {
    id: 'input-sliders',
    title: 'Settings — dials',
    blurb: 'Watch settings: lantern slider, patrol band, dread rating, shift switch.',
    components: ['Slider', 'RangeSlider', 'Rating', 'SegmentedControl'],
    code: `import { RangeSlider, Rating, SegmentedControl, Slider } from '@fargone/rite';

<Slider label="Lantern" value={lantern} onChange={setLantern} />
<RangeSlider label="Patrol hours" value={band} onChange={setBand} min={0} max={24} />
<Rating value={dread} onChange={setDread} />
<SegmentedControl ariaLabel="Watch" value={watch} onChange={setWatch}
  data={[{ value: 'dusk', label: 'Dusk' }, { value: 'dawn', label: 'Dawn' }]} />`,
    render: () => <SlidersPreview />,
  },
  {
    id: 'input-tags',
    title: 'Tagging — exhibits',
    blurb: 'Catalog row: freeform tags beside chip filters and removable pills.',
    components: ['TagsInput', 'Chip', 'Pill'],
    code: `import { Chip, Pill, TagsInput } from '@fargone/rite';

<TagsInput label="Exhibit tags" value={tags} onChange={setTags} />
<Chip checked={active} onChange={setActive}>vesper</Chip>
<Pill onRemove={() => remove(tag)}>{tag}</Pill>`,
    render: () => <TagsPreview />,
  },
];
