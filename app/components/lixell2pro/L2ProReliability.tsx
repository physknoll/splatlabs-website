'use client'

import { motion } from 'framer-motion'

const environments = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Indoor Spaces',
    description: 'Works without GPS/satellite signals',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: 'Underground',
    description: 'Tunnels, subways, and mines',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Featureless Corridors',
    description: 'Texture-less environments',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Absolute Coordinates',
    description: 'Continuous positioning (WGS84/CGCS2000)',
  },
]

export function L2ProReliability() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg-alt via-white to-light-bg-alt/50 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-cyan-600 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10">
              Reliability
            </span>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-content-primary mb-6 leading-tight">
              Reliable SLAM for{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                complex environments
              </span>
            </h2>

            <p className="text-lg md:text-xl text-content-secondary mb-8 leading-relaxed">
              Exclusive Multi-SLAM algorithm enhances adaptability and reliability in
              challenging environments. Provides continuous absolute coordinates even
              in satellite-signal-limited areas like indoors or underground.
            </p>

            {/* Environment Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {environments.map((env, i) => (
                <motion.div
                  key={env.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-light-bg-subtle border border-light-border hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 flex items-center justify-center text-cyan-600 flex-shrink-0">
                    {env.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary mb-0.5">
                      {env.title}
                    </h3>
                    <p className="text-content-secondary text-sm">
                      {env.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RTK Disconnection Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-content-secondary">
                  Maintains accuracy with RTK disconnection up to <strong className="text-cyan-600">100m</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  <source src="/lixell2pro/videos/4.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium text-white">
                  Intensity View — Tunnel Scan
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
