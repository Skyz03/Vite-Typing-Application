type ResultsProps = {
  wpm: number
  accuracy: number
  onRestart: () => void
}

export function Results({ wpm, accuracy, onRestart }: ResultsProps) {
  return (
    <div className="animate-in fade-in zoom-in flex w-full max-w-md flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-900 p-12 shadow-2xl duration-300">
      <h1 className="text--red-500 mb-8 text-sm font-bold tracking-[0.2em] uppercase">
        Test Complete
      </h1>

      <div className="mb-10 flex gap-12">
        {/* WPM Metric */}
        <div className="text-center">
          <p className="mb-1 text-xs font-bold text-red-500 uppercase">WPM</p>
          <p className="text-6xl font-black tracking-tighter text-blue-500">
            {wpm}
          </p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-neutral-800" />

        {/* Accuracy Metric */}
        <div className="text-center">
          <p className="mb-1 text-xs font-bold text-neutral-500 uppercase">
            Accuracy
          </p>
          <p className="text-6xl font-black tracking-tighter text-green-500">
            {accuracy}
            <span className="ml-0.5 text-2xl">%</span>
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onRestart}
        className="group relative flex w-full items-center justify-center rounded-xl bg-neutral-100 py-4 font-bold text-neutral-950 transition-all hover:bg-white active:scale-95"
      >
        <span>Restart Test</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      <p className="mt-6 text-xs text-neutral-600 italic">
        Tip: Accuracy is more important than speed!
      </p>
    </div>
  )
}
