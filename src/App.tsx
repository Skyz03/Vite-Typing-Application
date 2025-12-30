import { useState, useEffect, useCallback, useMemo } from 'react'
import { getAppText } from './utils/textGenerator'
import type { Difficulty, Mode } from './utils/textPools'
import { TextDisplay } from './components/typing/TextDisplay'
import { Results } from './components/typing/Result'
import { useTimer } from './hooks/useTimer'
import { useKeyboardTyping } from './hooks/useKeyboardTyping'
import { FocusOverlay } from './components/typing/FocusOverlay'

export default function App() {
  // --- State ---
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [isStarted, setIsStarted] = useState(false)
  const [mode, setMode] = useState<'timed' | 'passage'>('timed')
  const [text, setText] = useState(() => getAppText('timed', 'easy'))
  const [hasInteracted, setHasInteracted] = useState(false)

  const [bestWpm, setBestWpm] = useState<number>(() => {
    const saved = localStorage.getItem('typing-pb')
    return saved ? Number(saved) : 0
  })

  // --- Hooks ---
  const initialTime = mode === 'timed' ? 60 : 0
  const timer = useTimer(initialTime, mode)

  const typing = useKeyboardTyping(text, {
    // Only lock typing if the overlay is visible or the timer finished
    isLocked: !isStarted || (mode === 'timed' ? timer.isFinished : false),
  })

  // Update your start logic
  const handleStart = () => {
    setHasInteracted(true)
    setIsStarted(true)
  }

  // --- Actions ---
  const restart = useCallback(
    (newDifficulty = difficulty, newMode = mode) => {
      setDifficulty(newDifficulty)
      setMode(newMode)
      setIsStarted(hasInteracted)
      const newText = getAppText(newMode, newDifficulty)
      setText(newText)
      timer.reset()
      typing.reset()
    },
    [difficulty, mode, timer, typing, hasInteracted]
  )

  // --- Logic for Progress & Finishing ---
  const isFinished =
    (mode === 'timed' && timer.isFinished && typing.typed.length > 0) ||
    typing.isFinished
  const isBaseline = bestWpm === 0
  const isNewRecord = typing.wpm > bestWpm

  // --- Effects ---
  // 1. Start timer on first keypress
  useEffect(() => {
    if (isStarted && typing.typed.length === 1 && !timer.isRunning) {
      timer.start()
    }
  }, [typing.typed.length, timer.isRunning, timer, isStarted])

  // 2. Stop timer on finish
  useEffect(() => {
    if (typing.isFinished && timer.isRunning) {
      timer.stop()
    }
  }, [typing.isFinished, timer.isRunning, timer])

  useEffect(() => {
    const handleAnyKey = (e: KeyboardEvent) => {
      // 1. Ignore if the user is pressing a modifier key (Cmd, Alt, etc.)
      if (e.metaKey || e.ctrlKey || e.altKey) return

      // 2. Ignore the "Tab" key so it doesn't double-trigger with your restart logic
      if (e.key === 'Tab') return

      // 3. If we've interacted before but the test hasn't "started" yet, start it!
      if (hasInteracted && !isStarted) {
        setIsStarted(true)
      }
    }

    window.addEventListener('keydown', handleAnyKey)
    return () => window.removeEventListener('keydown', handleAnyKey)
  }, [hasInteracted, isStarted])

  useEffect(() => {
    const handleFirstStart = (e: KeyboardEvent) => {
      // Only trigger if they haven't interacted and didn't hit a modifier key
      if (!hasInteracted && !e.metaKey && !e.ctrlKey) {
        handleStart()
      }
    }

    window.addEventListener('keydown', handleFirstStart)
    return () => window.removeEventListener('keydown', handleFirstStart)
  }, [hasInteracted])

  // 4. Persistence
  useEffect(() => {
    if (isFinished && typing.wpm > bestWpm) {
      localStorage.setItem('typing-pb', String(typing.wpm))
    }
  }, [isFinished, bestWpm, typing.wpm])

  // --- Render Results View ---
  if (isFinished) {
    return (
      <div className="bg-app-bg animate-in fade-in flex min-h-screen items-center justify-center p-6 duration-700">
        <Results
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          totalTyped={typing.totalTyped}
          totalErrors={typing.totalErrors}
          isNewRecord={isNewRecord}
          isBaseline={isBaseline}
          onRestart={() => {
            if (isNewRecord) setBestWpm(typing.wpm)
            restart()
          }}
        />
      </div>
    )
  }

  // --- Main Typing View ---
  return (
    <main className="selection:bg-type-primary/20 relative flex min-h-screen flex-col items-center">
      <header className="glass-panel border-app-border/40 fixed top-0 left-0 z-50 w-full border-b transition-all duration-300">
        {/* Container: Responsive Max Width & Padding */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* Left Section: Logo & Branding */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-txt-main text-app-surface btn-spring flex h-9 w-9 items-center justify-center rounded-xl shadow-sm md:h-11 md:w-11">
              <span className="text-xl leading-none select-none md:text-2xl">
                
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-txt-main text-base font-semibold tracking-tight md:text-lg lg:text-xl">
                Typing <span className="hidden sm:inline">Precision</span>
              </h1>
              {/* Tagline hidden on very small screens */}
              <p className="text-txt-muted hidden text-[10px] font-medium tracking-wide md:block">
                Designed for performance.
              </p>
            </div>
          </div>

          {/* Right Section: Stats & Action */}
          <div className="flex items-center gap-3">
            {/* PB Badge: Responsive sizing */}
            <div className="bg-app-bg/50 border-app-border group hover:border-txt-muted flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all md:px-5 md:py-2">
              <div className="flex flex-col items-end leading-none">
                <span className="text-txt-muted text-[8px] font-bold tracking-[0.15em] uppercase md:text-[9px]">
                  Best
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-txt-main text-sm font-bold tabular-nums md:text-base">
                    {bestWpm}
                  </span>
                  <span className="text-txt-muted text-[10px] font-semibold uppercase">
                    WPM
                  </span>
                </div>
              </div>

              {/* Small separator icon */}
              <div className="bg-type-primary/10 flex h-6 w-6 items-center justify-center rounded-full md:h-8 md:w-8">
                <span className="text-xs md:text-sm">🏆</span>
              </div>
            </div>

            {/* Mobile-only Menu or Icon if needed, otherwise clean */}
          </div>
        </div>
      </header>

      {/* 2. Content Container */}
      <div className="mt-32 flex w-full max-w-4xl flex-col gap-12 px-6">
        {/* Stats Row */}
        <div className="border-app-border flex justify-center gap-12 border-b pb-10 md:gap-24">
          <AppleStat label="WPM" value={typing.wpm} />
          <AppleStat label="Accuracy" value={`${typing.accuracy}%`} />
          <AppleStat
            label={mode === 'timed' ? 'Remaining' : 'Elapsed'}
            value={`${timer.time}s`}
          />
        </div>

        {/* 3. Typing Stage */}
        <section className="group relative w-full cursor-text">
          {/* The Big Overlay - ONLY for the very first visit */}
          {!hasInteracted && <FocusOverlay onStart={handleStart} />}

          <div
            className={`transition-all duration-500 ${
              !hasInteracted
                ? 'pointer-events-none scale-95 opacity-10 blur-2xl'
                : 'blur-0 scale-100 opacity-100'
            }`}
          >
            <TextDisplay key={text} target={text} typed={typing.typed} />
          </div>
        </section>

        {/* 4. Controls - Segmented Pill Selectors */}
        <div className="mt-4 flex flex-col items-center justify-center gap-6 md:flex-row">
          {/* Difficulty Segment */}
          <div className="bg-app-surface shadow-apple border-app-border flex rounded-full border p-1">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => restart(d, mode)}
                className={`btn-spring rounded-full px-6 py-1.5 text-sm font-medium transition-all ${
                  difficulty === d
                    ? 'bg-txt-main text-app-surface shadow-md'
                    : 'text-txt-muted hover:text-txt-main'
                }`}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          {/* Mode Segment */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-app-surface shadow-apple border-app-border flex rounded-full border p-1">
              <button
                onClick={() => restart(difficulty, 'timed')}
                className={`btn-apple rounded-full px-6 py-1.5 text-xs font-semibold transition-all ${
                  mode === 'timed'
                    ? 'bg-txt-main text-app-surface shadow-sm'
                    : 'text-txt-muted hover:text-txt-main'
                }`}
              >
                Timed (60s)
              </button>
              <button
                onClick={() => restart(difficulty, 'passage')}
                className={`btn-apple rounded-full px-6 py-1.5 text-xs font-semibold transition-all ${
                  mode === 'passage'
                    ? 'bg-txt-main text-app-surface shadow-sm'
                    : 'text-txt-muted hover:text-txt-main'
                }`}
              >
                Passage
              </button>
            </div>
          </div>

          <button
            onClick={() => restart()}
            className="btn-spring bg-app-surface border-app-border text-txt-main shadow-apple hover:bg-app-bg flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
            title="Restart (Tab)"
          >
            ↺
          </button>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-txt-muted text-[10px] font-bold tracking-[0.2em] uppercase">
            Built for speed & precision
          </p>
        </footer>
      </div>
    </main>
  )
}

function AppleStat({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-txt-main text-5xl font-bold tracking-tighter tabular-nums md:text-7xl">
        {value}
      </span>
      <span className="text-txt-muted mt-2 text-[10px] font-bold tracking-[0.15em] uppercase md:text-xs">
        {label}
      </span>
    </div>
  )
}
