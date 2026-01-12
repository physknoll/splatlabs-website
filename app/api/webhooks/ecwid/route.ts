import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

/**
 * Verify Ecwid webhook signature
 * Ecwid signs webhooks with HMAC-SHA256 using your client secret
 */
function verifyWebhookSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64')
  
  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

/**
 * Ecwid webhook payload structure
 */
interface EcwidWebhook {
  eventId: string
  eventCreated: number
  storeId: number
  entityId: number
  eventType: string
  data?: Record<string, unknown>
}

/**
 * POST /api/webhooks/ecwid
 * Handle Ecwid webhook events for real-time sync
 * 
 * Supported events:
 * - product.created, product.updated, product.deleted
 * - order.created, order.updated
 * - category.created, category.updated, category.deleted
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    
    // Log incoming webhook for debugging (truncate for security)
    console.log('Ecwid webhook received, length:', body.length)
    
    // Verify webhook signature if client secret is configured
    // Ecwid signs webhooks using your app's Client Secret
    const clientSecret = process.env.ECWID_CLIENT_SECRET || process.env.ECWID_WEBHOOK_SECRET
    if (clientSecret) {
      const signature = request.headers.get('x-ecwid-webhook-signature')
      
      if (!verifyWebhookSignature(body, signature, clientSecret)) {
        console.error('Webhook signature verification failed')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
      console.log('Webhook signature verified ✓')
    }
    
    let webhook: EcwidWebhook
    
    try {
      webhook = JSON.parse(body)
    } catch {
      console.error('Invalid webhook JSON:', body)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    // Validate required fields
    if (!webhook.eventType || !webhook.storeId) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
    }
    
    // Verify store ID matches our store
    const expectedStoreId = process.env.ECWID_STORE_ID
    if (expectedStoreId && webhook.storeId.toString() !== expectedStoreId) {
      console.error('Store ID mismatch:', webhook.storeId, 'expected:', expectedStoreId)
      return NextResponse.json({ error: 'Invalid store' }, { status: 403 })
    }
    
    console.log(`Processing webhook: ${webhook.eventType} for entity ${webhook.entityId}`)
    
    // Handle different event types
    switch (webhook.eventType) {
      // Product events
      case 'product.created':
        await handleProductCreated(webhook)
        break
        
      case 'product.updated':
        await handleProductUpdated(webhook)
        break
        
      case 'product.deleted':
        await handleProductDeleted(webhook)
        break
        
      // Order events
      case 'order.created':
        await handleOrderCreated(webhook)
        break
        
      case 'order.updated':
        await handleOrderUpdated(webhook)
        break
        
      // Category events
      case 'category.created':
      case 'category.updated':
      case 'category.deleted':
        await handleCategoryChange(webhook)
        break
        
      default:
        console.log('Unhandled webhook event:', webhook.eventType)
    }
    
    // Always respond with 200 to acknowledge receipt
    return NextResponse.json({ 
      received: true, 
      eventType: webhook.eventType,
      entityId: webhook.entityId,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    // Still return 200 to prevent Ecwid from retrying
    return NextResponse.json({ received: true, error: 'Processing failed' })
  }
}

/**
 * Handle product created event
 */
async function handleProductCreated(webhook: EcwidWebhook) {
  console.log('New product created:', webhook.entityId)
  
  // Revalidate store listing pages
  revalidatePath('/store')
  revalidateTag('products')
}

/**
 * Handle product updated event
 */
async function handleProductUpdated(webhook: EcwidWebhook) {
  console.log('Product updated:', webhook.entityId)
  
  // Revalidate the specific product page and store listing
  revalidatePath('/store')
  revalidateTag('products')
  
  // Note: We can't easily revalidate the exact slug path without knowing the product name
  // The ISR will handle this with the revalidate time
}

/**
 * Handle product deleted event
 */
async function handleProductDeleted(webhook: EcwidWebhook) {
  console.log('Product deleted:', webhook.entityId)
  
  // Revalidate store listing
  revalidatePath('/store')
  revalidateTag('products')
}

/**
 * Handle order created event
 */
async function handleOrderCreated(webhook: EcwidWebhook) {
  console.log('New order created:', webhook.entityId)
  
  // Here you could:
  // - Send custom notifications
  // - Update analytics
  // - Trigger inventory alerts
  // - Send to external systems (Slack, email, etc.)
}

/**
 * Handle order updated event
 */
async function handleOrderUpdated(webhook: EcwidWebhook) {
  console.log('Order updated:', webhook.entityId)
  
  // Here you could:
  // - Send shipping notifications
  // - Update order status in external systems
  // - Trigger fulfillment workflows
}

/**
 * Handle category changes
 */
async function handleCategoryChange(webhook: EcwidWebhook) {
  console.log('Category changed:', webhook.eventType, webhook.entityId)
  
  // Revalidate store pages
  revalidatePath('/store')
  revalidateTag('categories')
}

/**
 * GET /api/webhooks/ecwid
 * Ecwid may ping this endpoint to verify it's active
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'active',
    message: 'Ecwid webhook endpoint is ready',
  })
}
