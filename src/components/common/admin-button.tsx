interface AdminButtonProps {
  children: React.ReactNode
}

const AdminButton = ({ children }: AdminButtonProps) => {
  return (
    <div className="flex items-cnetr text-center  text-white w-full">
      <button
        type="button"
        className="py-2 bg-green-100 w-full rounded-2xl hover:bg-green-150"
      >
        {children}
      </button>
    </div>
  )
}

export default AdminButton
