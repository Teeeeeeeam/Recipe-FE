interface InputDeleteButtonProps {
  onClick: (group: boolean, thisIds: number | null) => Promise<void>
}

export default function InputDeleteButton({ onClick }: InputDeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(false, null)}
      className="border border-black px-3 py-2 rounded-lg"
    >
      선택삭제
    </button>
  )
}
