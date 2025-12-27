function Header({ bestWpm }: { bestWpm: number }) {
    return (
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">⌨ Typing Speed Test</h1>
        <div className="text-sm text-gray-400">
          🏆 Personal best: <span className="text-white">{bestWpm} WPM</span>
        </div>
      </header>
    )
  }
  