import { useState, useEffect, useCallback, useMemo } from 'react'
import { getRandomText, getLongPassage } from './utils/textGenerator'
import type { Difficulty, Mode } from './utils/textPools'
import { DifficultySelect } from './components/controls/DifficultySelect'
import { ModeSelect } from './components/controls/ModeSelect'
import { TextDisplay } from './components/typing/TextDisplay'
import { Results } from './components/typing/Result'
import { Header } from './components/layout/Header'
import { useTimer } from './hooks/useTimer'
import { useKeyboardTyping } from './hooks/useKeyboardTyping'
import { FocusOverlay } from './components/typing/FocusOverlay'

export default function App() {
  // --- State ---
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [isStarted, setIsStarted] = useState(false);
  const [mode, setMode] = useState<Mode>('timed')
  const [text, setText] = useState(() => getRandomText('easy'))
  const [bestWpm, setBestWpm] = useState<number>(() => {
    const saved = localStorage.getItem('typing-pb')
    return saved ? Number(saved) : 0
  })

  // --- Hooks ---
  // If mode is timed, we want 60s. If passage, we start at 0 (counting up).
  const initialTime = useMemo(() => (mode === 'timed' ? 60 : 0), [mode]);
  const timer = useTimer(initialTime)

  const typing = useKeyboardTyping(text, {
    isLocked: mode === 'timed' ? timer.isFinished : false,
  })

  // --- Actions ---
  const restart = useCallback(
    (newDifficulty = difficulty, newMode = mode) => {
      setDifficulty(newDifficulty)
      setMode(newMode)
      setIsStarted(false);
      // Distinct content types for different modes
      const content = newMode === 'passage'
        ? getLongPassage(newDifficulty)
        : getRandomText(newDifficulty)

      setText(content)
      timer.reset()
      typing.reset()
    },
    [difficulty, mode, timer, typing]
  )

  // --- Effects ---

  // 1. Start timer on first keypress
  useEffect(() => {
    if (isStarted && typing.typed.length === 1 && !timer.isRunning) {
      timer.start();
    }
  }, [typing.typed.length, timer.isRunning, timer, isStarted]);

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

  // 4. Update PB and logic for "isFinished"
  const isFinished = (mode === 'timed' && timer.isFinished && typing.typed.length > 0) || typing.isFinished

  useEffect(() => {
    if (isFinished && typing.wpm > bestWpm) {
      setBestWpm(typing.wpm)
      localStorage.setItem('typing-pb', String(typing.wpm))
    }
  }, [isFinished, typing.wpm, bestWpm])

  // --- Render Results ---
  if (isFinished) {
    return (
      <div className="bg-app-bg animate-in fade-in flex min-h-screen items-center justify-center p-6">
        <Results
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          totalTyped={typing.totalTyped}
          totalErrors={typing.totalErrors}
          isNewRecord={typing.wpm > bestWpm}
          onRestart={() => restart()}
        />
      </div>
    )
  }

  // --- Main Render ---
  return (
    <main className="bg-app-bg text-txt-main selection:bg-type-primary/30 min-h-screen p-8 antialiased">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <Header bestWpm={bestWpm} />

        <div className="border-app-border flex flex-col items-center justify-between gap-6 border-b pb-6 md:flex-row">
          {/* Stats Group */}
          <div className="flex items-center gap-10">
            <StatItem label="WPM" value={typing.wpm} />

            <StatItem
              label="Accuracy"
              value={`${typing.accuracy}%`}
              className={typing.accuracy < 90 ? 'text-type-error' : 'text-stat-acc'}
            />

            <StatItem
              label={mode === 'timed' ? "Time Left" : "Time Taken"}
              value={`${mode === 'timed' ? timer.timeLeft : timer.timeElapsed}s`}
              className={mode === 'timed' && timer.timeLeft <= 5 ? 'text-type-error animate-pulse' : 'text-type-primary'}
            />
          </div>

          {/* Controls Group */}
          <div className="flex items-center gap-4">
            <DifficultySelect
              value={difficulty}
              onChange={(d) => restart(d, mode)}
            />
            <div className="bg-app-border mx-2 h-6 w-[1px]" />
            <ModeSelect
              // Prevent mode switching mid-test
              disabled={typing.typed.length > 0 && !isFinished}
              value={mode}
              onChange={(m) => restart(difficulty, m)}
            />
          </div>
        </div>

        {/* Passage Progress Bar - Unique to Passage Mode */}
        {mode === 'passage' && (
          <div className="bg-app-surface h-1 w-full rounded-full overflow-hidden -mb-6">
            <div
              className="bg-type-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${(typing.typed.length / text.length) * 100}%` }}
            />
          </div>
        )}
        <section className="relative group cursor-pointer" onClick={() => !isStarted && setIsStarted(true)}>

          {/* The Overlay - Hidden when isStarted is true */}
          {!isStarted && <FocusOverlay onStart={() => setIsStarted(true)} />}

          <div className={`transition-all duration-700 ${!isStarted ? 'blur-md select-none opacity-50' : 'blur-0 opacity-100'}`}>
            <TextDisplay target={text} typed={typing.typed} />
          </div>

        </section>

        <footer className="mt-4 flex flex-col items-center gap-4">
          <button
            onClick={() => restart()}
            className="bg-app-surface border-app-border text-txt-muted hover:border-txt-muted/50 group flex items-center gap-3 rounded-2xl border px-6 py-3 transition-all hover:text-white active:scale-95"
          >
            <span className="text-sm font-bold tracking-widest uppercase">Restart Test</span>
            <span className="text-xl transition-transform duration-500 group-hover:rotate-180">↺</span>
          </button>
          <p className="text-txt-muted/40 text-[10px] font-bold tracking-widest uppercase">
            Press <kbd className="bg-app-surface border-app-border rounded border px-1.5 py-0.5">Tab</kbd> to restart
          </p>
        </footer>
      </div>
    </main>
  )
}

// Internal component for cleaner stat rendering
function StatItem({ label, value, className = "text-white" }: { label: string, value: string | number, className?: string }) {
  return (
    <div className="flex flex-col border-l border-app-border pl-10 first:border-l-0 first:pl-0">
      <span className="text-txt-muted font-sans text-[10px] font-black tracking-[0.2em] uppercase leading-relaxed">
        {label}
      </span>
      <span className={`font-mono text-3xl font-black tracking-tighter ${className}`}>
        {value}
      </span>
    </div>
  )
}