import Image from 'next/image'
import Link from 'next/link'
import { ConvertData } from './input-table-body'
import InputTableButton from './input-table-button'

interface InputTableBodyCommonProps {
  convertData: ConvertData
  isStatus: boolean
  onChange: (value: number) => void
  onClick: (group: boolean, thisIds: number | null) => Promise<void>
}

export default function InputTableBodyCommon({
  convertData,
  isStatus,
  onChange,
  onClick,
}: InputTableBodyCommonProps) {
  return (
    <>
      <td className="px-2 py-5 text-center ">
        <input
          type="checkbox"
          onChange={() => onChange(convertData.id)}
          className="chk_box"
        />
      </td>
      <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
        <Link href={convertData.url}>{convertData.title}</Link>
      </td>
      {isStatus && (
        <td className="px-2 py-5 flex justify-center">
          <Image
            src={`/svg/${convertData.status === 'COMPLETED' ? 'completed' : 'pending'}.svg`}
            alt={convertData.status === 'COMPLETED' ? '완료' : '대기중'}
            width={30}
            height={30}
          />
        </td>
      )}
      <td className="px-2 py-5 text-center">
        <InputTableButton id={convertData.id} onClick={onClick} />
      </td>
    </>
  )
}
