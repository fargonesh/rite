import { useEffect, useState } from 'react';

export interface NavigationProgressProps {
  progress?: number | null;
  color?: string;
}

export function NavigationProgress({ progress, color = '#d42b1e' }: NavigationProgressProps) {
  if (progress === null || progress === undefined) return null;
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent" aria-hidden={clamped >= 100}>
      <div
        role="progressbar"
        aria-label="Navigation progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        className="h-full transition-[width] duration-200 ease-out"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function NavigationProgressDemo() {
  const [progress, setProgress] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = (p ?? 0) + 4;
        return next >= 100 ? 100 : next;
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (progress === 100) setRunning(false);
  }, [progress]);

  return (
    <div>
      <NavigationProgress progress={progress} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setProgress(0);
            setRunning(true);
          }}
          disabled={running}
          className="h-9 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] disabled:opacity-40 dark:bg-[#e9e7e2] dark:text-black"
        >
          {running ? 'Routing' : 'Simulate route'}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          {progress === null ? 'Idle' : `${Math.round(progress)} / 100`}
        </span>
      </div>
    </div>
  );
}
