'use client'

import { useState, useEffect, useRef } from 'react'
import { SPLAT_PRICING_PLANS } from '@/lib/constants'
import { SectionHeader } from '@/app/components/ui/SectionHeader'
import { BillingToggle } from '@/app/components/pricing/BillingToggle'
import { FullPricingCard } from '@/app/components/pricing/FullPricingCard'
import { FeatureComparison } from '@/app/components/pricing/FeatureComparison'
import { analytics } from '@/lib/analytics'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')
  const hasTrackedView = useRef(false)
  
  // Track pricing page view
  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true
      analytics.trackPricingViewed(billingPeriod)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  // Handle billing period change with tracking
  const handleBillingChange = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period)
    analytics.trackBillingToggleChanged(period)
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <SectionHeader
          badge="Pricing"
          title="Choose Your Plan"
          description="Start with a free plan. Upgrade anytime."
        />

        {/* Billing Toggle */}
        <BillingToggle
          billingPeriod={billingPeriod}
          onChange={handleBillingChange}
          className="mb-6"
        />

        {/* Plan Description */}
        <p className="text-center text-content-muted mb-12">
          No confusing storage limits. Just count your active projects.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-8">
          {SPLAT_PRICING_PLANS.map((plan, index) => (
            <FullPricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              index={index}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison />
      </div>
    </main>
  )
}
