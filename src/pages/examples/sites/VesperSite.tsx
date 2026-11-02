import { useRef, useState } from 'react';
import { Alert } from '@fargone/rite';
import { Badge } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Card, CardBody, CardFooter, CardHeader } from '@fargone/rite';
import { Switch } from '@fargone/rite';
import { TextInput } from '@fargone/rite';
import { DecryptText } from '../../../lib/scramble.tsx';
import { useBootType, useCountUp, useHeroIntro, useScrollReveals, useTilt } from '../../../lib/motion.ts';

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mesh-page min-h-full text-[#0a0a0b] dark:text-[#e9e7e2]">
      {children}
    </div>
  );
}

const BOOT_LINES = [
  'vesper systems v2.4.7 [build 2847]',
  'Initializing secure kernel...',
  '> Loading cryptographic modules... ok',
  '> Establishing encrypted channels... ok',
  '> Verifying authentication tokens... ok',
  'Mounting distributed filesystem...',
  '> /mnt/vesper-core: 47.2 TB available',
  '> /mnt/operations: 128.4 TB available',
  'Syncing network time protocol... ok',
  'System time: 02/11/2026 1:28:47 pm',
  'Starting background services...',
  '> watchdog_daemon [PID 18471]... running',
  '> omen_router [PID 2103]... running',
  '> Tamper detection: pass',
];

/** Palantir.com-style index row: small left descriptor + /0.x, massive right word.
 *  Motion here stays subtle on purpose — a nudge and a color shift, nothing terminal. */
function IndexRow({
  no,
  blurb,
  word,
  active,
}: {
  no: string;
  blurb: string;
  word: string;
  active?: boolean;
}) {
  return (
    <a
      href="#console"
      data-reveal
      className="group grid grid-cols-[1fr_auto] items-end gap-6 border-t border-[#0a0a0b]/12 py-8 last:border-b sm:grid-cols-[220px_1fr_auto] sm:items-start dark:border-white/10"
    >
      <div>
        <p className="max-w-[220px] text-[15px] leading-snug">{blurb}</p>
        <p className="mt-8 font-mono text-xs opacity-40">/{no}</p>
      </div>
      <p
        className={
          'col-span-2 text-right text-[17vw] leading-[0.85] font-medium tracking-[-0.04em] transition-all duration-300 group-hover:translate-x-1 sm:col-span-1 sm:text-[7.5rem] ' +
          (active ? 'text-[#274bdb] dark:text-[#5b7cff]' : 'group-hover:text-[#d42b1e]')
        }
      >
        {word}
      </p>
      <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-60 sm:block">
        open ↓
      </p>
    </a>
  );
}

