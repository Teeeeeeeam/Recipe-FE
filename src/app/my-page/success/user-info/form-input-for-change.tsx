interface FormInputChangeProps {
  onChangeFirst: (value: string) => void
  onChageSecond: (value: string) => void
}

export default function FormInputChange({
  onChangeFirst,
  onChageSecond,
}: FormInputChangeProps) {
  return (
    <label className="block w-full mb-2">
      <p className="mb-1 text-sm text-gray-600">비밀번호</p>
      <input
        type="password"
        onChange={(e) => onChangeFirst(e.target.value)}
        placeholder="8~16자 대문자, 특수문자 포함"
        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1 mb-2"
      />
      <p className="mb-1 text-sm text-gray-600">비밀번호 확인</p>
      <input
        type="password"
        onChange={(e) => onChageSecond(e.target.value)}
        placeholder="비밀번호 확인"
        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
      />
    </label>
  )
}
