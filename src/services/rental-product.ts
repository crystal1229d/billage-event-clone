import {
  CitiesListResponse,
  City,
  OtherRentalProduct,
  OtherRentalProductsListResponse,
  ProductCategoriesResponse,
  RentalProduct,
  RentalProductDetailResponse,
  RentalProductsListRequest,
  RentalProductsListResponse,
  TownsListResponse,
} from '@/types/rental-product'
import httpRequest from './index'

export const getCities = async (): Promise<CitiesListResponse> => {
  const { data, error } = await httpRequest('/api/noauth/getTowns1', {
    method: 'get',
    cache: 'force-cache',
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getTowns = async (
  requestParams: City = { sigunguName: '' },
): Promise<TownsListResponse> => {
  const { data, error } = await httpRequest('/api/noauth/getTowns2', {
    method: 'get',
    params: { ...requestParams },
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getCategories = async (): Promise<ProductCategoriesResponse> => {
  const { data, error } = await httpRequest('/api/getCategory', {
    method: 'get',
    cache: 'force-cache',
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getRentalProducts = async (
  requestParams: RentalProductsListRequest = {
    status: 0,
    filter: 0,
    page: 0,
    categories: null,
    keyword: '',
    size: 20,
    signIn: 0,
    towns: null,
  },
): Promise<RentalProductsListResponse> => {
  const defaultParams = {
    status: 0,
    filter: 0,
    page: 0,
    keyword: '',
    size: 20,
    signIn: 0,
    categories: '',
  }

  const params = {
    ...defaultParams,
    ...Object.fromEntries(
      Object.entries(requestParams).filter(([key, value]) =>
        key === 'categories' || key === 'towns' || key === 'keyword'
          ? value !== undefined && value !== null
          : true,
      ),
    ),
  }

  const { data, error } = await httpRequest('/api/noauth/getMainList', {
    method: 'get',
    params,
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getRentalProductDetail = async (
  rentalIdx: RentalProduct['rentalSeq'],
): Promise<RentalProductDetailResponse> => {
  const { data, error } = await httpRequest(
    `/api/noauth/getRental?rentalIdx=${rentalIdx}`,
    {
      method: 'get',
    },
  )

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getOtherRentalProducts = async (
  rentalIdx: OtherRentalProduct['rentalSeq'],
  page: number = 0,
  size: number = 5,
): Promise<OtherRentalProductsListResponse> => {
  const { data, error } = await httpRequest(
    `/api/noauth/getEtcRentals?rentalIdx=${rentalIdx}&page=${page}&size=${size}`,
    {
      method: 'get',
    },
  )

  if (error) {
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  }

  return data
}
