export function StatCard({
  label,
  value,
  colorClass = 'text-txt-main',
}: {
  label: string
  value: string
  colorClass?: string
}) {
  return (
    <div className="bg-app-surface border-app-border min-w-[120px] flex-1 rounded-2xl border p-4 transition-transform hover:scale-[1.02]">
      <p className="text-txt-muted mb-1 text-[10px] font-black tracking-[0.15em] uppercase">
        {label}
      </p>
      <p className={`font-mono text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
  )
}
