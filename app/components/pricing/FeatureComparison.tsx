'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SPLAT_FEATURE_COMPARISON } from '@/lib/constants'

interface FeatureComparisonProps {
  className?: string
}

export function FeatureComparison({ className }: FeatureComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const renderValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
          <Check className="w-4 h-4" />
        </span>
      )
    }
    if (value === false) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
          <Minus className="w-3 h-3" />
        </span>
      )
    }
    // Custom string value like "Optional" or "3+"
    return (
      <span className="text-sm font-medium text-content-secondary">{value}</span>
    )
  }

  return (
    <div className={cn('mt-16 3xl:mt-20', className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mx-auto text-content-secondary hover:text-content-primary transition-colors"
      >
        <ChevronDown
          className={cn(
            'w-5 h-5 transition-transform duration-300',
            isExpanded && 'rotate-180'
          )}
        />
        <span className="text-sm font-medium">Compare all features</span>
      </button>

      {/* Comparison Table */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-light-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-content-primary w-1/3">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-content-primary">
                      Starter
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-content-primary">
                      Business
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-content-primary">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SPLAT_FEATURE_COMPARISON.map((feature, index) => (
                    <motion.tr
                      key={feature.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={cn(
                        'border-b border-light-border/50',
                        index % 2 === 0 ? 'bg-white' : 'bg-light-bg-subtle/50'
                      )}
                    >
                      <td className="py-3 px-4 text-sm text-content-secondary">
                        {feature.label}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderValue(feature.starter)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderValue(feature.business)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderValue(feature.enterprise)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
