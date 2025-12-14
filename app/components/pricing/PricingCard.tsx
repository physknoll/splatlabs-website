'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'

interface PricingCardProps {
  name: string
  price: { monthly: number | null; yearly: number | null }
  projects: number | string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  billingPeriod: 'monthly' | 'yearly'
  index: number
}

export function PricingCard({
  name,
  price,
  projects,
  description,
  features,
  cta,
  highlighted = false,
  billingPeriod,
  index,
}: PricingCardProps) {
  const currentPrice = billingPeriod === 'monthly' ? price.monthly : price.yearly
  const monthlyEquivalent =
    billingPeriod === 'yearly' && price.yearly
      ? (price.yearly / 12).toFixed(2)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative rounded-2xl border p-8 flex flex-col h-full',
        highlighted
          ? 'border-rock-orange bg-gradient-to-b from-rock-orange/10 to-transparent'
          : 'border-rock-border bg-rock-panel'
      )}
    >
      {/* Popular Badge */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-rock-orange text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-glow-sm">
          Most Popular
        </div>
      )}

      {/* Plan Name & Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">
          {name}
        </h3>
        <p className="text-rock-text-muted text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {currentPrice !== null ? (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">${currentPrice}</span>
              <span className="text-rock-text-muted">
                /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            {monthlyEquivalent && (
              <p className="text-sm text-rock-text-dim mt-1">
                ${monthlyEquivalent}/mo billed annually
              </p>
            )}
          </>
        ) : (
          <div className="text-3xl font-bold text-white">Custom Pricing</div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
        <span className="block text-3xl font-bold text-white">{projects}</span>
        <span className="text-sm text-rock-text-dim uppercase tracking-wide">
          Active Projects
        </span>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-rock-text-muted"
          >
            <Check className="w-5 h-5 text-rock-orange flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={highlighted ? 'primary' : 'outline'}
        size="lg"
        className="w-full"
      >
        {cta}
      </Button>
    </motion.div>
  )
}

