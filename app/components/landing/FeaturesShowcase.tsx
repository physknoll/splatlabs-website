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
    align: 'left',
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
    align: 'right',
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
    align: 'left',
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
    align: 'right',
  },
]

interface FeatureBlockProps {
  title: string
  description: string
  bullets: string[]
  video: string
  href: string
  align: 'left' | 'right'
  index: number
}

function FeatureBlock({
  title,
  description,
  bullets,
  video,
  href,
  align,
  index,
}: FeatureBlockProps) {
  const isEven = index % 2 === 0
  
  return (
    <div className={`py-16 lg:py-24 ${isEven ? 'bg-white' : 'bg-light-bg-subtle'}`}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={align === 'right' ? 'lg:order-2' : ''}
          >
            <span className="text-rock-orange text-sm font-semibold uppercase tracking-wider">
              Feature {index + 1}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-content-primary mt-3 mb-6">
              {title}
            </h3>
            <p className="text-lg text-content-secondary leading-relaxed mb-8">
              {description}
            </p>

            <ul className="space-y-4 mb-8">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-content-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-rock-orange flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href={href}
              className="inline-flex items-center gap-2 text-rock-orange font-semibold hover:gap-3 transition-all group"
            >
              Learn more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={align === 'right' ? 'lg:order-1' : ''}
          >
            <VideoPlaceholder
              youtubeUrl={video}
              className="relative"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function FeaturesShowcase() {
  return (
    <section className="bg-light-bg-subtle relative">
      {/* Section Header */}
      <div className="container-custom pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-rock-orange text-sm font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-content-primary mt-3">
            More than just a viewer
          </h2>
        </motion.div>
      </div>

      {/* Feature Blocks */}
      {features.map((feature, i) => (
        <FeatureBlock
          key={feature.title}
          {...feature}
          align={feature.align as 'left' | 'right'}
          index={i}
        />
      ))}
    </section>
  )
}
