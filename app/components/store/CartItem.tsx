'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/lib/ecwid/types'
import { formatPrice } from '@/lib/ecwid/products'
import { useCartStore } from '@/lib/stores/cart-store'

interface CartItemProps {
  item: CartItemType
  index?: number
}

export function CartItem({ item, index = 0 }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  
  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1, item.combinationId)
  }
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1, item.combinationId)
    }
  }
  
  const handleRemove = () => {
    removeItem(item.productId, item.combinationId)
  }
  
  const lineTotal = item.price * item.quantity
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 py-4 border-b border-light-border last:border-0"
    >
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-light-bg-subtle rounded-lg overflow-hidden">
        {item.imageUrl || item.thumbnailUrl ? (
          <Image
            src={item.thumbnailUrl || item.imageUrl || ''}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-content-muted text-xs">
            No image
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-content-primary text-sm line-clamp-2 mb-1">
          {item.name}
        </h4>
        
        {/* Selected Options */}
        {item.selectedOptions && item.selectedOptions.length > 0 && (
          <p className="text-xs text-content-muted mb-2">
            {item.selectedOptions.map((opt) => opt.value).join(', ')}
          </p>
        )}
        
        {/* Price per item */}
        <p className="text-sm text-content-secondary mb-2">
          {formatPrice(item.price)} each
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-light-border rounded-lg overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className={cn(
                'w-8 h-8 flex items-center justify-center transition-colors',
                item.quantity <= 1 
                  ? 'text-content-dim cursor-not-allowed' 
                  : 'text-content-secondary hover:bg-light-bg-subtle'
              )}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            
            <span className="w-10 text-center text-sm font-medium text-content-primary">
              {item.quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center text-content-secondary hover:bg-light-bg-subtle transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="p-2 text-content-muted hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Line Total */}
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-content-primary">
          {formatPrice(lineTotal)}
        </p>
      </div>
    </motion.div>
  )
}
