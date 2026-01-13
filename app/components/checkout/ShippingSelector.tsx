'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Clock, Check, ChevronDown, Package } from 'lucide-react'
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

// Carrier icons/colors for better visual distinction
const CARRIER_CONFIG: Record<string, { color: string; icon?: string }> = {
  'FedEx': { color: 'bg-purple-100 text-purple-600' },
  'UPSv2': { color: 'bg-amber-100 text-amber-700' },
  'U.S.P.S.': { color: 'bg-blue-100 text-blue-600' },
  'USPS': { color: 'bg-blue-100 text-blue-600' },
  'default': { color: 'bg-gray-100 text-gray-600' },
}

interface CarrierGroup {
  carrierName: string
  displayName: string
  options: AvailableShippingOption[]
  lowestPrice: number
  hasSelectedOption: boolean
}

export function ShippingSelector({ 
  options, 
  selectedId, 
  onSelect, 
  isLoading = false,
  className 
}: ShippingSelectorProps) {
  // Group options by carrier
  const carrierGroups = useMemo(() => {
    const groups: Record<string, CarrierGroup> = {}
    
    options.forEach(option => {
      const carrierName = option.shippingCarrierName || 'Other'
      
      if (!groups[carrierName]) {
        // Clean up display name
        let displayName = carrierName
        if (carrierName === 'UPSv2') displayName = 'UPS'
        if (carrierName === 'U.S.P.S.') displayName = 'USPS'
        
        groups[carrierName] = {
          carrierName,
          displayName,
          options: [],
          lowestPrice: Infinity,
          hasSelectedOption: false,
        }
      }
      
      groups[carrierName].options.push(option)
      
      // Track lowest price for this carrier
      if (option.shippingRate < groups[carrierName].lowestPrice) {
        groups[carrierName].lowestPrice = option.shippingRate
      }
      
      // Check if this carrier has the selected option
      if (option.shippingMethodId === selectedId) {
        groups[carrierName].hasSelectedOption = true
      }
    })
    
    // Sort groups by lowest price only - don't reorder based on selection
    return Object.values(groups).sort((a, b) => a.lowestPrice - b.lowestPrice)
  }, [options])
  
  // Track which carrier groups are expanded
  const [expandedCarriers, setExpandedCarriers] = useState<Set<string>>(() => {
    // Auto-expand carrier that has the selected option, or first carrier
    const selectedCarrier = carrierGroups.find(g => g.hasSelectedOption)
    return new Set(selectedCarrier ? [selectedCarrier.carrierName] : 
                   carrierGroups.length > 0 ? [carrierGroups[0].carrierName] : [])
  })
  
  const toggleCarrier = (carrierName: string) => {
    setExpandedCarriers(prev => {
      const next = new Set(prev)
      if (next.has(carrierName)) {
        next.delete(carrierName)
      } else {
        next.add(carrierName)
      }
      return next
    })
  }
  
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
  
  // If only a few options, show flat list instead of groups
  if (options.length <= 4) {
    return (
      <div className={cn('space-y-3', className)}>
        <h3 className="text-lg font-semibold text-content-primary">Shipping Method</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <ShippingOptionButton
              key={option.shippingMethodId}
              option={option}
              isSelected={selectedId === option.shippingMethodId}
              onSelect={onSelect}
              showCarrier
            />
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold text-content-primary">Shipping Method</h3>
      <p className="text-sm text-content-muted">
        {carrierGroups.length} carriers available • {options.length} shipping options
      </p>
      
      <div className="space-y-3">
        {carrierGroups.map((group) => {
          const isExpanded = expandedCarriers.has(group.carrierName)
          const carrierConfig = CARRIER_CONFIG[group.carrierName] || CARRIER_CONFIG.default
          const selectedOption = group.options.find(o => o.shippingMethodId === selectedId)
          
          return (
            <div 
              key={group.carrierName}
              className={cn(
                'border-2 rounded-xl overflow-hidden transition-all',
                group.hasSelectedOption ? 'border-rock-orange' : 'border-light-border'
              )}
            >
              {/* Carrier Header */}
              <button
                onClick={() => toggleCarrier(group.carrierName)}
                className={cn(
                  'w-full flex items-center justify-between p-4 text-left transition-colors',
                  isExpanded ? 'bg-light-bg-subtle' : 'bg-white hover:bg-light-bg-subtle/50'
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Carrier Icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    carrierConfig.color
                  )}>
                    <Package className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-content-primary">
                        {group.displayName}
                      </span>
                      <span className="text-xs text-content-muted bg-light-bg-alt px-2 py-0.5 rounded-full">
                        {group.options.length} option{group.options.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {/* Show selected option or price range */}
                    <p className="text-sm text-content-muted">
                      {selectedOption ? (
                        <span className="text-rock-orange font-medium">
                          ✓ {selectedOption.shippingMethodName} - {selectedOption.shippingRate === 0 ? 'FREE' : formatPrice(selectedOption.shippingRate)}
                        </span>
                      ) : (
                        <>From {group.lowestPrice === 0 ? 'FREE' : formatPrice(group.lowestPrice)}</>
                      )}
                    </p>
                  </div>
                </div>
                
                <ChevronDown className={cn(
                  'w-5 h-5 text-content-muted transition-transform',
                  isExpanded && 'rotate-180'
                )} />
              </button>
              
              {/* Expanded Options */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 pt-0 space-y-2 bg-light-bg-subtle/30">
                      {group.options.map((option) => (
                        <ShippingOptionButton
                          key={option.shippingMethodId}
                          option={option}
                          isSelected={selectedId === option.shippingMethodId}
                          onSelect={onSelect}
                          showCarrier={false}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Individual shipping option button
function ShippingOptionButton({
  option,
  isSelected,
  onSelect,
  showCarrier = true,
}: {
  option: AvailableShippingOption
  isSelected: boolean
  onSelect: (option: AvailableShippingOption) => void
  showCarrier?: boolean
}) {
  const isFree = option.shippingRate === 0
  
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => onSelect(option)}
      className={cn(
        'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left',
        isSelected
          ? 'border-rock-orange bg-white shadow-sm'
          : 'border-transparent bg-white hover:border-light-border-strong'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Radio Indicator */}
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
          isSelected ? 'border-rock-orange bg-rock-orange' : 'border-light-border'
        )}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        
        {/* Icon for pickup */}
        {option.isPickup && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        
        {/* Details */}
        <div>
          <p className={cn(
            'font-medium text-sm',
            isSelected ? 'text-rock-orange' : 'text-content-primary'
          )}>
            {showCarrier && option.shippingCarrierName 
              ? `${option.shippingCarrierName} - ${option.shippingMethodName}`
              : option.shippingMethodName
            }
          </p>
          
          {option.estimatedTransitTime && (
            <p className="flex items-center gap-1 text-xs text-content-muted mt-0.5">
              <Clock className="w-3 h-3" />
              {option.estimatedTransitTime}
            </p>
          )}
          
          {option.isPickup && option.pickupInstruction && (
            <p className="text-xs text-content-muted mt-0.5">
              {option.pickupInstruction}
            </p>
          )}
        </div>
      </div>
      
      {/* Price */}
      <div className="text-right flex-shrink-0 ml-4">
        {isFree ? (
          <span className="text-green-600 font-semibold text-sm">FREE</span>
        ) : (
          <span className={cn(
            'font-semibold text-sm',
            isSelected ? 'text-rock-orange' : 'text-content-primary'
          )}>
            {formatPrice(option.shippingRate)}
          </span>
        )}
      </div>
    </motion.button>
  )
}
