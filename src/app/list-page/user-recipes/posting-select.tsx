interface PostingSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
}

export default function PostingSelect({
  label,
  value,
  onChange,
  options,
}: PostingSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
