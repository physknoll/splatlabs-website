import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateOrderPaymentStatus } from '@/lib/ecwid/orders'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * POST /api/webhooks/stripe
 * 
 * Handles Stripe webhook events for payment confirmation
 * 
 * Events handled:
 * - checkout.session.completed: Payment succeeded, update Ecwid order to PAID
 * - checkout.session.expired: Session timed out, optionally cancel Ecwid order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('No Stripe signature found in request')
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    // Verify the webhook signature
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('Webhook signature verification failed:', errorMessage)
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${errorMessage}` },
        { status: 400 }
      )
    }

    console.log('Stripe webhook received:', {
      type: event.type,
      id: event.id,
    })

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Checkout session completed:', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          metadata: session.metadata,
        })

        // Extract Ecwid order ID from metadata
        const ecwidOrderId = session.metadata?.ecwid_order_id
        const ecwidOrderNumber = session.metadata?.ecwid_order_number

        if (!ecwidOrderId) {
          console.error('No ecwid_order_id found in session metadata')
          return NextResponse.json(
            { error: 'Missing ecwid_order_id in metadata' },
            { status: 400 }
          )
        }

        // Only update if payment was successful
        if (session.payment_status === 'paid') {
          console.log(`Updating Ecwid order ${ecwidOrderId} to PAID...`)

          try {
            await updateOrderPaymentStatus(
              parseInt(ecwidOrderId, 10),
              'PAID',
              {
                externalTransactionId: session.id,
                paymentMessage: `Paid via Stripe Checkout. Session: ${session.id}. Order #${ecwidOrderNumber}`,
              }
            )

            console.log(`Ecwid order ${ecwidOrderId} updated to PAID successfully`)
          } catch (ecwidError) {
            console.error('Failed to update Ecwid order:', ecwidError)
            // Return 500 so Stripe will retry
            return NextResponse.json(
              { error: 'Failed to update order in Ecwid' },
              { status: 500 }
            )
          }
        } else {
          console.log(`Payment status is ${session.payment_status}, not updating order yet`)
        }

        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Checkout session expired:', {
          sessionId: session.id,
          metadata: session.metadata,
        })

        // Extract Ecwid order ID from metadata
        const ecwidOrderId = session.metadata?.ecwid_order_id

        if (ecwidOrderId) {
          console.log(`Checkout session expired for Ecwid order ${ecwidOrderId}`)

          // Optionally cancel the order
          try {
            await updateOrderPaymentStatus(
              parseInt(ecwidOrderId, 10),
              'CANCELLED',
              {
                paymentMessage: `Checkout session expired. Session: ${session.id}`,
              }
            )

            console.log(`Ecwid order ${ecwidOrderId} cancelled due to session expiry`)
          } catch (ecwidError) {
            console.error('Failed to cancel Ecwid order:', ecwidError)
            // Don't fail the webhook for this
          }
        }

        break
      }

      case 'payment_intent.succeeded': {
        // This is triggered when payment succeeds, but we primarily use checkout.session.completed
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        // Payment failed - Stripe handles showing error on their page
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent failed:', {
          id: paymentIntent.id,
          error: paymentIntent.last_payment_error?.message,
        })
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return success response
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Stripe requires the raw body, so we need to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}
