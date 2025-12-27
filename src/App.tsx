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
      <Results
        wpm={typing.wpm}
        accuracy={typing.accuracy}
        onRestart={() => restart()}
      />
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <DifficultySelect
        value={difficulty}
        onChange={(d) => {
          setDifficulty(d)
          restart(d)
        }}
      />

      <h2>Time left: {timer.timeLeft}s</h2>

      <TextDisplay target={text} typed={typing.typed} />

      <p>WPM: {typing.wpm}</p>
      <p>Accuracy: {typing.accuracy}%</p>
    </div>
  )
}
