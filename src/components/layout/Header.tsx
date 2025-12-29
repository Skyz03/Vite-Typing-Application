// components/layout/Header.tsx
export function Header({ bestWpm }: { bestWpm: number }) {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {/* Logo matching your screenshot */}
        <div className="bg-type-primary/20 p-2 rounded-lg">
          <span className="text-xl">⌨️</span>
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-white leading-none">
            Typing Speed Test
          </h1>
          <p className="text-[10px] text-txt-muted font-bold uppercase tracking-wider mt-1">
            Type as fast as you can in {60} seconds
          </p>
        </div>
      </div>

      {/* Personal Best Display */}
      <div className="flex items-center gap-2 px-4 py-2 bg-app-surface border border-app-border rounded-xl shadow-sm">
        <span className="text-xl">🏆</span>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-widest text-txt-muted">
            Personal Best
          </span>
          <span className="text-md font-mono font-black text-white leading-none">
            {bestWpm} <span className="text-[10px] text-txt-muted">WPM</span>
          </span>
        </div>
      </div>
    </header>
  )
}