type Props = {
  target: string;
  typed: string;
};
export function TextDisplay({ target, typed }: Props) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl font-mono text-lg leading-relaxed">
      {target.split('').map((char, i) => {
        let className = 'text-gray-500'

        if (i < typed.length) {
          className =
            typed[i] === char ? 'text-green-400' : 'text-red-400'
        }

        if (i === typed.length) {
          className += ' border-l-2 border-blue-400'
        }

        return (
          <span key={i} className={className}>
            {char}
          </span>
        )
      })}
    </div>
  )
}
