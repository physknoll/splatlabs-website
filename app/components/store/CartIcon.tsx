'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore, useCartItemCount } from '@/lib/stores/cart-store'

interface CartIconProps {
  className?: string
}

export function CartIcon({ className }: CartIconProps) {
  const openCart = useCartStore((state) => state.openCart)
  const itemCount = useCartItemCount()
  
  return (
    <button
      onClick={openCart}
      className={cn(
        'relative p-2 text-content-secondary hover:text-content-primary hover:bg-light-bg-subtle rounded-lg transition-colors',
        className
      )}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-5 h-5 3xl:w-6 3xl:h-6" />
      
      {/* Badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn(
              'absolute -top-0.5 -right-0.5',
              'min-w-[18px] h-[18px] px-1',
              'flex items-center justify-center',
              'bg-rock-orange text-white text-[10px] font-bold',
              'rounded-full'
            )}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
