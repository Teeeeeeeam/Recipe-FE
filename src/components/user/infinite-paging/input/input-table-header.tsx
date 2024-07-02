interface InputTableHeaderProps {
  theadOptions: { class: string; title: string }[]
  isChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputTableHeader({
  theadOptions,
  isChecked,
  onChange,
}: InputTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-gray-100 sticky top-0">
        <th className="p-2 w-[10%]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChange(e)}
          />
        </th>
        {theadOptions.map((item, index) => (
          <th key={index} className={item.class}>
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  )
}
