import { useMemo } from 'react';

export function TextDisplay({
  target,
  typed,
}: {
  target: string
  typed: string
}) {
  // UseMemo prevents re-splitting the string unless the target text actually changes
  const characters = useMemo(() => target.split(''), [target]);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-neutral-900 rounded-2xl p-8 font-mono text-2xl leading-relaxed shadow-xl border border-neutral-800 selection:bg-blue-500/30">

      <div className="flex flex-wrap whitespace-pre-wrap break-all">
        {characters.map((char, i) => {
          const isTyped = i < typed.length;
          const isCurrent = i === typed.length;
          const isError = isTyped && typed[i] !== char;
          const isCorrect = isTyped && typed[i] === char;

          // Inside your character map in TextDisplay.tsx

          return (
            <span
              key={i}
              className={`
      relative px-[1px] rounded-sm transition-all duration-75
      ${isCorrect ? 'text-type-success' : ''}
      ${isError ? 'text-type-error border-b-2 border-type-error' : ''}
      ${!isTyped && !isCurrent ? 'text-txt-muted' : ''}
      ${isCurrent ? 'bg-neutral-600 text-white animate-pulse' : ''} 
    `}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}