'use client'
import { postRecipe } from '@/api/admin-apis'
import RecipeFormInput from '@/components/common/recipe-form-input'
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
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              인분
            </div>
            <RecipeFormInput value={people} onChange={setPeople} />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              요리시간
            </div>
            <RecipeFormInput value={cookTime} onChange={setCookTime} />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              난이도
            </div>
            <RecipeFormInput value={cookLevel} onChange={setCookLevel} />
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
