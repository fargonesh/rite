import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from '@fargone/rite';
import { AreaChart } from '@fargone/rite';
import { Badge } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Card, CardBody, CardHeader } from '@fargone/rite';
import { DonutChart } from '@fargone/rite';
import { Sparkline } from '@fargone/rite';
import { Table } from '@fargone/rite';
import { Timeline } from '@fargone/rite';
import { DecryptText } from '../../../lib/scramble.tsx';
import { useBootType, useCountUp, useHeroIntro, useScrollReveals, useTilt } from '../../../lib/motion.ts';

const BOOT_LINES = [
  'ledger night-shift console v3.1.0 [build 0917]',
  '> mounting /mnt/ledger-north... ok',
  '> tailing watch log... streaming',
  '> fog sensors: sector 7 FAIL, sectors 1-6 ok',
  'shift C roster verified — 6 desks awake',
  '> exhibit sync: 18 filed, 4 open, 2 sealed',
];

type Exhibit = { ref: string; subject: string; sector: string; status: 'Filed' | 'Open' | 'Sealed'; trend: number[] };

const EXHIBITS: Exhibit[] = [
  { ref: 'V-114', subject: 'Ink slab, north wall', sector: 'Sectors 1–3', status: 'Filed', trend: [4, 6, 5, 9, 8, 12] },
  { ref: 'V-115', subject: 'Hairline grid, bell frame', sector: 'Sectors 1–3', status: 'Filed', trend: [3, 4, 6, 7, 9, 10] },
  { ref: 'V-116', subject: 'Blood accent, ledger spine', sector: 'Sector 7', status: 'Open', trend: [8, 6, 9, 5, 7, 4] },
  { ref: 'V-117', subject: 'Fog horn recording', sector: 'Sector 7', status: 'Open', trend: [12, 9, 11, 7, 8, 6] },
  { ref: 'V-118', subject: 'Omen router log', sector: 'Archive', status: 'Sealed', trend: [2, 3, 4, 5, 6, 8] },
  { ref: 'V-119', subject: 'Harbor bell rope fiber', sector: 'Archive', status: 'Open', trend: [5, 7, 6, 9, 11, 10] },
  { ref: 'V-120', subject: 'Chalk mark survey', sector: 'Sectors 4–6', status: 'Filed', trend: [4, 5, 5, 7, 8, 9] },
  { ref: 'V-121', subject: 'Lantern soot sample', sector: 'Sectors 4–6', status: 'Sealed', trend: [1, 2, 3, 4, 6, 7] },
];

const SIGNALS = [
  { label: '18:00', value: 8 },
  { label: '19:00', value: 14 },
  { label: '20:00', value: 11 },
  { label: '21:00', value: 19 },
  { label: '22:00', value: 24 },
  { label: '23:00', value: 17 },
  { label: '00:00', value: 21 },
];

const ROSTER = [
  { desk: 'Desk 1', name: 'Warden Halden', duty: 'Bell + fog line', awake: true },
  { desk: 'Desk 2', name: 'Clerk Vess', duty: 'Exhibits V-114–117', awake: true },
  { desk: 'Desk 3', name: 'Archivist Okafor', duty: 'Seals + retention', awake: true },
  { desk: 'Desk 4', name: 'Novice Pell', duty: 'Chalk marks', awake: false },
  { desk: 'Desk 5', name: 'Witness Im', duty: 'Omen router', awake: true },
  { desk: 'Desk 6', name: 'Keeper Sable', duty: 'Void watch', awake: true },
];

function useNightClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function LedgerSite({ onBack }: { onBack: () => void }) {
  const [sector, setSector] = useState('all');
  const [query, setQuery] = useState('');
  const [breach, setBreach] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const clock = useNightClock();

  useHeroIntro(root);
  useScrollReveals(root);
  useCountUp(root);
  useTilt(root);
  useBootType(root, BOOT_LINES);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXHIBITS.filter((e) => {
      if (sector !== 'all' && e.sector !== sector) return false;
      if (!q) return true;
      return e.ref.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.status.toLowerCase().includes(q);
    });
  }, [sector, query]);

  return (
    <div className="mesh-page min-h-full text-[#0a0a0b] dark:text-[#e9e7e2]">
      <div ref={root}>
        {/* classification banner */}
        <div className="flex items-center justify-between border-b border-[#0a0a0b]/15 bg-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e9e7e2] dark:border-white/10">
          <span>
            Ledger // clearance blood <span className="opacity-40">— shift C is witnessed</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#d42b1e]" />
            {clock} — night
          </span>
        </div>

        <header className="mesh-ink sticky top-0 z-10 border-b border-white/10 text-[#e9e7e2]">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">
            <button onClick={onBack} className="flex items-center gap-2" title="Back to examples">
              <span className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#d42b1e] font-mono text-sm text-white">▚</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em]">Ledger</span>
            </button>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 sm:block">ops dashboard // night shift</span>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={onBack} className="hidden font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 hover:opacity-100 sm:block">← examples</button>
              <Button size="sm" variant={breach ? 'secondary' : 'destructive'} onClick={() => setBreach((v) => !v)}>
                {breach ? 'Stand down' : 'Breach protocol'}
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-4 px-6 py-8">
          {/* hero strip */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p data-hero-fade className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">
                Shift C // 02:00–10:00 <span aria-hidden className="animate-blink ml-1">▚</span>
              </p>
              <h1 className="mt-1 text-4xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl">
                <span className="block overflow-hidden pb-1">
                  <span data-hero-word className="block">
                    <DecryptText text="The night ledger," delay={250} />
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span data-hero-word className="block font-omen font-normal italic">
                    <DecryptText text="kept in ink." delay={500} />
                  </span>
                </span>
              </h1>
            </div>
            <div data-hero-fade className="flex flex-wrap items-center gap-2">
              <Badge color="emerald">All systems witnessed</Badge>
              <Badge>6 desks awake</Badge>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">47.2 TB available</span>
            </div>
          </div>

          {/* KPI cards */}
          <div data-hero-fade className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: '99.98%', to: '99.98', dec: 2, suffix: '%', l: 'signals retained', data: [8, 11, 9, 14, 16, 18, 19], tone: 'ink' as const },
              { k: '41s', to: '41', dec: 0, suffix: 's', l: 'median omen-to-verdict', data: [60, 55, 52, 48, 45, 43, 41], tone: 'blood' as const },
              { k: '18', to: '18', dec: 0, suffix: '', l: 'exhibits tonight', data: [4, 6, 8, 9, 12, 15, 18], tone: 'ink' as const },
              { k: '0', to: '0', dec: 0, suffix: '', l: 'unwitnessed breaches', data: [1, 1, 0, 1, 0, 0, 0], tone: 'blood' as const },
            ].map((m) => (
              <Card key={m.l} data-tilt>
                <CardBody>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-3xl tracking-tight" data-count data-to={m.to} data-decimals={m.dec} data-suffix={m.suffix}>{m.k}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">{m.l}</p>
                    </div>
                    <Sparkline data={m.data} width={84} height={28} tone={m.tone} />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {(breach) && (
            <Alert tone="danger" title="Breach protocol active — sector 7">
              All vessels return before the bell. Desks 1–3 to the fog line, desks 4–6 seal the archive. This is not a drill; the ledger is watching.
            </Alert>
          )}
          <div data-reveal>
            <Alert tone="warning" title="Fog incoming — sector 7">
              Visibility fails past the second marker. V-116 and V-117 stay open until the horn sounds twice.
            </Alert>
          </div>

          {/* exhibits table with sector tabs + search */}
          <Card data-reveal>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Exhibits // {filtered.length} open to the shift</p>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="filter ref, subject, status…"
                  className="w-56 rounded-[2px] border border-[#0a0a0b]/20 bg-transparent px-2 py-1 font-mono text-[11px] outline-none placeholder:opacity-40 focus:border-[#d42b1e] dark:border-white/20"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  { v: 'all', label: `All · ${EXHIBITS.length}` },
                  { v: 'Sectors 1–3', label: 'Sectors 1–3' },
                  { v: 'Sectors 4–6', label: 'Sectors 4–6' },
                  { v: 'Sector 7', label: 'Sector 7 ⚠' },
                  { v: 'Archive', label: 'Archive' },
                ].map((t) => (
                  <button
                    key={t.v}
                    onClick={() => setSector(t.v)}
                    className={`rounded-[2px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                      sector === t.v
                        ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                        : 'border border-[#0a0a0b]/15 opacity-60 hover:border-[#d42b1e] hover:text-[#d42b1e] hover:opacity-100 dark:border-white/15'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardBody>
              {filtered.length === 0 ? (
                <p className="py-6 text-center font-mono text-xs opacity-50">No exhibits match “{query}”. The ledger does not hallucinate.</p>
              ) : (
                <Table
                  caption={`${filtered.length} exhibit${filtered.length === 1 ? '' : 's'} under watch`}
                  striped
                  head={['Ref', 'Subject', 'Sector', 'Pulse', 'Status']}
                  body={filtered.map((e) => [e.ref, e.subject, e.sector, e.trend.join(' · '), e.status])}
                />
              )}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-40">
                pulse = filings per bell · blood marks sector 7
              </p>
            </CardBody>
          </Card>

          {/* charts + watch log */}
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <Card data-reveal>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Signals per bell // tonight</p>
                  <Badge color="emerald">+38% vs last fog</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <AreaChart data={SIGNALS} height={220} ariaLabel="Signals filed per hour tonight" />
                <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
                  {[
                    ['Peak', '22:00 · 24'],
                    ['Fog dip', '20:00 · 11'],
                    ['Now', `${clock} · streaming`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-[2px] border border-[#0a0a0b]/10 px-2 py-1.5 dark:border-white/10">
                      <p className="text-[9px] uppercase tracking-[0.18em] opacity-50">{k}</p>
                      <p className="mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <div className="space-y-4">
              <Card data-reveal>
                <CardHeader>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Verdict split</p>
                </CardHeader>
                <CardBody>
                  <DonutChart
                    data={[
                      { label: 'Filed', value: 12, tone: 'ink' },
                      { label: 'Open', value: 4, tone: 'dim' },
                      { label: 'Sealed', value: 2, tone: 'blood' },
                    ]}
                    size={150}
                    ariaLabel="Exhibit verdicts: 12 filed, 4 open, 2 sealed"
                  />
                </CardBody>
              </Card>
              <Card data-reveal data-tilt>
                <CardHeader>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Watch log</p>
                </CardHeader>
                <CardBody>
                  <Timeline
                    items={[
                      { title: 'Fog horn, first', time: '01:12', text: 'Sector 7 visibility failing. V-116 held open.' },
                      { title: 'Dossier filed', time: '01:41', text: 'V-119 rope fiber logged and witnessed.' },
                      { title: 'Survey passed', time: '02:15', text: 'Hairlines checked against the grid, sectors 4–6.' },
                      { title: 'Horn, second — awaited', time: 'Now', text: 'Active vessels recalled. Ledger streaming.', active: true },
                    ]}
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          {/* roster */}
          <Card data-reveal>
            <CardHeader>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">On watch // shift C roster</p>
                <Badge>5 / 6 awake</Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {ROSTER.map((r) => (
                  <div key={r.desk} className="flex items-center gap-3 rounded-[2px] border border-[#0a0a0b]/10 px-3 py-2 dark:border-white/10">
                    <span aria-hidden className={`h-2 w-2 rounded-full ${r.awake ? 'bg-emerald-500' : 'bg-[#0a0a0b]/20 dark:bg-white/20'}`} />
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">{r.desk} — {r.name}</p>
                      <p className="truncate text-xs opacity-60">{r.duty}</p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] opacity-50">{r.awake ? 'awake' : 'dousing'}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* footer — boot log streams */}
          <footer data-reveal className="rounded-[3px] border border-[#0a0a0b]/20 bg-black p-4 text-[#e9e7e2] dark:border-white/15">
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div data-boot className="min-h-[150px] font-mono text-[10px] leading-[1.7] opacity-70" />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 md:text-right">
                <p>© ledger — the dark found the room empty, not abandoned</p>
                <p className="mt-2 flex gap-4 md:justify-end">
                  <a href="#root" className="hover:opacity-100">Top ↑</a>
                  <button onClick={onBack} className="hover:opacity-100">Examples ←</button>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
