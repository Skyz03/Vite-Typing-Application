export function Header({ bestWpm }: { bestWpm: number }) {
  return (
    <header className="border-app-border mb-10 flex items-center justify-between border-b pb-6">
      <h1 className="text-txt-main flex items-center gap-2 text-xl font-bold tracking-tight">
        <span className="text-type-primary text-2xl">⌨</span> Typing Speed Test
      </h1>

      <div className="bg-app-surface border-app-border flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm">
        <span className="text-txt-muted text-xs font-bold tracking-wider uppercase">
          🏆 Personal Best
        </span>
        <span className="text-stat-wpm font-mono font-black">
          {bestWpm} WPM
        </span>
      </div>
    </header>
  )
}
