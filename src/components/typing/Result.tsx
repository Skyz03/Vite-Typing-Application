import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

type ResultsProps = {
  wpm: number;
  accuracy: number;
  isNewRecord?: boolean; // We added this prop in App.tsx
  onRestart: () => void;
};

export function Results({ wpm, accuracy, isNewRecord, onRestart }: ResultsProps) {
  useEffect(() => {
    if (isNewRecord) {
      // Professional "Gold" celebration
      const end = Date.now() + 2 * 1000;
      const colors = ['#eab308', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isNewRecord]);

  return (
    <div className="flex flex-col items-center bg-app-surface border border-app-border p-10 rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in duration-500">

      {/* 🏆 NEW RECORD ANIMATION SECTION */}
      {/* 🏆 NEW RECORD ANIMATION SECTION */}
      {isNewRecord && (
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {/* The Trophy */}
            <span className="text-6xl drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">🏆</span>

            {/* Enhanced Sparkles */}
            <span className="absolute -top-4 -right-4 animate-sparkle text-2xl">✨</span>
            <span className="absolute top-0 -left-6 animate-sparkle delay-500 text-xl">✨</span>
            <span className="absolute -bottom-2 right-6 animate-sparkle delay-700 text-lg">⭐</span>
          </div>

          <div className="text-center mt-4">
            <h2 className="text-type-primary font-black uppercase tracking-[0.4em] text-sm animate-pulse">
              New Personal Best
            </h2>
            <div className="h-1 w-12 bg-type-primary mx-auto mt-2 rounded-full opacity-50" />
          </div>
        </div>
      )}

      <h1 className="text-txt-muted font-bold uppercase tracking-widest text-xs mb-8">
        Test Results
      </h1>

      <div className="grid grid-cols-2 gap-12 mb-10 w-full">
        <div className="flex flex-col items-center">
          <span className="text-txt-muted text-[10px] font-black uppercase tracking-widest mb-1">WPM</span>
          <span className="text-5xl font-mono font-black text-white">{wpm}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-txt-muted text-[10px] font-black uppercase tracking-widest mb-1">Accuracy</span>
          <span className={`text-5xl font-mono font-black ${accuracy > 95 ? 'text-stat-acc' : 'text-type-error'}`}>
            {accuracy}%
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onRestart}
        className="w-full bg-type-primary text-app-bg font-black py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(234,179,8,0.3)]"
      >
        Try to beat it ↺
      </button>

      <p className="mt-4 text-txt-muted text-[10px] font-bold uppercase tracking-widest">
        Press <kbd className="bg-app-bg px-1.5 py-0.5 rounded border border-app-border mx-1">Tab</kbd> to restart
      </p>
    </div>
  );
}