interface FormInputProps {
  title: string
  placeholder: string
  verify: boolean
  onChange: (value: string) => void
  onClick?: () => void
}
export default function FormInput({
  title,
  placeholder,
  verify,
  onChange,
  onClick,
}: FormInputProps) {
  return (
    <label className="block w-full mb-2" htmlFor="name">
      <p className="mb-1 text-sm text-gray-600">{title}</p>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${verify ? 'w-10/12' : 'w-full'} rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1`}
      />
      {verify && (
        <button type="button" onClick={onClick} className="w-2/12">
          확인
        </button>
      )}
    </label>
  )
}
