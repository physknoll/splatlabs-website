'use client'

import { motion } from 'framer-motion'

const specs = [
  {
    label: 'Point Spacing',
    value: '1mm',
    description: 'Dense point clouds',
  },
  {
    label: 'Cloud Thickness',
    value: '5mm',
    description: 'For accurate mapping',
  },
  {
    label: 'Point Density',
    value: '1M pts/m²',
    description: 'Capture every detail',
  },
]

export function L2ProAlgorithm() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Gradient Effects */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 via-teal-400/5 to-blue-500/10 blur-3xl pointer-events-none"
      />

      <div className="container-custom py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/lixell2pro/videos/2.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Floating Data Overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg text-center"
                  >
                    <div className="text-lg font-bold text-cyan-400">{spec.value}</div>
                    <div className="text-xs text-white/60">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glowing Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-transparent to-teal-500/20 blur-3xl -z-10 opacity-50" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Precision
            </span>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              The{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                LixelUpSample™
              </span>{' '}
              Algorithm
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Generating photo-quality color point clouds with unprecedented density.
              1 million points per square meter with 1mm spacing captures every
              detail with precision.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                {
                  title: 'Ultra-Dense Coverage',
                  description: '1mm point spacing for millimeter-level detail',
                },
                {
                  title: '5mm Cloud Thickness',
                  description: 'Precise surfaces for accurate mapping and line drawing',
                },
                {
                  title: 'Photo-Quality Colorization',
                  description: 'Ultra-high coloring accuracy from dual 48MP cameras',
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
