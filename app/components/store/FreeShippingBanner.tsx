'use client'

import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/ecwid/products'
import { useCartStore, useCartHydration } from '@/lib/stores/cart-store'

interface FreeShippingBannerProps {
  threshold?: number
  className?: string
}

export function FreeShippingBanner({ threshold = 100, className }: FreeShippingBannerProps) {
  const isHydrated = useCartHydration()
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const items = useCartStore((state) => state.items)
  
  // Don't show if cart is empty or not hydrated
  if (!isHydrated || items.length === 0) {
    return null
  }
  
  const subtotal = getSubtotal()
  const remaining = threshold - subtotal
  const progress = Math.min((subtotal / threshold) * 100, 100)
  
  // Don't show if already qualified for free shipping
  if (remaining <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'fixed top-20 left-1/2 -translate-x-1/2 z-40',
          'px-4 py-2 bg-green-600 text-white rounded-full shadow-lg',
          'flex items-center gap-2 text-sm font-medium',
          className
        )}
      >
        <Truck className="w-4 h-4" />
        <span>You&apos;ve unlocked free shipping!</span>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'fixed top-20 left-1/2 -translate-x-1/2 z-40',
        'px-4 py-2 bg-white border border-light-border rounded-full shadow-lg',
        'flex items-center gap-3 text-sm',
        className
      )}
    >
      <Truck className="w-4 h-4 text-rock-orange" />
      <span className="text-content-secondary">
        Add <span className="font-semibold text-rock-orange">{formatPrice(remaining)}</span> more for free shipping
      </span>
      
      {/* Progress bar */}
      <div className="w-16 h-1.5 bg-light-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-rock-orange rounded-full"
        />
      </div>
    </motion.div>
  )
}
