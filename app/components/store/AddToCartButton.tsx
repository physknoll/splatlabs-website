'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import type { CartItem } from '@/lib/ecwid/types'
import { useCartStore } from '@/lib/stores/cart-store'

interface AddToCartButtonProps {
  item: CartItem
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showQuantity?: boolean
}

export function AddToCartButton({ 
  item, 
  disabled = false, 
  className,
  size = 'lg',
  showQuantity = true,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  
  const handleAddToCart = async () => {
    if (disabled || isAdding) return
    
    setIsAdding(true)
    
    // Simulate a brief delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Add item to cart
    addItem({
      ...item,
      quantity,
    })
    
    setIsAdding(false)
    setIsAdded(true)
    
    // Open cart sidebar
    openCart()
    
    // Reset "Added" state after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }
  
  return (
    <div className={cn('flex flex-col sm:flex-row gap-4', className)}>
      {/* Quantity Selector */}
      {showQuantity && (
        <div className="flex items-center border border-light-border rounded-xl overflow-hidden">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center text-content-secondary hover:bg-light-bg-subtle transition-colors disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <span className="text-xl font-medium">−</span>
          </button>
          
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 h-12 text-center font-semibold text-content-primary border-0 focus:outline-none focus:ring-0"
          />
          
          <button
            onClick={incrementQuantity}
            className="w-12 h-12 flex items-center justify-center text-content-secondary hover:bg-light-bg-subtle transition-colors"
            aria-label="Increase quantity"
          >
            <span className="text-xl font-medium">+</span>
          </button>
        </div>
      )}
      
      {/* Add to Cart Button */}
      <Button
        variant="primary"
        size={size}
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className={cn(
          'flex-1 relative overflow-hidden',
          isAdded && 'bg-green-600 hover:bg-green-600'
        )}
      >
        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Adding...
            </motion.span>
          ) : isAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Added to Cart
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {disabled ? 'Out of Stock' : 'Add to Cart'}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}
