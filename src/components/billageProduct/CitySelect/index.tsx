'use client'

import React, { useState } from 'react'
import Select from '@/components/common/Select'
import { getCities } from '@/services/rental-product'
import { CitiesListResponse, City } from '@/types/rental-product'

export default function CitySelect() {
  const [options, setOptions] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClickSelect = async () => {
    if (options.length > 0) return
    if (!isLoading) return

    try {
      setIsLoading(true)
      const citiesResponse: CitiesListResponse = await getCities()
      setOptions(citiesResponse.data.list)
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select
      name="city"
      placeholder="지역 선택"
      options={options}
      getOptionLabel={(option) => option.sigunguName}
      getOptionValue={(option) => option.sigunguName}
      onOpenChange={handleClickSelect}
    />
  )
}
