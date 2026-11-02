import { useState } from 'react';
import { Accordion } from '@fargone/rite';
import { Alert } from '@fargone/rite';
import { Badge } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Card, CardBody, CardFooter, CardHeader } from '@fargone/rite';
import { Switch } from '@fargone/rite';
import { Table } from '@fargone/rite';
import { TextInput } from '@fargone/rite';
import { Timeline } from '@fargone/rite';
import type { ExampleSection } from './types.ts';
import { INPUT_SECTIONS } from './sections-input.tsx';
import { MORE_SECTIONS } from './sections-more.tsx';
import { NAV_SECTIONS } from './sections-nav.tsx';
import { PROOF_SECTIONS } from './sections-proof.tsx';

function HeroCentered() {
  return (
    <div className="px-6 py-10 text-center">
      <Badge color="indigo">SaaS starter</Badge>
      <p className="mx-auto mt-3 max-w-md text-3xl leading-[1.05] font-medium tracking-tight">
        Operations, <span className="font-omen italic">witnessed.</span>
      </p>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-5 opacity-70">
        One workspace for teams past the map's edge. Every signal filed, every verdict sealed.
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button size="sm">Request access</Button>
        <Button size="sm" variant="secondary">See features</Button>
      </div>
    </div>
  );
}

function HeroSplit() {
  return (
    <div className="grid sm:grid-cols-[140px_1fr]">
      <div className="mesh-ink flex flex-col p-4 text-[#e9e7e2]">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">↱ index</p>
        <div className="mt-3 space-y-1 text-lg leading-tight font-light">
          <p className="text-[#4d7cff]">Vigil Holds</p>
          <p className="opacity-60">Archive</p>
          <p className="opacity-60">Cart</p>
        </div>
      </div>
      <div className="mesh-hero grained relative flex min-h-56 flex-col justify-end overflow-hidden p-5 text-[#e9e7e2]">
        <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff5a4a]">Field note</p>
        <p className="relative mt-1 text-5xl leading-[0.9] font-medium tracking-tight">Vigil<br />Holds</p>
        <p className="relative mt-3 max-w-xs text-[13px] leading-5 opacity-80">Containment OS for teams that operate where the map ends.</p>
      </div>
    </div>
  );
}

function LogoStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] opacity-50">
      <span className="text-[#d42b1e] opacity-100">✦ trusted in basements by</span>
      <span>Halden &amp; Co</span>
      <span>Meridian Works</span>
      <span>St. Anselm Archive</span>
    </div>
  );
}

function MetricsBand() {
  const items = [
    { k: '99.98%', l: 'signals retained' },
    { k: '41s', l: 'omen-to-verdict' },
    { k: '0', l: 'unwitnessed breaches' },
    { k: '∞', l: 'patience of record' },
  ];
  return (
    <div className="grid grid-cols-2 gap-px p-5 lg:grid-cols-4">
      {items.map((m) => (
        <div key={m.l} className="border-l border-[#0a0a0b]/15 pl-3 first:border-0 first:pl-0 dark:border-white/10">
          <p className="font-mono text-2xl tracking-tight">{m.k}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50">{m.l}</p>
        </div>
      ))}
    </div>
  );
}

