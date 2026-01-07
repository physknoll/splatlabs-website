'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BillingToggleProps {
  billingPeriod: 'monthly' | 'yearly'
  onChange: (period: 'monthly' | 'yearly') => void
  className?: string
}

export function BillingToggle({
  billingPeriod,
  onChange,
  className,
}: BillingToggleProps) {
  const isYearly = billingPeriod === 'yearly'

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <span
        className={cn(
          'text-sm font-medium transition-colors cursor-pointer',
          !isYearly ? 'text-content-primary' : 'text-content-muted'
        )}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        onClick={() => onChange(isYearly ? 'monthly' : 'yearly')}
        className="relative w-14 h-7 bg-light-bg-subtle border border-light-border rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rock-orange focus-visible:ring-offset-2"
      >
        <motion.div
          className="absolute top-0.5 w-6 h-6 bg-rock-orange rounded-full shadow-sm"
          animate={{
            left: isYearly ? 'calc(100% - 1.625rem)' : '0.125rem',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>

      <span className="flex items-center gap-2">
        <span
          className={cn(
            'text-sm font-medium transition-colors cursor-pointer',
            isYearly ? 'text-content-primary' : 'text-content-muted'
          )}
          onClick={() => onChange('yearly')}
        >
          Yearly
        </span>
        <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-500 rounded-full">
          Save up to 30%
        </span>
      </span>
    </div>
  )
}
