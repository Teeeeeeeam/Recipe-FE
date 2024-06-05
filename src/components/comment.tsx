'use client'
import { deleteComment, getComment, postComment } from '@/api/recipe-apis'
import { Comments } from '@/types/recipe'
import { useEffect, useState } from 'react'

interface PropsType {
  thisId: number
  userId: string | null
}
export function Comment({ thisId, userId }: PropsType) {
  const [comment, setComment] = useState<Comments[] | []>([])
  const [mount, setMount] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    getCommentData()
  }, [mount])

  async function getCommentData() {
    try {
      const option = {
        page: 0,
        size: 10,
        sort: [''].join(''),
        posts: thisId,
      }
      const result = await getComment('/api/comments', option)
      setComment(result.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  async function postHandler() {
    try {
      if (userId && thisId && content.length > 1) {
        const options = {
          commentContent: content,
          memberId: userId,
          postId: thisId,
        }
        await postComment('/api/user/comments', options)
        setContent('')
        setMount(!mount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-full mb-4 border-b">
        <div className="w-full rounded-lg px-4 py-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              새로운 댓글 작성하기
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium focus:outline-none focus:bg-white"
                placeholder="댓글을 입력해주세요"
                required
              />
            </div>
            <div className="w-full flex justify-end md:w-full px-3">
              <div className="-mr-1">
                <button
                  onClick={() => postHandler()}
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                >
                  댓글 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {comment.length > 0 &&
        comment.map((item) => {
          async function deleteHandler() {
            try {
              if (userId && item.id) {
                const options = {
                  memberId: userId,
                  commentId: item.id,
                }
                await deleteComment('/api/user/comments', options)
                setMount(!mount)
              }
            } catch (error) {
              console.log(error)
            }
          }
          const thisDate = item.create_at.slice(0, item.create_at.indexOf('T'))

          return (
            <div
              key={item.id}
              className="mx-auto my-8 flex rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8"
            >
              <div className="w-full text-left">
                <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                  <p className="font-medium">{item.nickName}</p>
                  <span className="text-xs">{thisDate}</span>
                </div>
                <p className="text-sm">{item.comment_content}</p>
                <div className="mt-5 flex items-center justify-end text-gray-600">
                  <button
                    type="button"
                    className="cursor-pointer border mr-2 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHandler()}
                    className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      {comment.length === 0 && (
        <div className="mx-auto my-8 flex rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
          첫 댓글을 달아주세요
        </div>
      )}
    </>
  )
}
