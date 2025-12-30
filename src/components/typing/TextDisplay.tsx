import React from 'react';

type TextDisplayProps = {
  target: string;
  typed: string;
  showGhost: boolean;
};

export function TextDisplay({ target, typed, showGhost }: TextDisplayProps) {
  const characters = target.split('');

  // Logic to calculate the "Ghost" (next word)
  const getNextWord = () => {
    if (!showGhost) return null;

    // 1. Get the text after what has been typed
    const remainingText = target.slice(typed.length).trimStart();
    const words = remainingText.split(/\s+/);

    // 2. If we're typing the last word or text is empty, return null
    if (!words[0] || words.length < 1) return null;

    // 3. Logic: If the user is currently in a space, words[0] is the next word.
    // If user is mid-word, words[1] is the next word.
    const isMidWord = typed.length > 0 && typed[typed.length - 1] !== ' ';
    return isMidWord ? words[1] : words[0];
  };

  const ghostWord = getNextWord();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-8">

      {/*  QuickType Prediction Bar */}
      {/* Container h-12 ensures the text below doesn't jump when ghostWord toggles */}
      <div className="mb-6 flex justify-center h-12 items-center">
        {showGhost && ghostWord && (
          <div
            className="glass-panel animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-full px-5 py-1.5 border-app-border/40 shadow-apple-hover transition-all"
          >
            <span className="text-[9px] font-bold text-type-primary uppercase tracking-[0.25em]">
              Next
            </span>
            <span className="text-base font-medium italic text-txt-main">
              {ghostWord}
            </span>
          </div>
        )}
      </div>

      {/* Main Typing Area */}
      <div className="relative font-mono text-2xl md:text-3xl leading-relaxed tracking-wide break-all whitespace-pre-wrap outline-none">
        {characters.map((char, i) => {
          const isTyped = i < typed.length;
          const isCurrent = i === typed.length;
          const isCorrect = isTyped && typed[i] === char;
          const isError = isTyped && typed[i] !== char;

          return (
            <span
              key={i}
              className="relative transition-all duration-150 select-none"
              style={{
                color: isCorrect
                  ? 'var(--color-txt-main)'
                  : isError
                    ? 'var(--color-type-error)'
                    : 'rgba(134, 134, 139, 0.25)', // Faint silver for untyped
                backgroundColor: isError ? 'var(--color-type-error-bg)' : 'transparent',
                borderRadius: '4px'
              }}
            >
              {/* Premium Pulse Caret */}
              {isCurrent && (
                <span
                  className="absolute -left-[1px] top-[10%] bottom-[10%] w-[2.5px] rounded-full animate-pulse z-10"
                  style={{
                    backgroundColor: 'var(--color-type-primary)',
                    boxShadow: '0 0 12px var(--color-type-primary)'
                  }}
                />
              )}
              {char}
            </span>
          );
        })}
      </div>

      {/* Subtle Bottom Border inspired by Apple's minimalist containers */}
      <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-app-border/50 to-transparent" />
    </div>
  );
}