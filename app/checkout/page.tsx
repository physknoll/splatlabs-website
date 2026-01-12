'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
import { analytics } from '@/lib/analytics'
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
  
  // Analytics tracking refs
  const hasTrackedCheckoutStart = useRef(false)
  const orderSubmittedRef = useRef(false)
  
  // Track checkout started
  useEffect(() => {
    if (isHydrated && items.length > 0 && !hasTrackedCheckoutStart.current) {
      hasTrackedCheckoutStart.current = true
      analytics.trackCheckoutStarted(items.map(item => ({
        product_id: item.productId,
        product_name: item.name,
        product_sku: item.sku,
        product_price: item.price,
        quantity: item.quantity,
        selected_options: item.selectedOptions,
        combination_id: item.combinationId,
      })))
    }
  }, [isHydrated, items])
  
  // Track cart abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only track abandonment if checkout was started and order not submitted
      if (hasTrackedCheckoutStart.current && !orderSubmittedRef.current && items.length > 0) {
        analytics.trackCartAbandoned(
          items.map(item => ({
            product_id: item.productId,
            product_name: item.name,
            product_sku: item.sku,
            product_price: item.price,
            quantity: item.quantity,
            selected_options: item.selectedOptions,
            combination_id: item.combinationId,
          })),
          step
        )
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [items, step])
  
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
      // First API call - may only return the "default" shipping option
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
      
      let data = await response.json()
      let shippingOpts: AvailableShippingOption[] = data.availableShippingOptions || []
      
      // ECWID QUIRK: When no selectedShipping is sent, Ecwid may only return limited options.
      // We need to make a second call WITH a REAL shipping method ID to get ALL available options.
      // Use the first available option's ID (not the auto-selected one which may be "customShippingId").
      if (!selectedShipping && shippingOpts.length >= 1) {
        // Find a real shipping option with a proper ID (not "customShippingId" or similar)
        const realOption = shippingOpts.find(opt => 
          opt.shippingMethodId && !opt.shippingMethodId.includes('custom')
        ) || shippingOpts[0]
        
        if (realOption) {
          console.log('Making second API call with real shipping ID:', realOption.shippingMethodId)
          
          const secondResponse = await fetch('/api/checkout/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items,
              email,
              shippingAddress,
              billingAddress: useDifferentBilling ? billingAddress : undefined,
              selectedShipping: {
                shippingMethodId: realOption.shippingMethodId,
                shippingMethodName: realOption.shippingMethodName,
              },
              couponCode: couponCode || undefined,
            }),
          })
          
          if (secondResponse.ok) {
            const secondData = await secondResponse.json()
            // Use the second response if it has more options
            if (secondData.availableShippingOptions?.length > shippingOpts.length) {
              data = secondData
              shippingOpts = data.availableShippingOptions || []
              console.log('Second call returned', shippingOpts.length, 'shipping options')
            }
          }
        }
      }
      
      // If Ecwid pre-selected a shipping option that's not in the list,
      // add it to the front so it's available for selection
      const preSelected = data.selectedShipping
      if (preSelected && preSelected.shippingMethodName) {
        const existsInList = shippingOpts.some(
          (opt) => opt.shippingMethodId === preSelected.shippingMethodId ||
                   opt.shippingMethodName === preSelected.shippingMethodName
        )
        if (!existsInList) {
          shippingOpts = [preSelected, ...shippingOpts]
        }
      }
      
      // Handle no shipping options case
      if (shippingOpts.length === 0) {
        console.warn('No shipping options returned from Ecwid')
        setErrors({ general: 'No shipping options available for this address. Please check your address or try a different location.' })
        return // Stay on address step
      }
      
      // Update state
      setShippingOptions(shippingOpts)
      
      // Store base totals for local shipping recalculations
      // (we don't include shipping here - it gets added based on selection)
      baseTotalsRef.current = {
        subtotal: data.subtotal,
        tax: data.tax,
        discount: data.discount + data.couponDiscount,
      }
      
      // Auto-select the first real carrier option (not "Free Shipping" if there are others)
      const realCarrierOption = shippingOpts.find(opt => 
        opt.shippingCarrierName && opt.shippingCarrierName !== 'Free Shipping'
      )
      const selectedOption = realCarrierOption || shippingOpts[0]
      const shippingCost = selectedOption?.shippingRate || 0
      
      // Set initial totals with the auto-selected shipping
      setOrderTotals({
        subtotal: data.subtotal,
        shipping: shippingCost,
        tax: data.tax,
        discount: data.discount + data.couponDiscount,
        total: data.subtotal + shippingCost + data.tax - (data.discount + data.couponDiscount),
      })
      
      setSelectedShipping(selectedOption)
      
      setStep('shipping')
      
      // Track address step completion
      analytics.trackCheckoutStep('address', {
        has_billing_address: useDifferentBilling,
        country: shippingAddress.countryCode,
      })
    } catch (error) {
      console.error('Error calculating order:', error)
      setErrors({ general: 'Failed to calculate shipping. Please try again.' })
    } finally {
      setIsCalculating(false)
    }
  }, [items, email, shippingAddress, validateAddress, useDifferentBilling, billingAddress, couponCode])
  
  // Store the base totals (without shipping) from the initial calculation
  // This is set in calculateOrder when we first get shipping options
  const baseTotalsRef = useRef<{
    subtotal: number
    tax: number
    discount: number
  } | null>(null)
  
  // When user changes shipping option, update totals LOCALLY (no API call)
  // This avoids the "Shipping option unavailable" error from Ecwid
  useEffect(() => {
    if (selectedShipping && baseTotalsRef.current && step === 'shipping') {
      const { subtotal, tax, discount } = baseTotalsRef.current
      const shippingCost = selectedShipping.shippingRate || 0
      
      setOrderTotals({
        subtotal,
        shipping: shippingCost,
        tax, // Tax is already calculated on subtotal, not shipping for this store
        discount,
        total: subtotal + shippingCost + tax - discount,
      })
    }
  }, [selectedShipping, step])
  
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
      
      // Mark order as submitted to prevent abandonment tracking
      orderSubmittedRef.current = true
      
      // Track payment step
      analytics.trackCheckoutStep('payment', {
        order_total: orderTotals.total,
        shipping_method: selectedShipping?.shippingMethodName,
      })
      
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
                      onClick={() => {
                        // Track shipping step completion
                        analytics.trackCheckoutStep('shipping', {
                          shipping_method: selectedShipping.shippingMethodName,
                          shipping_rate: selectedShipping.shippingRate,
                        })
                        setStep('review')
                      }}
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
                isCalculated={step !== 'address'}
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
