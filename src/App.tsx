import { useTimer } from './hooks/useTimer'
import { useTyping } from './hooks/useTyping'
import { TextDisplay } from './components/TextDisplay'

const text = 'the quick brown fox jumps over the lazy dog'

export default function App() {
  const timer = useTimer(30)
  const typing = useTyping(text, timer.isFinished)

  return (
    <div style={{ padding: 24 }}>
      <h2>Time left: {timer.timeLeft}s</h2>

      <TextDisplay target={text} typed={typing.typed} />

      <input
        value={typing.typed}
        disabled={timer.isFinished}
        onChange={(e) => {
          timer.start()
          typing.handleType(e.target.value)
        }}
        style={{ marginTop: 16, width: '100%' }}
      />

      <p>WPM: {typing.wpm}</p>
      <p>Accuracy: {typing.accuracy}%</p>

      <button onClick={timer.reset}>Restart</button>
    </div>
  )
}
