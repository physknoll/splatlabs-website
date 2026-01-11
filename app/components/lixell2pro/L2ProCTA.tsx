'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Gift } from 'lucide-react'
import { Button } from '../ui/Button'

const specs = [
  { label: 'Absolute Accuracy', value: '3cm' },
  { label: 'Point Density', value: '1M/m²' },
  { label: 'Cloud Thickness', value: '5mm' },
  { label: 'Processing', value: 'Real-time' },
]

const starterPlanFeatures = [
  '5 Active Projects',
  'Gaussian Splat Hosting',
  'Precise Measurements',
  'Unlimited Sharing',
  'Splat Movie Creation',
  'Embed & Share',
  'VR Viewer Support',
]

export function L2ProCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Top Section - Product Showcase */}
      <div className="section-padding bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Main Product Image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8">
                <img
                  src="/lixell2pro/images/xgrids-lixel-l2-pro-rtk-standard-kit.png"
                  alt="Lixel L2 Pro RTK Standard Kit"
                  className="w-full h-full object-contain"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-2xl -z-10" />
              </div>

              {/* Floating Specs */}
              <div className="flex justify-center gap-3 flex-wrap">
                {specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                  >
                    <span className="text-xs text-white/50">{spec.label}:</span>{' '}
                    <span className="text-sm font-semibold text-cyan-400">
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
              <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Get Started
              </span>

              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Ready to capture{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                  reality?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
                Join surveying and geospatial professionals worldwide using the L2 Pro
                for real-time, survey-grade point cloud capture. Contact us for pricing
                and enterprise solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 border-none"
                >
                  Contact Sales
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  className="border-cyan-400/50 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400"
                >
                  Book a Demo
                </Button>
              </div>

              {/* App Download Links */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white/50 text-sm">Get LixelGO:</span>
                <a href="https://apps.apple.com/app/lixelgo/id6476125173" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.XGrids.LixelGo.os" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-cyan-400"
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
                  <span>Free training</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-cyan-400"
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
                  <span>Enterprise support</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-cyan-400"
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

      {/* Free Splat Labs Plan Section */}
      <div className="bg-gradient-to-r from-cyan-900/50 via-teal-900/50 to-cyan-900/50 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Free Plan Banner */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-full mb-6">
                <Gift className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-semibold text-white">
                  Buy from Splat Labs, Get More Value
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
                Free 1-Year Splat Labs Starter Plan
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                When you purchase the Lixel L2 Pro through Splat Labs, you receive a{' '}
                <strong className="text-cyan-400">free year of our Starter Plan</strong>{' '}
                (a $144 value). Process and host your point cloud data on our platform.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {starterPlanFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                >
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Link to Pricing */}
            <div className="text-center mt-8">
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:underline"
              >
                View all Splat Labs plans
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
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
              L2 Pro captures are processed and hosted on Splat Labs—the leading
              platform for 3D Gaussian Splat hosting and collaboration.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
