type FocusOverlayProps = {
  onStart: () => void
}

export function FocusOverlay({ onStart }: FocusOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex cursor-pointer flex-col items-center justify-center transition-all duration-700"
      onClick={onStart}
    >
      {/* Background Ambient Glow */}
      <div className="bg-type-primary/10 absolute -z-10 h-64 w-64 animate-pulse rounded-full blur-[120px]" />

      <div className="animate-in fade-in zoom-in flex flex-col items-center duration-1000">
        <button className="btn-spring bg-txt-main text-app-surface shadow-apple-hover mb-6 flex items-center gap-3 rounded-full px-10 py-4 font-semibold hover:opacity-90 active:opacity-100">
          <span className="text-xl leading-none"></span>
          <span className="text-base tracking-tight">Start Typing Test</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <p className="text-txt-muted animate-pulse text-sm font-medium tracking-tight">
            Click anywhere or press any key to begin
          </p>

          <div className="text-txt-muted/30 mt-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>Precision Mode</span>
            <span className="bg-app-border h-1 w-1 rounded-full" />
            <span>Low Latency</span>
          </div>
        </div>
      </div>
    </div>
  )
}
