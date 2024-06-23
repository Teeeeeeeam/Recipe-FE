interface InputTableBodyNoDataProps {
  isStatus: boolean
}

export default function InputTableBodyNoData({
  isStatus,
}: InputTableBodyNoDataProps) {
  return (
    <tbody>
      <tr>
        <td className="px-2 py-5 text-center">0</td>
        <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
          내역이 없습니다
        </td>
        {isStatus && <td className="px-2 py-5 flex justify-center">0</td>}
        <td className="px-2 py-5 text-center">0</td>
      </tr>
    </tbody>
  )
}
