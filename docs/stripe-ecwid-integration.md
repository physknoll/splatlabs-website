# Stripe + Ecwid Headless Checkout Integration

## Overview

This document describes how to integrate Stripe Payment Intents with our existing Ecwid headless storefront to process payments while maintaining QuickBooks synchronization through Ecwid.

---

## Current Architecture

### What We Have

| Component | Status | Purpose |
|-----------|--------|---------|
| **Product Catalog** | ✅ Ecwid | Products managed in Ecwid, displayed on custom Next.js pages |
| **Cart** | ✅ Zustand | Client-side cart stored in localStorage |
| **Shipping Calculation** | ✅ Ecwid API | Real-time carrier rates (UPS, FedEx, USPS) via `/order/calculate` |
| **Tax Calculation** | ✅ Ecwid API | Automatic tax calculation via `/order/calculate` |
| **Order Creation** | ✅ Ecwid API | Orders created via REST API with `create_orders` scope |
| **QuickBooks Sync** | ✅ Ecwid | Automatic sync when orders are in Ecwid |
| **Payment Processing** | ❌ Missing | Need to collect payment before marking order as PAID |

### The Problem

Ecwid's REST API can create orders and calculate totals, but it **does not process payments directly**. The payment integrations (Stripe/PayPal) configured in Ecwid only work through Ecwid's native checkout UI.

For our headless storefront, we need to:
1. Collect payment information on our custom checkout page
2. Process the payment
3. Create the order in Ecwid as `PAID`
4. Maintain QuickBooks integration (orders must be in Ecwid)

---

## Solution: Stripe Payment Intents + Ecwid Orders

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CHECKOUT FLOW                                  │
└─────────────────────────────────────────────────────────────────────────┘

1. Customer fills checkout form (address, email)
                    │
                    ▼
2. Calculate Order via Ecwid API ─────────────────────────────────────────┐
   POST /api/checkout/calculate                                            │
   Returns: subtotal, shipping, tax, total                                 │
                    │                                                      │
                    ▼                                                      │
3. Create Stripe Payment Intent ◄─────────────────────────────────────────┘
   POST /api/checkout/create-payment-intent
   Amount = Ecwid calculated total (in cents)
   Returns: clientSecret
                    │
                    ▼
4. Display Stripe Payment Element
   Customer enters card / Apple Pay / Google Pay
                    │
                    ▼
5. Confirm Payment (client-side)
   stripe.confirmPayment({ clientSecret })
                    │
                    ▼
6. Payment Success → Create Ecwid Order as PAID
   POST /api/checkout/complete-order
   - Creates order in Ecwid with paymentStatus: "PAID"
   - Includes Stripe payment ID for reference
   - QuickBooks syncs automatically
                    │
                    ▼
7. Redirect to Confirmation Page
   /checkout/confirmation?orderId=XXX
```

---

## Technical Implementation

### Environment Variables Required

Add to `.env.local` and Vercel:

```bash
# Existing Ecwid variables
ECWID_STORE_ID=81794270
ECWID_SECRET_TOKEN=secret_xxxxx
ECWID_PUBLIC_TOKEN=public_xxxxx

# New Stripe variables (get from Stripe Dashboard → Developers → API Keys)
STRIPE_SECRET_KEY=sk_live_xxxxx          # Or sk_test_xxxxx for testing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Or pk_test_xxxxx for testing
```

### Dependencies to Install

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

---

## API Endpoints

### 1. Create Payment Intent

**File:** `app/api/checkout/create-payment-intent/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      amount,        // Total in dollars (e.g., 150.47)
      email,         // Customer email
      metadata,      // Additional order info
    } = body

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(amount * 100)

    // Create the Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true, // Enables cards, Apple Pay, Google Pay, etc.
      },
      metadata: {
        email,
        ...metadata,
      },
      receipt_email: email,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
