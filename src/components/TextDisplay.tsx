type Props = {
  target: string;
  typed: string;
};

export function TextDisplay({ target, typed }: Props) {
  return (
    <div
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 20,
        background: '#111',
        padding: 16,
        borderRadius: 8,
        color: '#777',
        lineHeight: 1.6,
      }}
    >
      {target.split('').map((char: string, i: number) => {
        let color = '#777'
        if (i < typed.length) {
          color = typed[i] === char ? '#4ade80' : '#f87171'
        }

        return (
          <span
            key={i}
            style={{
              color,
              borderLeft:
                i === typed.length ? '2px solid #e5e7eb' : 'none',
            }}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}
