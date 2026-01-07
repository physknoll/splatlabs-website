'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { PRICING_PLANS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function PricingPreview() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')
  const isYearly = billingPeriod === 'yearly'

  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom relative">
        <SectionHeader
          badge="Pricing"
          title="Simple, project-based pricing"
          description="No confusing storage limits. Just count your active projects."
        />

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span
            className={cn(
              'text-sm font-medium transition-colors cursor-pointer',
              !isYearly ? 'text-content-primary' : 'text-content-muted'
            )}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            onClick={() => setBillingPeriod(isYearly ? 'monthly' : 'yearly')}
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
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
            </span>
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-500 rounded-full">
              Save up to 30%
            </span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-8 4xl:gap-10">
          {PRICING_PLANS.map((plan, i) => {
            const price = isYearly ? plan.startingPrice.yearly : plan.startingPrice.monthly
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  'relative rounded-2xl 3xl:rounded-3xl border p-6 3xl:p-8 4xl:p-10 flex flex-col bg-white',
                  plan.highlighted
                    ? 'border-rock-orange shadow-soft-lg'
                    : 'border-light-border shadow-soft'
                )}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 3xl:px-4 3xl:py-1.5 bg-rock-orange text-white text-xs 3xl:text-sm font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <span>✦</span> Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl 3xl:text-2xl 4xl:text-3xl font-heading font-bold text-content-primary mb-2 3xl:mb-3">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4 3xl:mb-6">
                  <span className="text-sm text-content-muted">Starting at </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-content-muted">$</span>
                    <span className="text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-content-primary">
                      {price}
                    </span>
                    <span className="text-content-muted 3xl:text-lg">/mo</span>
                  </div>
                  {isYearly && (
                    <p className="text-xs text-content-dim mt-1">billed annually</p>
                  )}
                </div>

                {/* Projects */}
                <div className="mb-6 3xl:mb-8 p-3 3xl:p-4 bg-light-bg-subtle rounded-lg border border-light-border text-center">
                  <span className="block text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-content-primary">
                    {plan.projects}
                  </span>
                  <span className="text-xs 3xl:text-sm text-content-muted uppercase">
                    Active Projects
                  </span>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 3xl:space-y-4 mb-6 3xl:mb-8">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm 3xl:text-base 4xl:text-lg text-content-secondary"
                    >
                      <Check className="w-4 h-4 3xl:w-5 3xl:h-5 text-rock-orange flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href="https://cloud.rockrobotic.com/" className="w-full">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* View Full Pricing Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 3xl:mt-16"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-rock-orange font-semibold 3xl:text-lg 4xl:text-xl hover:gap-3 transition-all"
          >
            View full pricing & compare features
            <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
