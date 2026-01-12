// Ecwid Orders API Functions

import { ecwidGet, ecwidPost, ecwidPut, getStoreId } from './client'
import type {
  OrderCalculateRequest,
  OrderCalculateResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  EcwidOrder,
  CartItem,
  ShippingPerson,
  AvailableShippingOption,
} from './types'

// ============================================
// ORDER CALCULATION
// ============================================

export interface CalculateOrderParams {
  /** Cart items to calculate */
  items: CartItem[]
  /** Customer email */
  email: string
  /** Shipping address */
  shippingAddress: ShippingPerson
  /** Billing address (defaults to shipping if not provided) */
  billingAddress?: ShippingPerson
  /** Selected shipping method (if already chosen) */
  selectedShipping?: {
    shippingMethodId: string
    shippingMethodName: string
  }
  /** Discount coupon code */
  couponCode?: string
}

/**
 * Calculate order totals including shipping options and taxes
 * This is the key endpoint for getting available shipping methods and final totals
 */
export async function calculateOrder(params: CalculateOrderParams): Promise<OrderCalculateResponse> {
  const requestBody: OrderCalculateRequest = {
    email: params.email,
    items: params.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      weight: item.weight ?? 0,
      isShippingRequired: item.isShippingRequired ?? true,
      selectedOptions: item.selectedOptions,
      combinationId: item.combinationId,
      sku: item.sku,
    })),
    shippingPerson: params.shippingAddress,
    billingPerson: params.billingAddress ?? params.shippingAddress,
  }

  // Add shipping option if already selected
  if (params.selectedShipping) {
    requestBody.shippingOption = {
      shippingMethodId: params.selectedShipping.shippingMethodId,
      shippingMethodName: params.selectedShipping.shippingMethodName,
    }
  }

  // Add coupon if provided
  if (params.couponCode) {
    requestBody.discountCoupon = {
      code: params.couponCode,
    }
  }

  // Secret token works fine for order calculation
  return ecwidPost<OrderCalculateResponse>('/order/calculate', requestBody)
}

/**
 * Get available shipping options for an order
 * This is a convenience wrapper around calculateOrder
 */
export async function getShippingOptions(params: {
  items: CartItem[]
  shippingAddress: ShippingPerson
  email?: string
}): Promise<AvailableShippingOption[]> {
  const result = await calculateOrder({
    items: params.items,
    email: params.email ?? 'shipping-estimate@temp.com',
    shippingAddress: params.shippingAddress,
  })

  return result.availableShippingOptions ?? []
}

// ============================================
// ORDER CREATION
// ============================================

export interface CreateOrderParams {
  /** Calculated order from calculateOrder endpoint */
  calculatedOrder: OrderCalculateResponse
  /** Customer email */
  email: string
  /** Shipping address */
  shippingAddress: ShippingPerson
  /** Billing address */
  billingAddress?: ShippingPerson
  /** Selected shipping option */
  selectedShipping: AvailableShippingOption
  /** Cart items */
  items: CartItem[]
  /** Payment method name (e.g., "Credit Card", "PayPal") */
  paymentMethod?: string
  /** Coupon code if applied */
  couponCode?: string
  /** Customer order comments */
  orderComments?: string
}

/**
 * Create an order with AWAITING_PAYMENT status
 * Returns the order ID and payment URL
 */
export async function createOrder(params: CreateOrderParams): Promise<{
  orderId: number
  orderNumber: number
  paymentUrl: string
}> {
  const orderData: CreateOrderRequest = {
    email: params.email,
    items: params.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      weight: item.weight ?? 0,
      isShippingRequired: item.isShippingRequired ?? true,
      selectedOptions: item.selectedOptions,
      combinationId: item.combinationId,
      sku: item.sku,
    })),
    shippingPerson: params.shippingAddress,
    billingPerson: params.billingAddress ?? params.shippingAddress,
    // Per Ecwid docs: Don't send shippingMethodId when creating orders
    // Just send the name, rate, and fulfillment type
    shippingOption: {
      shippingMethodName: params.selectedShipping.shippingMethodName,
      shippingCarrierName: params.selectedShipping.shippingCarrierName,
      shippingRate: params.selectedShipping.shippingRate,
      fulfillmentType: params.selectedShipping.fulfillmentType || 'SHIPPING',
    },
    paymentMethod: params.paymentMethod ?? 'Online Payment',
    paymentStatus: 'AWAITING_PAYMENT',
    fulfillmentStatus: 'AWAITING_PROCESSING',
    subtotal: params.calculatedOrder.subtotal,
    total: params.calculatedOrder.total,
    tax: params.calculatedOrder.tax,
    orderComments: params.orderComments,
  }

  // Add coupon if provided
  if (params.couponCode) {
    orderData.discountCoupon = {
      code: params.couponCode,
    }
  }

  // Use public token for order creation (secret token returns 403)
  const response = await ecwidPost<CreateOrderResponse>('/orders', orderData, undefined, { usePublicToken: true })

  // Build the payment URL
  // Ecwid payment links follow this format:
  const storeId = getStoreId()
  const paymentUrl = `https://app.ecwid.com/custompaymentapp/${storeId}/${response.id}/checkout`

  return {
    orderId: response.id,
    orderNumber: response.orderNumber,
    paymentUrl,
  }
}

