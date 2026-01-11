'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface ProductViewTrackerProps {
  productId: number
  productName: string
  productSku?: string
  productPrice: number
  productCategory?: string
  productUrl?: string
  productImageUrl?: string
}

export function ProductViewTracker({
  productId,
  productName,
  productSku,
  productPrice,
  productCategory,
  productUrl,
  productImageUrl,
}: ProductViewTrackerProps) {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    if (hasTracked.current) return
    hasTracked.current = true
    
    analytics.trackProductViewed({
      product_id: productId,
      product_name: productName,
      product_sku: productSku,
      product_price: productPrice,
      product_category: productCategory,
      product_url: productUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
      product_image_url: productImageUrl,
    })
  }, [productId, productName, productSku, productPrice, productCategory, productUrl, productImageUrl])
  
  return null
}