export default function VesperSite({ onBack }: { onBack: () => void }) {
  const [designation, setDesignation] = useState('');
  const [surveil, setSurveil] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const valid = designation.trim().length >= 2;
  const root = useRef<HTMLDivElement | null>(null);

  // Hero gets the terminal treatment. Everything below stays subtle:
  // soft reveals, count-ups, tilt, self-typing boot log.
  useHeroIntro(root);
  useScrollReveals(root);
  useCountUp(root);
  useTilt(root);
  useBootType(root, BOOT_LINES);

  return (
    <Shell>
      <div ref={root}>
      {/* classification banner */}
      <div className="flex items-center justify-between border-b border-[#0a0a0b]/15 bg-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e9e7e2] dark:border-white/10">
        <span>
          Vesper // clearance indigo <span className="opacity-40">— this page is witnessed</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#d42b1e]" />
          listening
        </span>
      </div>

      {/* nav — dark, continuous with banner + hero. one dark block, no sandwich */}
      <header className="mesh-ink sticky top-0 z-10 border-b border-white/10 text-[#e9e7e2]">
        <div className="flex items-center gap-4 px-4 py-2.5 sm:px-6">
          <button onClick={onBack} className="flex items-center gap-2" title="Back to examples">
            <span className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#e9e7e2] font-mono text-sm text-black">
              ◉
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em]">Vesper</span>
          </button>
          <nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 lg:flex">
            <a href="#dossiers" className="hover:opacity-100">Dossiers</a>
            <a href="#protocols" className="hover:opacity-100">Protocols</a>
            <a href="#relics" className="hover:opacity-100">Relics</a>
            <a href="#console" className="hover:opacity-100">Console</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onBack}
              className="hidden font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 hover:opacity-100 sm:block"
            >
              ← examples
            </button>
            <a href="#console" className="hidden sm:block">
              <Button size="sm">Request audience</Button>
            </a>
            <span className="flex overflow-hidden rounded-[2px] border border-white/20">
              <span className="flex h-8 w-8 items-center justify-center border-r border-white/20 font-mono text-xs">⌕</span>
              <span className="flex h-8 w-8 items-center justify-center font-mono text-xs">☰</span>
            </span>
          </div>
        </div>
      </header>

      {/* hero — one dark zone with nav. bigger, emptier: index + giant word + one line */}
      <section className="border-b border-[#0a0a0b]/15 dark:border-white/10">
        <div className="grid lg:grid-cols-[300px_1fr]">
          {/* left: index only */}
          <div className="mesh-ink flex flex-col p-5 text-[#e9e7e2] sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">↱ index</p>
            <nav className="mt-4 space-y-1 text-[24px] leading-tight font-light tracking-tight">
              <p className="text-[#4d7cff]">Vigil Holds</p>
              <p className="opacity-60">Archive</p>
              <p className="opacity-60">Cart</p>
            </nav>
            <div className="mt-auto pt-10 font-mono text-[10px] leading-[1.8] opacity-50">
              <p>systems v2.4.7 — ok</p>
              <p>tamper: pass</p>
              <p>
                47.2 TB available <span className="animate-blink">▚</span>
              </p>
            </div>
          </div>
          {/* right: witnessed panel — mesh, never flat */}
          <div className="mesh-hero grained relative flex min-h-[62vh] flex-col justify-end overflow-hidden p-6 text-[#e9e7e2] sm:p-10">
            <div className="bg-survey pointer-events-none absolute inset-0 opacity-40" />
            <p data-hero-fade className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff5a4a]">
              Cowardice kills — field note<span aria-hidden className="animate-blink ml-1">▚</span>
            </p>
            <h1 className="relative mt-2 text-[24vw] leading-[0.8] font-medium tracking-[-0.04em] lg:text-[10rem]">
              <span className="block overflow-hidden pb-1">
                <span data-hero-word className="block">
                  <DecryptText text="Vigil" delay={350} />
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-hero-word className="block">
                  <DecryptText text="Holds" delay={650} />
                </span>
              </span>
            </h1>
            <div data-hero-fade className="relative mt-6 flex items-end justify-between gap-4">
              <p className="max-w-md text-[15px] leading-6 opacity-80">
                Containment OS for teams that operate where the map ends.
              </p>
              <a href="#protocols" className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em]">
                shop ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* trusted strip — full bleed hairline, not a box */}
      <section className="border-b border-[#0a0a0b]/15 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] opacity-45 sm:px-6">
          <span className="text-[#d42b1e] opacity-100">✦ trusted in basements by</span>
          <span>Halden &amp; Co</span>
          <span>Meridian Works</span>
          <span>Office of Quiet Affairs</span>
          <span>St. Anselm Archive</span>
        </div>
      </section>

      {/* index rows — full bleed like palantir.com, hairlines edge to edge */}
      <section id="protocols" className="scroll-mt-24 px-4 pt-10 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">↱ index — protocols</p>
        <div className="mt-2">
          <IndexRow no="0.2" blurb="Achieve signal superiority, from server room to mud" word="Vigil" active />
          <IndexRow no="0.3" blurb="Build and manage omen-powered software, with a complete witness platform" word="Foundry" />
          <IndexRow no="0.4" blurb="The central system for orchestrating decisions across human + other teams" word="Ontology" />
        </div>
      </section>

      {/* metrics — count up, quietly */}
      <section data-reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-10 lg:grid-cols-4">
        <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
          <p className="font-mono text-3xl tracking-tight" data-count data-to="99.98" data-decimals="2" data-suffix="%">99.98%</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">signals retained</p>
        </div>
        <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
          <p className="font-mono text-3xl tracking-tight" data-count data-to="41" data-suffix="s">41s</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">median omen-to-verdict</p>
        </div>
        <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
          <p className="font-mono text-3xl tracking-tight">0</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">unwitnessed breaches</p>
        </div>
        <div className="border-l border-[#0a0a0b]/15 pl-4 first:border-0 first:pl-0 dark:border-white/10">
          <p className="font-mono text-3xl tracking-tight">∞</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">patience of the record</p>
        </div>
      </section>

      {/* relics — holo cards + numbered editions */}
      <section id="relics" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">Relics // softwear</p>
        <h2 className="mt-2 max-w-xl text-3xl tracking-tight">
          Merch as <span className="font-omen italic">proof of attendance.</span>
        </h2>
        <div id="dossiers" className="mt-6 grid scroll-mt-24 gap-4 md:grid-cols-3">
          <Card data-tilt data-reveal>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge>Holo // 119</Badge>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">edition of 300</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="holo grained flex aspect-[8/5] items-center justify-center rounded-[2px]">
                <span className="text-4xl font-bold tracking-tight text-black">◍</span>
              </div>
              <p className="mt-3 font-medium">Sigil card</p>
              <p className="mt-1 text-[13px] leading-5 opacity-70">
                Iridescent stock, black sigil. Scans as witness, reads as fever dream.
              </p>
            </CardBody>
            <CardFooter>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                <span>$99 △</span>
                <span>est. 2003 — usa</span>
              </div>
            </CardFooter>
          </Card>
          <Card data-tilt data-reveal>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge color="indigo">Mauve</Badge>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">made in usa</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mesh-mauve grained flex aspect-[8/5] flex-col justify-between rounded-[2px] p-3 text-[#3d2b3c]">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Vesper technologies</p>
                <p className="font-mono text-3xl">◍</p>
              </div>
              <p className="mt-3 font-medium">Founder card</p>
              <p className="mt-1 text-[13px] leading-5 opacity-70">
                Dusty mauve, soft touch. Hand-numbered. Smells faintly of server room.
              </p>
            </CardBody>
            <CardFooter>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                <span>No shame in our game</span>
                <span>©pltr</span>
              </div>
            </CardFooter>
          </Card>
          <Card data-tilt data-reveal className="border-[#d42b1e]/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge color="red">Void</Badge>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">sold out</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="holo-dark grained flex aspect-[8/5] items-center justify-center rounded-[2px]">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">unreadable</span>
              </div>
              <p className="mt-3 font-medium">Black sigil</p>
              <p className="mt-1 text-[13px] leading-5 opacity-70">
                Near-black on black. Visible only when tilted toward the light. Like the org chart.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="destructive" className="w-full">Join the waitlist</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* console / CTA — quiet reveal only */}
      <section id="console" data-reveal className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                Console // request an audience
              </p>
              <Badge color={valid ? 'emerald' : 'zinc'}>{valid ? 'Record listening' : 'Awaiting name'}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <TextInput
                  label="Designation"
                  fileNo="FILE // 01"
                  placeholder="state your name"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                    setSubmitted(false);
                  }}
                />
                <Switch checked={surveil} onCheckedChange={setSurveil} label="I consent to be surveilled" />
                <div className="flex gap-2">
                  <Button disabled={!valid} onClick={() => setSubmitted(true)}>
                    Submit testimony
                  </Button>
                  <Button variant="ghost" onClick={() => { setDesignation(''); setSubmitted(false); }}>
                    Recant
                  </Button>
                </div>
              </div>
              <div>
                {submitted && valid ? (
                  <Alert tone="success" title={`${designation} — received`}>
                    Your testimony is filed under seal. If the record finds you worthy, an audience
                    will be arranged. Do not call us.
                  </Alert>
                ) : (
                  <Alert tone={valid ? 'info' : 'warning'} title={valid ? 'The record is listening' : 'The record waits'}>
                    {valid
                      ? 'A name has weight. Submit, and it will be carried downward.'
                      : 'Two characters minimum. The record does not acknowledge ghosts.'}
                  </Alert>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* doctrine quote — quiet reveal only */}
      <section data-reveal className="border-t border-[#0a0a0b]/15 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <p className="font-omen text-2xl leading-snug italic sm:text-3xl">
            “We built the dashboard first. The dread was already there — we merely gave it rows and
            columns.”
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">
            — foundress, annual letter, year of the quiet breach
          </p>
        </div>
      </section>

      {/* covenant / pricing teaser — quiet reveal only */}
      <section id="covenant" data-reveal className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge>Initiate</Badge>
                <span className="font-mono text-xs opacity-60">$0 // witnessed</span>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm leading-6 opacity-70">
                For the curious. One workspace, three dossiers, omens retained 30 days. The record
                watches, gently.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="secondary" size="sm">Begin quietly</Button>
            </CardFooter>
          </Card>
          <Card className="border-[#d42b1e]/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge color="red">Congregation</Badge>
                <span className="font-mono text-xs opacity-60">custom // sealed</span>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm leading-6 opacity-70">
                For institutions. SSO, audit seances, dedicated witness, on-prem void. The record
                moves in.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="destructive">Speak to the order</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* footer — boot log types itself, loops */}
      <footer className="border-t border-[#0a0a0b]/15 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[1fr_auto]">
          <div data-boot className="min-h-[238px] font-mono text-[10px] leading-[1.7] opacity-60" />
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 md:text-right">
            <p>© vesper — all sightings retained</p>
            <p className="mt-2 flex gap-4 md:justify-end">
              <a href="#protocols" className="hover:opacity-100">Doctrine</a>
              <a href="#console" className="hover:opacity-100">Console</a>
              <button onClick={onBack} className="hover:opacity-100">Examples ←</button>
            </p>
          </div>
        </div>
      </footer>
      </div>
    </Shell>
  );
}
