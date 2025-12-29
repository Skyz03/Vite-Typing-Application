import { useState, useEffect, useCallback } from 'react'
import { getRandomText, getLongPassage } from './utils/textGenerator'
import type { Difficulty, Mode } from './utils/textPools'
import { DifficultySelect } from './components/controls/DifficultySelect'
import { ModeSelect } from './components/controls/ModeSelect'
import { TextDisplay } from './components/typing/TextDisplay'
import { Results } from './components/typing/Result'
import { Header } from './components/layout/Header' // Assuming you have this now
import { useTimer } from './hooks/useTimer'
import { useKeyboardTyping } from './hooks/useKeyboardTyping'

export default function App() {
  // --- State & Hooks ---
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [mode, setMode] = useState<Mode>('timed')
  const [text, setText] = useState(() => getRandomText('easy'))

  // We'll assume a 60s default for timed, and 0 for passage (counting up)
  const timer = useTimer(mode === 'timed' ? 60 : 0)
  const typing = useKeyboardTyping(text, {
    isLocked: mode === 'timed' ? timer.isFinished : false,
  })

  // --- Actions ---

  // Wrapped in useCallback so the Tab listener doesn't reset constantly
  const restart = useCallback((newDifficulty = difficulty, newMode = mode) => {
    setDifficulty(newDifficulty)
    setMode(newMode)
    const content = newMode === 'passage'
      ? getLongPassage(newDifficulty) // New function for stories/articles
      : getRandomText(newDifficulty); // Existing function for random words
    setText(content);
    timer.reset()
    typing.reset()
  }, [difficulty, mode, timer, typing])


  // --- Effects ---

  // 1. Start timer automatically when the user types the first character
  useEffect(() => {
    if (typing.typed.length === 1 && !timer.isRunning) {
      timer.start()
    }
  }, [typing.typed.length, timer.isRunning, timer])

  // 2. Stop timer immediately when the user finishes the text
  useEffect(() => {
    if (typing.isFinished && timer.isRunning) {
      timer.stop()
    }
  }, [typing.isFinished, timer.isRunning, timer])

  // 3. Tab Key Listener for Quick Restart
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

  // --- Logic ---

  // Only show results if the timer actually ran or the text was completed
  const isFinished = (mode === 'timed' && timer.isFinished && typing.typed.length > 0)
    || typing.isFinished;


  // --- Render Results ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center p-6 transition-all animate-in fade-in duration-500">
        <Results
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          onRestart={() => restart()}
        />
      </div>
    )
  }

  // --- Main Render ---
  return (
    <main className="min-h-screen bg-app-bg text-txt-main p-8 antialiased selection:bg-type-primary/20">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Branding Header (matching image top right PB) */}
        <Header bestWpm={92} />

        {/* The Control & Stats Bar (Top Bar from Goal Image) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-app-border pb-6 transition-all">

          {/* Stats Group */}
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-txt-muted">WPM</span>
              <span className="text-3xl font-mono font-black text-white leading-none tracking-tighter">
                {typing.wpm}
              </span>
            </div>
            <div className="flex flex-col border-l border-app-border pl-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-txt-muted">Accuracy</span>
              <span className={`text-3xl font-mono font-black leading-none tracking-tighter ${typing.accuracy < 90 ? 'text-type-error' : 'text-stat-acc'
                }`}>
                {typing.accuracy}%
              </span>
            </div>
            <div className="flex flex-col border-l border-app-border pl-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-txt-muted">Time</span>
              <span className={`text-3xl font-mono font-black leading-none tracking-tighter ${mode === 'timed' && timer.timeLeft <= 5 ? 'text-type-error animate-pulse' : 'text-type-primary'
                }`}>
                {mode === 'timed' ? timer.timeLeft : timer.timeElapsed}s
              </span>
            </div>
          </div>

          {/* Controls Group */}
          <div className="flex items-center gap-4">
            <DifficultySelect value={difficulty} onChange={(d) => restart(d, mode)} />
            <div className="h-6 w-[1px] bg-app-border mx-2" />
            <ModeSelect disabled={typing.typed.length > 0 && !isFinished} value={mode} onChange={(m) => restart(difficulty, m)} />
          </div>
        </div>

        {/* Text Display Area */}
        <section className="relative">
          <TextDisplay target={text} typed={typing.typed} />
        </section>

        {/* Footer Restart Button */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            onClick={() => restart()}
            className="flex items-center gap-3 bg-app-surface border border-app-border px-6 py-3 rounded-2xl text-txt-muted hover:text-white hover:border-txt-muted/50 transition-all active:scale-95 group"
          >
            <span className="font-bold text-sm uppercase tracking-widest">Restart Test</span>
            <span className="text-xl transition-transform duration-500 group-hover:rotate-180">↺</span>
          </button>
          <p className="text-[10px] font-bold uppercase tracking-widest text-txt-muted/40">
            Press <kbd className="bg-app-surface px-1.5 py-0.5 rounded border border-app-border">Tab</kbd> to quickly restart
          </p>
        </div>
      </div>
    </main>
  )
}