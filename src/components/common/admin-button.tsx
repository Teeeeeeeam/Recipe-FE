'use client'

interface AdminButtonProps {
  children: React.ReactNode
  segment?: string | null
  id?: string
}

const AdminButton = ({ children, id, segment }: AdminButtonProps) => {
  return (
    <div className="flex items-cnetr text-center  text-white w-full">
      <button
        type="button"
        id={id}
        className={`py-2 bg-green-100 w-full rounded-2xl hover:bg-green-150 ${segment === id && 'border'}`}
      >
        {children}
      </button>
    </div>
  )
}

export default AdminButton
