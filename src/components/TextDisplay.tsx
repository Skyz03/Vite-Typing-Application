type Props = {
    target: string
    typed: string
  }
  
  export function TextDisplay({ target, typed }: Props) {
    return (
      <div style={{ fontFamily: 'monospace', fontSize: 18 }}>
        {target.split('').map((char, i) => {
          let color = '#aaa'
  
          if (i < typed.length) {
            color = typed[i] === char ? 'green' : 'red'
          }
  
          return (
            <span key={i} style={{ color }}>
              {char}
            </span>
          )
        })}
      </div>
    )
  }
  