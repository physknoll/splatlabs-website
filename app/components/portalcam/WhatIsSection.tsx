'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Dual Fisheye Lenses',
    description: 'Complete 360° visual coverage with zero blind spots.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'LiDAR Depth Sensor',
    description: 'Active depth sensing for perfect geometric accuracy.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'Onboard Processing',
    description: 'Multi-SLAM chip fuses sensors in real-time. No heavy PC required.',
  },
]

export function WhatIsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-light-bg-alt to-white pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-rock-orange text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-rock-orange/10">
              What is it?
            </span>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-6 leading-tight">
              Stop taking flat photos.{' '}
              <span className="gradient-text-orange">Start capturing reality.</span>
            </h2>

            <p className="text-lg md:text-xl text-content-secondary mb-8 leading-relaxed">
              Standard cameras capture pixels. PortalCam captures light fields.
              Using dual-fisheye lenses and onboard LiDAR, it fuses texture and
              geometry instantly—creating photorealistic 3D worlds you can walk
              through.
            </p>

            {/* Feature Pills */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-light-bg-subtle border border-light-border hover:border-rock-orange/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-rock-orange/10 flex items-center justify-center text-rock-orange flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-content-secondary text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                  <source
                    src="/portalcam/videos/WhatisaSpatialCamera.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-light-border shadow-lg">
                <span className="text-sm font-medium text-content-primary">
                  3D Gaussian Splatting
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
