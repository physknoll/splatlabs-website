'use client'

import { useEffect } from 'react'
import { ToastProvider } from './ui/Toast'
import { PostHogProvider } from './PostHogProvider'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * Mark document as hydrated to enable CSS-based animation safety
 */
function useHydrationMarker() {
  useEffect(() => {
    // Mark document as hydrated for CSS-based flash prevention
    document.documentElement.classList.add('hydrated')
    
    return () => {
      document.documentElement.classList.remove('hydrated')
    }
  }, [])
}

export function Providers({ children }: ProvidersProps) {
  useHydrationMarker()
  
  return (
    <PostHogProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </PostHogProvider>
  )
}
