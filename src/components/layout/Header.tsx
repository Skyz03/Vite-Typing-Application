export function Header({ bestWpm }: { bestWpm: number }) {
  return (
    <header className="glass-panel border-app-border/40 fixed top-0 left-0 z-40 w-full border-b px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Left Section: Logo & Description */}
        <div className="flex items-center gap-4">
          <div className="bg-apple-text text-app-surface flex h-10 w-10 items-center justify-center rounded-xl shadow-sm">
            <span className="text-2xl leading-none select-none"></span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-apple-text text-lg leading-tight font-semibold tracking-tight">
              Typing Test
            </h1>
            <p className="text-txt-muted text-[11px] font-medium tracking-wide">
              Measure your speed and accuracy
            </p>
          </div>
        </div>

        {/* Right Section: Personal Best Pill */}
        <div className="bg-app-bg/50 border-app-border hover:border-txt-muted flex items-center gap-3 rounded-full border px-4 py-1.5 transition-all">
          <div className="flex flex-col items-center">
            <span className="text-txt-muted mb-0.5 text-[9px] leading-none font-bold tracking-[0.12em] uppercase">
              Personal Best
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-apple-text text-sm font-bold tabular-nums">
                {bestWpm}
              </span>
              <span className="text-txt-muted text-[10px] font-semibold uppercase">
                WPM
              </span>
            </div>
          </div>

          {/* Subtle separator */}
          <div className="bg-app-border mx-1 h-6 w-[1px]" />

          <div className="bg-apple-blue/10 flex h-6 w-6 items-center justify-center rounded-full">
            <span className="text-xs">🏆</span>
          </div>
        </div>
      </div>
    </header>
  )
}
