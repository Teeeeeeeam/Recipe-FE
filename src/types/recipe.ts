// general ts
export interface Recipe extends Record<string, string | number> {
  id: number
  likeCount: number
  cookingLevel: string
  cookingTime: string
  imageUrl: string
  people: string
  title: string
}
export interface DetailRecipe
  extends Record<string, string[] | CookStep[] | Recipe> {
  cookStep: CookStep[]
  ingredients: string[]
  recipe: Recipe
}
export type CookStep = {
  [key: string]: string
  cook_step_id: string
  cook_steps: string
}
export interface ThreeCookInfo {
  title: string
  imgUrl: string
  data: string | number | PostingDetailMember | PostingDetailRecipe
}

// for userPostingDetail
export interface Posting
  extends Record<string, Comments[] | [] | PostingDetail> {
  comments: Comments[] | []
  post: PostingDetail
}
export interface Comments {
  id: number
  comment_content: string
  nickName: string
  create_at: string
}
export interface PostingDetail {
  [key: string]: string | number | PostingDetailMember | PostingDetailRecipe
  create_at: string
  id: number
  postContent: string
  postCookingLevel: string
  postCookingTime: string
  postImageUrl: string
  postLikeCount: number
  postServing: string
  postTitle: string
  member: PostingDetailMember
  recipe: PostingDetailRecipe
}
export interface PostingDetailMember {
  nickname: string
}
export interface PostingDetailRecipe {
  id: number
  title: string
}

//
export interface PostingFigure {
  create_at: string
  id: number
  member: PostingMember
  postImageUrl: string
  postTitle: string
  recipe: PostingDetailRecipe
}
interface PostingMember {
  nickname: string
  loginId: string
}

// api ts
export interface Options {
  [key: string]: string | string[] | number | undefined
  page: number
  size: number
  sort: string
}

export interface DetailUserRecipe extends Record<string, any> {
  create_at: string
  member: { [nickname: string]: string }
  postContent: string
  postCookingLevel: string
  psotCookingTime: string
  postImageUrl: string
  postLikeCount: number
  postServing: string
  postTitle: string
}

// 수정페이지 렌더링용 초기 데이터
export interface ModData {
  create_at: string
  id: number
  postContent: string
  postCookingLevel: string
  postCookingTime: string
  postImageUrl: string
  postLikeCount: number
  postServing: string
  postTitle: string
  member: PostingDetailMember
  recipe: PostingDetailRecipe
}
