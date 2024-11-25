import {
  CitiesListResponse,
  City,
  ProductCategoriesResponse,
  RentalProductsListRequest,
  RentalProductsListResponse,
  TownsListResponse,
} from '@/types/rental-product'
import httpRequest from './index'

export const getCities = async (): Promise<CitiesListResponse> => {
  const { data, error } = await httpRequest('/api/noauth/getTowns1', {
    method: 'get',
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
    categories: 4,
    keyword: '',
    size: 20,
    signIn: 0,
    towns: null,
  },
): Promise<RentalProductsListResponse> => {
  const { status, filter, categories, keyword, size, signIn, towns } =
    requestParams
  const { data, error } = await httpRequest('/api/noauth/getMainList', {
    method: 'get',
    params: {
      status,
      filter,
      categories,
      size,
      signIn,
      ...(keyword !== '' && { keyword }),
      ...(towns != null && { towns }),
    },
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}
