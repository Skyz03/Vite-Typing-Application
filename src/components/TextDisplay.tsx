type Props = {
  target: string
  typed: string
}

export function TextDisplay({ target, typed }: Props) {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 18 }}>
      {target.split('').map((char, i) => {
        let style: React.CSSProperties = {
          color: '#aaa',
        }

        // Correct / incorrect characters
        if (i < typed.length) {
          style.color = typed[i] === char ? 'green' : 'red'
        }

        // 🔹 Cursor position
        if (i === typed.length) {
          style.borderLeft = '2px solid black'
          style.marginLeft = -1
        }

        return (
          <span key={i} style={style}>
            {char}
          </span>
        )
      })}
    </div>
  )
}
