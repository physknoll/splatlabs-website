import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ecwidPost, getStoreId } from '@/lib/ecwid/client'
import type { CartItem, ShippingPerson, AvailableShippingOption, CreateOrderResponse } from '@/lib/ecwid/types'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

/**
 * Request body for creating checkout session
 */
interface CreateCheckoutSessionRequest {
  items: CartItem[]
  email: string
  shippingAddress: ShippingPerson
  billingAddress?: ShippingPerson
  selectedShipping: AvailableShippingOption
  orderTotals: {
    subtotal: number
    shipping: number
    tax: number
    discount: number
    total: number
  }
  couponCode?: string
  orderComments?: string
}

/**
 * POST /api/checkout/create-checkout-session
 * 
 * 1. Creates an Ecwid order with AWAITING_PAYMENT status
 * 2. Creates a Stripe Checkout Session with the Ecwid order ID in metadata
 * 3. Returns the Stripe Checkout URL for redirect
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateCheckoutSessionRequest = await request.json()

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

    console.log('Creating Ecwid order for Stripe checkout...')

    // Step 1: Create the Ecwid order with AWAITING_PAYMENT status
    const orderData = {
      email: body.email,
      items: body.items.map(item => ({
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
      shippingPerson: body.shippingAddress,
      billingPerson: body.billingAddress ?? body.shippingAddress,
      shippingOption: {
        shippingMethodName: body.selectedShipping.shippingMethodName,
        shippingCarrierName: body.selectedShipping.shippingCarrierName,
        shippingRate: body.selectedShipping.shippingRate,
        fulfillmentType: body.selectedShipping.fulfillmentType || 'SHIPPING',
      },
      paymentMethod: 'Credit Card (Stripe)',
      paymentStatus: 'AWAITING_PAYMENT' as const,
      fulfillmentStatus: 'AWAITING_PROCESSING' as const,
      subtotal: body.orderTotals.subtotal,
      total: body.orderTotals.total,
      tax: body.orderTotals.tax,
      orderComments: body.orderComments,
      discountCoupon: body.couponCode ? { code: body.couponCode } : undefined,
    }

    // Use public token for order creation
    const ecwidOrder = await ecwidPost<CreateOrderResponse>(
      '/orders',
      orderData,
      undefined,
      { usePublicToken: true }
    )

    console.log('Ecwid order created:', {
      orderId: ecwidOrder.id,
      orderNumber: ecwidOrder.orderNumber,
    })

    // Step 2: Create Stripe Checkout Session
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://splatlabs.ai'

    // Build line items for Stripe display
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          // Include variant info in description if available
          description: item.selectedOptions?.map(opt => `${opt.name}: ${opt.value}`).join(', ') || undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item
    if (body.orderTotals.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping (${body.selectedShipping.shippingMethodName})`,
          },
          unit_amount: Math.round(body.orderTotals.shipping * 100),
        },
        quantity: 1,
      })
    }

    // Add tax as a line item if present
    if (body.orderTotals.tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tax',
          },
          unit_amount: Math.round(body.orderTotals.tax * 100),
        },
        quantity: 1,
      })
    }

    // Add discount as negative line item if present
    if (body.orderTotals.discount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Discount',
          },
          unit_amount: -Math.round(body.orderTotals.discount * 100),
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: body.email,
      client_reference_id: ecwidOrder.id.toString(),
      metadata: {
        ecwid_order_id: ecwidOrder.id.toString(),
        ecwid_order_number: ecwidOrder.orderNumber.toString(),
        ecwid_store_id: getStoreId(),
      },
      success_url: `${siteUrl}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}&order=${ecwidOrder.orderNumber}`,
      cancel_url: `${siteUrl}/checkout?cancelled=true&order_id=${ecwidOrder.id}`,
      // Collect billing address from Stripe
      billing_address_collection: 'auto',
      // Pre-fill shipping address
      shipping_address_collection: undefined, // We already have shipping info
    })

    console.log('Stripe checkout session created:', {
      sessionId: session.id,
      url: session.url,
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      ecwidOrderId: ecwidOrder.id,
      ecwidOrderNumber: ecwidOrder.orderNumber,
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (error instanceof Error) {
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
      { error: 'Failed to create checkout session. Please try again.', details: errorMessage },
      { status: 500 }
    )
  }
}
