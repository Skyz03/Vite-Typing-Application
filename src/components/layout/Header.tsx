export function Header({ bestWpm }: { bestWpm: number }) {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-app-border pb-6">
      <h1 className="text-xl font-bold tracking-tight text-txt-main flex items-center gap-2">
        <span className="text-type-primary text-2xl">⌨</span> Typing Speed Test
      </h1>

      <div className="flex items-center gap-2 px-4 py-2 bg-app-surface rounded-full border border-app-border shadow-sm">
        <span className="text-xs uppercase font-bold tracking-wider text-txt-muted">
          🏆 Personal Best
        </span>
        <span className="font-mono font-black text-stat-wpm">
          {bestWpm} WPM
        </span>
      </div>
    </header>
  )
}