```

### 2. Complete Order (After Payment Success)

**File:** `app/api/checkout/complete-order/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/ecwid/orders'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      paymentIntentId,    // Stripe payment intent ID
      items,              // Cart items
      email,
      shippingAddress,
      billingAddress,
      selectedShipping,
      calculatedOrder,    // From Ecwid calculate API
      couponCode,
      orderComments,
    } = body

    // Verify the payment was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Create the order in Ecwid with PAID status
    // Note: We need to use the secret token and set paymentStatus to PAID
    const storeId = process.env.ECWID_STORE_ID
    const secretToken = process.env.ECWID_SECRET_TOKEN

    const orderData = {
      email,
      items: items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        weight: item.weight ?? 0,
        isShippingRequired: item.isShippingRequired ?? true,
        selectedOptions: item.selectedOptions,
        sku: item.sku,
      })),
      shippingPerson: shippingAddress,
      billingPerson: billingAddress ?? shippingAddress,
      shippingOption: {
        shippingMethodName: selectedShipping.shippingMethodName,
        shippingCarrierName: selectedShipping.shippingCarrierName,
        shippingRate: selectedShipping.shippingRate,
        fulfillmentType: selectedShipping.fulfillmentType || 'SHIPPING',
      },
      paymentMethod: 'Credit Card (Stripe)',
      paymentStatus: 'PAID',  // Mark as PAID since Stripe processed it
      fulfillmentStatus: 'AWAITING_PROCESSING',
      subtotal: calculatedOrder.subtotal,
      total: calculatedOrder.total,
      tax: calculatedOrder.tax,
      orderComments,
      externalTransactionId: paymentIntentId, // Link to Stripe payment
      paymentMessage: `Paid via Stripe. Payment ID: ${paymentIntentId}`,
    }

    if (couponCode) {
      orderData.discountCoupon = { code: couponCode }
    }

    const response = await fetch(
      `https://app.ecwid.com/api/v3/${storeId}/orders`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secretToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Ecwid order creation failed:', errorText)
      throw new Error('Failed to create order in Ecwid')
    }

    const orderResult = await response.json()

    return NextResponse.json({
      success: true,
      orderId: orderResult.id,
      orderNumber: orderResult.orderNumber,
    })

  } catch (error) {
    console.error('Error completing order:', error)
    return NextResponse.json(
      { error: 'Failed to complete order' },
      { status: 500 }
    )
  }
}
```

---

## Frontend Implementation

### 1. Stripe Provider Setup

**File:** `app/components/checkout/StripeProvider.tsx`

```typescript
'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ReactNode } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeProviderProps {
  children: ReactNode
  clientSecret: string
}

export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#FF5F1F', // Your brand color
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
```

### 2. Payment Form Component

**File:** `app/components/checkout/PaymentForm.tsx`

```typescript
'use client'

import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/app/components/ui/Button'

