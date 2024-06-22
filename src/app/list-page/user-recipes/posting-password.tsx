interface PostingPasswordProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function PostingPassword({
  label,
  value,
  onChange,
}: PostingPasswordProps) {
  return (
    <>
      <label className="mr-2">{label}</label>
      <input
        type="password"
        value={value}
        placeholder="비밀번호"
        onChange={(e) => onChange(e.target.value)}
        className="py-1 px-1"
        required
      />
    </>
  )
}
