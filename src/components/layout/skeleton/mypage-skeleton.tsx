interface MypageSkeletonLoaderProps {
  rows: number
  columns: number
}
export function MypageSkeletonLoader({
  rows,
  columns,
}: MypageSkeletonLoaderProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(columns)].map((_, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 ${index === 0 || index === 2 ? 'w-[10%]' : 'w-[80%]'}`}
              >
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InfiniteScrollSkeleton({
  rows,
  columns,
}: {
  rows: number
  columns: number
}) {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
