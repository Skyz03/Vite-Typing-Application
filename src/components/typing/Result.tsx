import { useEffect } from 'react';
import confetti from 'canvas-confetti';

type ResultsProps = {
  wpm: number;
  accuracy: number;
  totalTyped: number;
  totalErrors: number;
  isNewRecord?: boolean;
  onRestart: () => void;
};

export function Results({ wpm, accuracy, totalTyped, totalErrors, isNewRecord, onRestart }: ResultsProps) {
  useEffect(() => {
    if (isNewRecord) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [isNewRecord]);

  return (
    <div className="flex flex-col items-center bg-app-surface border border-app-border p-12 rounded-3xl shadow-2xl max-w-2xl w-full animate-in zoom-in duration-500 text-center">

      {/* Dynamic Header from Goal Images */}
      <div className="mb-10">
        {isNewRecord ? (
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-4">🎉</span>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">High Score Smashed!</h1>
            <p className="text-txt-muted font-medium">You're getting faster. That was incredible typing.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl font-bold">✓</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Baseline Established!</h1>
            <p className="text-txt-muted font-medium">You've set the bar. Now the real challenge begins.</p>
          </div>
        )}
      </div>

      {/* 3-Card Stat Grid */}
      <div className="grid grid-cols-3 gap-6 w-full mb-12">
        <StatCard label="WPM" value={wpm} />
        <StatCard label="Accuracy" value={`${accuracy}%`} valueClass={accuracy < 90 ? 'text-type-error' : 'text-stat-acc'} />
        <StatCard
          label="Characters"
          value={
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-stat-acc">{totalTyped}</span>
              <span className="text-txt-muted text-xl">/</span>
              <span className="text-type-error">{totalErrors}</span>
            </div>
          }
        />
      </div>

      <button
        onClick={onRestart}
        className="bg-white text-app-bg font-black px-12 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl"
      >
        Beat This Score ↺
      </button>
    </div>
  );
}

function StatCard({ label, value, valueClass = "text-white" }: { label: string, value: any, valueClass?: string }) {
  return (
    <div className="bg-app-bg/40 border border-app-border p-6 rounded-2xl flex flex-col items-center shadow-inner">
      <span className="text-txt-muted text-[10px] font-black uppercase tracking-widest mb-3">{label}</span>
      <span className={`text-4xl font-mono font-black ${valueClass}`}>{value}</span>
    </div>
  );
}