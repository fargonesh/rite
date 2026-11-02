import { useState } from 'react';
import { Badge } from '@fargone/rite';
import { BarChart } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Calendar } from '@fargone/rite';
import { Card, CardBody, CardFooter } from '@fargone/rite';
import { Carousel } from '@fargone/rite';
import { DataList } from '@fargone/rite';
import { Divider } from '@fargone/rite';
import { Dropzone } from '@fargone/rite';
import { FileButton } from '@fargone/rite';
import { Highlight } from '@fargone/rite';
import { Kbd } from '@fargone/rite';
import { Marquee } from '@fargone/rite';
import { Progress } from '@fargone/rite';
import { TextInput } from '@fargone/rite';
import { TimeGrid } from '@fargone/rite';
import type { ExampleSection } from './types.ts';

/* 1 — more-carousel: relic / product carousel */

const RELICS = [
  { tag: 'Vessel', name: 'Ink slab V-001', price: '$120' },
  { tag: 'Omen', name: 'Hairline grid', price: '$86' },
  { tag: 'Seal', name: 'Blood accent No. 9', price: '$240' },
];

function RelicCarousel() {
  return (
    <div className="p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">New arrivals</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">Shop all</p>
      </div>
      <Carousel
        slides={RELICS.map((r) => (
          <div key={r.name} className="p-3">
            <Card>
              <div className="mesh-hero flex h-24 items-end justify-between p-3 text-[#e9e7e2]">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">{r.tag}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] opacity-50">{r.price}</span>
              </div>
              <CardBody>
                <Badge>{r.tag}</Badge>
                <p className="mt-2 text-sm font-medium">{r.name}</p>
                <p className="mt-1 text-xs leading-5 opacity-70">Surveyed, sealed, and cleared for handling.</p>
              </CardBody>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px]">{r.price}</span>
                  <Button size="sm" variant="secondary">Acquire</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      />
    </div>
  );
}

/* 2 — more-marquee: press marquee */

const PRESS = [
  { quote: '"Catalogued dread, weekly."', name: 'Meridian Review' },
  { quote: '"The grid holds. We checked."', name: 'Halden Gazette' },
  { quote: '"Sealed with unusual care."', name: 'St. Anselm Post' },
  { quote: '"A ledger you can hear."', name: 'Vigil Circular' },
];

function PressMarquee() {
  return (
    <div className="space-y-3 p-5">
      <Divider label="Filed in the press" />
      <Marquee speed={28}>
        {PRESS.map((p) => (
          <span key={p.name} className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-omen text-sm italic opacity-80">{p.quote}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">— {p.name}</span>
            <span aria-hidden className="text-[10px] text-[#d42b1e]">+</span>
          </span>
        ))}
      </Marquee>
      <Divider label="Clippings · vol. IX" />
    </div>
  );
}

/* 3 — more-upload: file intake */

function FileIntake() {
  const [files, setFiles] = useState<File[]>([]);
  const done = files.length > 0;
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-[1.3fr_1fr]">
      <Dropzone label="Drop manifests or click to browse" onDrop={(next) => setFiles(next)} />
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">Intake log</p>
        <Progress value={done ? 100 : 8} showLabel />
        {done ? (
          <ul className="rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10">
            {files.map((f) => (
              <li
                key={`${f.name}-${f.size}`}
                className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/10 px-3 py-1.5 font-mono text-[11px] last:border-0 dark:border-white/10"
              >
                <span className="truncate opacity-80">{f.name}</span>
                <span className="ml-2 shrink-0 opacity-40">{(f.size / 1024).toFixed(1)} KB</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs leading-5 opacity-60">No evidence logged yet. The record waits.</p>
        )}
        <div className="flex gap-2">
          <FileButton multiple onChange={(list) => { if (list) setFiles((prev) => [...prev, ...Array.from(list)]); }}>
            <Button size="sm" variant="secondary">Attach</Button>
          </FileButton>
          {done && (
            <Button size="sm" variant="ghost" onClick={() => setFiles([])}>Clear</Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* 4 — more-booking: booking desk */

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function fmtDay(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const SLOTS = ['09:00', '10:30', '12:00', '14:00', '16:30'];

function BookingDesk() {
  const [day, setDay] = useState<Date | null>(new Date(2026, 10, 19));
  const [slot, setSlot] = useState('10:30');
  const [sealed, setSealed] = useState(false);
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-2">
      <Calendar
        value={day}
        defaultMonth={new Date(2026, 10, 1)}
        onChange={(d) => { setDay(d); setSealed(false); }}
      />
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">Witnessing hour</p>
        <TimeGrid
          value={slot}
          options={SLOTS}
          columns={3}
          onChange={(s) => { setSlot(s); setSealed(false); }}
        />
        <Button size="sm" disabled={!day} onClick={() => setSealed(true)}>Confirm sitting</Button>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">
          {sealed && day ? `Sealed — ${fmtDay(day)} at ${slot}` : 'Choose a day and an hour.'}
        </p>
      </div>
    </div>
  );
}

/* 5 — more-chart: KPI chart + ledger */

const ADMISSIONS = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 19 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 27 },
];

function KpiLedger() {
  const total = ADMISSIONS.reduce((sum, d) => sum + d.value, 0);
  const peakValue = Math.max(...ADMISSIONS.map((d) => d.value));
  const peak = ADMISSIONS.find((d) => d.value === peakValue);
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">Admissions / week</p>
        <BarChart data={ADMISSIONS} height={190} ariaLabel="Admissions by weekday" />
      </div>
      <div className="flex flex-col justify-center">
        <DataList
          striped
          items={[
            { label: 'Total', value: `${total} souls` },
            { label: 'Peak', value: `${peak?.label ?? '—'} — ${peak?.value ?? '—'}` },
            { label: 'Quota', value: '80 / week' },
          ]}
        />
      </div>
    </div>
  );
}

/* 6 — more-spotlight: archive search */

const STACKS = [
  { group: 'Relics', items: ['Blood-red door', 'Ink slab V-001', 'Hairline grid'] },
  { group: 'Rites', items: ['Entry protocol', 'Exit rites', 'Ledger rules'] },
  { group: 'Witnesses', items: ['Halden & Co', 'St. Anselm Archive'] },
];

function ArchiveSpotlight() {
  const [q, setQ] = useState('door');
  const query = q.trim().toLowerCase();
  const groups = STACKS.map((g) => ({
    group: g.group,
    items: g.items.filter((item) => !query || item.toLowerCase().includes(query)),
  })).filter((g) => g.items.length > 0);
  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <TextInput
            value={q}
            placeholder="Search the archive…"
            aria-label="Search the archive"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') setQ(''); }}
          />
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <Kbd>Ctrl</Kbd>
          <span aria-hidden className="opacity-40">+</span>
          <Kbd>K</Kbd>
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {groups.map((g) => (
          <div key={g.group}>
            <div className="mb-1 flex items-center gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">{g.group}</p>
              <Badge>{g.items.length}</Badge>
            </div>
            <ul className="divide-y divide-dashed divide-[#0a0a0b]/15 rounded-[2px] border border-[#0a0a0b]/15 dark:divide-white/10 dark:border-white/15">
              {g.items.map((item) => (
                <li key={item} className="px-3 py-1.5 text-[13px]">
                  <Highlight text={item} query={q} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-50">
            No witness found{q.trim() ? ` for "${q.trim()}"` : ''}.
          </p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] opacity-50">
        <Kbd>esc</Kbd>
        <span>to clear</span>
      </div>
    </div>
  );
}

export const MORE_SECTIONS: ExampleSection[] = [
  {
    id: 'more-carousel',
    title: 'Relic carousel',
    blurb: 'Commerce shelf: surveyed relics on a witnessed carousel.',
    components: ['Carousel', 'Card', 'Badge', 'Button'],
    code: `import { Badge, Button, Card, CardBody, CardFooter, Carousel } from '@fargone/rite';

<Carousel slides={RELICS.map((r) => (
  <div key={r.name} className="p-3">
    <Card>
      <CardBody>
        <Badge>{r.tag}</Badge>
        <p>{r.name}</p>
      </CardBody>
      <CardFooter>
        <span>{r.price}</span>
        <Button size="sm" variant="secondary">Acquire</Button>
      </CardFooter>
    </Card>
  </div>
))} />`,
    render: () => <RelicCarousel />,
  },
  {
    id: 'more-marquee',
    title: 'Press marquee',
    blurb: 'Clippings band: press quotes scrolling between divider rules.',
    components: ['Marquee', 'Divider'],
    code: `import { Divider, Marquee } from '@fargone/rite';

<Divider label="Filed in the press" />
<Marquee speed={28}>
  {PRESS.map((p) => (
    <span key={p.name}>{p.quote} — {p.name}</span>
  ))}
</Marquee>
<Divider label="Clippings · vol. IX" />`,
    render: () => <PressMarquee />,
  },
  {
    id: 'more-upload',
    title: 'File intake',
    blurb: 'Evidence desk: dropzone, attach button, and intake progress.',
    components: ['Dropzone', 'FileButton', 'Progress', 'Button'],
    code: `import { Button, Dropzone, FileButton, Progress } from '@fargone/rite';

const [files, setFiles] = useState<File[]>([]);
<Dropzone label="Drop manifests or click to browse" onDrop={setFiles} />
<Progress value={files.length > 0 ? 100 : 8} showLabel />
<FileButton multiple onChange={(list) => {}}>
  <Button size="sm" variant="secondary">Attach</Button>
</FileButton>`,
    render: () => <FileIntake />,
  },
  {
    id: 'more-booking',
    title: 'Booking desk',
    blurb: 'Sitting reservations: calendar day plus witnessing hour.',
    components: ['Calendar', 'TimeGrid', 'Button'],
    code: `import { Button, Calendar, TimeGrid } from '@fargone/rite';

const [day, setDay] = useState<Date | null>(new Date(2026, 10, 19));
const [slot, setSlot] = useState('10:30');
<Calendar value={day} onChange={setDay} />
<TimeGrid value={slot} onChange={setSlot} options={SLOTS} columns={3} />
<Button size="sm" disabled={!day}>Confirm sitting</Button>`,
    render: () => <BookingDesk />,
  },
  {
    id: 'more-chart',
    title: 'KPI ledger',
    blurb: 'Weekly admissions: bar chart beside a striped ledger.',
    components: ['BarChart', 'DataList'],
    code: `import { BarChart, DataList } from '@fargone/rite';

const data = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 19 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 27 },
];
<BarChart data={data} height={190} ariaLabel="Admissions by weekday" />
<DataList striped items={[{ label: 'Total', value: '73 souls' }]} />`,
    render: () => <KpiLedger />,
  },
  {
    id: 'more-spotlight',
    title: 'Archive search',
    blurb: 'Command search: grouped results with match highlighting.',
    components: ['TextInput', 'Kbd', 'Highlight', 'Badge'],
    code: `import { Badge, Highlight, Kbd, TextInput } from '@fargone/rite';

const [q, setQ] = useState('door');
<TextInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the archive…" />
<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
<Highlight text="Blood-red door" query={q} />
<Badge>{1}</Badge>`,
    render: () => <ArchiveSpotlight />,
  },
];
