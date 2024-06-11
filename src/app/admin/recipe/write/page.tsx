'use client'
import { postRecipe } from '@/api/admin-apis'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const WriteRecipe = () => {
  const [imgFile, setImgFile] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [title, setTitle] = useState('')
  const [cookStep, setCookStep] = useState<string[]>([''])
  const [people, setPeople] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [cookLevel, setCookLevel] = useState('')

  const router = useRouter()

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
          }
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
  const handleAddCookStepChange = (idx: number, value: string) => {
    const newIngredients = [...cookStep]
    newIngredients[idx] = value
    setCookStep(newIngredients)
  }
  const handleWriteClick = async () => {
    if (file) {
      if (confirm('게시글을 등록하시겠습니까?')) {
        const res = await postRecipe(
          title,
          cookLevel,
          people,
          ingredients,
          cookTime,
          cookStep,
          file,
        )
        router.push('/admin/recipe')
      }
    } else {
      console.log('사진 필수')
    }
  }
  return (
    <div className="space-y-10">
      <div className="flex justify-between text-center gap-x-2 text-white">
        <input
          placeholder="레시피 이름 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-[360px] w-full py-3 pl-2 bg-green-100 rounded-md"
        />
        <button
          type="button"
          onClick={handleWriteClick}
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
          <div className="flex items-center justify-center w-full h-[160px] bcookStep">
            <Image
              src={imgFile ? imgFile : `/svg/img-box.svg`}
              alt="preview-img"
              width={0}
              height={0}
              className="w-[140px] h-[140px]"
              priority
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
            <div className="flex items-center justify-center w-[100px] py-1 text-center bg-green-100 rounded-full">
              인분
            </div>
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="max-w-[160px] w-full py-3 pl-2 bg-green-100 rounded-md"
            >
              <option value="">선택하세요</option>
              <option value="1인분">1인분</option>
              <option value="2인분">2인분</option>
              <option value="3인분">3인분</option>
              <option value="4인분">4인분</option>
              <option value="5인분">5인분</option>
              <option value="6인분이상">6인분 이상</option>
            </select>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center w-[100px] py-1 text-center bg-green-100 rounded-full">
              요리시간
            </div>
            <select
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="max-w-[160px] w-full py-3 pl-2 bg-green-100 rounded-md"
            >
              <option value="">선택하세요</option>
              <option value="5분이내">5분 이내</option>
              <option value="15분이내">15분 이내</option>
              <option value="30분이내">30분 이내</option>
              <option value="60분이내">60분 이내</option>
              <option value="90분이내">90분 이내</option>
              <option value="2시간이내">2시간 이내</option>
              <option value="2시간이상">2시간 이상</option>
            </select>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center w-[100px] py-1 text-center bg-green-100 rounded-full">
              난이도
            </div>
            <select
              value={cookLevel}
              onChange={(e) => setCookLevel(e.target.value)}
              className="max-w-[160px] w-full py-3 pl-2 bg-green-100 rounded-md "
            >
              <option value="">선택하세요</option>
              <option value="상급">상급</option>
              <option value="중급">중급</option>
              <option value="초급">초급</option>
            </select>
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
      <div className="text-white space-y-2">
        <div className="flex gap-x-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full">
            조리 순서
          </div>
          <button onClick={() => setCookStep((prev) => [...prev, ''])}>
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
        {cookStep &&
          cookStep.map((el, idx) => (
            <input
              key={idx}
              value={el}
              onChange={(e) => handleAddCookStepChange(idx, e.target.value)}
              className="w-full py-1 pl-4 bg-green-100 rounded-full text-white"
            />
          ))}
      </div>
    </div>
  )
}

export default WriteRecipe
