export default function TableBodyNoData() {
  return (
    <tbody>
      <tr className="border-b">
        <td className="px-2 py-4 text-center">0</td>
        <td className="px-2 py-4 text-center whitespace-nowrap text-ellipsis overflow-hidden">
          내역이 없습니다
        </td>
        <td className="px-2 py-4 text-center">0</td>
      </tr>
    </tbody>
  )
}
