import Image from 'next/image'

interface AnswerSectionProps {
  ctg: string
  title: string
  content?: string
  src?: string
  className: string
}
export default function AnswerDetailContent({
  ctg,
  title,
  content,
  src,
  className,
}: AnswerSectionProps) {
  return (
    <div className="mb-4">
      <h4 className={`${className} text-lg font-semibold mb-1`}>{title}</h4>
      {ctg === 'string' && <p className="break-words">{content}</p>}
      {ctg === 'image' && (
        <>
          {src ? (
            <Image
              src={src}
              alt="내가 첨부한 이미지"
              width={500}
              height={500}
              className="w-[300px] rounded-md"
            />
          ) : (
            <p>이미지가 없습니다</p>
          )}
        </>
      )}
    </div>
  )
}
