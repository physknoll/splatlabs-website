'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Direct Phone Connection',
    description: 'Real-time monitoring without a PC. Control everything from one screen.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'One-click GCP Marking',
    description: 'Mark ground control points instantly for survey-grade accuracy.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Precision Verification',
    description: 'Real-time viewing of camera images, elevation, and true-color point clouds.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Breakpoint Rescan',
    description: 'Resume scanning from any point. No need to start over.',
  },
]

const statusItems = [
  { label: 'Battery', icon: '🔋' },
  { label: 'Network', icon: '📶' },
  { label: 'Memory', icon: '💾' },
  { label: 'Range', icon: '📍' },
]

export function L2ProWorkflow() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-teal-400/5 to-blue-500/10 blur-3xl pointer-events-none"
      />

      <div className="container-custom py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Workflow
            </span>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              A seamless,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                user-friendly
              </span>{' '}
              workflow
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Easy control with one screen, one-click operation. Full process operations
              including RTK setting, breakpoint rescan, and real-time visualization.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Status Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <span className="text-white/50 text-sm mr-2">Complete status display:</span>
              {statusItems.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup with Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] md:w-[320px] rounded-[3rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl">
                {/* Screen */}
                <div className="relative rounded-[2.25rem] overflow-hidden bg-black">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10" />
                  
                  {/* Video Content */}
                  <div className="aspect-[9/19.5]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/lixell2pro/videos/lixelgo.mp4" type="video/mp4" />
                    </video>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Glowing Effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-cyan-500/20 blur-3xl -z-10 opacity-60" />

              {/* App Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg">
                LixelGO App
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
