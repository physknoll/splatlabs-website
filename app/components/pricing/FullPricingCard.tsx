'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Gift, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { TierSlider } from './TierSlider'
import { analytics } from '@/lib/analytics'
import type { TieredPlan } from '@/lib/constants'

interface FullPricingCardProps {
  plan: TieredPlan
  billingPeriod: 'monthly' | 'yearly'
  index: number
}

export function FullPricingCard({
  plan,
  billingPeriod,
  index,
}: FullPricingCardProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(plan.defaultTierIndex)

  const selectedTier = useMemo(() => {
    return plan.tiers[selectedTierIndex]
  }, [plan.tiers, selectedTierIndex])

  const isYearly = billingPeriod === 'yearly'
  const price = isYearly ? selectedTier.yearly : selectedTier.monthly
  const monthlyEquivalent = isYearly
    ? selectedTier.monthlyEquivalent || Math.round(selectedTier.yearly / 12)
    : null
  const isContactSales = selectedTier.contactSales
  
  // Handle tier change with analytics
  const handleTierChange = (newIndex: number) => {
    setSelectedTierIndex(newIndex)
    const tier = plan.tiers[newIndex]
    const tierPrice = isYearly ? tier.yearly : tier.monthly
    const projectsStr = String(tier.projects)
    
    analytics.trackPricingTierChanged({
      plan_name: plan.name,
      tier_index: newIndex,
      tier_projects: parseInt(projectsStr.replace(/\D/g, '')) || 0,
      price: tierPrice,
      billing_period: billingPeriod,
    })
  }
  
  // Handle CTA click with analytics
  const handleCTAClick = () => {
    const projectsStr = String(selectedTier.projects)
    
    analytics.trackPlanSelected({
      plan_name: plan.name,
      tier_index: selectedTierIndex,
      tier_projects: parseInt(projectsStr.replace(/\D/g, '')) || 0,
      price,
      billing_period: billingPeriod,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative rounded-2xl border p-6 3xl:p-8 flex flex-col h-full bg-white',
        plan.highlighted
          ? 'border-rock-orange shadow-soft-lg'
          : 'border-light-border shadow-soft'
      )}
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 3xl:px-4 3xl:py-1.5 bg-rock-orange text-white text-xs 3xl:text-sm font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
          <span>✦</span> Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl 3xl:text-2xl font-heading font-bold text-content-primary mb-1">
        {plan.name}
      </h3>

      {/* Price Display */}
      <div className="mb-4 3xl:mb-6">
        {isContactSales ? (
          <>
            <span className="text-3xl 3xl:text-4xl font-bold text-content-primary">
              Contact Sales
            </span>
            <p className="text-sm text-content-muted mt-1">
              Custom pricing for your needs
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-content-muted">$</span>
              <span className="text-4xl 3xl:text-5xl font-bold text-content-primary">
                {isYearly ? price.toLocaleString() : price}
              </span>
              <span className="text-content-muted">{isYearly ? '/year' : '/mo'}</span>
            </div>
            {isYearly && monthlyEquivalent && (
              <p className="text-sm text-content-muted mt-1">
                ${monthlyEquivalent}/mo billed annually
              </p>
            )}
          </>
        )}
      </div>

      {/* Tier Slider */}
      <div className="mb-6 3xl:mb-8">
        <TierSlider
          tiers={plan.tiers}
          selectedIndex={selectedTierIndex}
          onChange={handleTierChange}
          label="Active Projects"
        />
      </div>

      {/* Users display for Enterprise */}
      {selectedTier.users && (
        <div className="mb-4 flex items-center gap-2 text-sm text-content-secondary">
          <Users className="w-4 h-4" />
          <span>
            <strong>{selectedTier.users}</strong> Users
          </span>
        </div>
      )}

      {/* CTA Button */}
      <div className="mb-6">
        <a 
          href="https://cloud.rockrobotic.com/" 
          className="w-full block"
          onClick={handleCTAClick}
        >
          <Button
            variant={plan.highlighted ? 'primary' : 'outline'}
            size="lg"
            className="w-full"
          >
            {isContactSales ? 'Contact Sales' : plan.cta}
          </Button>
        </a>
      </div>

      {/* Features Header */}
      <div className="text-xs font-semibold uppercase tracking-wider text-content-muted mb-3">
        {plan.featuresHeader}
      </div>

      {/* Features List */}
      <ul className="flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-content-secondary"
          >
            <span className="text-rock-orange mt-0.5">•</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Yearly Bonus */}
      {plan.yearlyBonus && isYearly && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg"
        >
          <div className="flex items-center gap-2 text-sm">
            <Gift className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-800">{plan.yearlyBonus}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
