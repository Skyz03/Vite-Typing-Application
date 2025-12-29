import { useEffect } from 'react'
import confetti from 'canvas-confetti'

type ResultsProps = {
  wpm: number
  accuracy: number
  totalTyped: number
  totalErrors: number
  isNewRecord: boolean
  isBaseline: boolean
  onRestart: () => void
}

export function Results({
  wpm,
  accuracy,
  totalTyped,
  totalErrors,
  isNewRecord,
  isBaseline,
  onRestart,
}: ResultsProps) {

  useEffect(() => {
    // Only fire confetti if it's a NEW record and NOT the very first baseline
    if (isNewRecord && !isBaseline) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) return clearInterval(interval)

        const particleCount = 50 * (timeLeft / duration)
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isNewRecord, isBaseline])

  return (
    <div className="bg-app-surface border-app-border flex max-w-2xl w-full flex-col items-center rounded-3xl border p-12 text-center shadow-2xl animate-in zoom-in duration-500">
      <div className="mb-10">
        {isBaseline ? (
          <div className="flex flex-col items-center">
            <div className="bg-green-500/20 text-green-500 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-3xl font-bold">✓</span>
            </div>
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white">Baseline Established!</h1>
            <p className="text-txt-muted font-medium">You've set the bar. Now the real challenge begins.</p>
          </div>
        ) : isNewRecord ? (
          <div className="flex flex-col items-center">
            <span className="mb-4 text-5xl">🎉</span>
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white">High Score Smashed!</h1>
            <p className="text-txt-muted font-medium">You're getting faster. That was incredible typing.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white">Test Results</h1>
            <p className="text-txt-muted font-medium">Keep practicing to beat your personal best.</p>
          </div>
        )}
      </div>

      <div className="mb-12 grid w-full grid-cols-3 gap-6">
        <StatCard label="WPM" value={wpm} />
        <StatCard
          label="Accuracy"
          value={`${accuracy}%`}
          valueClass={accuracy < 90 ? 'text-type-error' : 'text-stat-acc'}
        />
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
        className="bg-white text-app-bg px-12 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        {isNewRecord || isBaseline ? 'Start New Test' : 'Beat This Score'} ↺
      </button>
    </div>
  )
}

function StatCard({ label, value, valueClass = 'text-white' }: { label: string; value: any; valueClass?: string }) {
  return (
    <div className="bg-app-bg/40 border-app-border flex flex-col items-center rounded-2xl border p-6 shadow-inner">
      <span className="text-txt-muted mb-3 text-[10px] font-black uppercase tracking-widest">{label}</span>
      <span className={`font-mono text-4xl font-black ${valueClass}`}>{value}</span>
    </div>
  )
}