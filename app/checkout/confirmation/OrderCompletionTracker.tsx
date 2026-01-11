'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface OrderCompletionTrackerProps {
  orderId?: string
  status?: string
}

export function OrderCompletionTracker({ orderId, status }: OrderCompletionTrackerProps) {
  const hasTracked = useRef(false)
  
  useEffect(() => {
    // Only track once and only if we have an order ID
    if (hasTracked.current || !orderId) return
    hasTracked.current = true
    
    // Get stored cart value from checkout (if available)
    const storedCartValue = sessionStorage.getItem('splatlabs_checkout_cart_value')
    const orderTotal = storedCartValue ? parseFloat(storedCartValue) : 0
    
    // Track order completion
    // Note: Full order details would typically come from a server-side webhook
    // This client-side tracking provides immediate feedback with available data
    analytics.trackOrderCompleted({
      order_id: orderId,
      order_total: orderTotal,
      order_subtotal: orderTotal, // Approximation since we don't have exact breakdown
      order_shipping: 0,
      order_tax: 0,
      order_discount: 0,
      items: [], // Items already cleared from cart, would need server-side tracking for full details
      items_count: 0,
      currency: 'USD',
    })
    
    // Clear any remaining checkout session data
    sessionStorage.removeItem('splatlabs_checkout_started')
    sessionStorage.removeItem('splatlabs_checkout_cart_value')
  }, [orderId, status])
  
  return null
}