interface PaymentFormProps {
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function PaymentForm({ 
  onSuccess, 
  onError, 
  isProcessing,
  setIsProcessing 
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return // Stripe not loaded yet
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmation`,
        },
        redirect: 'if_required', // Only redirect for 3D Secure, etc.
      })

      if (error) {
        setErrorMessage(error.message ?? 'Payment failed')
        onError(error.message ?? 'Payment failed')
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id)
      } else {
        setErrorMessage('Unexpected payment status')
        setIsProcessing(false)
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: 'tabs', // or 'accordion'
        }}
      />
      
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}
```

### 3. Updated Checkout Page Flow

**File:** `app/checkout/page.tsx` (Key changes)

```typescript
// After shipping is calculated and user proceeds to payment:

const [clientSecret, setClientSecret] = useState<string | null>(null)
const [paymentStep, setPaymentStep] = useState(false)

// When user clicks "Proceed to Payment"
const handleProceedToPayment = async () => {
  // Create payment intent with calculated total
  const response = await fetch('/api/checkout/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: orderTotals.total,  // e.g., 13567.35
      email,
      metadata: {
        cart_items: items.length,
        shipping_method: selectedShipping.shippingMethodName,
      },
    }),
  })

  const data = await response.json()
  setClientSecret(data.clientSecret)
  setPaymentStep(true)
}

// When payment succeeds
const handlePaymentSuccess = async (paymentIntentId: string) => {
  // Create order in Ecwid as PAID
  const response = await fetch('/api/checkout/complete-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId,
      items,
      email,
      shippingAddress,
      billingAddress: useDifferentBilling ? billingAddress : undefined,
      selectedShipping,
      calculatedOrder: orderTotals,
      couponCode,
      orderComments: orderNotes,
    }),
  })

  const result = await response.json()
  
  if (result.success) {
    // Clear cart
    clearCart()
    // Redirect to confirmation
    router.push(`/checkout/confirmation?orderId=${result.orderId}`)
  }
}

// In the JSX, after shipping step:
{paymentStep && clientSecret && (
  <StripeProvider clientSecret={clientSecret}>
    <PaymentForm
      onSuccess={handlePaymentSuccess}
      onError={(error) => setErrors({ payment: error })}
      isProcessing={isSubmitting}
      setIsProcessing={setIsSubmitting}
    />
  </StripeProvider>
)}
```

---

## Checkout Flow Steps (UI)

### Step 1: Contact & Shipping Address
- Email input
- Shipping address form
- "Continue to Shipping" button

### Step 2: Shipping Method Selection
- Calls Ecwid `/order/calculate` API
- Displays shipping options (grouped by carrier)
- Shows calculated tax
- Shows order total
- "Continue to Payment" button

### Step 3: Payment (NEW - Stripe)
- Creates Stripe Payment Intent
- Shows Stripe Payment Element (card, Apple Pay, Google Pay)
- "Pay $X.XX" button
- On success → Creates Ecwid order as PAID

### Step 4: Confirmation
- Shows order number
- Shows order summary
- "Continue Shopping" button

---

## Data Flow Summary

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ECWID         │     │   YOUR SITE     │     │   STRIPE        │
│   (Products,    │     │   (Next.js)     │     │   (Payments)    │
│   Shipping,     │     │                 │     │                 │
│   Tax, Orders)  │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │ 1. GET /products      │                       │
         │◄──────────────────────┤                       │
         │                       │                       │
         │ 2. POST /order/calc   │                       │
         │◄──────────────────────┤                       │
         │   (shipping + tax)    │                       │
         │──────────────────────►│                       │
         │                       │                       │
         │                       │ 3. Create PaymentIntent
         │                       │──────────────────────►│
         │                       │◄──────────────────────│
         │                       │   (clientSecret)      │
         │                       │                       │
         │                       │ 4. confirmPayment     │
         │                       │   (customer pays)     │
         │                       │──────────────────────►│
         │                       │◄──────────────────────│
         │                       │   (success)           │
         │                       │                       │
         │ 5. POST /orders       │                       │
         │   (paymentStatus:PAID)│                       │
         │◄──────────────────────┤                       │
         │                       │                       │
         │ 6. QuickBooks Sync    │                       │
         │   (automatic)         │                       │
         ▼                       ▼                       ▼
```

---

## Important Notes

### Why This Approach Works

1. **Ecwid is source of truth for products** - No need to sync products to Stripe
2. **Ecwid calculates shipping + tax** - We use their carrier integrations (UPS, FedEx, USPS)
3. **Stripe processes payments** - Handles cards, Apple Pay, Google Pay, 3D Secure
4. **Order goes to Ecwid as PAID** - QuickBooks syncs automatically
5. **Payment ID stored in Ecwid** - `externalTransactionId` links to Stripe for reconciliation

### Security Considerations

1. **Never expose Stripe Secret Key** - Only use on server (API routes)
2. **Always verify payment status** - Check `paymentIntent.status === 'succeeded'` before creating order
3. **Use HTTPS** - Already enforced by Vercel
4. **Validate amounts** - Ensure frontend amount matches backend calculation

### PayPal Support

This implementation focuses on Stripe. For PayPal:
- Option A: Add PayPal JS SDK alongside Stripe (separate implementation)
- Option B: Use Stripe's built-in PayPal support (if available in your region)
- Option C: Offer Stripe for cards/wallets, PayPal as manual option with invoice

---

## Testing Checklist

### Stripe Test Mode

1. Use test API keys (`sk_test_...` and `pk_test_...`)
2. Test card numbers:
   - `4242 4242 4242 4242` - Successful payment
   - `4000 0000 0000 3220` - 3D Secure required
   - `4000 0000 0000 0002` - Declined
3. Any future expiry date
4. Any 3-digit CVC

### End-to-End Test

1. [ ] Add product to cart
2. [ ] Go to checkout
3. [ ] Fill in shipping address
4. [ ] Calculate shipping (verify Ecwid API call)
5. [ ] Select shipping method
6. [ ] Proceed to payment
7. [ ] Enter test card
8. [ ] Complete payment
9. [ ] Verify order appears in Ecwid admin as PAID
10. [ ] Verify payment appears in Stripe dashboard
11. [ ] Verify QuickBooks sync (if applicable)

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `app/api/checkout/create-payment-intent/route.ts` | Create Stripe Payment Intent |
| `app/api/checkout/complete-order/route.ts` | Create Ecwid order after payment |
| `app/components/checkout/StripeProvider.tsx` | Stripe Elements wrapper |
| `app/components/checkout/PaymentForm.tsx` | Payment form component |

### Modified Files

| File | Changes |
|------|---------|
| `app/checkout/page.tsx` | Add payment step, integrate Stripe components |
| `package.json` | Add Stripe dependencies |
| `.env.local` | Add Stripe API keys |

---

## Stripe Dashboard Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy the **Publishable key** and **Secret key**
4. For testing, use the Test mode keys
5. Enable payment methods in **Settings → Payment methods**:
   - Cards (enabled by default)
   - Apple Pay
   - Google Pay
   - Link (Stripe's one-click checkout)

---

## Summary

This integration allows you to:

- ✅ Keep using Ecwid for product catalog, shipping rates, and tax calculation
- ✅ Process payments securely with Stripe
- ✅ Support cards, Apple Pay, and Google Pay
- ✅ Create orders in Ecwid as PAID
- ✅ Maintain QuickBooks synchronization
- ✅ Keep full control of your custom checkout UI
- ✅ No need to sync products between Ecwid and Stripe
