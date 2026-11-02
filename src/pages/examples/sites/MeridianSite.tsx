import { useRef, useState } from 'react';
import { Accordion } from '@fargone/rite';
import { Alert } from '@fargone/rite';
import { Badge } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Card, CardBody, CardFooter, CardHeader } from '@fargone/rite';
import { Sparkline } from '@fargone/rite';
import { Switch } from '@fargone/rite';
import { TextInput } from '@fargone/rite';
import { DecryptText } from '../../../lib/scramble.tsx';
import { useCountUp, useHeroIntro, useScrollReveals, useTilt } from '../../../lib/motion.ts';

const BOOT_CAPTION = 'meridian works // build 3117 — all sightings retained';

const FEATURES = [
  { tag: 'Survey', title: 'Signal map', text: 'Every intake lands on the same grid. Nothing filed without a witness, nothing lost to a thread.', trend: [4, 6, 5, 9, 8, 12, 14] },
  { tag: 'Omen', title: 'Triage in 41s', text: 'Median omen-to-verdict across 12k cases. Timed, logged, sealed — the bell never rings twice.', trend: [12, 10, 9, 8, 6, 5, 4] },
  { tag: 'Seal', title: 'Audit séances', text: 'Quarterly reviews with SSO, retention rules, and a dedicated witness who takes notes in ink.', trend: [3, 4, 6, 7, 9, 11, 13] },
  { tag: 'Grid', title: 'One workspace', text: 'Dossiers, exhibits, and verdicts share a single ledger. No exports, no drift, no ghosts.', trend: [5, 5, 7, 8, 10, 10, 12] },
  { tag: 'Bell', title: 'Night-shift ready', text: 'Shift C runs the same console as day-shift. Handoffs are sealed, foghorns included.', trend: [2, 5, 4, 7, 9, 8, 11] },
  { tag: 'Void', title: 'On-prem void', text: 'Your steel, our rite. Air-gapped installs with tamper seals and a paper fallback.', trend: [6, 7, 6, 9, 11, 12, 15] },
];

const RITUAL = [
  { no: '01', title: 'File the signal', text: 'Intake takes eleven seconds. Name it, grid it, stamp it. The record starts listening immediately.' },
  { no: '02', title: 'Witness the triage', text: 'An omen routes to the right desk in under a minute. Every handoff leaves a chalk mark.' },
  { no: '03', title: 'Seal the verdict', text: 'Decide once, in ink. The ledger keeps the reasoning, the dissent, and the silence after.' },
];

const TESTIMONIES = [
  { quote: 'We replaced four tools and a shared nightmare with one ledger. Shift change takes six minutes now.', name: 'Warden I. Halden', role: 'Halden & Co — operations' },
  { quote: 'The audit séance is the first meeting I attend with a lantern. It is also the only one that ends on time.', name: 'Sr. Archivist Okafor', role: 'St. Anselm Archive' },
  { quote: 'Fog season used to mean lost vessels. Now it means a red badge and everybody home before the bell.', name: 'Harbor Clerk Vess', role: 'Office of Quiet Affairs' },
];

const FAQS = [
  { value: 'migrate', label: 'How do we migrate without losing the record?', content: 'Import CSVs, threads, and cold storage in one sitting. Every row keeps its timestamp, author, and doubt. Nothing is overwritten — the ledger appends, then seals.' },
  { value: 'security', label: 'Who can read our dossiers?', content: 'Only the desks you name. SSO, desk-scoped seals, and a witness log for every open. Ask for the séance notes and we will show you who looked, when, and why.' },
  { value: 'offline', label: 'Does it work past the second marker?', content: 'Yes. The console queues intakes offline and syncs when the fog lifts. Paper fallback included — the rite predates the network and will outlive it.' },
  { value: 'cancel', label: 'What happens if we leave?', content: 'You take everything: dossiers, verdicts, chalk marks, exported nightly. The record keeps a receipt, not a copy. That is the covenant.' },
];

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mesh-page min-h-full text-[#0a0a0b] dark:text-[#e9e7e2]">{children}</div>;
}

