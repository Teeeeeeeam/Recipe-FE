import { DefaultData } from '@/types/user'
import Link from 'next/link'

export default function TableBodyCommon({
  index,
  convertData,
}: {
  index: number
  convertData: DefaultData
}) {
  return (
    <>
      <td className="px-2 py-3 text-center ">{index + 1}</td>
      <td className="px-2 text-center whitespace-nowrap text-ellipsis overflow-hidden">
        <Link href={convertData.url}>{convertData.title}</Link>
      </td>
    </>
  )
}
