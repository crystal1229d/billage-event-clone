'use client'

import { useState } from 'react'
import Image from 'next/image'
import Select from '@/components/common/Select'
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
    selectedTown: string | null,
    selectedCategory: string | null,
  ) => void
}

export default function ControlPanner({
  cities,
  categories,
  onFilterChange,
}: Props) {
  const [isSelectVisible, setIsSelectVisible] = useState<boolean>(false)
  const [selectedTown, setSelectedTown] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [townOptions, setTownOptions] = useState<Town[]>([])
  const [_, setIsLoadingTowns] = useState<boolean>(false)

  const handleClickCategoryButton = () => {
    setIsSelectVisible((prev) => !prev)
  }

  const handleCityChange = async (cityName: string) => {
    if (cityName) {
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
    }
  }

  const handleTownChange = (townIdx: string) => {
    setSelectedTown(townIdx)
    onFilterChange(townIdx, selectedCategory)
  }

  const handleCategoryChange = (categorySeq: string) => {
    setSelectedCategory(categorySeq)
    onFilterChange(selectedTown, categorySeq)
  }

  return (
    <div className={styles['panner-wrapper']}>
      <div key="search" className={styles['search-wrapper']}>
        <button
          className={styles['btn-category']}
          onClick={handleClickCategoryButton}
        >
          <Image
            src="/assets/images/category.webp"
            alt="카테고리 버튼"
            width={72}
            height={72}
            loading="lazy"
          />
        </button>
        <div className={styles['input-wrapper']}>
          <input type="text" placeholder="검색어를 입력해 주세요." />
          <button>
            <Image
              src="/assets/images/search.webp"
              alt="검색 버튼"
              width={72}
              height={72}
              loading="lazy"
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
