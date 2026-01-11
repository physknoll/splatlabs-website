'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

export function PortalCamViewTracker() {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    if (hasTracked.current) return
    hasTracked.current = true
    
    analytics.trackPortalCamViewed()
  }, [])
  
  return null
}
