import type { Difficulty } from '../../utils/textPools'

type Props = {
  value: Difficulty
  onChange: (value: Difficulty) => void
}

export function DifficultySelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Difficulty)}
      className="bg-app-surface text-txt-main border-app-border focus:ring-type-primary/50 cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-all outline-none focus:ring-2"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  )
}
