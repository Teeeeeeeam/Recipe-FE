'use client'

interface AdminButtonProps {
  children: React.ReactNode
  segment?: string | null
  id?: string
}

const AdminButton = ({ children, id, segment }: AdminButtonProps) => {
  return (
    <div className="flex items-center text-center w-full">
      <button
        type="button"
        id={id}
        className={`py-3 px-4 w-full rounded-md transition-colors duration-200 ${
          segment === id
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-blue-100'
        }`}
      >
        {children}
      </button>
    </div>
  )
}

export default AdminButton
