export function SkeletonLoader() {
  return <div className="skeleton h-6 w-full mb-2"></div>
}

export function AdminListSkeletonLoader() {
  return (
    <div className="bg-white md:p-4 rounded shadow text-[12px] md:text-[14px] mt-4">
      <div className="divide-y">
        {Array.from({ length: 20 }).map((_, idx) => (
          <ul
            key={idx}
            className="relative grid grid-cols-[1fr_32fr] items-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer gap-2"
          >
            <li>
              <div className="skeleton h-6 w-full mb-2"></div>
            </li>
            <li>
              <SkeletonLoader />
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export function DashBoardSkeletonLoader() {
  return (
    <div className="md:p-4 bg-gray-100 animate-pulse">
      <h1 className="text-xl font-semibold mb-2 bg-gray-300 h-6 w-40 rounded"></h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col py-3 px-4 gap-y-4 items-center bg-gray-300 rounded-lg shadow-md text-xl"
          >
            <div className="h-6 w-24 bg-gray-400 rounded"></div>
            <div className="h-6 w-12 bg-gray-400 rounded"></div>
          </div>
        ))}
      </section>
      <section className="bg-gray-300 p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-center justify-around">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center mb-4 md:mb-0">
              <div className="text-lg font-semibold h-6 w-24 bg-gray-400 rounded"></div>
              <div className="text-2xl h-8 w-16 bg-gray-400 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-300 p-6 rounded-lg shadow-md">
        <div className="text-right mb-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <button
              key={idx}
              className="border px-3 py-1 rounded-lg mx-1 bg-gray-400 h-8 w-20"
              disabled
            ></button>
          ))}
        </div>
        <div className="relative w-full h-80 bg-gray-400 rounded"></div>
      </section>
    </div>
  )
}
