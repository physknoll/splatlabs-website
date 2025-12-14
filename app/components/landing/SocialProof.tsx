'use client'

import { motion } from 'framer-motion'
import { TRUST_LOGOS } from '@/lib/constants'

export function SocialProof() {
  return (
    <section className="relative py-12 border-y border-light-border bg-light-bg-subtle overflow-hidden">
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-content-muted uppercase tracking-wider">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {TRUST_LOGOS.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="text-xl md:text-2xl font-heading font-bold text-content-muted/60 hover:text-rock-orange transition-all duration-300 cursor-default"
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
