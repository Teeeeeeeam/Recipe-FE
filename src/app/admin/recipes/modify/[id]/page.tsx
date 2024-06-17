'use client'

import { getDetailRecipe, updateRecipe } from '@/api/admin-apis'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { CookStep, NewCookStep } from '@/types/admin'

const ModifyRecipe = () => {
  const [imgFile, setImgFile] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [title, setTitle] = useState('')
  const [cookStep, setCookStep] = useState<CookStep[]>([])
  const [deleteCookStepsId, setDeleteCookStepsId] = useState<string[]>([])
  const [newCookStep, setNewCookStep] = useState<string[]>([])
  const [people, setPeople] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [cookLevel, setCookLevel] = useState('')

  const params = useParams()
  const recipeId = params.id
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const res = await getDetailRecipe(recipeId as string)
      setImgFile(res.recipe.imageUrl)
      setIngredients([...res.ingredients])
      setTitle(res.recipe.title)
      setCookLevel(res.recipe.cookingLevel)
      setCookTime(res.recipe.cookingTime)
      setPeople(res.recipe.people)
      setCookStep([...res.cookStep])
    }

    getData()
  }, [])

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
  const handleAddNewCookStepChange = (idx: number, value: string) => {
    const updatedNewCookStep = [...newCookStep]
    updatedNewCookStep[idx] = value
    setNewCookStep(updatedNewCookStep)
  }
  const handleAddCookStepChange = (idx: number, value: string) => {
    const newIngredients = [...cookStep]
    newIngredients[idx].cook_steps = value
    setCookStep(newIngredients)
  }
  //이미지 파일 수정 해야됨
  const handleModifyClick = async () => {
    if (!title || !cookLevel || !people || !ingredients.length || !cookTime) {
      alert('모든 필드를 채워야 합니다.')
      return
    }
    if (confirm('레시피를 수정하시겠습니까?')) {
      const res = await updateRecipe(
        Number(recipeId),
        title,
        cookLevel,
        people,
        ingredients,
        cookTime,
        cookStep,
        newCookStep,
        deleteCookStepsId,
        file ?? null,
      )
      alert('게시글이 수정되었습니다.')
      router.push('/admin/recipe')
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
          onClick={handleModifyClick}
          className="px-6 py-3 bg-green-100 hover:bg-green-150 rounded-md"
        >
          수정
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
              width={160}
              height={160}
              className="w-auto h-auto"
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
        <div className="flex gap-2">
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
        <div className="flex flex-wrap gap-2">
          {ingredients &&
            ingredients.map((el, idx) => (
              <div key={idx} className="relative">
                <input
                  value={el}
                  onChange={(e) =>
                    handleAddIngredientsChange(idx, e.target.value)
                  }
                  className="min-w-[100px] py-1 pl-4 bg-green-100 rounded-sm text-white"
                />
                <Image
                  src={`/svg/close.svg`}
                  alt="delete-icon"
                  height={25}
                  width={25}
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() =>
                    setIngredients((prev) =>
                      prev.filter((_, index) => index !== idx),
                    )
                  }
                  priority
                />
              </div>
            ))}
        </div>
      </div>
      <div className="text-white space-y-2">
        <div className="flex gap-x-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full">
            조리 순서
          </div>
          <button onClick={() => setNewCookStep((prev) => [...prev, ''])}>
            <Image
              src="/svg/plus.svg"
              alt="조리추가"
              width={30}
              height={30}
              className="bg-navy-100 rounded-full transition-transform hover:scale-110"
              priority
            />
          </button>
        </div>
        {cookStep &&
          cookStep.map((el, idx) => (
            <div key={idx} className="relative">
              <textarea
                value={el.cook_steps}
                onChange={(e) => handleAddCookStepChange(idx, e.target.value)}
                className="w-full py-1 pl-2 pr-6 bg-green-100 rounded-sm text-white"
              />
              <Image
                src={`/svg/close.svg`}
                alt="delete-icon"
                height={25}
                width={25}
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => {
                  setCookStep((prev) =>
                    prev.filter((_, index) => index !== idx),
                  )
                  setDeleteCookStepsId((prev) => [...prev, el.cook_step_id])
                }}
                priority
              />
            </div>
          ))}
        {newCookStep &&
          newCookStep.map((el, idx) => (
            <div key={idx} className="relative">
              <textarea
                value={el}
                onChange={(e) =>
                  handleAddNewCookStepChange(idx, e.target.value)
                }
                className="w-full py-1 pl-2 pr-6 bg-green-100 rounded-sm text-white"
              />
              <Image
                src={`/svg/close.svg`}
                alt="delete-icon"
                height={25}
                width={25}
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() =>
                  setNewCookStep((prev) =>
                    prev.filter((_, index) => index !== idx),
                  )
                }
                priority
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ModifyRecipe