// ============================================
// ORDER RETRIEVAL
// ============================================

/**
 * Fetch an order by ID
 */
export async function getOrderById(orderId: number): Promise<EcwidOrder> {
  return ecwidGet<EcwidOrder>(`/orders/${orderId}`)
}

/**
 * Fetch an order by order number
 */
export async function getOrderByNumber(orderNumber: number): Promise<EcwidOrder | null> {
  interface OrdersResponse {
    total: number
    count: number
    offset: number
    limit: number
    items: EcwidOrder[]
  }
  
  const response = await ecwidGet<OrdersResponse>('/orders', {
    orderNumber,
    limit: 1,
  })

  return response.items[0] ?? null
}

// ============================================
// ORDER UPDATES
// ============================================

/**
 * Update order payment status
 */
export async function updateOrderPaymentStatus(
  orderId: number,
  paymentStatus: 'AWAITING_PAYMENT' | 'PAID' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED',
  options?: {
    externalTransactionId?: string
    paymentMessage?: string
  }
): Promise<{ updateCount: number }> {
  return ecwidPut<{ updateCount: number }>(`/orders/${orderId}`, {
    paymentStatus,
    externalTransactionId: options?.externalTransactionId,
    paymentMessage: options?.paymentMessage,
  })
}

/**
 * Update order fulfillment status
 */
export async function updateOrderFulfillmentStatus(
  orderId: number,
  fulfillmentStatus: 'AWAITING_PROCESSING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'WILL_NOT_DELIVER' | 'RETURNED' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY',
  options?: {
    trackingNumber?: string
    trackingUrl?: string
    shippingCarrier?: string
  }
): Promise<{ updateCount: number }> {
  interface UpdateData {
    fulfillmentStatus: string
    shipments?: Array<{
      trackingNumber?: string
      trackingUrl?: string
      shippingCarrier?: string
    }>
  }
  
  const updateData: UpdateData = {
    fulfillmentStatus,
  }

  if (options?.trackingNumber || options?.trackingUrl || options?.shippingCarrier) {
    updateData.shipments = [{
      trackingNumber: options.trackingNumber,
      trackingUrl: options.trackingUrl,
      shippingCarrier: options.shippingCarrier,
    }]
  }

  return ecwidPut<{ updateCount: number }>(`/orders/${orderId}`, updateData)
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert cart items to order items format
 */
export function cartItemsToOrderItems(cartItems: CartItem[]) {
  return cartItems.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    name: item.name,
    weight: item.weight ?? 0,
    isShippingRequired: item.isShippingRequired ?? true,
    selectedOptions: item.selectedOptions,
    combinationId: item.combinationId,
    sku: item.sku,
  }))
}

/**
 * Check if order requires shipping
 */
export function orderRequiresShipping(items: CartItem[]): boolean {
  return items.some(item => item.isShippingRequired !== false)
}

/**
 * Calculate cart subtotal
 */
export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/**
 * Calculate total cart weight
 */
export function calculateCartWeight(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.weight ?? 0) * item.quantity, 0)
}

/**
 * Get order status display text
 */
export function getPaymentStatusDisplay(status: string): {
  label: string
  color: 'yellow' | 'green' | 'red' | 'gray'
} {
  switch (status) {
    case 'AWAITING_PAYMENT':
      return { label: 'Awaiting Payment', color: 'yellow' }
    case 'PAID':
      return { label: 'Paid', color: 'green' }
    case 'CANCELLED':
      return { label: 'Cancelled', color: 'red' }
    case 'REFUNDED':
      return { label: 'Refunded', color: 'gray' }
    case 'PARTIALLY_REFUNDED':
      return { label: 'Partially Refunded', color: 'gray' }
    case 'INCOMPLETE':
      return { label: 'Incomplete', color: 'red' }
    default:
      return { label: status, color: 'gray' }
  }
}

/**
 * Get fulfillment status display text
 */
export function getFulfillmentStatusDisplay(status: string): {
  label: string
  color: 'yellow' | 'blue' | 'green' | 'red' | 'gray'
} {
  switch (status) {
    case 'AWAITING_PROCESSING':
      return { label: 'Awaiting Processing', color: 'yellow' }
    case 'PROCESSING':
      return { label: 'Processing', color: 'blue' }
    case 'SHIPPED':
      return { label: 'Shipped', color: 'blue' }
    case 'DELIVERED':
      return { label: 'Delivered', color: 'green' }
    case 'WILL_NOT_DELIVER':
      return { label: 'Will Not Deliver', color: 'red' }
    case 'RETURNED':
      return { label: 'Returned', color: 'gray' }
    case 'READY_FOR_PICKUP':
      return { label: 'Ready for Pickup', color: 'green' }
    case 'OUT_FOR_DELIVERY':
      return { label: 'Out for Delivery', color: 'blue' }
    default:
      return { label: status, color: 'gray' }
  }
}
