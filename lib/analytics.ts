'use client'

import posthog from 'posthog-js'

// ============================================
// TYPES
// ============================================

export interface ProductProperties {
  product_id: number
  product_name: string
  product_sku?: string
  product_price: number
  product_category?: string
  product_url?: string
  product_image_url?: string
}

export interface CartItemProperties extends ProductProperties {
  quantity: number
  selected_options?: Array<{ name: string; value: string }>
  combination_id?: number
}

export interface OrderProperties {
  order_id: string
  order_total: number
  order_subtotal: number
  order_shipping: number
  order_tax: number
  order_discount: number
  items: CartItemProperties[]
  items_count: number
  customer_email?: string
  shipping_method?: string
  payment_method?: string
  currency: string
}

export interface CTAProperties {
  button_name: string
  button_text?: string
  page_location: string
  page_url?: string
  destination_url?: string
}

export interface PricingProperties {
  plan_name: string
  tier_index?: number
  tier_projects?: number
  price: number
  billing_period: 'monthly' | 'yearly'
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if PostHog is available and initialized
 */
function isPostHogReady(): boolean {
  return typeof window !== 'undefined' && posthog.__loaded
}

/**
 * Get stored UTM parameters for attribution
 */
export function getStoredUTM(): Record<string, string> | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = sessionStorage.getItem('splatlabs_utm')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

/**
 * Get stored referrer for attribution
 */
export function getStoredReferrer(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('splatlabs_referrer')
}

/**
 * Calculate total cart value from items
 */
function calculateCartValue(items: CartItemProperties[]): number {
  return items.reduce((sum, item) => sum + item.product_price * item.quantity, 0)
}

// ============================================
// ANALYTICS OBJECT
// ============================================

export const analytics = {
  // ==========================================
  // E-COMMERCE EVENTS
  // ==========================================

  /**
   * Track when a product is viewed
   */
  trackProductViewed: (product: ProductProperties) => {
    if (!isPostHogReady()) return

    posthog.capture('product_viewed', {
      ...product,
      $current_url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  },

  /**
   * Track when a cart is created (first item added)
   */
  trackCartCreated: (firstItem: CartItemProperties) => {
    if (!isPostHogReady()) return

    posthog.capture('cart_created', {
      first_product_id: firstItem.product_id,
      first_product_name: firstItem.product_name,
      first_product_price: firstItem.product_price,
      cart_value: firstItem.product_price * firstItem.quantity,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track when an item is added to cart
   */
  trackAddToCart: (item: CartItemProperties, cartItems: CartItemProperties[]) => {
    if (!isPostHogReady()) return

    const cartValue = calculateCartValue(cartItems)

    posthog.capture('product_added_to_cart', {
      ...item,
      cart_value: cartValue,
      cart_items_count: cartItems.length,
    })
  },

  /**
   * Track when an item is removed from cart
   */
  trackRemoveFromCart: (item: CartItemProperties, cartItems: CartItemProperties[]) => {
    if (!isPostHogReady()) return

    const cartValue = calculateCartValue(cartItems)

    posthog.capture('product_removed_from_cart', {
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity_removed: item.quantity,
      cart_value: cartValue,
      cart_items_count: cartItems.length,
    })
  },

  /**
   * Track when cart is cleared
   */
  trackCartCleared: (previousItems: CartItemProperties[]) => {
    if (!isPostHogReady()) return

    const previousValue = calculateCartValue(previousItems)

    posthog.capture('cart_cleared', {
      items_count: previousItems.length,
      cart_value: previousValue,
    })
  },

  /**
   * Track when checkout is started
   */
  trackCheckoutStarted: (items: CartItemProperties[]) => {
    if (!isPostHogReady()) return

    const cartValue = calculateCartValue(items)
    const utm = getStoredUTM()

    // Mark checkout as started in session storage
    sessionStorage.setItem('splatlabs_checkout_started', 'true')
    sessionStorage.setItem('splatlabs_checkout_cart_value', cartValue.toString())

    posthog.capture('checkout_started', {
      cart_value: cartValue,
      items_count: items.length,
      items: items.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.product_price,
      })),
      ...utm,
    })
  },

  /**
   * Track checkout step completion
   */
  trackCheckoutStep: (step: 'address' | 'shipping' | 'payment' | 'review', data?: Record<string, unknown>) => {
    if (!isPostHogReady()) return

    posthog.capture('checkout_step_completed', {
      step,
      step_name: step,
      ...data,
    })
  },

  /**
   * Track cart abandonment
   */
  trackCartAbandoned: (items: CartItemProperties[], step: string) => {
    if (!isPostHogReady()) return

    const cartValue = calculateCartValue(items)
    const utm = getStoredUTM()

    posthog.capture('cart_abandoned', {
      cart_value: cartValue,
      items_count: items.length,
      abandoned_at_step: step,
      items: items.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.product_price,
      })),
      ...utm,
    })

    // Clear checkout flag
    sessionStorage.removeItem('splatlabs_checkout_started')
  },

