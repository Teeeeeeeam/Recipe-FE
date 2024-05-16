'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'

const Write = () => {
  const [imgFile, setImgFile] = useState('')
  const imgRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [text, setText] = useState('')

  const previewImg = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgFile(reader.result)
        }
      }
    }
  }
  const handleAddIngredientsClick = () => {
    setIngredients((prev) => [...prev, ''])
  }
  const handleAddIngredientsChange = (idx: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[idx] = value
    setIngredients(newIngredients)
  }
  console.log(imgFile)
  return (
    <div className="space-y-10">
      <div className="flex justify-between text-center gap-x-2 text-white">
        <input
          placeholder="레시피 이름 입력"
          className="max-w-[360px] w-full py-3 pl-2 bg-green-100 rounded-md"
        />
        <button
          type="button"
          className="px-6 py-3 bg-green-100 hover:bg-green-150 rounded-md"
        >
          등록
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
        <div className="space-y-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full text-white">
            이미지 선택
          </div>
          <div className="flex items-center justify-center w-full h-[160px] border">
            <Image
              src={imgFile ? imgFile : `/svg/img-box.svg`}
              alt="preview-img"
              width={imgFile ? 180 : 100}
              height={imgFile ? 180 : 100}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={previewImg}
            className="w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-white gap-y-2">
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              인분
            </div>
            <input className="w-[140px] py-1 pl-4 bg-green-100 rounded-full" />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              요리시간
            </div>
            <input className="w-[140px] py-1 pl-4 bg-green-100 rounded-full" />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              난이도
            </div>
            <input className="w-[140px] py-1 pl-4 bg-green-100 rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-x-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full text-white">
            요리 재료
          </div>
          <button onClick={handleAddIngredientsClick}>
            <Image
              src="/svg/plus.svg"
              alt="재료추가"
              width={30}
              height={30}
              className="bg-navy-100 rounded-full transition-transform hover:scale-110"
              priority
            />
          </button>
        </div>
        <div className="flex gap-x-2">
          {ingredients &&
            ingredients.map((el, idx) => (
              <input
                key={idx}
                onChange={(e) =>
                  handleAddIngredientsChange(idx, e.target.value)
                }
                className="min-w-[100px] py-1 pl-4 bg-green-100 rounded-full text-white"
              />
            ))}
        </div>
      </div>
      <div className="text-white">
        <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full">
          조리 설명
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 p-2 w-full min-h-[500px] rounded-md bg-navy-100"
        />
      </div>
    </div>
  )
}

export default Write
