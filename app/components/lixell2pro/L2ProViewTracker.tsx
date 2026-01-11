'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

export function L2ProViewTracker() {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    if (hasTracked.current) return
    hasTracked.current = true
    
    analytics.trackL2ProViewed()
  }, [])
  
  return null
}
