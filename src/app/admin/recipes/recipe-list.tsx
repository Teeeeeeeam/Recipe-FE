'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { deleteRecipe } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { RecipeDtoList } from '@/types/admin'

interface RecipeListProps {
  recipes: RecipeDtoList[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const RecipeList = ({ recipes, lastElementRef }: RecipeListProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [hoveredRecipe, setHoveredRecipe] = useState<RecipeDtoList | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()

  const handleMouseEnter = (recipe: RecipeDtoList) => {
    setHoveredRecipe(recipe)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    setHoveredRecipe(null)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white md:p-4 rounded shadow text-[12px] md:text-[14px] mt-4">
      <ul className="grid grid-cols-[0.5fr_2fr_2fr_2fr] md:grid-cols-[0.5fr_1.5fr_3fr_1fr_1fr_2fr_2fr] text-center font-semibold bg-gray-200 p-2 rounded-t">
        <li className="flex justify-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(recipes.map((el) => el.id))}
              className="cursor-pointer w-3 h-3 md:w-4 md:h-4"
            />
            <Image
              src={`/svg/down-arrow.svg`}
              alt="delete-icon"
              width={40}
              height={40}
              className="absolute top-[1px] left-3 ml-2 cursor-pointer"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              priority
            />
            {isDeleteOpen && (
              <div className="absolute top-6 w-16 z-20 bg-white border rounded shadow-lg">
                <button
                  type="button"
                  className="block w-full text-center px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  onClick={() => handleAllDeleteClick(deleteList, deleteRecipe)}
                >
                  추방
                </button>
              </div>
            )}
          </div>
        </li>
        <li className="hidden md:block">번호</li>
        <li>요리명</li>
        <li className="hidden md:block">인분</li>
        <li className="hidden md:block">요리시간</li>
        <li>등록일자</li>
        <li>관리</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {recipes &&
          recipes.map((recipe) => (
            <ul
              key={recipe.id}
              className="relative grid grid-cols-[0.5fr_2fr_2fr_2fr] md:grid-cols-[0.5fr_1.5fr_3fr_1fr_1fr_2fr_2fr] text-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(recipe)}
              onMouseLeave={handleMouseLeave}
            >
              <li className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(recipe.id)}
                  onChange={() => handleCheckboxChange(recipe.id)}
                  className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
                />
              </li>
              <li className="hidden md:block">{recipe.id}</li>
              <li className="cursor-pointer hover:text-blue-100">
                <Link href={`/list-page/main-recipes/${recipe.id}`}>
                  {recipe.title}
                </Link>
              </li>
              <li className="hidden md:block">{recipe.people}</li>
              <li className="hidden md:block">{recipe.cookingTime}</li>
              <li>{recipe.createdAt}</li>
              <li className="space-x-1">
                <Link href={`/admin/recipes/modify/${recipe.id}`}>
                  <button className="text-blue-100 hover:text-blue-150">
                    수정
                  </button>
                </Link>
                <span>/</span>
                <button
                  onClick={() => handleDeleteClick(recipe.id, deleteRecipe)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </li>

              {hoveredRecipe &&
                hoveredRecipe.id === recipe.id &&
                isModalOpen && (
                  <div className="absolute break-words top-[110%] left-[25%] max-w-[200px] md:max-w-[300px]   bg-white border rounded shadow-lg p-4 z-10">
                    <ul className="w-full list-none p-0 m-0 text-left ">
                      <li>
                        <span className="font-bold">{`번호 : `}</span>
                        <span>{hoveredRecipe.id}</span>
                      </li>
                      <li>
                        <span className="font-bold">{`요리명 : `}</span>
                        <span>{hoveredRecipe.title}</span>
                      </li>
                      <li>
                        <span className="font-bold">{`인분 : `}</span>
                        <span>{hoveredRecipe.people}</span>
                      </li>
                      <li>
                        <span className="font-bold">{`요리시간 : `}</span>
                        <span>{hoveredRecipe.cookingTime}</span>
                      </li>
                      <li>
                        <span className="font-bold">{`등록일자 : `}</span>
                        <span>{hoveredRecipe.createdAt}</span>
                      </li>
                    </ul>
                  </div>
                )}
            </ul>
          ))}

        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default RecipeList
