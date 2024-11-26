/* Select1 - 지역 */
export interface CitiesListResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: {
    list: City[]
  }
}
export interface City {
  sigunguName: string
}

/* Select2 - 동네 */
export interface TownsListResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: {
    list: Town[]
  }
}
export interface Town {
  townIdx: number
  townName: string
}

/* Select3 - 카테고리 */
export interface ProductCategoriesResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: {
    categoryList: ProductCategory[]
  }
}
export interface ProductCategory {
  categorySeq: number
  categoryName: string
  categoryOnImage: string
  categoryOffImage: string
}

/* 상품 리스트 */
export interface RentalProductsListRequest {
  status?: number
  filter?: number
  categories?: number
  keyword?: string
  size?: number
  signIn?: number
  towns?: string | null
}
export interface RentalProductsListResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: {
    rentals: RentalProduct[]
  }
}
export interface RentalProduct {
  rentalSeq: number
  title: string
  content?: string
  regDate: number
  dailyRentalFee: number
  likeCnt: number
  viewCnt: number
  imageUrl: string
  towns: string[]
}

/* 상품 상세 */
export interface RentalProductDetailResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: RentalProductDetail
}
export interface RentalProductDetail {
  blockUserHistory: boolean
  blockPostHistory: boolean
  userProfileImage: string
  bellButton: boolean
  userNickName: string
  userIdx: number
  userStarPoint: number
  activityScore: number
  grade: string
  maxScore: number
  reviewCount: number
  isMine: boolean
  likeFlag: boolean
  rentalSeq: number
  rentalStatus: number
  viewCount: number
  likeCount: number
  title: string
  content: string
  createAt: number
  dailyFee: number
  images: ProductImage[]
  towns: ProductTown[]
  categoryInfo: ProductCategory[]
}
export interface ProductCategory {
  categoryIdx: number
  categoryName: string
}
export interface ProductImage {
  imageSeq: number
  imageUrl: string
}
export interface ProductTown {
  townSeq: number
  townName: string
}

/* 판매자의 다른 판매중 상품 리스트 */
export interface OtherRentalProductsListResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
  data: {
    etcRentals: OtherRentalProduct[]
    etcRentalTotalCount: number
  }
}
export interface OtherRentalProduct {
  rentalSeq: number
  imageUrl: string
  title: string
  dailyRentalFee: number
  regDate: number
  viewCnt: number
  likeCnt: number
  towns: string[]
}
