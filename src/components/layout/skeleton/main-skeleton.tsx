export function SkeletonLoader() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 shadow-md overflow-hidden animate-pulse">
      <div className="relative md:w-full pt-[100%] bg-gray-300"></div>
      <div className="p-4 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/6 md:ml-4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  )
}
export function RecipeSkeletonLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:px-8 md:pb-8">
      {Array.from({ length: 8 }).map((_, idx) => (
        <SkeletonLoader key={idx} />
      ))}
    </div>
  )
}

export function UserPostingSkeletonLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:px-8 md:pb-8">
      {Array.from({ length: 3 }).map((_, idx) => (
        <SkeletonLoader key={idx} />
      ))}
    </div>
  )
}
