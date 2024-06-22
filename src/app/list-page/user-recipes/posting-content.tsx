interface PostingContentProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function PostingContent({
  label,
  value,
  onChange,
}: PostingContentProps) {
  return (
    <>
      <label className="text-gray-600">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="내용을 입력해주세요"
        className="w-full min-h-[30vh] py-3 px-4 rounded-md"
        required
      ></textarea>
    </>
  )
}
