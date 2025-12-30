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
    if (isNewRecord && !isBaseline) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) return clearInterval(interval)

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isNewRecord, isBaseline])

  return (
    <div className="animate-in slide-in-from-bottom-8 flex w-full max-w-4xl flex-col items-center duration-1000">
      {/* Apple-style Hero Heading */}
      <div className="mb-12 text-center">
        {isBaseline ? (
          <>
            <div className="bg-apple-success/10 text-apple-success mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <span className="text-4xl font-bold">✓</span>
            </div>
            <h1 className="text-apple-text mb-4 text-5xl font-semibold tracking-tight">
              Baseline Established.
            </h1>
            <p className="text-apple-gray mx-auto max-w-lg text-xl">
              Your initial performance has been recorded. The journey to faster
              typing starts now.
            </p>
          </>
        ) : isNewRecord ? (
          <>
            <span className="mb-6 block animate-bounce text-6xl">🎉</span>
            <h1 className="text-apple-text mb-4 text-6xl font-bold tracking-tighter">
              Simply faster.
            </h1>
            <p className="text-apple-gray mx-auto max-w-lg text-xl">
              You've surpassed your previous record with incredible precision.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-apple-text mb-4 text-5xl font-semibold tracking-tight">
              Great session.
            </h1>
            <p className="text-apple-gray mx-auto max-w-lg text-xl">
              Consistency is the foundation of speed. Keep pushing your limits.
            </p>
          </>
        )}
      </div>

      {/* Bento-style Stat Grid */}
      <div className="mb-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="WPM" value={wpm} description="Words per minute" />
        <StatCard
          label="Accuracy"
          value={`${accuracy}%`}
          description="Precision rate"
          valueClass={accuracy < 90 ? 'text-apple-error' : 'text-apple-success'}
        />
        <StatCard
          label="Precision"
          value={
            <div className="flex items-baseline gap-1">
              <span>{totalTyped}</span>
              <span className="text-apple-gray/40 text-2xl">/</span>
              <span className="text-apple-error">{totalErrors}</span>
            </div>
          }
          description="Typed vs Errors"
        />
      </div>

      {/* Apple Action Button */}
      <button
        onClick={onRestart}
        className="btn-spring group bg-apple-blue shadow-apple-blue/20 hover:bg-apple-blueHover flex items-center gap-2 rounded-full px-10 py-4 text-lg font-medium text-white shadow-lg transition-all"
      >
        <span>
          {isNewRecord || isBaseline ? 'Start New Test' : 'Beat This Score'}
        </span>
        <span className="transition-transform duration-500 group-hover:rotate-180">
          ↺
        </span>
      </button>

      <p className="text-apple-gray mt-8 text-xs font-semibold tracking-widest uppercase">
        Press{' '}
        <kbd className="border-apple-border text-apple-text mx-1 rounded border bg-white px-2 py-1 shadow-sm">
          Tab
        </kbd>{' '}
        to restart instantly
      </p>
    </div>
  )
}

function StatCard({
  label,
  value,
  description,
  valueClass = 'text-apple-text',
}: {
  label: string
  value: any
  description: string
  valueClass?: string
}) {
  return (
    <div className="bg-apple-surface border-apple-border/50 shadow-apple hover:shadow-apple-hover group flex flex-col items-center justify-center rounded-[2.5rem] border p-8 transition-all duration-500">
      <span className="text-apple-gray mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        {label}
      </span>
      <span
        className={`mb-2 text-6xl font-bold tracking-tighter transition-transform duration-500 group-hover:scale-105 ${valueClass}`}
      >
        {value}
      </span>
      <span className="text-apple-gray/60 text-xs font-medium">
        {description}
      </span>
    </div>
  )
}
