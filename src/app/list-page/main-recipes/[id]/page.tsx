'use client'

import { getRecipeDetail } from '@/api/recipe-apis'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RecipeDetail, ThreeCookInfo } from '@/types/recipe'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { postWriteState } from '@/store/write-userRecipe-slice'
import {
  checkBookmark,
  checkLikesForRecipe,
  doBookmark,
  doLikeForRecipe,
} from '@/api/login-user-apis'
import PostingTop from './posting-top'

export default function RecipeDetailMain() {
  const [thisInfo, setThisInfo] = useState<RecipeDetail>()
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[]>([])
  const [like, setLike] = useState<boolean>(false)
  const [bookmark, setBookmark] = useState<boolean>(false)

  const params = useParams()
  const thisId = Number(params.id)
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')
  const router = useRouter()

  useEffect(() => {
    getData()
    if (accessToken) {
      getLike()
      getBookMark()
    }
  }, [like, bookmark])

  async function getData() {
    try {
      const resultData = await getRecipeDetail(thisId)
      const createThree = (title: string, data: string, img: string) => {
        return {
          title,
          data,
          imgUrl: `/svg/${img}.svg`,
        }
      }
      const resultCook: ThreeCookInfo[] = [
        createThree('people', resultData.data.recipe.people, 'people'),
        createThree('cookingTime', resultData.data.recipe.cookingTime, 'timer'),
        createThree(
          'cookingLevel',
          resultData.data.recipe.cookingLevel,
          'stars',
        ),
      ]
      setThisInfo(resultData.data)
      setThisInfoCook(resultCook)
    } catch (error) {
      console.log(error)
    }
  }

  async function getLike() {
    try {
      const resultLike = await checkLikesForRecipe(thisId)
      setLike(resultLike.success)
    } catch (error) {
      console.log(error)
    }
  }

  async function likeHandler() {
    try {
      if (accessToken) {
        const option = {
          recipeId: thisId,
        }
        await doLikeForRecipe(option)
        const result = await checkLikesForRecipe(thisId)
        setLike(result.success)
      } else {
        const isLogin = confirm(
          '로그인이 필요한 서비스 입니다. 로그인을 하시겠습니까?',
        )
        isLogin ? router.push('/user/login') : null
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getBookMark() {
    try {
      const result = await checkBookmark(thisId)
      setBookmark(result.success)
    } catch (error) {
      console.log(error)
    }
  }

  async function bookmarkHandler() {
    try {
      const options = {
        recipeId: thisId,
      }
      if (accessToken) {
        const result = await doBookmark(options)
        setBookmark(result.success)
      } else {
        const isLogin = confirm(
          '로그인이 필요한 서비스 입니다. 로그인을 하시겠습니까?',
        )
        isLogin ? router.push('/user/login') : null
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {thisInfo && (
        <article>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <Image
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-[350px] lg:mb-0 mb-10 object-fill object-center rounded-xl"
                  src={thisInfo.recipe.imageUrl || ''}
                  width={300}
                  height={300}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:pt-6 mb-6 lg:mb-0">
                  <h4 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {thisInfo.recipe.title}
                  </h4>
                  <div className="detail-bottom">
                    <dl className="flex flex-wrap items-center mb-5">
                      <dt className="mr-3 text-2xl">요리 재료</dt>
                      {thisInfo?.ingredients.map((ingredient, index) => {
                        return (
                          <dd
                            key={index}
                            className="mx-1 px-2 mb-1 border border-[#000] box-border rounded-xl"
                          >
                            {ingredient}
                          </dd>
                        )
                      })}
                    </dl>
                    <ul className="flex justify-between w-[70%] mx-auto mb-4">
                      {thisInfoCook?.map((cook) => {
                        return (
                          <li
                            key={cook.title}
                            className="flex flex-col items-center"
                          >
                            <Image
                              src={cook.imgUrl}
                              alt={cook.title}
                              width={50}
                              height={50}
                            />
                            <span>{cook.data}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="flex items-center py-2 text-end border-y border-black">
                    <span className="title-font font-medium text-2xl text-[#11B981] hover:text-[#214D33]">
                      <Link
                        href={
                          accessToken
                            ? '/list-page/user-recipes/write'
                            : '/user/login'
                        }
                        onClick={() => {
                          const newData = { ...thisInfo.recipe, direct: true }
                          dispatch(postWriteState(newData))
                        }}
                        className="block w-full"
                      >
                        요리글 작성하기
                      </Link>
                    </span>
                    <button
                      onClick={() => likeHandler()}
                      className="flex items-center bg-gray-200 ml-auto border-0 py-2 px-6 focus:outline-none rounded"
                    >
                      <Image
                        src={like ? '/svg/heart-fill.svg' : '/svg/heart.svg'}
                        alt="좋아요"
                        width={20}
                        height={15}
                      />
                      {thisInfo.recipe.likeCount}
                    </button>
                    <button
                      onClick={() => bookmarkHandler()}
                      className="w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center ml-4 rounded"
                    >
                      <Image
                        src={
                          bookmark
                            ? '/svg/bookmark-fill.svg'
                            : '/svg/bookmark.svg'
                        }
                        alt="북마크"
                        width={20}
                        height={15}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex flex-wrap flex-col px-3 py-2 border-t border-[#000]">
              <h4 className="text-2xl mb-3">조리순서</h4>
              {thisInfo.cookSteps.map((step, index) => {
                return (
                  <p key={step.cookStepId} className="relative pl-5 mb-3">
                    <span className="absolute inline-block left-0">
                      {index + 1}.
                    </span>
                    &nbsp;
                    {step.cookSteps}
                  </p>
                )
              })}
            </div>
          </section>
        </article>
      )}
      <PostingTop id={thisId} />
    </>
  )
}
