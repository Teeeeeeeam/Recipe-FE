'use client'

import { checkLikesForPosting, doLikeForPosting } from '@/api/login-user-apis'
import { getUserPostingDetail, postUserDel, verifyPw } from '@/api/recipe-apis'
import { RootState } from '@/store'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { PostingDetail, ThreeCookInfo } from '@/types/recipe'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export default function RecipeDetailUser() {
  const [thisInfo, setThisInfo] = useState<PostingDetail>()
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[]>()
  const [like, setLike] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [orDelMod, setOrDelMod] = useState<string>('')
  const [postPw, setPostPw] = useState<string>('')

  const params = useParams()
  const thisId = Number(params.id)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    getDataLike()
  }, [like])

  async function getDataLike() {
    try {
      const result = await getUserPostingDetail(
        '/api/user/posts/',
        String(thisId),
      )
      const resultLike = await checkLikesForPosting(
        '/api/likeCheck',
        String(thisId),
      )
      const createThree = (str1: string, str2: string, str3: string) => {
        return {
          title: str1,
          data: result.data.post[str2],
          imgUrl: `/svg/${str3}.svg`,
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
      console.log(error)
    }
  }

  async function likeHandler() {
    const userId = userInfo.id
    const option = {
      memberId: userId,
      postId: thisId,
    }
    try {
      await doLikeForPosting('/api/user/postLike', option)
      const result = await checkLikesForPosting(
        '/api/likeCheck',
        String(thisId),
      )
      setLike(result.success)
    } catch (error) {
      console.log(error)
    }
  }

  async function submitHandler() {
    try {
      const body = {
        password: postPw,
        postId: thisInfo?.id,
      }
      await verifyPw('/api/valid/posts', body)
      if (orDelMod === 'mod') {
        dispatch(recipeId(thisInfo?.id))
        window.location.href = '/list-page/user-recipes/modification'
      }
      if (orDelMod === 'del') {
        const resultDel = await postUserDel('/api/user/posts', thisId)
        window.location.href = '/list-page/user-recipes'
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {thisInfo && (
        <div className="relative h-full">
          <article className="detail-wrap py-5 relative">
            <h3 className="text-center text-4xl mb-5">{thisInfo.postTitle}</h3>
            <section className="detail-info w-full">
              <div className="detail-top flex justify-center mb-5">
                <Image
                  src={thisInfo.postImageUrl}
                  alt={thisInfo.postTitle}
                  width={300}
                  height={300}
                  className="rounded-2xl"
                />
              </div>
              <div className="detail-bottom">
                <ul className="flex justify-between w-[70%] mx-auto mb-3">
                  {thisInfoCook?.map((cook) => {
                    const refKey: keyof PostingDetail = cook.title
                    const cookTitle = thisInfo[refKey] as string
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
                        <span>{cookTitle}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
            <section className="detail-step w-full">
              <div className="flex flex-wrap flex-col py-2 border-t border-[#000]">
                <h4 className="text-2xl mb-3">내용</h4>
                <p>{thisInfo.postContent}</p>
              </div>
            </section>
            <section>댓글</section>
            <aside className="absolute py-5 top-0 right-0 w-1/12">
              <ul className="flex flex-col items-center">
                <li className="mb-2 py-2 w-full text-center bg-gray-400 rounded-lg">
                  <button
                    onClick={() => {
                      setIsModal(!isModal)
                      setOrDelMod('mod')
                    }}
                    type="button"
                    className="block w-full"
                  >
                    게시물 수정
                  </button>
                </li>
                <li className="mb-2 cursor-pointer py-2 w-full text-center bg-gray-400 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModal(!isModal)
                      setOrDelMod('del')
                    }}
                    className="block w-full"
                  >
                    게시물 삭제
                  </button>
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
                  {thisInfo.postLikeCount}
                </li>
              </ul>
            </aside>
          </article>

          {isModal && (
            <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
              <div className="bg-white px-16 py-14 rounded-md text-center">
                <p className="text-xl mb-4 font-bold text-slate-500">
                  비밀번호를 입력해주세요.
                </p>
                <input
                  type="text"
                  onChange={(e) => setPostPw(e.target.value)}
                  className="block mb-4"
                />
                <button
                  onClick={() => setIsModal(!isModal)}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => submitHandler()}
                  className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
