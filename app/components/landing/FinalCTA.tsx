'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function FinalCTA() {
  return (
    <section className="py-32 lg:py-40 bg-gradient-to-b from-light-bg-subtle to-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-glow opacity-40" />

      {/* Content */}
      <div className="container-custom relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rock-orange/10 border border-rock-orange/20 mb-8"
          >
            <Sparkles className="w-8 h-8 text-rock-orange" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-content-primary mb-6">
            Ready to unlock your data?
          </h2>

          {/* Subtext */}
          <p className="text-xl text-content-secondary max-w-2xl mx-auto mb-10">
            Join thousands of professionals turning static scans into living
            experiences. Start free, upgrade anytime.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="shadow-soft-lg"
            >
              Create Free Account
            </Button>
            <Button variant="outline" size="xl">
              Talk to Sales
            </Button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-content-muted"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Free plan forever
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Cancel anytime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
