interface AnswerHeadProps {
  title: string
  date: string
}
export default function AnswerDetailHeadSubject({
  title,
  date,
}: AnswerHeadProps) {
  return (
    <h3 className="text-2xl font-bold mb-4">
      {title}
      <span className="text-sm ml-3">{date}</span>
    </h3>
  )
}
