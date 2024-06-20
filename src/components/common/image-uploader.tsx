import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  initialImgFile?: string
  onFileChange: (file: File | null, imgFile: string) => void
}

const ImageUploader = ({
  initialImgFile = '',
  onFileChange,
}: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState(initialImgFile)
  const imgRef = useRef<HTMLInputElement>(null)

  const previewImg = () => {
    if (imgRef.current && imgRef.current.files) {
      const selectedFile = imgRef.current.files[0]
      setFile(selectedFile)
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImgFile(reader.result)
            onFileChange(selectedFile, reader.result)
          }
        }
      }
    }
  }

  const clearImg = () => {
    setFile(null)
    setImgFile('')
    onFileChange(null, '')
  }

  return (
    <div className="mt-4 space-y-2">
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex items-center justify-center w-full h-10 bg-blue-100 text-white rounded-md hover:bg-blue-50 transition"
      >
        이미지 선택
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        ref={imgRef}
        onChange={previewImg}
        className="hidden"
      />
      {imgFile && (
        <div className="relative flex justify-center">
          <Image
            src={imgFile}
            alt="preview-img"
            width={140}
            height={140}
            className="object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition transform hover:scale-110"
            onClick={clearImg}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
