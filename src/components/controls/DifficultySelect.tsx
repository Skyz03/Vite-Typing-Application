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
      className="bg-app-surface text-txt-main border border-app-border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-type-primary/50 transition-all cursor-pointer text-sm"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  )
}