import { useState } from 'react'
import { getRandomText } from './utils/textGenerator'
import type { Difficulty } from './utils/textPools'
import { DifficultySelect } from './components/DifficultySelect'
import { useTimer } from './hooks/useTimer'
import { useTyping } from './hooks/useTyping'
import { TextDisplay } from './components/TextDisplay'

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [text, setText] = useState(() => getRandomText('easy'))

  const timer = useTimer(30)
  const typing = useTyping(text, timer.isFinished)

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

      <input
        value={typing.typed}
        disabled={timer.isFinished}
        onChange={(e) => {
          timer.start()
          typing.handleType(e.target.value)
        }}
      />

      <p>WPM: {typing.wpm}</p>
      <p>Accuracy: {typing.accuracy}%</p>

      <button onClick={() => restart()}>Restart</button>
    </div>
  )
}
