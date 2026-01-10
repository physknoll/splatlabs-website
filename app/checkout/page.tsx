'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock, Loader2, Tag, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore, useCartHydration } from '@/lib/stores/cart-store'
import { formatPrice } from '@/lib/ecwid/products'
import { Button } from '@/app/components/ui/Button'
import { AddressForm } from '@/app/components/checkout/AddressForm'
import { ShippingSelector } from '@/app/components/checkout/ShippingSelector'
import { OrderSummary } from '@/app/components/checkout/OrderSummary'
import type { ShippingPerson, AvailableShippingOption } from '@/lib/ecwid/types'

export default function CheckoutPage() {
  const router = useRouter()
  const isHydrated = useCartHydration()
  const items = useCartStore((state) => state.items)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const clearCart = useCartStore((state) => state.clearCart)
  
  // Form state
  const [email, setEmail] = useState('')
  const [shippingAddress, setShippingAddress] = useState<ShippingPerson>({
    name: '',
    street: '',
    city: '',
    stateOrProvinceCode: '',
    postalCode: '',
    countryCode: 'US',
  })
  const [useDifferentBilling, setUseDifferentBilling] = useState(false)
  const [billingAddress, setBillingAddress] = useState<ShippingPerson>({
    name: '',
    street: '',
    city: '',
    stateOrProvinceCode: '',
    postalCode: '',
    countryCode: 'US',
  })
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [orderNotes, setOrderNotes] = useState('')
  
  // Shipping options
  const [shippingOptions, setShippingOptions] = useState<AvailableShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<AvailableShippingOption | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Order totals
  const [orderTotals, setOrderTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  })
  
  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'address' | 'shipping' | 'review'>('address')
  
  // Validate address
  const validateAddress = useCallback(() => {
    const newErrors: Record<string, string> = {}
    
    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address'
    
    if (!shippingAddress.name) newErrors.name = 'Name is required'
    if (!shippingAddress.street) newErrors.street = 'Street address is required'
    if (!shippingAddress.city) newErrors.city = 'City is required'
    if (!shippingAddress.postalCode) newErrors.postalCode = 'ZIP code is required'
    if (shippingAddress.countryCode === 'US' && !shippingAddress.stateOrProvinceCode) {
      newErrors.stateOrProvinceCode = 'State is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [email, shippingAddress])
  
  // Calculate shipping and totals
  const calculateOrder = useCallback(async () => {
    if (!validateAddress() || items.length === 0) return
    
    setIsCalculating(true)
    
    try {
      const response = await fetch('/api/checkout/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          shippingAddress,
          billingAddress: useDifferentBilling ? billingAddress : undefined,
          selectedShipping: selectedShipping ? {
            shippingMethodId: selectedShipping.shippingMethodId,
            shippingMethodName: selectedShipping.shippingMethodName,
          } : undefined,
          couponCode: couponCode || undefined,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to calculate order')
      }
      
      const data = await response.json()
      
      setShippingOptions(data.availableShippingOptions || [])
      setOrderTotals({
        subtotal: data.subtotal,
        shipping: data.shipping,
        tax: data.tax,
        discount: data.discount + data.couponDiscount,
        total: data.total,
      })
      
      // Auto-select first shipping option if none selected
      if (!selectedShipping && data.availableShippingOptions?.length > 0) {
        setSelectedShipping(data.availableShippingOptions[0])
      }
      
      setStep('shipping')
    } catch (error) {
      console.error('Error calculating order:', error)
      setErrors({ general: 'Failed to calculate shipping. Please try again.' })
    } finally {
      setIsCalculating(false)
    }
  }, [items, email, shippingAddress, selectedShipping, validateAddress])
  
  // Re-calculate when shipping option changes
  useEffect(() => {
    if (selectedShipping && step === 'shipping') {
      const recalculate = async () => {
        setIsCalculating(true)
        try {
          const response = await fetch('/api/checkout/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items,
              email,
              shippingAddress,
              billingAddress: useDifferentBilling ? billingAddress : undefined,
              selectedShipping: {
                shippingMethodId: selectedShipping.shippingMethodId,
                shippingMethodName: selectedShipping.shippingMethodName,
              },
              couponCode: couponCode || undefined,
            }),
          })
          
          if (response.ok) {
            const data = await response.json()
            setOrderTotals({
              subtotal: data.subtotal,
              shipping: data.shipping,
              tax: data.tax,
              discount: data.discount + data.couponDiscount,
              total: data.total,
            })
          }
        } catch (error) {
          console.error('Error recalculating:', error)
        } finally {
          setIsCalculating(false)
        }
      }
      
      recalculate()
    }
  }, [selectedShipping]) // eslint-disable-line react-hooks/exhaustive-deps
  
  // Submit order
  const handleSubmitOrder = async () => {
    if (!selectedShipping) {
      setErrors({ shipping: 'Please select a shipping method' })
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/checkout/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          shippingAddress,
          billingAddress: useDifferentBilling ? billingAddress : undefined,
          selectedShipping,
          couponCode: couponCode || undefined,
          orderComments: orderNotes || undefined,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create order')
      }
      
      const data = await response.json()
      
      // Clear cart
      clearCart()
      
      // Redirect to Ecwid payment page
      window.location.href = data.paymentUrl
    } catch (error) {
      console.error('Error submitting order:', error)
      setErrors({ general: error instanceof Error ? error.message : 'Failed to process order. Please try again.' })
      setIsSubmitting(false)
    }
  }
  
  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="container-custom flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-rock-orange border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    )
  }
  
  // Show empty cart message
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-light-bg-subtle rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-content-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-content-primary mb-3">Your cart is empty</h1>
            <p className="text-content-muted mb-6">Add some products to checkout</p>
            <Link href="/store">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse Store
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }
  
  const subtotal = getSubtotal()
  
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/store" 
            className="inline-flex items-center gap-2 text-content-muted hover:text-rock-orange transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-content-primary">Checkout</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['Address', 'Shipping', 'Review'].map((label, index) => {
            const stepIndex = index
            const currentStepIndex = step === 'address' ? 0 : step === 'shipping' ? 1 : 2
            const isActive = stepIndex === currentStepIndex
            const isCompleted = stepIndex < currentStepIndex
            
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isActive && 'bg-rock-orange text-white',
                  isCompleted && 'bg-green-500 text-white',
                  !isActive && !isCompleted && 'bg-light-bg-subtle text-content-muted'
                )}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  isActive ? 'text-rock-orange' : 'text-content-muted'
                )}>
                  {label}
                </span>
                {index < 2 && (
                  <div className={cn(
                    'w-12 h-0.5 mx-2',
                    isCompleted ? 'bg-green-500' : 'bg-light-border'
                  )} />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Error Banner */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
          >
            {errors.general}
          </motion.div>
        )}
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="bg-white border border-light-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-content-primary mb-4">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 border rounded-xl transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange',
                    errors.email ? 'border-red-400 bg-red-50' : 'border-light-border bg-white'
                  )}
                  placeholder="your@email.com"
                  disabled={step !== 'address'}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white border border-light-border rounded-2xl p-6">
              <AddressForm
                title="Shipping Address"
                address={shippingAddress}
                onChange={setShippingAddress}
                errors={errors}
                disabled={step !== 'address'}
              />
              
              {/* Billing Address Toggle */}
              <div className="mt-6 pt-6 border-t border-light-border">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useDifferentBilling}
                    onChange={(e) => setUseDifferentBilling(e.target.checked)}
                    disabled={step !== 'address'}
                    className="w-5 h-5 rounded border-light-border text-rock-orange focus:ring-rock-orange/20"
                  />
                  <span className="text-sm font-medium text-content-secondary">
                    Use a different billing address
                  </span>
                </label>
              </div>
              
              {/* Billing Address Form (if different) */}
              {useDifferentBilling && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-light-border"
                >
                  <AddressForm
                    title="Billing Address"
                    address={billingAddress}
                    onChange={setBillingAddress}
                    errors={errors}
                    disabled={step !== 'address'}
                  />
                </motion.div>
              )}
              
              {step === 'address' && (
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={calculateOrder}
                    disabled={isCalculating}
                    className="w-full sm:w-auto"
                    rightIcon={isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  >
                    {isCalculating ? 'Calculating...' : 'Continue to Shipping'}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Coupon Code */}
            {step === 'address' && (
              <div className="bg-white border border-light-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-rock-orange" />
                  Discount Code
                </h3>
                
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className={cn(
                      'flex-1 px-4 py-3 border rounded-xl transition-all uppercase',
                      'focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange',
                      appliedCoupon ? 'border-green-400 bg-green-50' : 'border-light-border bg-white'
                    )}
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAppliedCoupon(null)
                        setCouponCode('')
                      }}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      disabled={!couponCode.trim()}
                    >
                      Apply
                    </Button>
                  )}
                </div>
                
                {appliedCoupon && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Coupon applied: {formatPrice(appliedCoupon.discount)} off</span>
                  </div>
                )}
                
                <p className="mt-3 text-xs text-content-muted">
                  Coupon will be validated when you proceed to shipping.
                </p>
              </div>
            )}
            
            {/* Shipping Options */}
            {(step === 'shipping' || step === 'review') && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-light-border rounded-2xl p-6"
              >
                <ShippingSelector
                  options={shippingOptions}
                  selectedId={selectedShipping?.shippingMethodId ?? null}
                  onSelect={setSelectedShipping}
                  isLoading={isCalculating && shippingOptions.length === 0}
                />
                
                {step === 'shipping' && selectedShipping && (
                  <div className="mt-6 flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep('address')}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setStep('review')}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Review Order
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Review & Pay */}
            {step === 'review' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-light-border rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-content-primary mb-4">Review & Pay</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-content-muted mb-1">Email</p>
                    <p className="text-content-primary font-medium">{email}</p>
                  </div>
                  
                  <div>
                    <p className="text-content-muted mb-1">Shipping to</p>
                    <p className="text-content-primary font-medium">
                      {shippingAddress.name}<br />
                      {shippingAddress.street}<br />
                      {shippingAddress.city}, {shippingAddress.stateOrProvinceCode} {shippingAddress.postalCode}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-content-muted mb-1">Shipping method</p>
                    <p className="text-content-primary font-medium">
                      {selectedShipping?.shippingMethodName} - {selectedShipping?.shippingRate === 0 ? 'FREE' : formatPrice(selectedShipping?.shippingRate ?? 0)}
                    </p>
                  </div>
                </div>
                
                {/* Order Notes */}
                <div className="mt-6 pt-6 border-t border-light-border">
                  <label className="block text-sm font-medium text-content-secondary mb-2">
                    Order Notes <span className="text-content-muted">(optional)</span>
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={3}
                    placeholder="Special instructions for your order, delivery notes, etc."
                    className={cn(
                      'w-full px-4 py-3 border rounded-xl transition-all resize-none',
                      'focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange',
                      'border-light-border bg-white'
                    )}
                  />
                </div>
                
                <div className="mt-6 pt-6 border-t border-light-border">
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                      className="flex-1"
                      leftIcon={<Lock className="w-4 h-4" />}
                      rightIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                    >
                      {isSubmitting ? 'Processing...' : `Pay ${formatPrice(orderTotals.total)}`}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-content-muted text-center mt-4">
                    You&apos;ll be redirected to our secure payment page to complete your order.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                items={items}
                subtotal={step === 'address' ? subtotal : orderTotals.subtotal}
                shipping={orderTotals.shipping}
                tax={orderTotals.tax}
                discount={orderTotals.discount}
                total={step === 'address' ? subtotal : orderTotals.total}
                isCalculating={isCalculating}
              />
              
              {/* Trust Badges */}
              <div className="mt-6 p-4 bg-light-bg-subtle rounded-xl">
                <div className="flex items-center gap-2 text-sm text-content-secondary mb-3">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Secure checkout powered by Ecwid</span>
                </div>
                <div className="flex gap-4 text-xs text-content-muted">
                  <span>✓ SSL Encrypted</span>
                  <span>✓ PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
