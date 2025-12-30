import { useState, useEffect, useCallback, useMemo } from 'react'
import { getRandomText, getLongPassage } from './utils/textGenerator'
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
  const [mode, setMode] = useState<Mode>('timed')
  const [text, setText] = useState(() => getRandomText('easy'))
  const [bestWpm, setBestWpm] = useState<number>(() => {
    const saved = localStorage.getItem('typing-pb')
    return saved ? Number(saved) : 0
  })

  // --- Hooks ---
  const initialTime = useMemo(() => (mode === 'timed' ? 60 : 0), [mode])
  const timer = useTimer(initialTime)

  const typing = useKeyboardTyping(text, {
    // Only lock typing if the overlay is visible or the timer finished
    isLocked: !isStarted || (mode === 'timed' ? timer.isFinished : false),
  })

  // --- Actions ---
  const restart = useCallback(
    (newDifficulty = difficulty, newMode = mode) => {
      setDifficulty(newDifficulty)
      setMode(newMode)
      setIsStarted(false)
      const content =
        newMode === 'passage'
          ? getLongPassage(newDifficulty)
          : getRandomText(newDifficulty)

      setText(content)
      timer.reset()
      typing.reset()
    },
    [difficulty, mode, timer, typing]
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

  // 3. Tab to Restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        restart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [restart])

  // 4. Persistence
  useEffect(() => {
    if (isFinished && isNewRecord) {
      localStorage.setItem('typing-pb', String(typing.wpm))
    }
  }, [isFinished, isNewRecord, typing.wpm])

  // --- Render Results View ---
  if (isFinished) {
    return (
      <div className="bg-app-bg animate-in fade-in flex min-h-screen items-center justify-center p-6 duration-700">
        <Results
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          totalTyped={typing.typed.length}
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
      {/* 1. Sticky Frosted Header */}
      <header className="glass-panel border-app-border/50 fixed top-0 z-40 flex w-full items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-txt-main text-app-surface rounded-lg px-3 py-2 shadow-sm">
            <span className="text-xl leading-none"></span>
          </div>
          <h1 className="text-apple-text text-lg font-semibold tracking-tight">
            Typing Test
          </h1>
        </div>

        <div className="bg-app-bg border-app-border text-txt-muted rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
          Personal Best:{' '}
          <span className="text-txt-main ml-1">{bestWpm} WPM</span>
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
            value={`${mode === 'timed' ? timer.timeLeft : timer.timeElapsed}s`}
          />
        </div>

        {/* 3. Typing Stage */}
        <section
          className="group relative cursor-text"
          onClick={() => !isStarted && setIsStarted(true)}
        >
          {/* Progress Bar for Passage Mode */}
          {mode === 'passage' && (
            <div className="bg-app-border/30 absolute -top-10 left-0 h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-type-primary h-full shadow-[0_0_8px_rgba(0,113,227,0.4)] transition-all duration-300 ease-out"
                style={{
                  width: `${(typing.typed.length / text.length) * 100}%`,
                }}
              />
            </div>
          )}

          {!isStarted && <FocusOverlay onStart={() => setIsStarted(true)} />}

          <div
            className={`transition-all duration-700 ${
              !isStarted
                ? 'pointer-events-none scale-[0.98] opacity-30 blur-xl select-none'
                : 'blur-0 scale-100 opacity-100'
            }`}
          >
            <TextDisplay target={text} typed={typing.typed} />
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
          <div className="bg-app-surface shadow-apple border-app-border flex rounded-full border p-1">
            {(['timed', 'passage'] as Mode[]).map((m) => (
              <button
                key={m}
                disabled={typing.typed.length > 0 && !isFinished}
                onClick={() => restart(difficulty, m)}
                className={`btn-spring rounded-full px-6 py-1.5 text-sm font-medium transition-all disabled:opacity-50 ${
                  mode === m
                    ? 'bg-txt-main text-app-surface shadow-md'
                    : 'text-txt-muted hover:text-txt-main'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
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
