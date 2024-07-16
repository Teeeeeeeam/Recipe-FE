'use client'
import {
  getComment,
  commentDel,
  commentMod,
  commentWrite,
} from '@/api/recipe-apis'
import { Comments } from '@/types/recipe'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

interface PropsType {
  thisId: number
  userId: string | null
}
export function Comment({ thisId, userId }: PropsType) {
  const [comment, setComment] = useState<Comments[]>([])
  const [mount, setMount] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [isMod, setIsMod] = useState<{ [key: number]: boolean }>({})
  const [saveComment, setSaveComment] = useState<{ [key: number]: string }>({})
  const [isDel, setIsDel] = useState<boolean>(false)
  const [targetDel, setTargetDel] = useState<number | null>(null)
  const [lastId, setLastId] = useState<number | null>(null)
  const [next, setNext] = useState<boolean>(false)

  const loader = useRef(null)

  useEffect(() => {
    getCommentData(true)
  }, [mount])

  async function getCommentData(isInit: boolean) {
    try {
      const option = {
        size: 5,
      }
      const result = await getComment(option, thisId, lastId)
      if (isInit) {
        setComment(result.data.comment)
      } else {
        setComment((prev) => {
          const newData = result.data.comment
          return [...prev, ...newData]
        })
      }
      if (result.data.comment.length > 0) {
        const dataLastId =
          result.data.comment[result.data.comment.length - 1].id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
    } catch (error) {
      console.log(error)
    }
  }

  async function postHandler() {
    try {
      if (userId && thisId && content.length > 1) {
        const option = {
          commentContent: content,
          postId: thisId,
        }
        await commentWrite(option)
        setContent('')
        setMount(!mount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function modHandler(itemId: number) {
    try {
      const options = {
        commentContent: saveComment[itemId] || '',
        commentId: itemId,
      }
      if ((saveComment[itemId] || '').length > 0) {
        await commentMod(options)
        setIsMod((prev) => ({ ...prev, [itemId]: false }))
        setSaveComment((prev) => ({ ...prev, [itemId]: '' }))
        setMount(!mount)
      } else {
        alert('댓글은 1자 이상 부탁드려요')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status
        if (errorCode === 403) {
          alert('작성자가 일치하지 않습니다.')
        }
      }
    }
  }

  async function deleteHandler() {
    try {
      if (userId && targetDel) {
        const options = {
          commentId: targetDel,
        }
        await commentDel(options)
        setIsDel(false)
        setTargetDel(null)
        setMount(!mount)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status
        if (errorCode === 403) {
          alert('작성자가 일치하지 않습니다.')
        }
      }
    }
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getCommentData(false)
        }
      }
    },
    [comment],
  )
  // Intersection Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <>
      <div className="w-full mb-4 border-b border-black">
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
      {comment.length > 0 && (
        <div className="px-5">
          {comment.map((item) => {
            const thisDate = item.createdAt.slice(
              0,
              item.createdAt.indexOf('T'),
            )
            return (
              <div
                key={item.id}
                className="mx-auto my-8 flex rounded-xl border border-gray-300 p-4 text-left text-gray-600 shadow-lg sm:p-8"
              >
                <div className="w-full text-left">
                  <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                    <p className="font-medium">{item.member.nickname}</p>
                    <span className="text-xs">{thisDate}</span>
                  </div>
                  {isMod[item.id] ? (
                    <textarea
                      value={saveComment[item.id] || ''}
                      onChange={(e) => {
                        setSaveComment((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }}
                      className="w-full px-2 rounded-md"
                    ></textarea>
                  ) : (
                    <p className="text-sm">{item.commentContent}</p>
                  )}

                  <div className="mt-5 flex items-center justify-end text-gray-600">
                    {isMod[item.id] ? (
                      <>
                        <button
                          type="button"
                          onClick={() => modHandler(item.id)}
                          className="cursor-pointer border border-gray-300 mr-2 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                        >
                          완료
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMod((prev) => ({ ...prev, [item.id]: false }))
                          }}
                          className="cursor-pointer border border-gray-300 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMod((prev) => ({ ...prev, [item.id]: true }))
                            if (!saveComment[item.id] && item.commentContent) {
                              setSaveComment((prev) => ({
                                ...prev,
                                [item.id]: item.commentContent,
                              }))
                            }
                          }}
                          className="cursor-pointer border border-gray-300 mr-2 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsDel(true)
                            setTargetDel(item.id)
                          }}
                          className="cursor-pointer border border-gray-300 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={loader}></div>
        </div>
      )}

      {comment.length === 0 && (
        <div className="px-5">
          <p className="mx-auto my-8 flex rounded-xl border border-gray-300 p-4 text-left text-gray-600 shadow-lg sm:p-8">
            첫 댓글을 달아주세요
          </p>
        </div>
      )}
      {isDel && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-10 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              삭제하시겠습니까?
            </p>
            <form className="flex felx-wrap flex-col">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDel(false)
                    setTargetDel(null)
                  }}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => deleteHandler()}
                  className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
