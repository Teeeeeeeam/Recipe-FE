'use client'

import { getComments } from '@/api/admin-apis'
import { Comment } from '@/types/admin'
import { useEffect, useState } from 'react'

const Comments = ({ id }: { id: number }) => {
  const [comments, setComments] = useState<Comment[]>([])

  const getComment = async () => {
    const res = await getComments(String(id))
    const newComment = res.comment
    setComments(newComment)
  }
  useEffect(() => {
    getComment()
  }, [])

  return (
    <div className="p-4 w-full h-max-[500px] bg-green-50">
      <h1>댓글</h1>
      {comments &&
        comments.map((el) => (
          <div key={el.id} className="mt-2 bg-navy-100 p-2">
            <ul className="grid grid-cols-[1fr_2fr_7fr_2fr_1fr] text-[12px] gap-x-2">
              <li>체크</li>
              <li>{`${el.member.nickname}(${el.member.loginId})`}</li>
              <li>{el.comment_content}</li>
              <li>{el.create_at.slice(0, 10)}</li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
        ))}
    </div>
  )
}

export default Comments
