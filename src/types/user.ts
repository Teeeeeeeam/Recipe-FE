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

// 좋아요
export interface MyLikes {
  id: number
  content: string | null
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
  code: string
}
