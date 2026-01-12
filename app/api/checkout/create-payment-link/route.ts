import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/ecwid/orders'
import type { CartItem, ShippingPerson, AvailableShippingOption } from '@/lib/ecwid/types'

export const dynamic = 'force-dynamic'

/**
 * Request body for creating payment link
 */
interface CreatePaymentLinkRequest {
  items: CartItem[]
  email: string
  shippingAddress: ShippingPerson
  billingAddress?: ShippingPerson
  selectedShipping: AvailableShippingOption
  couponCode?: string
  orderComments?: string
  returnUrl?: string
}

/**
 * POST /api/checkout/create-payment-link
 * Create an order in Ecwid with AWAITING_PAYMENT status
 * and return the payment URL for the customer
 * 
 * Flow:
 * 1. Validate request data
 * 2. Re-calculate order to get final totals
 * 3. Create order in Ecwid with AWAITING_PAYMENT
 * 4. Return payment URL for redirect
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentLinkRequest = await request.json()
    
    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      )
    }
    
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    if (!body.shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      )
    }
    
    if (!body.selectedShipping) {
      return NextResponse.json(
        { error: 'Shipping method is required' },
        { status: 400 }
      )
    }
    
    // Validate shipping address
    const { shippingAddress } = body
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.countryCode) {
      return NextResponse.json(
        { error: 'Shipping address is incomplete' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Calculate totals locally from the cart items and selected shipping
    // We don't call Ecwid's calculate API here because it rejects shippingMethodId
    const subtotal = body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = body.selectedShipping.shippingRate || 0
    
    // Build a calculated order object for createOrder
    // Tax will be calculated by Ecwid when creating the order
    const calculatedOrder = {
      subtotal,
      shipping: shippingCost,
      tax: 0, // Ecwid will calculate and apply tax
      total: subtotal + shippingCost,
      subtotalWithoutTax: subtotal,
      totalWithoutTax: subtotal + shippingCost,
      discount: 0,
      couponDiscount: 0,
      items: [], // Not needed for order creation, type requirement only
    }
    
    // Create the order with AWAITING_PAYMENT status
    const orderResult = await createOrder({
      calculatedOrder,
      email: body.email,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      selectedShipping: body.selectedShipping,
      items: body.items,
      couponCode: body.couponCode,
      orderComments: body.orderComments,
    })
    
    // Build the success/cancel return URLs if provided
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://splatlabs.ai'
    const successUrl = body.returnUrl 
      ? `${body.returnUrl}?order=${orderResult.orderNumber}&status=success`
      : `${siteUrl}/checkout/confirmation?order=${orderResult.orderNumber}`
    
    return NextResponse.json({
      success: true,
      orderId: orderResult.orderId,
      orderNumber: orderResult.orderNumber,
      paymentUrl: orderResult.paymentUrl,
      successUrl,
      total: calculatedOrder.total,
    })
  } catch (error) {
    console.error('Error creating payment link:', error)
    
    // Log the full error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Full error message:', errorMessage)
    
    if (error instanceof Error) {
      // Handle specific errors
      if (error.message.includes('400')) {
        return NextResponse.json(
          { error: 'Invalid order data. Please check your information and try again.', details: errorMessage },
          { status: 400 }
        )
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        return NextResponse.json(
          { error: 'Authorization error. Please contact support.', details: errorMessage },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.', details: errorMessage },
      { status: 500 }
    )
  }
}
