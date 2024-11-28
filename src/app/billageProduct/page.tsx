import { City, ProductCategory, RentalProduct } from '@/types/rental-product'
import {
  getCategories,
  getCities,
  getRentalProducts,
} from '@/services/rental-product'
import BillageProductSection from '@/components/billageProduct/BillageProductSection'

type LoadDataResponse = {
  products: RentalProduct[]
  cities: City[]
  categories: ProductCategory[]
}

const loadData = async (): Promise<LoadDataResponse> => {
  const [productsResponse, citiesResponse, categoriesResponse] =
    await Promise.all([getRentalProducts(), getCities(), getCategories()])

  return {
    products: productsResponse.data.rentals,
    cities: citiesResponse.data.list,
    categories: categoriesResponse.data.categoryList,
  }
}

export default async function BillageProductPage() {
  const { products, cities, categories }: LoadDataResponse = await loadData()

  return (
    <BillageProductSection
      products={products}
      cities={cities}
      categories={categories}
    />
  )
}
