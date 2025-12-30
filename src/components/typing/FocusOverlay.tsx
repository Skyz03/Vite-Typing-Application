type FocusOverlayProps = {
  onStart: () => void
}

export function FocusOverlay({ onStart }: FocusOverlayProps) {
  return (
    <div
      className="group absolute inset-x-0 -inset-y-10 z-50 flex cursor-pointer flex-col items-center justify-center transition-all duration-700"
      onClick={onStart}
    >
      {/* Soft Ambient Glow in the background */}
      <div className="bg-apple-blue/10 absolute -z-10 h-64 w-64 animate-pulse rounded-full blur-[100px]" />

      <div className="animate-in fade-in zoom-in flex flex-col items-center duration-1000">
        <button className="btn-spring bg-apple-text text-app-surface shadow-apple-hover mb-6 flex items-center gap-3 rounded-full px-10 py-4 font-semibold hover:opacity-90 active:opacity-100">
          <span className="text-xl"></span>
          <span className="text-base tracking-tight hover:cursor-pointer">Start Typing Test</span>
        </button>

        {/* Subtext mimicking Apple's marketing style */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-txt-muted text-sm font-medium tracking-tight">
            Click to begin.
          </p>
          <div className="text-txt-muted/50 mt-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>60 Seconds</span>
            <span className="bg-app-border h-1 w-1 rounded-full" />
            <span>Real-time Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  )
}
