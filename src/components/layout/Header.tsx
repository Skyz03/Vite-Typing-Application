export function Header({ bestWpm }: { bestWpm: number }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-[var(--neutral-0)]">
        ⌨ Typing Speed Test
      </h1>

      <span className="text-sm text-[var(--neutral-400)]">
        🏆 Personal best{' '}
        <span className="font-medium text-[var(--blue-400)]">
          {bestWpm} WPM
        </span>
      </span>
    </header>
  )
}
