'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/ecwid/products'
import type { CartItem } from '@/lib/ecwid/types'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  discount?: number
  total: number
  isCalculating?: boolean
  className?: string
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  discount = 0,
  total,
  isCalculating = false,
  className,
}: OrderSummaryProps) {
  return (
    <div className={cn('bg-light-bg-subtle rounded-2xl p-6', className)}>
      <h3 className="text-lg font-semibold text-content-primary mb-4">Order Summary</h3>
      
      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div 
            key={`${item.productId}-${item.combinationId ?? 'default'}`}
            className="flex gap-3"
          >
            {/* Thumbnail */}
            <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-lg overflow-hidden">
              {item.thumbnailUrl || item.imageUrl ? (
                <Image
                  src={item.thumbnailUrl || item.imageUrl || ''}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-content-dim text-xs">
                  No img
                </div>
              )}
              
              {/* Quantity Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-content-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            
            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-content-primary line-clamp-1">
                {item.name}
              </p>
              {item.selectedOptions && item.selectedOptions.length > 0 && (
                <p className="text-xs text-content-muted line-clamp-1">
                  {item.selectedOptions.map((opt) => opt.value).join(', ')}
                </p>
              )}
            </div>
            
            {/* Line Total */}
            <div className="text-sm font-medium text-content-primary flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <div className="border-t border-light-border pt-4 space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-content-secondary">Subtotal</span>
          <span className="text-content-primary">{formatPrice(subtotal)}</span>
        </div>
        
        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-{formatPrice(discount)}</span>
          </div>
        )}
        
        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-content-secondary">Shipping</span>
          {isCalculating ? (
            <span className="text-content-muted">Calculating...</span>
          ) : shipping === 0 ? (
            <span className="text-green-600 font-medium">FREE</span>
          ) : (
            <span className="text-content-primary">{formatPrice(shipping)}</span>
          )}
        </div>
        
        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-content-secondary">Tax</span>
          {isCalculating ? (
            <span className="text-content-muted">Calculating...</span>
          ) : (
            <span className="text-content-primary">{formatPrice(tax)}</span>
          )}
        </div>
      </div>
      
      {/* Total */}
      <div className="border-t border-light-border mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-content-primary">Total</span>
          {isCalculating ? (
            <span className="text-lg font-bold text-content-muted">Calculating...</span>
          ) : (
            <span className="text-lg font-bold text-rock-orange">{formatPrice(total)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
