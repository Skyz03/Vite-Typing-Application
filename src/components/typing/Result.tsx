type ResultsProps = {
  wpm: number
  accuracy: number
  onRestart: () => void
}

export function Results({ wpm, accuracy, onRestart }: ResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 rounded-3xl p-12 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
      <h1 className="text--red-500 uppercase tracking-[0.2em] text-sm font-bold mb-8">
        Test Complete
      </h1>

      <div className="flex gap-12 mb-10">
        {/* WPM Metric */}
        <div className="text-center">
          <p className="text-red-500 text-xs uppercase font-bold mb-1">WPM</p>
          <p className="text-6xl font-black text-blue-500 tracking-tighter">
            {wpm}
          </p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-neutral-800" />

        {/* Accuracy Metric */}
        <div className="text-center">
          <p className="text-neutral-500 text-xs uppercase font-bold mb-1">Accuracy</p>
          <p className="text-6xl font-black text-green-500 tracking-tighter">
            {accuracy}<span className="text-2xl ml-0.5">%</span>
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onRestart}
        className="group relative flex items-center justify-center w-full py-4 bg-neutral-100 hover:bg-white text-neutral-950 font-bold rounded-xl transition-all active:scale-95"
      >
        <span>Restart Test</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2 group-hover:rotate-180 transition-transform duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <p className="mt-6 text-neutral-600 text-xs italic">
        Tip: Accuracy is more important than speed!
      </p>
    </div>
  )
}