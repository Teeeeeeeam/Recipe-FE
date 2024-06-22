import {
  MyBookmark,
  MyLikesRecipe,
  MyLikesPosting,
  MyPostings,
  MyQuestion,
  UserInfo,
  QuestionDetail,
} from '../user'

export interface Response {
  success: boolean
  message: string
}

// ########## axios requester req options ##########

// 마이페이지 - 로그인 검증
export interface EnterMyPageReq {
  password: string
}

// 마이페이지 - 닉네임 수정
export interface UpdateNickNameReq {
  nickName: string | null
}

// 마이페이지 - 이메일 수정
export interface UpdateEmailReq {
  email: string
  code: string
}

// 마이페이지 - 이메일 코드 검증
export interface ConfirmCodeReq {
  email: string
  code: number
}

// 마이페이지 - 회원탈퇴
export interface WidthdrawalReq {
  checkBox: boolean
}

// ########## axios requester params options ##########

// 마이페이지 - 작성 게시글 조회
export interface InquiryPostingParams {
  size: number
}

// 마이페이지 - 북마크 조회
export interface InquiryBookmarkParams {
  size: number
}

// 마이페이지 - 게시글 좋아요 조회
export interface InquiryLikePostingParams {
  size: number
}

// 마이페이지 - 레시피 좋아요 조회
export interface InquiryLikeRecipeParams {
  size: number
}

// 마이페이지 - 이메일 검증 코드 보내기
export interface SendEmailParams {
  email: string
}

// 마이페이지 - 문의사항 상세조회
export interface InquiryQuestionParams {
  size: number
}

// ########## axios requester payload ##########
// 로그인 유저 정보
export interface CheckUser extends Response {
  data: {
    id: string
    loginId: string
    loginType: string
    nickName: string
    roles: string
  }
}

// 마이페이지 - 로그인 정보
export interface InquiryUser extends Response {
  data: UserInfo
}

// 마이페이지 - 작성 게시글 조회
export interface InquiryPosting extends Response {
  data: {
    content: MyPostings[] | []
    nextPage: boolean
  }
}

// 마이페이지 - 게시글 좋아요 조회
export interface InquiryLikePosting extends Response {
  data: {
    content: MyLikesPosting[] | []
    nextPage: boolean
  }
}

// 마이페이지 - 레시피 좋아요 조회
export interface InquiryLikeRecipe extends Response {
  data: {
    content: MyLikesRecipe[] | []
    nextPage: boolean
  }
}

// 마이페이지 - 북마크 조회
export interface InquiryBookmarkMyPage extends Response {
  data: {
    bookmarkList: MyBookmark[] | []
    nextPage: boolean
  }
}

// 마이페이지 - 문의사항 전체 조회
export interface InquiryQuestion extends Response {
  data: {
    nextPage: boolean
    questions: MyQuestion[]
  }
}

// 마이페이지 - 문의사항 상세조회
export interface InquiryQuestionDetail extends Response {
  data: QuestionDetail
}
