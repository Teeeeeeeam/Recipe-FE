import Image from 'next/image'
interface PostingImageUploaderProps {
  imgFile: string
  previewImg: () => void
  imgRef: React.RefObject<HTMLInputElement>
  required: boolean
}

export default function PostingImageUploader({
  imgFile,
  previewImg,
  imgRef,
  required,
}: PostingImageUploaderProps) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="text-gray-600">이미지 선택</div>
      <div className="flex items-center justify-center w-full h-[160px] bg-gray-100 border-dashed border-2 border-gray-300 rounded-md">
        <Image
          src={imgFile ? imgFile : `/svg/img-box.svg`}
          alt="preview-img"
          width={140}
          height={140}
          className="rounded-md"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={previewImg}
        className="w-full"
        required={required}
      />
    </div>
  )
}
