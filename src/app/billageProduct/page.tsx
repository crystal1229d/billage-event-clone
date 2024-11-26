import {
  CitiesListResponse,
  ProductCategoriesResponse,
  RentalProductsListResponse,
} from '@/types/rental-product'
import {
  getCategories,
  getCities,
  getRentalProducts,
} from '@/services/rental-product'
import BillageProductSection from '@/components/billageProduct/BillageProductSection'

export default async function BillageProductPage() {
  const productsResponse: RentalProductsListResponse = await getRentalProducts()
  const products = productsResponse.data.rentals

  const citiesResponse: CitiesListResponse = await getCities()
  const cities = citiesResponse.data.list

  const categoriesResponse: ProductCategoriesResponse = await getCategories()
  const categories = categoriesResponse.data.categoryList

  return (
    <BillageProductSection
      products={products}
      cities={cities}
      categories={categories}
    />
  )
}
