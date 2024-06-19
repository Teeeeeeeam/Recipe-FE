// 마이페지이 - 로그인 사용자 정보
export interface UserInfo {
  email: string
  loginType: string
  nickName: string
  username: String
}

// 마이페이지 - 게시글 정보
export interface MyPostings {
  id: number
  postTitle: string
}

// 마이페이지 - 좋아요
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

// 마이페이지 - 북마크
export interface MyBookmark {
  id: number
  title: string
}

// 마이페이지 - 유저 정보 변경
export interface NickNameOption {
  nickName: string | null
}
export interface EmailOption {
  email: string
  code: string
}
export interface verifyEmailOption {
  email: string
  code: number
}

// 마이페이지 - 문의사항 전체조회
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

// 마이페이지 - 문의사항 상세조회
export interface QuestionDetail {
  id: number
  title: string
  questionContent: string
  status: string
  createdAt: string
  answeredAt: string
  imgUrl: string
  member: {
    id: number
    loginId: string
  }
  answer: {
    id: number
    answerTitle: string
    answerContent: string
    answerAdminNickname: string
  }
}