export default function MeridianSite({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [annual, setAnnual] = useState(true);
  const [sent, setSent] = useState(false);
  const valid = /.+@.+\..+/.test(email.trim());
  const root = useRef<HTMLDivElement | null>(null);

  useHeroIntro(root);
  useScrollReveals(root);
  useCountUp(root);
  useTilt(root);

  return (
    <Shell>
      <div ref={root}>
        {/* classification banner */}
        <div className="flex items-center justify-between border-b border-[#0a0a0b]/15 bg-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e9e7e2] dark:border-white/10">
          <span>
            Meridian // clearance bone <span className="opacity-40">— this page is witnessed</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-emerald-400" />
            receiving
          </span>
        </div>

        {/* nav */}
        <header className="mesh-ink sticky top-0 z-10 border-b border-white/10 text-[#e9e7e2]">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">
            <button onClick={onBack} className="flex items-center gap-2" title="Back to examples">
              <span className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#e9e7e2] font-mono text-sm text-black">◍</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em]">Meridian</span>
            </button>
            <nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 lg:flex">
              <a href="#m-features" className="hover:opacity-100">Features</a>
              <a href="#m-ritual" className="hover:opacity-100">Ritual</a>
              <a href="#m-pricing" className="hover:opacity-100">Pricing</a>
              <a href="#m-faq" className="hover:opacity-100">Covenant</a>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={onBack} className="hidden font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 hover:opacity-100 sm:block">← examples</button>
              <a href="#m-trial"><Button size="sm">Start trial</Button></a>
            </div>
          </div>
        </header>

        {/* hero — centered witness + live console preview */}
        <section className="border-b border-[#0a0a0b]/15 dark:border-white/10">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-14 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-20">
            <div>
              <p data-hero-fade className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">
                Meridian Works // SaaS starter <span aria-hidden className="animate-blink ml-1">▚</span>
              </p>
              <h1 className="mt-3 text-5xl leading-[0.95] font-medium tracking-[-0.03em] sm:text-7xl">
                <span className="block overflow-hidden pb-1">
                  <span data-hero-word className="block">
                    <DecryptText text="Operations," delay={250} />
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-hero-word className="block font-omen font-normal italic">
                    <DecryptText text="witnessed." delay={550} />
                  </span>
                </span>
              </h1>
              <p data-hero-fade className="mt-4 max-w-md text-[15px] leading-6 opacity-70">
                The containment OS for teams past the map&apos;s edge. One workspace, every signal
                filed, every verdict sealed — in eleven seconds flat.
              </p>
              <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-2">
                <a href="#m-trial"><Button size="lg">Request access</Button></a>
                <a href="#m-ritual"><Button size="lg" variant="secondary">See the ritual</Button></a>
              </div>
              <p data-hero-fade className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-45">
                No cards · eleven-second intake · cancel with the ledger intact
              </p>
            </div>
            {/* console preview card */}
            <div data-hero-fade data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-4 shadow-[0_24px_60px_-30px_rgba(10,10,11,0.45)] dark:border-white/15 dark:bg-[#0e0f11]">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Console // tonight</p>
                <Badge color="emerald">Live</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 font-mono">
                <div className="rounded-[2px] border border-[#0a0a0b]/10 p-2 dark:border-white/10">
                  <p className="text-lg tracking-tight" data-count data-to="99.98" data-decimals="2" data-suffix="%">99.98%</p>
                  <p className="text-[9px] uppercase tracking-[0.16em] opacity-50">retained</p>
                </div>
                <div className="rounded-[2px] border border-[#0a0a0b]/10 p-2 dark:border-white/10">
                  <p className="text-lg tracking-tight" data-count data-to="41" data-suffix="s">41s</p>
                  <p className="text-[9px] uppercase tracking-[0.16em] opacity-50">verdict</p>
                </div>
                <div className="rounded-[2px] border border-[#0a0a0b]/10 p-2 dark:border-white/10">
                  <p className="text-lg tracking-tight">0</p>
                  <p className="text-[9px] uppercase tracking-[0.16em] opacity-50">breaches</p>
                </div>
              </div>
              <div className="mt-3 rounded-[2px] border border-[#0a0a0b]/10 p-2 dark:border-white/10">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] opacity-50">
                  <span>Signals / watch</span>
                  <span className="text-[#d42b1e] opacity-100">▲ steady</span>
                </div>
                <Sparkline data={[4, 6, 5, 9, 8, 12, 14, 16, 15, 19]} width={320} height={44} tone="blood" className="mt-1 w-full [&>svg]:w-full" />
              </div>
              <div className="mt-3 space-y-1.5 font-mono text-[11px]">
                {[
                  ['V-118', 'Fog line', 'Sealed'],
                  ['V-119', 'Harbor bell', 'Open'],
                  ['V-120', 'Ink audit', 'Filed'],
                ].map(([ref, subj, st]) => (
                  <div key={ref} className="flex items-center gap-3 border-b border-dashed border-[#0a0a0b]/10 pb-1.5 last:border-0 last:pb-0 dark:border-white/10">
                    <span className="opacity-50">{ref}</span>
                    <span className="truncate">{subj}</span>
                    <span className="ml-auto text-[#d42b1e]">{st} →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* trusted marquee strip */}
          <div className="border-t border-[#0a0a0b]/15 dark:border-white/10">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] opacity-45">
              <span className="text-[#d42b1e] opacity-100">✦ trusted in basements by</span>
              <span>Halden &amp; Co</span>
              <span>Meridian Works</span>
              <span>Office of Quiet Affairs</span>
              <span>St. Anselm Archive</span>
              <span className="hidden sm:inline">Fog Harbor Parish</span>
            </div>
          </div>
        </section>

        {/* metrics */}
        <section data-reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-10 lg:grid-cols-4">
          <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
            <p className="font-mono text-3xl tracking-tight" data-count data-to="12" data-suffix="k">12k</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">cases witnessed</p>
          </div>
          <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
            <p className="font-mono text-3xl tracking-tight" data-count data-to="41" data-suffix="s">41s</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">median omen-to-verdict</p>
          </div>
          <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
            <p className="font-mono text-3xl tracking-tight" data-count data-to="99.98" data-decimals="2" data-suffix="%">99.98%</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">signals retained</p>
          </div>
          <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
            <p className="font-mono text-3xl tracking-tight">0</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">unwitnessed breaches</p>
          </div>
        </section>

        {/* features */}
        <section id="m-features" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-4">
          <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ features — six, not three</p>
          <h2 data-reveal className="mt-2 max-w-xl text-3xl tracking-tight">
            Everything the night shift needs. <span className="font-omen italic">Nothing it doesn&apos;t.</span>
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Card key={f.title} data-tilt data-reveal>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge>{f.tag}</Badge>
                    <span className="font-mono text-[10px] opacity-50">0{i + 1}</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Sparkline data={f.trend} width={220} height={30} tone={i === 1 ? 'blood' : 'ink'} className="mb-3 opacity-80 [&>svg]:w-full" />
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-1 text-[13px] leading-5 opacity-70">{f.text}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* ritual / how it works */}
        <section id="m-ritual" data-reveal className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ the ritual</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {RITUAL.map((s) => (
              <div key={s.no} className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d42b1e]">{s.no}</p>
                <p className="mt-2 text-sm font-semibold">{s.title}</p>
                <p className="mt-1 text-[13px] leading-5 opacity-70">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* testimonies */}
        <section data-reveal className="border-y border-[#0a0a0b]/15 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ filed testimonies</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {TESTIMONIES.map((t) => (
                <figure key={t.name} className="flex flex-col rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
                  <blockquote className="font-omen text-lg leading-snug italic">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                    {t.name} <span className="opacity-60">— {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="m-pricing" data-reveal className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ covenant // pricing</p>
              <h2 className="mt-2 text-2xl tracking-tight">Pay for desks, <span className="font-omen italic">not dread.</span></h2>
            </div>
            <Switch checked={annual} onCheckedChange={setAnnual} label={annual ? 'Annual — 2 months free' : 'Monthly'} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge>Initiate</Badge>
                  <span className="font-mono text-xs opacity-60">{annual ? '$0 // annual' : '$0 // monthly'}</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="font-mono text-3xl tracking-tight">$0</p>
                <p className="mt-2 text-sm leading-6 opacity-70">One workspace, three dossiers, 30-day omen retention. The record watches, gently.</p>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] opacity-70">
                  <li>→ 3 dossiers</li>
                  <li>→ 30-day retention</li>
                  <li>→ 1 witness desk</li>
                </ul>
              </CardBody>
              <CardFooter><Button variant="secondary" size="sm" className="w-full">Begin quietly</Button></CardFooter>
            </Card>
            <Card data-tilt className="border-[#d42b1e]/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge color="red">Congregation ★</Badge>
                  <span className="font-mono text-xs opacity-60">{annual ? '$480 // annual' : '$48 // monthly'}</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="font-mono text-3xl tracking-tight">{annual ? '$40' : '$48'}<span className="text-sm opacity-50">/desk/mo</span></p>
                <p className="mt-2 text-sm leading-6 opacity-70">SSO, audit séances, dedicated witness, on-prem void. The record moves in.</p>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] opacity-70">
                  <li>→ unlimited dossiers</li>
                  <li>→ 7-year sealed retention</li>
                  <li>→ dedicated witness + SSO</li>
                </ul>
              </CardBody>
              <CardFooter><Button size="sm" variant="destructive" className="w-full">Speak to the order</Button></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge color="indigo">Void</Badge>
                  <span className="font-mono text-xs opacity-60">custom // sealed</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="font-mono text-3xl tracking-tight">Sealed</p>
                <p className="mt-2 text-sm leading-6 opacity-70">Air-gapped installs, paper fallback, tamper seals. For parishes past the second marker.</p>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] opacity-70">
                  <li>→ your steel, our rite</li>
                  <li>→ lantern-compatible</li>
                  <li>→ annual séance included</li>
                </ul>
              </CardBody>
              <CardFooter><Button variant="secondary" size="sm" className="w-full">Request the void</Button></CardFooter>
            </Card>
          </div>
        </section>

        {/* faq */}
        <section id="m-faq" data-reveal className="mx-auto max-w-3xl scroll-mt-20 px-6 pb-12">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ the fine ink</p>
          <h2 className="mt-2 text-center text-2xl tracking-tight">Asked under oath<span className="text-[#d42b1e]">.</span></h2>
          <div className="mt-6">
            <Accordion defaultValue="migrate" items={FAQS} />
          </div>
        </section>

        {/* trial console */}
        <section id="m-trial" data-reveal className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Trial // request access</p>
                <Badge color={valid ? 'emerald' : 'zinc'}>{sent && valid ? 'Sealed' : valid ? 'Record listening' : 'Awaiting email'}</Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <TextInput label="Work email" fileNo="FILE // M-01" placeholder="you@parish.org" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); }} />
                  <div className="flex flex-wrap gap-2">
                    <Button disabled={!valid} onClick={() => setSent(true)}>Request access</Button>
                    <Button variant="ghost" onClick={() => { setEmail(''); setSent(false); }}>Recant</Button>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-45">Eleven seconds · no card · sealed nightly</p>
                </div>
                <div>
                  {sent && valid ? (
                    <Alert tone="success" title="Filed under seal">
                      {email} is in the ledger. If found worthy, an audience will be arranged. Do not call us — the bell calls you.
                    </Alert>
                  ) : (
                    <Alert tone={valid ? 'info' : 'warning'} title={valid ? 'The record is listening' : 'The record waits'}>
                      {valid ? 'A valid email carries weight. Submit, and it will be carried downward.' : 'A valid email carries weight. The record does not acknowledge ghosts.'}
                    </Alert>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* footer */}
        <footer className="border-t border-[#0a0a0b]/15 dark:border-white/10">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">{BOOT_CAPTION}</p>
              <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
                <a href="#m-features" className="hover:opacity-100">Features</a>
                <a href="#m-ritual" className="hover:opacity-100">Ritual</a>
                <a href="#m-pricing" className="hover:opacity-100">Pricing</a>
                <a href="#m-trial" className="hover:opacity-100">Trial</a>
              </div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 md:text-right">
              <p>© meridian — all sightings retained</p>
              <button onClick={onBack} className="mt-2 hover:opacity-100">Examples ←</button>
            </div>
          </div>
        </footer>
      </div>
    </Shell>
  );
}
