'use client'
import { getRecipeDetail } from '@/api/recipe-apis'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DetailRecipe, ThreeCookInfo } from '@/types/recipe'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { postWriteState } from '@/store/write-userRecipe-slice'
import {
  checkBookmark,
  checkLikesForRecipe,
  doBookmark,
  doLikeForRecipe,
} from '@/api/login-user-apis'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function RecipeDetailMain() {
  const [thisInfo, setThisInfo] = useState<DetailRecipe>()
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[]>()
  const [like, setLike] = useState<boolean>(false)
  const [bookmark, setBookmark] = useState<boolean>(false)

  const params = useParams()
  const thisId = Number(params.id)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    getData()
  }, [like, bookmark])

  async function getData() {
    try {
      const resultData = await getRecipeDetail(`/api/recipe/`, thisId)
      const resultLike = await checkLikesForRecipe(
        '/api/recipe/like/check',
        thisId,
      )
      const resultBookmark = await checkBookmark('/api/check/bookmarks', thisId)
      const createThree = (str1: string, str2: string) => {
        return {
          title: str1,
          data: resultData.data.recipe[str1],
          imgUrl: `/svg/${str2}.svg`,
        }
      }
      const resultCook: ThreeCookInfo[] = [
        createThree('people', 'people'),
        createThree('cookingTime', 'timer'),
        createThree('cookingLevel', 'stars'),
      ]
      setThisInfo(resultData.data)
      setThisInfoCook(resultCook)
      setLike(resultLike.success)
      setBookmark(resultBookmark.success)
    } catch (error) {
      console.log(error)
    }
  }

  async function likeHandler() {
    const userId = userInfo.id
    const option = {
      memberId: userId,
      recipeId: thisId,
    }
    try {
      await doLikeForRecipe('/api/user/recipe/like', option)
      const result = await checkLikesForRecipe('/api/recipe/like/check', thisId)
      setLike(result.success)
    } catch (error) {
      console.log(error)
    }
  }

  async function bookmarkHandler() {
    try {
      if (userInfo.id) {
        const options = {
          memberId: userInfo.id,
          recipeId: thisId,
        }
        const result = await doBookmark('/api/user/recipe', options)
        setBookmark(result.data['즐겨 찾기 상태'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    thisInfo && (
      <article className="detail-wrap py-5 relative">
        <h3 className="text-center text-4xl mb-5">{thisInfo.recipe.title}</h3>
        <section className="detail-info w-full">
          <div className="detail-top flex justify-center mb-5">
            <Image
              src={thisInfo.recipe.imageUrl}
              alt={thisInfo.recipe.title}
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </div>
          <div className="detail-bottom">
            <dl className="flex flex-wrap items-center justify-center mb-5">
              <dt className="mr-3 text-2xl">요리 재료</dt>
              {thisInfo.ingredients.map((ingredient, index) => {
                return (
                  <dd
                    key={index}
                    className="mx-1 px-2 border border-[#000] box-border rounded-xl"
                  >
                    {ingredient}
                  </dd>
                )
              })}
            </dl>
            <ul className="flex justify-between w-[70%] mx-auto mb-3">
              {thisInfoCook?.map((cook) => {
                return (
                  <li key={cook.title} className="flex flex-col items-center">
                    <Image
                      src={cook.imgUrl}
                      alt={cook.title}
                      width={50}
                      height={50}
                    />
                    <span>{thisInfo.recipe[cook.title]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className="detail-step w-full">
          <div className="flex flex-wrap flex-col py-2 border-t border-[#000]">
            <h4 className="text-2xl mb-3">조리순서</h4>
            {thisInfo.cookStep.map((step, index) => {
              return (
                <p key={step.cook_step_id} className="mb-3">
                  {index + 1}.&nbsp;{step.cook_steps}
                </p>
              )
            })}
          </div>
        </section>
        <aside className="absolute py-5 top-0 right-0 w-1/12">
          <ul className="flex flex-col items-center">
            <li className="mb-2 py-2 w-full text-center bg-gray-400 rounded-lg">
              <Link
                href={
                  accessToken ? '/list-page/user-recipes/write' : '/user/login'
                }
                onClick={() => {
                  dispatch(postWriteState(thisInfo.recipe))
                }}
                className="block w-full"
              >
                요리글 작성
              </Link>
            </li>
            <li
              onClick={() => likeHandler()}
              className="flex mb-2 py-2 w-full bg-gray-400 items-center justify-center rounded-lg cursor-pointer"
            >
              <Image
                src={like ? '/svg/heart-fill.svg' : '/svg/heart.svg'}
                alt="좋아요"
                width={20}
                height={15}
              />
              {thisInfo.recipe.likeCount}
            </li>
            <li
              onClick={() => bookmarkHandler()}
              className="flex mb-2 py-2 w-full bg-gray-400 items-center justify-center rounded-lg cursor-pointer"
            >
              <Image
                src={bookmark ? '/svg/bookmark-fill.svg' : '/svg/bookmark.svg'}
                alt="북마크"
                width={20}
                height={15}
              />
            </li>
          </ul>
        </aside>
      </article>
    )
  )
}
