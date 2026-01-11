'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface StoreViewTrackerProps {
  productCount: number
  categoryCount: number
}

export function StoreViewTracker({ productCount, categoryCount }: StoreViewTrackerProps) {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    if (hasTracked.current) return
    hasTracked.current = true
    
    analytics.trackStoreViewed({
      product_count: productCount.toString(),
      category_count: categoryCount.toString(),
    })
  }, [productCount, categoryCount])
  
  return null
}
