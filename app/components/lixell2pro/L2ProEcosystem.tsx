'use client'

import { motion } from 'framer-motion'

const accessories = [
  {
    id: 'extension-pole',
    title: 'Extension Pole',
    description: '2m extension for high ceilings and hard-to-reach areas',
    image: '/lixell2pro/images/lixell2pro_4_2_img_8.png',
  },
  {
    id: 'rtk',
    title: 'RTK Module',
    description: 'High-precision GNSS for absolute positioning',
    image: '/lixell2pro/images/lixell2pro_4_2_img_9.png',
  },
  {
    id: 'phone-mount',
    title: 'Phone Mount',
    description: 'Secure mount for real-time monitoring',
    image: '/lixell2pro/images/lixell2pro_4_2_img_10.png',
  },
  {
    id: 'harness',
    title: 'Supporting Harness',
    description: 'Ergonomic harness for extended scanning sessions',
    image: '/lixell2pro/images/lixell2pro_4_2_img_11.png',
  },
  {
    id: 'drone-mount',
    title: 'Drone Mount',
    description: 'Aerial scanning capability for large areas',
    image: '/lixell2pro/images/lixell2pro_4_2_img_13.png',
  },
  {
    id: 'vehicle-mount',
    title: 'Vehicle Mount',
    description: 'Mobile mapping from any vehicle',
    image: '/lixell2pro/images/lixell2pro_4_2_img_14.png',
  },
]

export function L2ProEcosystem() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-light-bg-alt/30 to-white pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-600 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10">
            Ecosystem
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-4">
            Maximize usability and{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              flexibility
            </span>
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto">
            A complete ecosystem of accessories for any scanning scenario.
          </p>
        </motion.div>

        {/* Accessories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {accessories.map((accessory, i) => (
            <motion.div
              key={accessory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-light-bg-subtle to-light-bg-alt border border-light-border overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-soft-lg group-hover:border-cyan-500/30">
                <img
                  src={accessory.image}
                  alt={accessory.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <h3 className="font-heading font-bold text-lg md:text-xl text-content-primary mb-2">
                {accessory.title}
              </h3>
              <p className="text-content-secondary text-sm md:text-base">
                {accessory.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Software Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="inline-block text-cyan-600 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10">
              Software
            </span>
            <h3 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-content-primary">
              All-in-One Point Cloud Processing
            </h3>
          </div>

          {/* LixelStudio Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[21/9] bg-black">
              <img
                src="/lixell2pro/images/lixelStudio_banner.png"
                alt="LixelStudio 3.0"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 md:px-16 max-w-xl">
                  <img
                    src="/lixell2pro/images/lixelStudio_logo.png"
                    alt="LixelStudio"
                    className="h-10 md:h-12 mb-4"
                  />
                  <p className="text-white/80 text-lg md:text-xl mb-6">
                    Professional desktop software for advanced point cloud processing,
                    analysis, and export.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-teal-600 transition-colors"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
