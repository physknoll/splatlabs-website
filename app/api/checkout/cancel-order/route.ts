import { NextRequest, NextResponse } from 'next/server'
import { updateOrderPaymentStatus } from '@/lib/ecwid/orders'

export const dynamic = 'force-dynamic'

/**
 * Request body for cancelling an order
 */
interface CancelOrderRequest {
  orderId: number
  reason?: string
}

/**
 * POST /api/checkout/cancel-order
 * 
 * Cancels an Ecwid order that was created for payment but was cancelled or abandoned.
 * This is called when:
 * - User clicks "Back" on Stripe Checkout page
 * - User wants to cancel and start fresh
 */
export async function POST(request: NextRequest) {
  try {
    const body: CancelOrderRequest = await request.json()

    if (!body.orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    console.log(`Cancelling Ecwid order ${body.orderId}...`)

    await updateOrderPaymentStatus(
      body.orderId,
      'CANCELLED',
      {
        paymentMessage: body.reason || 'Cancelled by customer during checkout',
      }
    )

    console.log(`Ecwid order ${body.orderId} cancelled successfully`)

    return NextResponse.json({
      success: true,
      orderId: body.orderId,
      status: 'CANCELLED',
    })

  } catch (error) {
    console.error('Error cancelling order:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      { error: 'Failed to cancel order', details: errorMessage },
      { status: 500 }
    )
  }
}
