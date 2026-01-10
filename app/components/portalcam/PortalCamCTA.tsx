'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'

const specs = [
  { label: 'Resolution', value: '8K Capture' },
  { label: 'LiDAR Range', value: '0.2-5m' },
  { label: 'FOV', value: '360° × 180°' },
  { label: 'Processing', value: 'On-device' },
]

export function PortalCamCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Top Section - Product Showcase */}
      <div className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Main Product Image - PortalCam camera (high-res) */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                <motion.img
                  src="/portalcam/images/portalcam_hero.png"
                  alt="PortalCam Spatial Camera"
                  className="w-full h-full object-contain"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-rock-orange/10 via-transparent to-transparent blur-2xl -z-10" />
              </div>

              {/* Floating Specs - Below the image */}
              <div className="flex justify-center gap-3 flex-wrap">
                {specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="px-4 py-2 bg-white border border-light-border rounded-full shadow-soft"
                  >
                    <span className="text-xs text-content-muted">{spec.label}:</span>{' '}
                    <span className="text-sm font-semibold text-content-primary">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-rock-orange text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-rock-orange/10">
                Get Started
              </span>

              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-content-primary mb-6 leading-tight">
                Ready to capture{' '}
                <span className="gradient-text-orange">reality?</span>
              </h2>

              <p className="text-lg md:text-xl text-content-secondary mb-8 leading-relaxed">
                Join thousands of professionals creating immersive 3D experiences
                with PortalCam. From real estate walkthroughs to film production
                environments—start capturing today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Buy PortalCam
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Talk to Sales
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-6 text-sm text-content-muted">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>1-year warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Band - Powered by Splat Labs */}
      <div className="bg-[#0a0a0a] py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/50 text-sm uppercase tracking-wider mb-4">
              Powered by
            </p>
            <img
              src="/logo/SVG/splatlabs_logo_full_transparent.svg"
              alt="Splat Labs"
              className="h-10 mx-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-white/60 max-w-xl mx-auto">
              PortalCam captures are processed and hosted on Splat Labs—the
              leading platform for 3D Gaussian Splat hosting and collaboration.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
