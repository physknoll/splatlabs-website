'use client'

import { motion } from 'framer-motion'
import { Truck, Clock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/ecwid/products'
import type { AvailableShippingOption } from '@/lib/ecwid/types'

interface ShippingSelectorProps {
  options: AvailableShippingOption[]
  selectedId: string | null
  onSelect: (option: AvailableShippingOption) => void
  isLoading?: boolean
  className?: string
}

export function ShippingSelector({ 
  options, 
  selectedId, 
  onSelect, 
  isLoading = false,
  className 
}: ShippingSelectorProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        <h3 className="text-lg font-semibold text-content-primary">Shipping Method</h3>
        <div className="flex items-center gap-3 p-4 bg-light-bg-subtle rounded-xl">
          <div className="w-5 h-5 border-2 border-rock-orange border-t-transparent rounded-full animate-spin" />
          <span className="text-content-muted">Calculating shipping options...</span>
        </div>
      </div>
    )
  }
  
  if (options.length === 0) {
    return (
      <div className={cn('space-y-3', className)}>
        <h3 className="text-lg font-semibold text-content-primary">Shipping Method</h3>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
          No shipping options available for this address. Please check your address details.
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold text-content-primary">Shipping Method</h3>
      
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedId === option.shippingMethodId
          const isFree = option.shippingRate === 0
          
          return (
            <motion.button
              key={option.shippingMethodId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(option)}
              className={cn(
                'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left',
                isSelected
                  ? 'border-rock-orange bg-rock-orange/5'
                  : 'border-light-border bg-white hover:border-light-border-strong'
              )}
            >
              <div className="flex items-center gap-4">
                {/* Radio Indicator */}
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isSelected ? 'border-rock-orange bg-rock-orange' : 'border-light-border'
                )}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                
                {/* Icon */}
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  isSelected ? 'bg-rock-orange/10' : 'bg-light-bg-subtle'
                )}>
                  {option.isPickup ? (
                    <svg className="w-5 h-5 text-rock-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <Truck className={cn('w-5 h-5', isSelected ? 'text-rock-orange' : 'text-content-muted')} />
                  )}
                </div>
                
                {/* Details */}
                <div>
                  <p className={cn(
                    'font-medium',
                    isSelected ? 'text-rock-orange' : 'text-content-primary'
                  )}>
                    {option.shippingCarrierName 
                      ? `${option.shippingCarrierName} - ${option.shippingMethodName}`
                      : option.shippingMethodName
                    }
                  </p>
                  
                  {option.estimatedTransitTime && (
                    <p className="flex items-center gap-1.5 text-sm text-content-muted mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {option.estimatedTransitTime}
                    </p>
                  )}
                  
                  {option.isPickup && option.pickupInstruction && (
                    <p className="text-sm text-content-muted mt-0.5">
                      {option.pickupInstruction}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right flex-shrink-0 ml-4">
                {isFree ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  <span className={cn(
                    'font-semibold',
                    isSelected ? 'text-rock-orange' : 'text-content-primary'
                  )}>
                    {formatPrice(option.shippingRate)}
                  </span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
