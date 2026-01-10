'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EcwidProduct } from '@/lib/ecwid/types'
import { hasLowStock, getStockStatus } from '@/lib/ecwid/products'

interface LowStockBadgeProps {
  product: EcwidProduct
  showWhenInStock?: boolean
  className?: string
}

export function LowStockBadge({ product, showWhenInStock = false, className }: LowStockBadgeProps) {
  const stockStatus = getStockStatus(product)
  
  // Don't show anything if product is in stock and we don't want to show that
  if (stockStatus.status === 'in_stock' && !showWhenInStock) {
    return null
  }
  
  if (stockStatus.status === 'out_of_stock') {
    return (
      <div className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
        'bg-gray-100 text-gray-600',
        className
      )}>
        <span>Out of Stock</span>
      </div>
    )
  }
  
  if (stockStatus.status === 'low_stock') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
          'bg-amber-100 text-amber-700',
          className
        )}
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>{stockStatus.message}</span>
      </motion.div>
    )
  }
  
  if (showWhenInStock && stockStatus.status === 'in_stock') {
    return (
      <div className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
        'bg-green-100 text-green-700',
        className
      )}>
        <span>✓ In Stock</span>
      </div>
    )
  }
  
  return null
}
