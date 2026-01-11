'use client'

import { ToastProvider } from './ui/Toast'
import { PostHogProvider } from './PostHogProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PostHogProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </PostHogProvider>
  )
}
