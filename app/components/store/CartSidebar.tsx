'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore, useCartHydration } from '@/lib/stores/cart-store'
import { formatPrice } from '@/lib/ecwid/products'
import { Button } from '../ui/Button'
import { CartItem } from './CartItem'

export function CartSidebar() {
  const isHydrated = useCartHydration()
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const getItemCount = useCartStore((state) => state.getItemCount)
  const clearCart = useCartStore((state) => state.clearCart)
  
  const itemCount = isHydrated ? getItemCount() : 0
  const subtotal = isHydrated ? getSubtotal() : 0
  
  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeCart])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 bottom-0 z-50',
              'w-full max-w-md bg-white shadow-2xl',
              'flex flex-col'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-light-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-rock-orange" />
                <h2 className="text-lg font-semibold text-content-primary">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="px-2 py-0.5 bg-rock-orange text-white text-xs font-medium rounded-full">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-content-muted hover:text-content-primary hover:bg-light-bg-subtle rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {!isHydrated ? (
                // Loading state
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-rock-orange border-t-transparent rounded-full animate-spin" />
                </div>
              ) : items.length === 0 ? (
                // Empty cart
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-24 h-24 bg-light-bg-subtle rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-content-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-content-primary mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-content-muted mb-6">
                    Looks like you haven&apos;t added anything yet.
                  </p>
                  <Link href="/store" onClick={closeCart}>
                    <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Browse Products
                    </Button>
                  </Link>
                </div>
              ) : (
                // Cart items
                <div className="px-6 py-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <CartItem 
                        key={`${item.productId}-${item.combinationId ?? 'default'}`}
                        item={item}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 mt-4 text-sm text-content-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear cart
                  </button>
                </div>
              )}
            </div>
            
            {/* Footer - only show if cart has items */}
            {isHydrated && items.length > 0 && (
              <div className="border-t border-light-border px-6 py-4 space-y-4 bg-light-bg-subtle">
                {/* Free Shipping Progress */}
                <FreeShippingProgress subtotal={subtotal} threshold={100} />
                
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-content-secondary">Subtotal</span>
                  <span className="font-bold text-content-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                
                <p className="text-xs text-content-muted">
                  Shipping and taxes calculated at checkout
                </p>
                
                {/* Checkout Button */}
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                
                {/* Continue Shopping */}
                <Link 
                  href="/store" 
                  onClick={closeCart}
                  className="block text-center text-sm text-content-muted hover:text-rock-orange transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Free shipping progress component
function FreeShippingProgress({ subtotal, threshold }: { subtotal: number; threshold: number }) {
  const remaining = threshold - subtotal
  const progress = Math.min((subtotal / threshold) * 100, 100)
  
  if (remaining <= 0) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        You&apos;ve unlocked free shipping!
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-content-secondary">
        Add <span className="font-semibold text-rock-orange">{formatPrice(remaining)}</span> more for free shipping
      </p>
      <div className="h-2 bg-light-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-rock-orange rounded-full"
        />
      </div>
    </div>
  )
}
