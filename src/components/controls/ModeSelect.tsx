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
            <span className="text-[10px] font-black uppercase tracking-widest text-txt-muted">Mode:</span>
            <div className="flex bg-app-surface border border-app-border p-1 rounded-lg">
                {modes.map((m) => (
                    <button
                        disabled={disabled}
                        key={m}
                        onClick={() => onChange(m)}
                        className={`
              px-3 py-1 text-xs font-bold rounded-md transition-all uppercase tracking-tighter
              ${value === m
                                ? 'bg-type-primary/10 text-type-primary shadow-sm'
                                : 'text-txt-muted hover:text-txt-main'}
            `}
                    >
                        {m === 'timed' ? 'Timed (60s)' : 'Passage'}
                    </button>
                ))}
            </div>
        </div>
    )
}