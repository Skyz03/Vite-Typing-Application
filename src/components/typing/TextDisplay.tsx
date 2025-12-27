export function TextDisplay({
  target,
  typed,
}: {
  target: string
  typed: string
}) {
  return (
    <div
      className="
        bg-[var(--neutral-800)]
        rounded-2xl
        p-6
        font-mono
        text-lg
        leading-relaxed
        var(--red-500)
      "
      style={{ color: 'var(--neutral-500)' }}
    >
      {target.split('').map((char, i) => {
        let style: React.CSSProperties = {}

        if (i < typed.length) {
          style.color =
            typed[i] === char
              ? 'var(--green-500)'
              : 'var(--red-500)'
        }

        // ✅ Cursor
        if (i === typed.length) {
          style.borderLeft = '2px solid var(--blue-600)'
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
