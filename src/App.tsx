import { useState } from 'react'
import { getRandomText } from './utils/textGenerator'
import type { Difficulty } from './utils/textPools'
import { DifficultySelect } from './components/controls/DifficultySelect'
import { TextDisplay } from './components/typing/TextDisplay'
import { Results } from './components/typing/Result'
import { useTimer } from './hooks/useTimer'
import { useKeyboardTyping } from './hooks/useKeyboardTyping'

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [text, setText] = useState(() => getRandomText('easy'))

  const timer = useTimer(30)
  const typing = useKeyboardTyping(text, {
    isLocked: timer.isFinished,
  })

  const isFinished = timer.isFinished || typing.isFinished

  function restart(newDifficulty = difficulty) {
    setText(getRandomText(newDifficulty))
    timer.reset()
    typing.reset()
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <Results
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          onRestart={() => restart()}
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-8">

        {/* Header Area: Difficulty & Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3">
              Difficulty Level
            </h1>
            <DifficultySelect
              value={difficulty}
              onChange={(d) => {
                setDifficulty(d)
                restart(d)
              }}
            />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-1">
              Time Remaining
            </span>
            <div className={`text-4xl font-mono font-black ${timer.timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
              {timer.timeLeft}<span className="text-xl ml-1 text-neutral-600">s</span>
            </div>
          </div>
        </div>

        {/* Main Typing Area */}
        <section className="relative">
          <TextDisplay target={text} typed={typing.typed} />
        </section>

        {/* Live Stats Footer */}
        <footer className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex flex-col items-center">
            <span className="text-xs uppercase tracking-tighter text-neutral-500">Current WPM</span>
            <span className="text-2xl font-mono font-bold text-neutral-200">{typing.wpm}</span>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex flex-col items-center">
            <span className="text-xs uppercase tracking-tighter text-neutral-500">Accuracy</span>
            <span className="text-2xl font-mono font-bold text-neutral-200">{typing.accuracy}%</span>
          </div>
        </footer>

        {/* Quick Tips */}
        <p className="text-center text-neutral-600 text-sm mt-8">
          Start typing to begin. Press <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700 text-neutral-400">Tab</kbd> to quickly restart.
        </p>
      </div>
    </main>
  )
}