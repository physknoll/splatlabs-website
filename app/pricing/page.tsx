'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SPLAT_PRICING_PLANS } from '@/lib/constants'
import { SectionHeader } from '@/app/components/ui/SectionHeader'
import { BillingToggle } from '@/app/components/pricing/BillingToggle'
import { FullPricingCard } from '@/app/components/pricing/FullPricingCard'
import { FeatureComparison } from '@/app/components/pricing/FeatureComparison'

type PlanType = 'splat' | 'lidar'

export default function PricingPage() {
  const [planType, setPlanType] = useState<PlanType>('splat')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <SectionHeader
          badge="Pricing"
          title="Choose Your Plan"
          description="Start with a free plan. Upgrade anytime."
        />

        {/* Plan Type Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-light-bg-subtle rounded-xl border border-light-border">
            <button
              onClick={() => setPlanType('splat')}
              className={cn(
                'relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                planType === 'splat'
                  ? 'text-content-primary'
                  : 'text-content-muted hover:text-content-primary'
              )}
            >
              {planType === 'splat' && (
                <motion.div
                  layoutId="active-plan-type"
                  className="absolute inset-0 bg-white border border-light-border rounded-lg shadow-soft"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Gaussian Splat
              </span>
            </button>
            <button
              onClick={() => setPlanType('lidar')}
              className={cn(
                'relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                planType === 'lidar'
                  ? 'text-content-primary'
                  : 'text-content-muted hover:text-content-primary'
              )}
            >
              {planType === 'lidar' && (
                <motion.div
                  layoutId="active-plan-type"
                  className="absolute inset-0 bg-white border border-light-border rounded-lg shadow-soft"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Radio className="w-4 h-4" />
                LiDAR & Point Cloud
              </span>
            </button>
          </div>
        </div>

        {/* Billing Toggle */}
        <BillingToggle
          billingPeriod={billingPeriod}
          onChange={setBillingPeriod}
          className="mb-6"
        />

        {/* Plan Description */}
        <p className="text-center text-content-muted mb-12">
          {planType === 'splat'
            ? 'Perfect for photogrammetry, 3D captures, and immersive experiences.'
            : 'Advanced point cloud processing for surveying and mapping professionals.'}
        </p>

        {/* Pricing Cards */}
        {planType === 'splat' ? (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-content-secondary mb-4">
              LiDAR & Point Cloud pricing coming soon.
            </p>
            <a
              href="https://cloud.rockrobotic.com/"
              className="text-rock-orange font-medium hover:text-rock-orange-dark transition-colors"
            >
              Visit Rock Cloud for current LiDAR pricing →
            </a>
          </div>
        )}

        {/* Feature Comparison */}
        {planType === 'splat' && <FeatureComparison />}
      </div>
    </main>
  )
}
