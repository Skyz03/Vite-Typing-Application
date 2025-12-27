import { StatCard } from './StatCard'

export function StatsBar({ wpm, accuracy, time }: any) {
  return (
    <div className="mb-6 flex gap-4">
      <StatCard label="WPM" value={String(wpm)} />
      <StatCard label="Accuracy" value={`${accuracy}%`} />
      <StatCard label="Time" value={time} />
    </div>
  )
}

// function Stat({ label, value }: any) {
//   return (
//     <div className="rounded-lg bg-gray-900 px-4 py-2">
//       <div className="text-gray-400">{label}</div>
//       <div className="text-lg font-semibold">{value}</div>
//     </div>
//   )
// }
