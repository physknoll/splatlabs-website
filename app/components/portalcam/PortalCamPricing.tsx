'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Gift, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { useCartStore } from '@/lib/stores/cart-store'
import type { CartItem } from '@/lib/ecwid/types'

const packages = [
  {
    name: 'PortalCam Standard Package',
    price: '$4,999',
    priceNote: '*Price may vary by region',
    items: [
      'PortalCam x 1',
      'Battery x 1',
      'Phone Mount x 1',
      'Tripod x 1',
      '1-year Splat Labs Starter Plan',
    ],
    highlighted: false,
    // Ecwid product data
    ecwidProductId: 807648544,
    ecwidSku: '080777',
    ecwidPrice: 4999,
  },
  {
    name: 'PortalCam Premium Package',
    price: '$6,499',
    priceNote: '*Price may vary by region',
    items: [
      'PortalCam x 1',
      'Battery x 2',
      'Phone Mount x 1',
      'Tripod x 1',
      '1-year Splat Labs Starter Plan',
    ],
    highlighted: true,
    badge: 'Most Popular',
    // Ecwid product data
    ecwidProductId: 807596977,
    ecwidSku: '10618',
    ecwidPrice: 6499,
  },
]

const starterPlanFeatures = [
  '5 Active Projects',
  'Gaussian Splat Hosting',
  'Precise Measurements',
  'Unlimited Sharing',
  'Splat Movie Creation',
  'Embed & Share on Zillow, etc.',
  'VR Viewer Support',
]

export function PortalCamPricing() {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const handleBuyNow = (pkg: typeof packages[0]) => {
    // Create cart item from package data
    const cartItem: CartItem = {
      productId: pkg.ecwidProductId,
      name: pkg.name,
      sku: pkg.ecwidSku,
      price: pkg.ecwidPrice,
      quantity: 1,
      isShippingRequired: true,
    }

    // Add to cart
    addItem(cartItem)

    // Navigate to checkout
    router.push('/checkout')
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg-alt/50 to-white pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Pricing"
          title="Choose Your PortalCam Package"
          description="Every package includes a free year of Splat Labs Starter—a $144 value."
        />

        {/* Free Starter Plan Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-r from-rock-orange/10 via-rock-orange/5 to-rock-orange/10 border border-rock-orange/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rock-orange/20 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-rock-orange" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-content-primary mb-2">
                  Buy from Splat Labs, Get More Value
                </h3>
                <p className="text-content-secondary mb-4">
                  When you purchase PortalCam directly from Splat Labs, you receive a <strong className="text-rock-orange">free year of our Starter Plan</strong> (normally $144/year). 
                  Need more projects? Contact us for exclusive discounts on Business plans with 50+ projects.
                </p>
                <a href="/pricing" className="inline-flex items-center gap-2 text-rock-orange font-semibold hover:underline">
                  View all Splat Labs plans <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border ${
                pkg.highlighted
                  ? 'border-rock-orange shadow-glow-md bg-white'
                  : 'border-light-border bg-white shadow-soft'
              } overflow-hidden`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-0 right-0">
                  <div className="bg-rock-orange text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    {pkg.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Name */}
                <h3 className={`font-heading font-bold text-xl md:text-2xl mb-2 ${
                  pkg.highlighted ? 'text-rock-orange' : 'text-content-primary'
                }`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-content-primary">
                    {pkg.price}
                  </span>
                  <span className="text-content-muted text-sm ml-2">starting from</span>
                </div>

                {/* Divider */}
                <div className="border-t border-light-border my-6" />

                {/* Items List */}
                <ul className="space-y-3 mb-6">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        pkg.highlighted ? 'bg-rock-orange/10 text-rock-orange' : 'bg-green-100 text-green-600'
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-content-secondary">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Note */}
                <p className="text-xs text-content-muted mb-6">{pkg.priceNote}</p>

                {/* CTA Button */}
                <Button
                  variant={pkg.highlighted ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => handleBuyNow(pkg)}
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Included Starter Plan Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block text-rock-orange text-sm font-semibold uppercase tracking-wider mb-2">
              Included Free
            </span>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-content-primary">
              1 Year Splat Labs Starter Plan
            </h3>
            <p className="text-content-secondary mt-2">
              A <span className="text-rock-orange font-semibold">$144 value</span> — included with every PortalCam purchase
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {starterPlanFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 bg-light-bg-alt rounded-xl border border-light-border"
              >
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-content-secondary">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Plan CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-content-secondary mb-4">
            Need more than 5 projects? Contact us for exclusive discounts on Business plans.
          </p>
          <Button
            variant="ghost"
            size="lg"
            leftIcon={<MessageCircle className="w-5 h-5" />}
          >
            Contact Sales for Business Pricing
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
