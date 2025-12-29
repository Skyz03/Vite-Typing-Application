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
    <div className="relative mx-auto w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 p-8 font-mono text-2xl leading-relaxed shadow-xl selection:bg-blue-500/30">
      <div className="flex flex-wrap font-mono text-2xl leading-relaxed tracking-wide break-all whitespace-pre-wrap transition-all">
        {characters.map((char, i) => {
          const isTyped = i < typed.length
          const isCurrent = i === typed.length
          const isError = isTyped && typed[i] !== char
          const isCorrect = isTyped && typed[i] === char

          // Inside your character map in TextDisplay.tsx

          return (
            <span
              key={i}
              className={`relative rounded-sm px-[1px] transition-all duration-75 ${isCorrect ? 'text-type-success' : ''} ${isError ? 'text-type-error border-type-error border-b-2' : ''} ${!isTyped && !isCurrent ? 'text-txt-muted' : ''} ${isCurrent ? 'animate-pulse bg-neutral-600 text-white' : ''} `}
            >
              {char}
            </span>
          )
        })}
      </div>
    </div>
  )
}
