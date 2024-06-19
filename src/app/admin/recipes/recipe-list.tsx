import { deleteRecipe } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { RecipeDtoList } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'

interface RecipeListProps {
  recipes: RecipeDtoList[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const RecipeList = ({ recipes, lastElementRef }: RecipeListProps) => {
  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()

  return (
    <div className="bg-navy-50 p-2 text-white rounded-md">
      <ul className="grid grid-cols-[1fr_2fr_3fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
        <li className="flex justify-center items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(recipes.map((el) => el.id))}
              className="cursor-pointer w-5 h-5"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={40}
              height={40}
              className="absolute top-0 left-[25px] cursor-pointer translate-transition hover:scale-x-110"
              onClick={() => handleAllDeleteClick(deleteList, deleteRecipe)}
              priority
            />
          </div>
        </li>
        <li>레시피 번호</li>
        <li>요리명</li>
        <li>인분</li>
        <li>요리시간</li>
        <li>등록일자</li>
        <li>관리</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {recipes &&
          recipes.map((el) => (
            <ul
              key={el.id}
              className="grid grid-cols-[1fr_2fr_3fr_1fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center py-4 bg-navy-100"
            >
              <li className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(el.id)}
                  onChange={() => handleCheckboxChange(el.id)}
                  className="w-5 h-5 cursor-pointer"
                />
              </li>
              <li>{el.id}</li>
              <Link href={`/list-page/main-recipes/${el.id}`}>
                <li className="cursor-pointer hover:text-green-150">
                  {el.title}
                </li>
              </Link>
              <li>{el.people}</li>
              <li>{el.cookingTime}</li>
              <li>{el.createdAt}</li>
              <li className="space-x-1">
                <Link href={`/admin/recipes/modify/${el.id}`}>
                  <button className="hover:text-green-150">수정</button>
                </Link>
                <span>/</span>
                <button onClick={() => handleDeleteClick(el.id, deleteRecipe)}>
                  삭제
                </button>
              </li>
            </ul>
          ))}

        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default RecipeList
