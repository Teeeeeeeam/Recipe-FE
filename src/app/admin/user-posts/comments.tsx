'use client'

import { deleteComments, getComments } from '@/api/admin-apis'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Comment } from '@/types/admin'
import { useCallback, useState } from 'react'

const Comments = ({ id }: { id: number }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)
  const [deleteList, setDeleteList] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const getComment = useCallback(async () => {
    if (!hasMore) return
    const res = await getComments(id, lastId)
    const newComment = res.comment
    if (newComment.length) {
      setComments((prev) => [...prev, ...newComment])
      setHasMore(res.nextPage)
      setLastId(newComment[newComment.length - 1].id)
    }
  }, [hasMore, lastId, comments])

  const lastElementRef = useInfiniteScroll(getComment, hasMore)

  const handleCheckboxChange = (commentId: number) => {
    setDeleteList((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setDeleteList([])
    } else {
      const allIds = comments.map((comment) => comment.id)
      setDeleteList(allIds)
    }
    setSelectAll(!selectAll)
  }

  const handleDeleteCommentClick = async (id: number) => {
    const arr = [id]
    if (confirm('해당 댓글을 삭제하시겠습니까?')) {
      await deleteComments(arr)
      alert('댓글이 삭제되었습니다.')
      setComments([])
      setHasMore(true)
      setLastId(null)
      getComment()
    }
  }

  const handleAllDeleteCommentClick = async () => {
    if (confirm('해당 댓글들을 삭제하시겠습니까?')) {
      await deleteComments(deleteList)
      alert('댓글이 삭제되었습니다.')
      setComments([])
      setHasMore(true)
      setLastId(null)
      getComment()
    }
  }

  return (
    <div className="p-4 w-full max-h-[500px] border bg-white rounded shadow overflow-y-auto">
      <h1 className="text-lg font-semibold mb-2">{`댓글 ${comments.length}`}</h1>
      <div className="bg-gray-100 p-2 font-semibold rounded">
        <ul className="grid grid-cols-[0.51fr_3fr_6fr_1fr] md:grid-cols-[0.51fr_2fr_7fr_2fr_1fr] items-center text-[12px] gap-x-2">
          <li className="flex items-center pl-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="cursor-pointer w-3 h-3 md:w-4 md:h-4"
            />
          </li>
          <li>닉네임(아이디)</li>
          <li>댓글</li>
          <li className="text-center hidden md:block">등록일자</li>
          <li>
            <button onClick={handleAllDeleteCommentClick}>삭제</button>
          </li>
        </ul>
      </div>
      <div className="divide-y">
        {comments &&
          comments.map((el) => (
            <div key={el.id} className="mt-2 bg-gray-50 p-2">
              <ul className="grid grid-cols-[0.51fr_3fr_6fr_1fr] md:grid-cols-[0.5fr_2fr_7fr_2fr_1fr] items-center text-[12px] gap-x-2">
                <li className="flex items-center pl-2">
                  <input
                    type="checkbox"
                    checked={deleteList.includes(el.id)}
                    onChange={() => handleCheckboxChange(el.id)}
                    className="cursor-pointer w-3 h-3 md:w-4 md:h-4"
                  />
                </li>
                <li>{`${el.member.nickname}(${el.member.loginId})`}</li>
                <li className="break-words">{el.commentContent}</li>
                <li className="text-center hidden md:block">
                  {el.createdAt.slice(0, 10)}
                </li>
                <li>
                  <button
                    onClick={() => handleDeleteCommentClick(el.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default Comments
