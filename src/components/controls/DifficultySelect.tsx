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
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  )
}
