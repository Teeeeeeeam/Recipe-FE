// 레시피 및 게시글 figure
export interface PostingFigure {
  createdAt: string
  id: number
  member: {
    nickname: string
  }
  postImageUrl: string
  postTitle: string
}

// 레시피 검색 req (+[redux] search-recipe-slice)
export interface Option {
  page: number
  size: number
  title?: string
  ingredients?: string
}

// 레시피 - 일반 정보
export interface Recipe {
  id: number
  likeCount: number
  cookingLevel: string
  cookingTime: string
  imageUrl: string
  people: string
  title: string
  createAt?: string
}

// 레시피 - 상세 정보
export interface RecipeDetail {
  cookSteps: CookStep[]
  ingredients: string[]
  recipe: Recipe
}
export type CookStep = {
  cookStepId: string
  cookSteps: string
}

// 레시피 및 게시글 - 상세 정보 (인분, 시간, 난이도)
export interface ThreeCookInfo {
  title: string
  imgUrl: string
  data: string
}

// 게시글 - 상세정보
export interface PostingDetail {
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

// 게시글 - 댓글
export interface Comments {
  id: number
  commentContent: string
  createdAt: string
  member: {
    username: string
    nickname: string
    loginId: string
  }
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

// 게시글 - 레시피 참조
export interface PostingFigureAboutRecipe {
  createdAt: string
  id: number
  member: { nickname: string }
  postImageUrl: string
  postLikeCount: number
  postTitle: string
}

// 게시글 - 검색 figure
export interface PostingFigureSearch extends PostingFigure {
  recipe: {
    id: number
    title: string
  }
}
