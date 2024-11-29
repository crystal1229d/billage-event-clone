'use client'

import { useState } from 'react'
import NextImage from '@/common/NextImage'
import Select from '@/common/Select'
import { getTowns } from '@/services/rental-product'
import {
  City,
  ProductCategory,
  Town,
  TownsListResponse,
} from '@/types/rental-product'
import styles from './ControlPanner.module.css'

interface Props {
  cities: City[]
  categories: ProductCategory[]
  onFilterChange: (
    selectedTown: string,
    selectedCity: string,
    selectedCategory: string,
    keyword: string,
  ) => void
}

export default function ControlPanner({
  cities,
  categories,
  onFilterChange,
}: Props) {
  const [isSelectVisible, setIsSelectVisible] = useState<boolean>(false)
  const [selectedCity, setSelectedCity] = useState<string>('0')
  const [selectedTown, setSelectedTown] = useState<string>('0')
  const [selectedCategory, setSelectedCategory] = useState<string>('0')
  const [townOptions, setTownOptions] = useState<Town[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [_, setIsLoadingTowns] = useState<boolean>(false)

  const handleClickCategoryButton = () => {
    setIsSelectVisible((prev) => !prev)
  }

  const handleCityChange = async (cityName: string) => {
    setSelectedCity(cityName)
    if (cityName !== '0') {
      try {
        setIsLoadingTowns(true)
        const towns: TownsListResponse = await getTowns({
          sigunguName: cityName,
        })
        setTownOptions(towns.data.list)
      } catch (error) {
        console.error('Error fetching towns:', error)
      } finally {
        setIsLoadingTowns(false)
      }
    } else {
      setTownOptions([])
      onFilterChange(selectedTown, cityName, selectedCategory, keyword)
    }
  }

  const handleTownChange = (townIdx: string) => {
    setSelectedTown(townIdx)
    onFilterChange(townIdx, selectedCity, selectedCategory, keyword)
  }

  const handleCategoryChange = (categorySeq: string) => {
    setSelectedCategory(categorySeq)
    onFilterChange(selectedTown, selectedCity, categorySeq, keyword)
  }

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const handleSearch = () => {
    onFilterChange(selectedTown, selectedCity, selectedCategory, keyword)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={styles['panner-wrapper']}>
      <div key="search" className={styles['search-wrapper']}>
        <button
          className={styles['btn-category']}
          onClick={handleClickCategoryButton}
        >
          <NextImage
            src="/assets/images/category.webp"
            alt="카테고리 버튼"
            width={72}
            height={72}
          />
        </button>
        <div className={styles['input-wrapper']}>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <NextImage
              src="/assets/images/search.webp"
              alt="검색 버튼"
              width={72}
              height={72}
            />
          </button>
        </div>
      </div>

      <div
        key="selectlist"
        className={
          isSelectVisible
            ? `${styles['selectlist-wrapper']} ${styles.visible}`
            : styles['selectlist-wrapper']
        }
      >
        <Select
          name="city"
          placeholder="지역 선택"
          options={cities}
          getOptionLabel={(option) => option.sigunguName}
          getOptionValue={(option) => option.sigunguName}
          onValueChange={handleCityChange}
        />
        <Select
          name="town"
          placeholder="동네 선택"
          options={townOptions}
          getOptionLabel={(option) => option.townName}
          getOptionValue={(option) => option.townIdx}
          disabled={townOptions.length === 0}
          onValueChange={handleTownChange}
        />
        <Select
          name="category"
          placeholder="카테고리 선택"
          options={categories}
          getOptionLabel={(option) => option.categoryName}
          getOptionValue={(option) => option.categorySeq}
          onValueChange={handleCategoryChange}
        />
      </div>
    </div>
  )
}
