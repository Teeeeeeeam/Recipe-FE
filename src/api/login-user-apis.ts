import requester from '.'
import {
  CheckUser,
  ConfirmCodeReq,
  EnterMyPageReq,
  InquiryBookmarkMyPage,
  InquiryBookmarkParams,
  InquiryLikePosting,
  InquiryLikePostingParams,
  InquiryLikeRecipe,
  InquiryLikeRecipeParams,
  InquiryPosting,
  InquiryPostingParams,
  InquiryUser,
  InquiryQuestion,
  Response,
  SendEmailParams,
  UpdateEmailReq,
  UpdateNickNameReq,
  WidthdrawalReq,
  InquiryQuestionDetail,
  InquiryQuestionParams,
  updatePasswordReq,
  ConfirmCode,
} from '@/types/login-user-apis-type'

// 마이페이지 - 로그인 한 유저 정보 확인
export async function checkUser() {
  const { payload } = await requester<CheckUser>({
    method: 'POST',
    url: '/api/userinfo',
  })
  return payload
}

// 레시피 like
export async function checkLikesForRecipe(recipeId: number) {
  const { payload } = await requester<Response>({
    method: 'GET',
    url: `/api/recipe/${recipeId}/like/check`,
  })
  return payload
}
export async function doLikeForRecipe(req: { recipeId: number }) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/user/recipe/like',
    data: req,
  })
  return payload
}

// 게시글 like
export async function checkLikesForPosting(postId: number) {
  const { payload } = await requester<Response>({
    method: 'GET',
    url: `/api/user/posts/${postId}/like/check`,
  })
  return payload
}
export async function doLikeForPosting(req: { postId: number }) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: `/api/user/posts/like`,
    data: req,
  })
  return payload
}

// 레시피 즐겨찾기
export async function checkBookmark(recipeId: number) {
  const { payload } = await requester<Response>({
    method: 'GET',
    url: `/api/recipe/${recipeId}/bookmarks/check`,
  })
  return payload
}
export async function doBookmark(req: { recipeId: number }) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/user/recipe',
    data: req,
  })
  return payload
}

// 마이페이지 로그인 검증
export async function enterMyPage(req: EnterMyPageReq | {}) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/user/info/valid',
    data: req,
  })
  return payload
}

// 마이페이지 - 로그인 정보
export async function inquiryUser() {
  const { payload } = await requester<InquiryUser>({
    method: 'GET',
    url: `/api/user/info`,
  })
  return payload
}

// 마이페이지 - 작성 게시글 조회
export async function inquiryPosting(
  params: InquiryPostingParams,
  lastId: number | null,
) {
  const { payload } = await requester<InquiryPosting>({
    method: 'GET',
    url: `/api/user/info/posts${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 마이페이지 - 게시글 좋아요 조회
export async function inquiryLikePosting(
  params: InquiryLikePostingParams,
  lastId: number | null,
) {
  const { payload } = await requester<InquiryLikePosting>({
    method: 'GET',
    url: `/api/user/info/posts/likes${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 마이페이지 - 레시피 좋아요 조회
export async function inquiryLikeRecipe(
  params: InquiryLikeRecipeParams,
  lastId: number | null,
) {
  const { payload } = await requester<InquiryLikeRecipe>({
    method: 'GET',
    url: `/api/user/info/recipe/likes${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 마이페이지 - 북마크 조회
export async function inquiryBookmark(
  params: InquiryBookmarkParams,
  lastId: number | null,
) {
  const { payload } = await requester<InquiryBookmarkMyPage>({
    method: 'GET',
    url: `/api/user/info/bookmark${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 마이페이지 - 비밀번호 변경
export async function updatePassword(data: updatePasswordReq) {
  const { payload } = await requester<Response>({
    method: 'PUT',
    url: '/api/password/update',
    data,
  })
  return payload
}

// 마이페이지 - 닉네임 수정
export async function updateNickName(req: UpdateNickNameReq) {
  const { payload } = await requester<Response>({
    method: 'PUT',
    url: '/api/user/info/update/nickname',
    data: req,
  })
  return payload
}

// 마이페이지 - 이메일 수정
export async function updateEmail(req: UpdateEmailReq) {
  const { payload } = await requester<Response>({
    method: 'PUT',
    url: '/api/user/info/update/email',
    data: req,
  })
  return payload
}
// 마이페이지 - 이메일 검증 코드 보내기
export async function sendEmail(params: SendEmailParams) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/code/email-confirmation/send',
    params,
  })
  return payload
}
// 마이페이지 - 이메일 코드 검증
export async function confirmCode(req: ConfirmCodeReq) {
  const { payload } = await requester<ConfirmCode>({
    method: 'POST',
    url: '/api/code/email-confirmation/verify',
    data: req,
  })
  return payload
}

// 마이페이지 - 회원 탈퇴
export async function doWidthdrawalUser(req: WidthdrawalReq) {
  const { payload } = await requester<Response>({
    method: 'DELETE',
    url: '/api/user/info/disconnect',
    data: req,
  })
  return payload
}

// 마이페이지 - 문의사항 전체 조회
export async function inquiryQuestion(
  params: InquiryQuestionParams,
  lastId: number | null,
  type: string,
) {
  const { payload } = await requester<InquiryQuestion>({
    method: 'GET',
    url: `/api/user/questions?question-type=${type}${lastId ? `&last-id=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 마이페이지 - 문의사항 삭제
export async function deleteQuestion(questionIds: number | number[] | null) {
  if (Array.isArray(questionIds)) {
    const { payload } = await requester<Response>({
      method: 'DELETE',
      url: '/api/user/questions',
      params: { questionIds },
      paramsSerializer: (paramObj) => {
        const params = new URLSearchParams()
        for (let key in paramObj) {
          const value: string[] = paramObj[key]
          value.forEach((val) => params.append(key, val))
        }
        return params.toString()
      },
    })
    return payload
  } else {
    // 단일 삭제
    const { payload } = await requester<Response>({
      method: 'DELETE',
      url: '/api/user/questions',
      params: { questionIds },
    })
    return payload
  }
}

// 문의사항 상세조회
export async function inquiryQuestionDetail(questionId: number) {
  const { payload } = await requester<InquiryQuestionDetail>({
    method: 'GET',
    url: `/api/user/question/${questionId}`,
  })
  return payload
}
