export function StatCard({ label, value, colorClass = "text-txt-main" }: { label: string; value: string, colorClass?: string }) {
  return (
    <div className="flex-1 min-w-[120px] rounded-2xl bg-app-surface border border-app-border p-4 transition-transform hover:scale-[1.02]">
      <p className="text-[10px] uppercase font-black tracking-[0.15em] text-txt-muted mb-1">{label}</p>
      <p className={`text-3xl font-mono font-bold ${colorClass}`}>{value}</p>
    </div>
  )
}