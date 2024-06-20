interface QuestionDetailItemProps {
  label: string
  value: string
  isFullWidth?: boolean
  isCompleted?: boolean
}

const QuestionDetailItem = ({
  label,
  value,
  isFullWidth = false,
  isCompleted = false,
}: QuestionDetailItemProps) => {
  return (
    <div
      className={`flex ${isFullWidth ? 'flex-col space-y-2' : 'justify-between items-center'} pb-1 border-b`}
    >
      <span className="font-bold">{label}</span>
      <span className={`${isCompleted && 'text-blue-100'}`}>{value}</span>
    </div>
  )
}
export default QuestionDetailItem
