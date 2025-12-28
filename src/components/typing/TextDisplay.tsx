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

          return (
            <span
              key={i}
              className={`
                relative transition-all duration-75
                ${isCorrect ? 'text-type-primary' : ''}
                ${isError ? 'text-type-error bg-type-error-bg' : ''}
                ${!isTyped ? 'text-txt-muted' : ''}
                ${isCurrent ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:animate-pulse' : ''}
              `}
            >
              {/* Special visual for missed spaces */}
              {isError && char === ' ' ? '·' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}