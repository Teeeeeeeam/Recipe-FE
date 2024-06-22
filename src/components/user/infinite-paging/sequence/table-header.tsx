interface TableHeaderProps {
  theadOptions: { class: string; title: string }[]
}

export default function TableHeader({ theadOptions }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {theadOptions.map((item, index) => (
          <th key={index} className={item.class}>
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  )
}
