import { StatCard } from './StatCard'

export function StatsBar({ wpm, accuracy, time }: any) {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <StatCard label="WPM" value={String(wpm)} colorClass="text-stat-wpm" />
      <StatCard label="Accuracy" value={`${accuracy}%`} colorClass="text-stat-acc" />
      <StatCard label="Remaining" value={time} colorClass="text-type-primary" />
    </div>
  )
}