export function SkeletonLoader() {
  return <div className="skeleton h-[300px] lg:h-[360px] w-full mb-4"></div>
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
    <div className="grid justify-center md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-7 my-10">
      <div className="col-span-5 grid grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonLoader key={idx} />
        ))}
      </div>
      <div className="col-span-1 col-end-auto bg-gray-200 rounded-lg border border-gray-300">
        <p className="h-full flex justify-center items-center text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  )
}
