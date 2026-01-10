'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RecentlyViewedBadgeProps {
  productId: number
  className?: string
}

/**
 * Shows "X people are viewing this" - for social proof
 * This is a simulated count for demonstration. In production,
 * you would integrate with real analytics.
 */
export function RecentlyViewedBadge({ productId, className }: RecentlyViewedBadgeProps) {
  const [viewerCount, setViewerCount] = useState(0)
  const [showPurchase, setShowPurchase] = useState(false)
  
  useEffect(() => {
    // Simulate a random viewer count based on product ID
    // In production, this would come from real analytics
    const baseCount = (productId % 10) + 3
    setViewerCount(baseCount)
    
    // Occasionally show "someone just purchased" notification
    const purchaseTimeout = setTimeout(() => {
      if (Math.random() > 0.7) {
        setShowPurchase(true)
        setTimeout(() => setShowPurchase(false), 5000)
      }
    }, 10000)
    
    return () => clearTimeout(purchaseTimeout)
  }, [productId])
  
  return (
    <div className={cn('space-y-2', className)}>
      {/* Viewing now */}
      <div className="flex items-center gap-2 text-sm text-content-muted">
        <Eye className="w-4 h-4" />
        <span>
          <span className="font-medium text-content-secondary">{viewerCount}</span> people viewing this right now
        </span>
      </div>
      
      {/* Recent purchase notification */}
      <AnimatePresence>
        {showPurchase && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Someone just purchased this!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