function FeatureCards() {
  const feats = [
    { tag: 'Survey', title: 'Signal map', text: 'Every intake lands on the same grid.' },
    { tag: 'Omen', title: 'Triage in 41s', text: 'Timed, logged, and sealed.' },
    { tag: 'Seal', title: 'Audit seances', text: 'SSO, retention, dedicated witness.' },
  ];
  return (
    <div className="grid gap-3 p-5 sm:grid-cols-3">
      {feats.map((f) => (
        <Card key={f.title}>
          <CardHeader>
            <Badge>{f.tag}</Badge>
          </CardHeader>
          <CardBody>
            <p className="text-sm font-medium">{f.title}</p>
            <p className="mt-1 text-xs leading-5 opacity-70">{f.text}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

function FormConsole() {
  const [name, setName] = useState('');
  const [surveil, setSurveil] = useState(true);
  const valid = name.trim().length >= 2;
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-2">
      <div className="space-y-3">
        <TextInput label="Designation" fileNo="FILE // 01" placeholder="state your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Switch checked={surveil} onCheckedChange={setSurveil} label="I consent to be surveilled" />
        <Button size="sm" disabled={!valid}>Submit testimony</Button>
      </div>
      <Alert tone={valid ? 'success' : 'warning'} title={valid ? `${name} — received` : 'The record waits'}>
        {valid ? 'Filed under seal. Do not call us.' : 'Two characters minimum. Ghosts are not acknowledged.'}
      </Alert>
    </div>
  );
}

function PricingDuo() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="space-y-3 p-5">
      <Switch checked={annual} onCheckedChange={setAnnual} label={annual ? 'Annual — 2 months free' : 'Monthly'} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge>Initiate</Badge>
              <span className="font-mono text-[11px] opacity-60">$0</span>
            </div>
          </CardHeader>
          <CardFooter><Button variant="secondary" size="sm">Begin quietly</Button></CardFooter>
        </Card>
        <Card className="border-[#d42b1e]/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge color="red">Congregation</Badge>
              <span className="font-mono text-[11px] opacity-60">{annual ? '$480 /yr' : '$48 /mo'}</span>
            </div>
          </CardHeader>
          <CardFooter><Button size="sm" variant="destructive">Speak to the order</Button></CardFooter>
        </Card>
      </div>
    </div>
  );
}

function FaqBlock() {
  return (
    <div className="p-5">
      <Accordion
        defaultValue="protocol"
        items={[
          { value: 'protocol', label: 'Entry protocol', content: 'Knock twice, wait for the chalk mark, then enter.' },
          { value: 'ledger', label: 'Ledger rules', content: 'Log every crossing with date, weather, and witness.' },
          { value: 'exit', label: 'Exit rites', content: 'Douse the lantern last.' },
        ]}
      />
    </div>
  );
}

function OpsSplit() {
  return (
    <div className="grid gap-3 p-5 lg:grid-cols-[1.3fr_1fr]">
      <Table
        caption="Exhibits awaiting verdict"
        striped
        head={['Ref', 'Subject', 'Status']}
        body={[
          ['V-001', 'Ink slab', 'Filed'],
          ['V-002', 'Hairline grid', 'Open'],
          ['V-003', 'Blood accent', 'Sealed'],
        ]}
      />
      <Timeline
        items={[
          { title: 'Dossier filed', time: '09:41', text: 'Logged and witnessed.' },
          { title: 'Sealed in blood', time: 'Now', text: 'Awaiting signature.', active: true },
        ]}
      />
    </div>
  );
}

function QuoteBand() {
  return (
    <div className="mx-auto max-w-xl px-6 py-8 text-center">
      <p className="font-omen text-xl leading-snug italic sm:text-2xl">
        “We built the dashboard first. The dread was already there — we merely gave it rows and columns.”
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">— foundress, annual letter</p>
    </div>
  );
}

export const BASE_SECTIONS: ExampleSection[] = [
  {
    id: 'hero-centered',
    title: 'Hero — centered',
    blurb: 'SaaS opener: badge, display line, dual CTA.',
    components: ['Badge', 'Button'],
    code: `import { Badge, Button } from '@fargone/rite';

<Badge color="indigo">SaaS starter</Badge>
<h1>Operations, <em>witnessed.</em></h1>
<p>One workspace for teams past the map's edge.</p>
<div>
  <Button>Request access</Button>
  <Button variant="secondary">See features</Button>
</div>`,
    render: () => <HeroCentered />,
  },
  {
    id: 'hero-split',
    title: 'Hero — split index',
    blurb: 'Vesper split: dark index rail + witnessed panel.',
    components: ['Button'],
    code: `<div className="grid sm:grid-cols-[140px_1fr]">
  <div className="mesh-ink">
    <p>↱ index</p>
    <p>Vigil Holds</p>
  </div>
  <div className="mesh-hero">
    <h1>Vigil<br />Holds</h1>
    <p>Containment OS for teams past the map's edge.</p>
  </div>
</div>`,
    render: () => <HeroSplit />,
  },
  {
    id: 'logo-strip',
    title: 'Trusted strip',
    blurb: 'Hairline full-bleed trust row.',
    components: ['Badge'],
    code: `<div className="flex flex-wrap gap-x-8 font-mono text-[10px] uppercase">
  <span>✦ trusted in basements by</span>
  <span>Halden & Co</span>
  <span>Meridian Works</span>
  <span>St. Anselm Archive</span>
</div>`,
    render: () => <LogoStrip />,
  },
  {
    id: 'metrics',
    title: 'Metrics band',
    blurb: 'Four quiet KPIs with hairline dividers.',
    components: ['Card'],
    code: `<div className="grid grid-cols-2 lg:grid-cols-4">
  <div><p>99.98%</p><p>signals retained</p></div>
  <div><p>41s</p><p>omen-to-verdict</p></div>
  <div><p>0</p><p>unwitnessed breaches</p></div>
  <div><p>∞</p><p>patience of record</p></div>
</div>`,
    render: () => <MetricsBand />,
  },
  {
    id: 'feature-cards',
    title: 'Feature cards',
    blurb: 'Three-up dossier cards.',
    components: ['Card', 'Badge'],
    code: `import { Badge, Card, CardBody, CardHeader } from '@fargone/rite';

<Card>
  <CardHeader><Badge>Survey</Badge></CardHeader>
  <CardBody>
    <p>Signal map</p>
    <p>Every intake lands on the same grid.</p>
  </CardBody>
</Card>`,
    render: () => <FeatureCards />,
  },
  {
    id: 'form',
    title: 'Form — console',
    blurb: 'Testimony form with live validation.',
    components: ['TextInput', 'Switch', 'Button', 'Alert'],
    code: `import { Alert, Button, Switch, TextInput } from '@fargone/rite';

<TextInput label="Designation" placeholder="state your name"
  value={name} onChange={(e) => setName(e.target.value)} />
<Switch checked={surveil} onCheckedChange={setSurveil}
  label="I consent to be surveilled" />
<Button disabled={!valid}>Submit testimony</Button>
<Alert tone={valid ? 'success' : 'warning'}>…</Alert>`,
    render: () => <FormConsole />,
  },
  {
    id: 'pricing',
    title: 'Pricing duo',
    blurb: 'Two tiers + billing toggle.',
    components: ['Card', 'Badge', 'Button', 'Switch'],
    code: `import { Badge, Button, Card, CardFooter, CardHeader, Switch } from '@fargone/rite';

<Switch checked={annual} onCheckedChange={setAnnual}
  label={annual ? 'Annual — 2 months free' : 'Monthly'} />
<Card>
  <CardHeader><Badge>Initiate</Badge><span>$0</span></CardHeader>
  <CardFooter><Button variant="secondary">Begin quietly</Button></CardFooter>
</Card>`,
    render: () => <PricingDuo />,
  },
  {
    id: 'ops',
    title: 'Ops split — table + timeline',
    blurb: 'Dashboard row: exhibits ledger beside watch log.',
    components: ['Table', 'Timeline'],
    code: `import { Table, Timeline } from '@fargone/rite';

<Table caption="Exhibits awaiting verdict" striped
  head={['Ref', 'Subject', 'Status']}
  body={[['V-001', 'Ink slab', 'Filed']]} />
<Timeline items={[
  { title: 'Dossier filed', time: '09:41' },
  { title: 'Sealed in blood', time: 'Now', active: true },
]} />`,
    render: () => <OpsSplit />,
  },
  {
    id: 'faq',
    title: 'FAQ accordion',
    blurb: 'Doctrine Q&A in surveyed chrome.',
    components: ['Accordion'],
    code: `import { Accordion } from '@fargone/rite';

<Accordion defaultValue="protocol" items={[
  { value: 'protocol', label: 'Entry protocol', content: '…' },
  { value: 'ledger', label: 'Ledger rules', content: '…' },
]} />`,
    render: () => <FaqBlock />,
  },
  {
    id: 'quote',
    title: 'Doctrine quote',
    blurb: 'Centered omen serif closer.',
    components: ['Text'],
    code: `<p className="font-omen text-2xl italic">
  “We built the dashboard first. The dread was already
  there — we merely gave it rows and columns.”
</p>`,
    render: () => <QuoteBand />,
  },
];

/** Combined gallery: base sections first, then subagent-drafted batches. */
export const SECTIONS: ExampleSection[] = [
  ...BASE_SECTIONS,
  ...NAV_SECTIONS,
  ...INPUT_SECTIONS,
  ...PROOF_SECTIONS,
  ...MORE_SECTIONS,
];
