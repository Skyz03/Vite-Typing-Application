import type { Mode } from '../../utils/textPools'

type Props = {
  value: Mode
  onChange: (value: Mode) => void
  disabled?: boolean
}

export function ModeSelect({ value, onChange, disabled }: Props) {
  const modes: Mode[] = ['timed', 'passage']

  return (
    <div className="flex items-center gap-2">
      <span className="text-txt-muted text-[10px] font-black tracking-widest uppercase">
        Mode:
      </span>
      <div className="bg-app-surface border-app-border flex rounded-lg border p-1">
        {modes.map((m) => (
          <button
            disabled={disabled}
            key={m}
            onClick={() => onChange(m)}
            className={`rounded-md px-3 py-1 text-xs font-bold tracking-tighter uppercase transition-all ${
              value === m
                ? 'bg-type-primary/10 text-type-primary shadow-sm'
                : 'text-txt-muted hover:text-txt-main'
            } `}
          >
            {m === 'timed' ? 'Timed (60s)' : 'Passage'}
          </button>
        ))}
      </div>
    </div>
  )
}
