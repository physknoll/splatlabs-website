import { NextRequest, NextResponse } from 'next/server'
import { calculateOrder } from '@/lib/ecwid/orders'
import type { CartItem, ShippingPerson } from '@/lib/ecwid/types'

export const dynamic = 'force-dynamic'

/**
 * Request body for order calculation
 */
interface CalculateRequest {
  items: CartItem[]
  email: string
  shippingAddress: ShippingPerson
  billingAddress?: ShippingPerson
  selectedShipping?: {
    shippingMethodId: string
    shippingMethodName: string
  }
  couponCode?: string
}

/**
 * POST /api/checkout/calculate
 * Calculate order totals including shipping options and taxes
 * 
 * This endpoint is the key to getting:
 * - Available shipping methods with live rates
 * - Calculated taxes based on destination
 * - Applied discounts/coupons
 * - Final totals
 */
export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequest = await request.json()
    
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
    
    // Validate shipping address has required fields
    const { shippingAddress } = body
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.countryCode) {
      return NextResponse.json(
        { error: 'Shipping address is incomplete. Required: name, street, city, postalCode, countryCode' },
        { status: 400 }
      )
    }
    
    // Calculate order with Ecwid
    const result = await calculateOrder({
      items: body.items,
      email: body.email,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      selectedShipping: body.selectedShipping,
      couponCode: body.couponCode,
    })
    
    // Return the full calculation result
    return NextResponse.json({
      subtotal: result.subtotal,
      subtotalWithoutTax: result.subtotalWithoutTax,
      total: result.total,
      totalWithoutTax: result.totalWithoutTax,
      tax: result.tax,
      shipping: result.shippingOption?.shippingRate ?? 0,
      discount: result.discount ?? 0,
      couponDiscount: result.couponDiscount ?? 0,
      
      // Selected shipping option (if any)
      selectedShipping: result.shippingOption,
      
      // Available shipping options for customer to choose
      availableShippingOptions: result.availableShippingOptions?.map(opt => ({
        shippingMethodId: opt.shippingMethodId,
        shippingMethodName: opt.shippingMethodName,
        shippingCarrierName: opt.shippingCarrierName,
        shippingRate: opt.shippingRate,
        estimatedTransitTime: opt.estimatedTransitTime,
        fulfillmentType: opt.fulfillmentType,
        isPickup: opt.isPickup,
        pickupInstruction: opt.pickupInstruction,
      })) ?? [],
      
      // Coupon details if applied
      coupon: result.discountCoupon,
      
      // Tax details
      taxesOnShipping: result.taxesOnShipping,
      
      // Full calculated items with tax breakdown
      items: result.items,
    })
  } catch (error) {
    console.error('Error calculating order:', error)
    
    // Check for specific Ecwid errors
    if (error instanceof Error) {
      if (error.message.includes('400')) {
        return NextResponse.json(
          { error: 'Invalid request data. Please check cart items and address.' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to calculate order totals' },
      { status: 500 }
    )
  }
}
