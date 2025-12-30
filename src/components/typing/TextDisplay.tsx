import { useMemo } from 'react'

export function TextDisplay({
  target,
  typed,
}: {
  target: string
  typed: string
}) {
  // UseMemo prevents re-splitting the string unless the target text actually changes
  const characters = useMemo(() => target.split(''), [target])

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-8">
      {/* Container: "Document" style - Clean, Mono, Large Text */}
      <div className="font-mono text-2xl leading-relaxed tracking-wide break-all whitespace-pre-wrap outline-none md:text-3xl">
        {characters.map((char, i) => {
          const isTyped = i < typed.length
          const isCurrent = i === typed.length
          const isCorrect = isTyped && typed[i] === char
          const isError = isTyped && typed[i] !== char

          return (
            <span
              key={i}
              className={`relative transition-colors duration-100 select-none ${
                isCorrect
                  ? 'text-text-main' // Sharp Black
                  : isError
                    ? 'text-type-error bg-type-error/15 rounded-sm' // Soft Red Highlight
                    : 'text-app-border' // Ghosted Gray for upcoming
              }`}
            >
              {/* The "Apple Style" Caret: A thin blue line that pulses */}
              {isCurrent && (
                <span className="bg-type-primary absolute top-1 bottom-1 -left-[2px] z-10 w-[2.5px] animate-pulse rounded-full shadow-[0_0_10px_rgba(0,113,227,0.4)]" />
              )}

              {char}
            </span>
          )
        })}
      </div>
    </div>
  )
}
