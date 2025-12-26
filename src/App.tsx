import { useState } from 'react'
import { getRandomText } from './utils/textGenerator'
import type { Difficulty } from './utils/textPools'
import { DifficultySelect } from './components/DifficultySelect'
import { useTimer } from './hooks/useTimer'
import { useKeyboardTyping } from './hooks/useKeyboardTyping'
import { TextDisplay } from './components/TextDisplay'

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [text, setText] = useState(() => getRandomText('easy'))

  const timer = useTimer(30)
  const typing = useKeyboardTyping(text, {
    isLocked: timer.isFinished,
  })

  function restart(newDifficulty = difficulty) {
    setText(getRandomText(newDifficulty))
    timer.reset()
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

      {timer.isFinished && <button onClick={() => restart()}>Restart</button>}
    </div>
  )
}
