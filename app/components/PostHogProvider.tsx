'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// Initialize PostHog
if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  
  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only',
      capture_pageview: false, // We capture manually for better control
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage+cookie',
      // Respect Do Not Track
      respect_dnt: true,
      // Session recording (optional - enable in PostHog dashboard)
      disable_session_recording: false,
    })
  }
}

// Component to track page views
function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthogClient = usePostHog()

  useEffect(() => {
    if (!pathname || !posthogClient) return

    // Build full URL
    let url = window.origin + pathname
    const search = searchParams?.toString()
    if (search) {
      url += `?${search}`
    }

    // Capture page view
    posthogClient.capture('$pageview', {
      $current_url: url,
      pathname,
    })
  }, [pathname, searchParams, posthogClient])

  return null
}

// Component to capture UTM parameters and referrer
function UTMCapture() {
  const searchParams = useSearchParams()
  const posthogClient = usePostHog()

  useEffect(() => {
    if (!posthogClient) return

    // Extract UTM parameters
    const utmParams: Record<string, string> = {}
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    
    utmKeys.forEach(key => {
      const value = searchParams?.get(key)
      if (value) {
        utmParams[key] = value
      }
    })

    // If we have UTM params, set them as user properties
    if (Object.keys(utmParams).length > 0) {
      // Store in session storage for attribution
      sessionStorage.setItem('splatlabs_utm', JSON.stringify(utmParams))
      
      // Set as user properties for this session
      posthogClient.setPersonPropertiesForFlags(utmParams)
      
      // Also capture as an event
      posthogClient.capture('utm_captured', utmParams)
    }

    // Capture referrer if it's external
    const referrer = document.referrer
    if (referrer && !referrer.includes(window.location.hostname)) {
      sessionStorage.setItem('splatlabs_referrer', referrer)
      posthogClient.capture('external_referral', {
        referrer,
        referrer_domain: new URL(referrer).hostname,
      })
    }
  }, [searchParams, posthogClient])

  return null
}

// Wrapper with Suspense for useSearchParams
function PostHogTrackers() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
      <UTMCapture />
    </Suspense>
  )
}

interface PostHogProviderProps {
  children: React.ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  // Only render provider if PostHog is configured
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <PostHogTrackers />
      {children}
    </PHProvider>
  )
}
