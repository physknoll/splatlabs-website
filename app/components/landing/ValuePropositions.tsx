'use client'

import { motion } from 'framer-motion'
import { FileStack, Smartphone, Layers } from 'lucide-react'

const values = [
  {
    number: '01',
    icon: FileStack,
    title: 'Works With Everything',
    description:
      'Xgrids, Postshot, Kiri Engine, ShareUAV, Geosun, DJI, and more. If you can create a splat, we can host it.',
    tags: ['PLY', 'SPLAT', 'KSPLAT', 'XGRIDS'],
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'View Anywhere',
    description:
      'Lightweight streaming optimized for mobile. Share a link and view on any phone—no app, no plugins, no waiting.',
    tags: ['Mobile', 'Browser', 'Instant'],
  },
  {
    number: '03',
    icon: Layers,
    title: 'Build Complete Experiences',
    description:
      'Stitch multiple scans into virtual walkthroughs. Create polished deliverables your clients will love.',
    tags: ['Walkthroughs', 'Portals', 'Deliverables'],
  },
]

export function ValuePropositions() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Warm Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white" />
      
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rock-orange/8 via-amber-200/10 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-orange-100/15 via-rock-orange/5 to-transparent blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-content-primary">
            Upload Any Splat.
            <br />
            <span className="gradient-text-orange">Share Everywhere.</span>
          </h2>
          <p className="mt-6 text-lg text-content-secondary max-w-2xl mx-auto">
            Stop letting your scans sit on hard drives. Turn them into interactive experiences anyone can view.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card glass-card-glow p-8 group"
            >
              {/* Number Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-heading font-black text-rock-orange/20 group-hover:text-rock-orange/40 transition-colors">
                  {value.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-rock-orange/10 border border-rock-orange/20 flex items-center justify-center group-hover:bg-rock-orange/15 transition-colors">
                  <value.icon className="w-6 h-6 text-rock-orange" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-bold text-content-primary mb-3">
                {value.title}
              </h3>
              <p className="text-content-secondary leading-relaxed mb-6">
                {value.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {value.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-rock-orange/10 text-rock-orange/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
