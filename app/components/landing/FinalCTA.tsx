'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function FinalCTA() {
  return (
    <section className="py-32 lg:py-40 3xl:py-48 4xl:py-56 bg-gradient-to-b from-light-bg-subtle to-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 3xl:w-[1100px] 3xl:h-[1100px] 4xl:w-[1400px] 4xl:h-[1400px] hero-glow opacity-40" />

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
            className="inline-flex items-center justify-center w-16 h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 rounded-2xl 3xl:rounded-3xl bg-rock-orange/10 border border-rock-orange/20 mb-8 3xl:mb-10"
          >
            <Sparkles className="w-8 h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-rock-orange" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl font-heading font-black text-content-primary mb-6 3xl:mb-8">
            Ready to unlock your data?
          </h2>

          {/* Subtext */}
          <p className="text-xl 3xl:text-2xl 4xl:text-3xl text-content-secondary max-w-2xl 3xl:max-w-3xl mx-auto mb-10 3xl:mb-12">
            Join thousands of professionals turning static scans into living
            experiences. Start free, upgrade anytime.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 3xl:gap-6">
            <a href="https://cloud.rockrobotic.com/">
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="shadow-soft-lg"
              >
                Create Free Account
              </Button>
            </a>
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
            className="mt-12 3xl:mt-16 flex flex-wrap items-center justify-center gap-6 3xl:gap-8 text-sm 3xl:text-base 4xl:text-lg text-content-muted"
          >
            <span className="flex items-center gap-2 3xl:gap-3">
              <div className="w-2 h-2 3xl:w-3 3xl:h-3 rounded-full bg-green-500" />
              Start in minutes
            </span>
            <span className="flex items-center gap-2 3xl:gap-3">
              <div className="w-2 h-2 3xl:w-3 3xl:h-3 rounded-full bg-green-500" />
              Cancel anytime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
