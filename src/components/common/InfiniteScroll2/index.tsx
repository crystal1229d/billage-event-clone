'use client'

import { throttle } from 'lodash'
import { getRentalProducts } from '@/services/rental-product'
import { RentalProduct } from '@/types/rental-product'
import { useState, useEffect, useRef, useCallback } from 'react'

const InfiniteScroll = () => {
  const [data, setData] = useState<RentalProduct[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      try {
        const initialData = await getRentalProducts({ page: 0 })
        const data = initialData.data.rentals
        setData(data)
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
      setLoading(false)
    }

    loadInitialData()
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const newPage = page + 1
    try {
      const newData = await getRentalProducts({ page: newPage })
      setData((prevData) => [...prevData, ...newData.data.rentals])
      setPage(newPage)
    } catch (error) {
      console.error('Failed to load more data:', error)
    }
    setLoading(false)
  }

  const throttledLoadMore = useCallback(throttle(loadMore, 1000), [
    page,
    loading,
  ])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        throttledLoadMore()
      }
    },
    [throttledLoadMore],
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '20px',
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <div
        ref={loadMoreRef}
        style={{ height: '20px', backgroundColor: 'transparent' }}
      />
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default InfiniteScroll