  /**
   * Track order completion
   */
  trackOrderCompleted: (order: OrderProperties) => {
    if (!isPostHogReady()) return

    const utm = getStoredUTM()
    const referrer = getStoredReferrer()

    posthog.capture('order_completed', {
      ...order,
      // Attribution
      ...utm,
      referrer,
      // Revenue tracking
      $value: order.order_total,
      currency: order.currency,
    })

    // Identify user if we have email
    if (order.customer_email) {
      posthog.identify(order.customer_email, {
        email: order.customer_email,
        last_order_id: order.order_id,
        last_order_value: order.order_total,
        last_order_date: new Date().toISOString(),
      })
    }

    // Clear checkout flags
    sessionStorage.removeItem('splatlabs_checkout_started')
    sessionStorage.removeItem('splatlabs_checkout_cart_value')
  },

  // ==========================================
  // ENGAGEMENT EVENTS
  // ==========================================

  /**
   * Track CTA button clicks
   */
  trackCTAClicked: (cta: CTAProperties) => {
    if (!isPostHogReady()) return

    posthog.capture('cta_clicked', {
      ...cta,
      $current_url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  },

  /**
   * Track pricing page viewed
   */
  trackPricingViewed: (billingPeriod: 'monthly' | 'yearly') => {
    if (!isPostHogReady()) return

    posthog.capture('pricing_viewed', {
      billing_period: billingPeriod,
    })
  },

  /**
   * Track billing toggle changed
   */
  trackBillingToggleChanged: (billingPeriod: 'monthly' | 'yearly') => {
    if (!isPostHogReady()) return

    posthog.capture('billing_toggle_changed', {
      billing_period: billingPeriod,
    })
  },

  /**
   * Track pricing tier slider changed
   */
  trackPricingTierChanged: (pricing: PricingProperties) => {
    if (!isPostHogReady()) return

    posthog.capture('pricing_tier_changed', {
      ...pricing,
    })
  },

  /**
   * Track pricing plan selected (CTA clicked)
   */
  trackPlanSelected: (pricing: PricingProperties) => {
    if (!isPostHogReady()) return

    posthog.capture('pricing_plan_selected', {
      ...pricing,
    })
  },

  /**
   * Track demo request
   */
  trackDemoRequested: (source: string) => {
    if (!isPostHogReady()) return

    const utm = getStoredUTM()

    posthog.capture('demo_requested', {
      source,
      ...utm,
    })
  },

  // ==========================================
  // STORE EVENTS
  // ==========================================

  /**
   * Track store listing viewed
   */
  trackStoreViewed: (filters?: Record<string, string>) => {
    if (!isPostHogReady()) return

    posthog.capture('store_viewed', {
      filters,
    })
  },

  /**
   * Track product clicked from listing
   */
  trackProductClicked: (product: ProductProperties, position?: number) => {
    if (!isPostHogReady()) return

    posthog.capture('product_clicked', {
      ...product,
      position,
    })
  },

  /**
   * Track filter applied
   */
  trackFilterApplied: (filterName: string, filterValue: string) => {
    if (!isPostHogReady()) return

    posthog.capture('filter_applied', {
      filter_name: filterName,
      filter_value: filterValue,
    })
  },

  /**
   * Track related product clicked
   */
  trackRelatedProductClicked: (product: ProductProperties, sourceProductId: number) => {
    if (!isPostHogReady()) return

    posthog.capture('related_product_clicked', {
      ...product,
      source_product_id: sourceProductId,
    })
  },

  // ==========================================
  // PRODUCT PAGE EVENTS
  // ==========================================

  /**
   * Track PortalCam page viewed
   */
  trackPortalCamViewed: () => {
    if (!isPostHogReady()) return

    posthog.capture('portalcam_viewed', {
      page: 'portalcam',
      product: 'PortalCam',
    })
  },

  /**
   * Track Lixel L2 Pro page viewed
   */
  trackL2ProViewed: () => {
    if (!isPostHogReady()) return

    posthog.capture('l2pro_viewed', {
      page: 'lixell2pro',
      product: 'Lixel L2 Pro',
    })
  },

  /**
   * Track workflow tab changed
   */
  trackWorkflowTabChanged: (tabName: string, tabIndex: number) => {
    if (!isPostHogReady()) return

    posthog.capture('workflow_tab_changed', {
      tab_name: tabName,
      tab_index: tabIndex,
      page: 'portalcam',
    })
  },

  /**
   * Track use case clicked
   */
  trackUseCaseClicked: (useCaseName: string) => {
    if (!isPostHogReady()) return

    posthog.capture('use_case_clicked', {
      use_case_name: useCaseName,
      page: 'portalcam',
    })
  },

  // ==========================================
  // USER IDENTIFICATION
  // ==========================================

  /**
   * Identify a user (typically after purchase or signup)
   */
  identify: (email: string, properties?: Record<string, unknown>) => {
    if (!isPostHogReady()) return

    posthog.identify(email, {
      email,
      ...properties,
    })
  },

  /**
   * Reset user identity (logout)
   */
  reset: () => {
    if (!isPostHogReady()) return

    posthog.reset()
  },
}

export default analytics
