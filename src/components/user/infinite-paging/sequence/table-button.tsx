interface TableButtonProps {
  label: string
  onClick: (value: number) => void
  id: number
}

export default function TableButton({ label, onClick, id }: TableButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`${label === '수정' ? 'mr-3' : ''}`}
    >
      {label}
    </button>
  )
}
