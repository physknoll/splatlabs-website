'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { VideoPlaceholder } from '../ui/VideoPlaceholder'

const features = [
  {
    title: 'AI-Powered Virtual Staging',
    description:
      "Stop imagining 'what if.' Use our Gemini-powered AI to modify your scenes with simple text prompts. Furnish empty homes, visualize renovations, or clear construction debris from your view—instantly, non-destructively, and photorealistically.",
    bullets: [
      'Context-aware AI that respects geometry',
      'Multiple style variations per view',
      'Non-destructive overlays',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    href: '/features/ai-staging',
  },
  {
    title: '4D Timelines & Progress',
    description:
      'Monitor progress like never before. Align multiple scans of the same site and scrub through time to verify construction schedules, track erosion, or document historical preservation.',
    bullets: [
      'Temporal slider navigation',
      'Automatic scan alignment',
      'Progress comparison tools',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    href: '/features/4d-timelines',
  },
  {
    title: 'Seamless Portals',
    description:
      "Stitch together massive environments. Link interior scans to drone exterior maps using interactive Portals. Create a cohesive 'video game' style map of your entire asset portfolio.",
    bullets: [
      'Multi-scene navigation',
      'Indoor-outdoor linking',
      'Customizable waypoints',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    href: '/features/portals',
  },
  {
    title: 'Precision Measurements',
    description:
      "Don't just look—analyze. Measure distances with sub-centimeter accuracy. Pin rich media annotations to specific coordinates. Embed PDFs, videos, and voice notes directly into 3D space.",
    bullets: [
      'Distance & area calculations',
      'Rich media annotations',
      'Saved measurement library',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    href: '/features/measurements',
  },
]

interface FeatureCardProps {
  title: string
  description: string
  bullets: string[]
  video: string
  href: string
  index: number
}

function FeatureCard({
  title,
  description,
  bullets,
  video,
  href,
  index,
}: FeatureCardProps) {
  const isReversed = index % 2 !== 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card glass-card-glow p-6 md:p-8 lg:p-10"
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Text Content */}
        <div className={isReversed ? 'lg:col-start-2' : ''}>
          <span className="inline-block text-rock-orange text-xs font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-rock-orange/10">
            Feature {index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-content-primary mb-4">
            {title}
          </h3>
          <p className="text-base md:text-lg text-content-secondary leading-relaxed mb-6">
            {description}
          </p>

          <ul className="space-y-3 mb-6">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-content-secondary text-sm md:text-base">
                <div className="w-5 h-5 rounded-full bg-rock-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rock-orange" />
                </div>
                {bullet}
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-rock-orange font-semibold hover:gap-3 transition-all group text-sm md:text-base"
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video */}
        <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <VideoPlaceholder
              youtubeUrl={video}
              className="relative"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesShowcase() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Animated Background - matching hero aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg-alt via-white to-light-bg-alt" />
      
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rock-orange/10 via-amber-200/15 to-orange-100/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1.1, 1],
          x: [0, -30, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-200/15 via-rock-orange/8 to-amber-100/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1.15, 1],
          x: [0, 20, -30, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
        className="absolute bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-100/10 via-orange-100/8 to-rock-orange/5 blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-rock-orange text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-rock-orange/10">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-content-primary">
            More than just a viewer
          </h2>
          <p className="mt-4 text-lg text-content-secondary max-w-2xl mx-auto">
            Professional tools that transform how you work with Gaussian Splats
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-8 lg:space-y-12">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
