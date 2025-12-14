'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { PRICING_PLANS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function PricingPreview() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="container-custom relative">
        <SectionHeader
          badge="Pricing"
          title="Simple, project-based pricing"
          description="No confusing storage limits. Just count your active projects."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl border p-6 flex flex-col bg-white',
                plan.highlighted
                  ? 'border-rock-orange shadow-soft-lg'
                  : 'border-light-border shadow-soft'
              )}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-rock-orange text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-heading font-bold text-content-primary mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                {plan.price.monthly !== null ? (
                  <>
                    <span className="text-4xl font-bold text-content-primary">
                      ${plan.price.monthly}
                    </span>
                    <span className="text-content-muted">/mo</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-content-primary">Custom</span>
                )}
              </div>

              {/* Projects */}
              <div className="mb-6 p-3 bg-light-bg-subtle rounded-lg border border-light-border text-center">
                <span className="block text-2xl font-bold text-content-primary">
                  {plan.projects}
                </span>
                <span className="text-xs text-content-muted uppercase">
                  Active Projects
                </span>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-6">
                {plan.features.slice(0, 4).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-content-secondary"
                  >
                    <Check className="w-4 h-4 text-rock-orange flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* View Full Pricing Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-rock-orange font-semibold hover:gap-3 transition-all"
          >
            View full pricing & compare features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
