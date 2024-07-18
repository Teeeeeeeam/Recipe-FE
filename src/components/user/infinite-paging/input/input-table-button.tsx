import Image from 'next/image'

interface InputTableButtonProps {
  id: number
  onClick: (group: boolean, thisIds: number | null) => Promise<void>
}

export default function InputTableButton({
  id,
  onClick,
}: InputTableButtonProps) {
  return (
    <button type="button">
      <Image
        src="/svg/trash.svg"
        alt="삭제"
        width={25}
        height={25}
        onClick={() => onClick(true, id)}
        className="cursor-pointer"
      />
    </button>
  )
}
