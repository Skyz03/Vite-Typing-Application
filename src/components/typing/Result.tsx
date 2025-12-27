type ResultsProps = {
  wpm: number
  accuracy: number
  onRestart: () => void
}

export function Results({ wpm, accuracy, onRestart }: ResultsProps) {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>Test Complete</h1>
      <p style={{ fontSize: 24 }}>WPM: {wpm}</p>
      <p style={{ fontSize: 18 }}>Accuracy: {accuracy}%</p>
      <button
        onClick={onRestart}
        style={{
          marginTop: 16,
          padding: '8px 16px',
          fontSize: 16,
        }}
      >
        Restart
      </button>
    </div>
  )
}
