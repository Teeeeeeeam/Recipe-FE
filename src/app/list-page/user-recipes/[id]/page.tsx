'use client'

import { checkLikesForPosting, doLikeForPosting } from '@/api/login-user-apis'
import {
  getPostingDetail,
  postUserDel,
  postingVerifyPassword,
} from '@/api/recipe-apis'
import { Comment } from '@/components/recipe-and-posting/comment'
import { RootState } from '@/store'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { PostingDetail, ThreeCookInfo } from '@/types/recipe'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export default function RecipeDetailUser() {
  const [thisInfo, setThisInfo] = useState<PostingDetail>()
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[]>([])
  const [like, setLike] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [orDelMod, setOrDelMod] = useState<string>('')
  const [postPw, setPostPw] = useState<string>('')

  const params = useParams()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const { id } = userInfo
  const thisId = Number(params.id)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    getDataLike()
  }, [like])

  async function getDataLike() {
    try {
      const result = await getPostingDetail(thisId)
      const resultLike = await checkLikesForPosting(thisId)
      const createThree = (title: string, data: string, img: string) => {
        return {
          title,
          data,
          imgUrl: `/svg/${img}.svg`,
        }
      }
      const resultCook: ThreeCookInfo[] = [
        createThree('postServing', result.data.post.postServing, 'people'),
        createThree(
          'postCookingTime',
          result.data.post.postCookingTime,
          'timer',
        ),
        createThree(
          'postCookingLevel',
          result.data.post.postCookingLevel,
          'stars',
        ),
      ]
      setThisInfo(result.data.post)
      setThisInfoCook(resultCook)
      setLike(resultLike.success)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          alert('다시 시도해주세요')
          router.back()
        }
      }
    }
  }

  async function likeHandler() {
    try {
      const option = {
        postId: thisId,
      }
      await doLikeForPosting(option)
      const result = await checkLikesForPosting(thisId)
      setLike(result.success)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }

  async function submitHandler() {
    try {
      if (thisInfo) {
        const option = {
          password: postPw,
          postId: thisInfo.id,
        }
        await postingVerifyPassword(option)
        if (orDelMod === 'mod') {
          dispatch(recipeId(thisInfo.id))
          window.location.href = '/list-page/user-recipes/modification'
        }
        if (orDelMod === 'del') {
          await postUserDel(thisId)
          window.location.href = '/list-page/user-recipes'
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const statusCode = axiosError.response.status
          const res = axiosError.response.data as { message: string }
          if (statusCode === 403) {
            alert('작성자만 가능합니다')
          }
          if (statusCode === 400) {
            alert('비밀번호가 일치하지 않습니다')
          }
        }
      }
    }
  }
  return (
    <>
      {thisInfo && (
        <article>
          <section className="text-gray-600 body-font">
            <div className="container px-5 lg:py-24 py-10 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center ">
                <div className="relative lg:w-1/2 w-full h-0 pb-[56.25%] lg:mb-0 mb-8">
                  <Image
                    src={thisInfo.postImageUrl || '대체할 이미지'}
                    alt={thisInfo.postTitle || '유저요리이미지'}
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full rounded-3xl"
                  />
                </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:pt-6 mb-6 lg:mb-0 flex flex-col justify-between">
                  <h4 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {thisInfo.postTitle}
                  </h4>
                  <div className="detail-bottom">
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
                    <button
                      type="button"
                      onClick={() => {
                        setIsModal(!isModal)
                        setOrDelMod('mod')
                      }}
                      className="title-font font-medium text-2xl text-[#11B981] hover:text-[#214D33]"
                    >
                      게시물 수정
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModal(!isModal)
                        setOrDelMod('del')
                      }}
                      className="flex items-center bg-gray-200 ml-auto border-0 py-2 px-6 focus:outline-none rounded"
                    >
                      게시물 삭제
                    </button>
                    <button
                      onClick={() => likeHandler()}
                      className="w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center ml-4 rounded"
                    >
                      <Image
                        src={like ? '/svg/heart-fill.svg' : '/svg/heart.svg'}
                        alt="좋아요"
                        width={20}
                        height={15}
                      />
                      {thisInfo.postLikeCount}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-5 px-5">
            <div className="p-2 min-h-60">
              <p className="text-2xl mb-3 pb-3 border-b border-gray-400">
                <Link href={`/list-page/main-recipes/${thisInfo.recipe.id}`}>
                  &#91;{thisInfo.recipe.title}&#93;
                </Link>
                <span className="text-lg"> 후기</span>
              </p>
              <p className="overflow-wrap break-words">
                {thisInfo.postContent}
              </p>
            </div>
          </section>
          <section>
            <Comment userId={id} thisId={thisId} />
          </section>
        </article>
      )}

      {isModal && (
        <div className="bg-slate-800 bg-opacity-50 fixed flex justify-center items-center top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              비밀번호를 입력해주세요.
            </p>
            <input
              type="password"
              onChange={(e) => setPostPw(e.target.value)}
              className="block w-full mb-4"
            />
            <button
              onClick={() => setIsModal(!isModal)}
              className="bg-gray-100 px-4 py-2 rounded-md text-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => submitHandler()}
              className="bg-blue-50 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  )
}
