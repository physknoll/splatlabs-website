'use client'

import { motion } from 'framer-motion'

const accessories = [
  {
    id: 'phone-mount',
    title: 'Phone Mount',
    description: 'Phone mount for real-time monitoring during scans',
    image: '/portalcam/images/k9_2_2.png',
    comingSoon: false,
  },
  {
    id: 'external-ssd',
    title: 'External SSD',
    description: '512GB/1TB external SSD for large datasets',
    image: '/portalcam/images/k9_1_1.png',
    comingSoon: true,
  },
  {
    id: 'protective-backpack',
    title: 'Protective Backpack',
    description: 'Protective backpack with custom insert',
    image: '/portalcam/images/k9_3_3.png',
    comingSoon: false,
  },
  {
    id: 'extension-pole',
    title: 'Extension Pole',
    description: '2m extension pole for high ceilings and tight spaces',
    image: '/portalcam/images/k9_4_1.png',
    comingSoon: false,
  },
]

function AccessoryCard({
  accessory,
  index,
}: {
  accessory: (typeof accessories)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-2xl bg-light-bg-subtle border border-light-border overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-soft-lg group-hover:border-rock-orange/30">
        <img
          src={accessory.image}
          alt={accessory.title}
          className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Coming Soon Badge */}
        {accessory.comingSoon && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-rock-orange text-white text-xs font-semibold rounded-full">
            Coming Soon
          </div>
        )}
      </div>

      {/* Text Content */}
      <h3 className="font-heading font-bold text-lg md:text-xl text-content-primary mb-2">
        {accessory.title}
      </h3>
      <p className="text-content-secondary text-sm md:text-base">
        {accessory.description}
      </p>
    </motion.div>
  )
}

export function ToolkitSection() {
  return (
    <section className="section-padding bg-light-bg-alt relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rock-orange/5 via-amber-200/10 to-orange-100/5 blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rock-orange text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-rock-orange/10">
            Accessories
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-4">
            A Complete Toolkit for{' '}
            <span className="gradient-text-orange">Any Space</span>
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto">
            Everything you need to capture any environment, from tight interiors
            to expansive exteriors.
          </p>
        </motion.div>

        {/* Accessories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {accessories.map((accessory, i) => (
            <AccessoryCard key={accessory.id} accessory={accessory} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
