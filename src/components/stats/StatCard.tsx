export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[100px] rounded-xl bg-[var(--neutral-800)] px-4 py-3">
      <p className="text-xs text-[var(--neutral-400)]">{label}</p>
      <p className="text-xl font-semibold text-[var(--neutral-0)]">{value}</p>
    </div>
  )
}
