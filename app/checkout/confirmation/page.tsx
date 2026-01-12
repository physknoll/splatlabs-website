import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Package, Mail, CreditCard } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'
import { OrderCompletionTracker } from './OrderCompletionTracker'

export const metadata: Metadata = {
  title: 'Order Confirmed | Thank You',
  description: 'Your order has been successfully placed.',
}

interface ConfirmationPageProps {
  searchParams: Promise<{
    order?: string
    status?: string
    session_id?: string  // Stripe Checkout Session ID
  }>
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { order, status, session_id } = await searchParams
  
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      {/* Analytics tracking */}
      <OrderCompletionTracker orderId={order} status={status} sessionId={session_id} />
      
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-12">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          {/* Heading */}
          <h1 className="text-3xl font-bold text-content-primary mb-3">
            Thank You for Your Order!
          </h1>
          
          {order && (
            <p className="text-lg text-content-secondary mb-6">
              Order #{order} has been confirmed
            </p>
          )}
          
          {/* Status Message */}
          <div className="bg-light-bg-subtle rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-content-primary mb-4">What&apos;s Next?</h2>
            
            <div className="space-y-4">
              {session_id && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-content-primary">Payment Confirmed</h3>
                    <p className="text-sm text-content-muted">
                      Your payment has been securely processed via Stripe.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-rock-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-rock-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-content-primary">Confirmation Email</h3>
                  <p className="text-sm text-content-muted">
                    You&apos;ll receive an order confirmation email with your receipt and order details.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-rock-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-rock-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-content-primary">Order Processing</h3>
                  <p className="text-sm text-content-muted">
                    We&apos;ll process your order and send you tracking information once it ships.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-light-border">
            <p className="text-sm text-content-muted">
              Have questions about your order?{' '}
              <a href="mailto:support@rockrobotic.com" className="text-rock-orange hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
