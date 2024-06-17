// 로그인 사용자 정보
export interface UserInfo {
  email: string
  loginType: string
  nickName: string
  username: String
}

// 게시글 정보
export interface MyPostings {
  id: number
  postTitle: string
}

// 마이페이지 좋아요(레시피)
export interface MyLikesRecipe {
  like_id: number
  content_id: number
  title: string
}
export interface MyLikesPosting {
  like_id: number
  content_id: number
  title: string
  content: string
}

// 마이페이지 북마크
export interface MyBookmark {
  id: number
  title: string
}

// 유저 정보 변경 axios put option ts
export interface NickNameOption {
  loginId: string | null
  nickName: string | null
}
export interface EmailOption {
  email: string
  code: string
  loginId: string | null
  loginType: string | null
}
export interface verifyEmailOption {
  email: string
  code: number
}

// 문의사항
export interface MyQuestion {
  id: number
  questionType: string
  status: string
  title: string
  member: {
    id: number
    loginId: string
  }
}
