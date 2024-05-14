interface AdminInputProps {
  placeholder: string
}

const AdminInput = ({ placeholder }: AdminInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full py-2 pl-2  rounded-md"
    />
  )
}

export default AdminInput
