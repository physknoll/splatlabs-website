'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface OrderCompletionTrackerProps {
  orderId?: string
  status?: string
  sessionId?: string  // Stripe Checkout Session ID
}

export function OrderCompletionTracker({ orderId, status, sessionId }: OrderCompletionTrackerProps) {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    // Only track once and only if we have an order ID or session ID
    if (hasTracked.current || (!orderId && !sessionId)) return
    hasTracked.current = true
    
    // Get stored cart value from checkout (if available)
    const storedCartValue = sessionStorage.getItem('splatlabs_checkout_cart_value')
    const orderTotal = storedCartValue ? parseFloat(storedCartValue) : 0
    
    // Track order completion
    // Note: Full order details come from the Stripe webhook which updates Ecwid
    // This client-side tracking provides immediate feedback with available data
    analytics.trackOrderCompleted({
      order_id: orderId || sessionId || 'unknown',
      order_total: orderTotal,
      order_subtotal: orderTotal, // Approximation since we don't have exact breakdown
      order_shipping: 0,
      order_tax: 0,
      order_discount: 0,
      items: [], // Items already cleared from cart, webhook has full details
      items_count: 0,
      currency: 'USD',
      payment_method: sessionId ? 'stripe' : undefined,
    })
    
    // Clear any remaining checkout session data
    sessionStorage.removeItem('splatlabs_checkout_started')
    sessionStorage.removeItem('splatlabs_checkout_cart_value')
  }, [orderId, status, sessionId])
  
  return null
}
