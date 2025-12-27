function StatsBar({ wpm, accuracy, time }: any) {
    return (
      <div className="flex gap-6 text-sm mb-6">
        <Stat label="WPM" value={wpm} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
        <Stat label="Time" value={time} />
      </div>
    )
  }
  
  function Stat({ label, value }: any) {
    return (
      <div className="bg-gray-900 px-4 py-2 rounded-lg">
        <div className="text-gray-400">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    )
  }
  