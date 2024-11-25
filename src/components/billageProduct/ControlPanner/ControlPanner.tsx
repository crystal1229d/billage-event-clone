'use client'

import { useState } from 'react'
import Image from 'next/image'
import Select from '@/components/common/Select'
import styles from './ControlPanner.module.css'

const areaOptions = [
  { value: '강원특별자치도 강릉시', label: '강원특별자치도 강릉시' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const dongOptions = [
  { value: 'dong1', label: '동네1' },
  { value: 'dong2', label: '동네2' },
  { value: 'dong3', label: '동네3' },
]

const categoryOptions = [
  { value: '강원특별자치도 강릉시', label: '강원특별자치도 강릉시' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export default function ControlPanner() {
  const [isSelectVisible, setIsSelectVisible] = useState(false)

  const handleClickCategoryButton = () => {
    setIsSelectVisible((prev) => !prev)
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
        <Select name="지역" placeholder="지역 선택" options={areaOptions} />
        <Select name="동네" placeholder="동네 선택" options={dongOptions} />
        <Select
          name="카테고리"
          placeholder="카테고리 선택"
          options={categoryOptions}
        />
      </div>
    </div>
  )
}
