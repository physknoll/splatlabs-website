'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { VideoPlaceholder } from '../ui/VideoPlaceholder'

const features = [
  {
    title: 'Automatic Floor Plan Generator',
    description:
      "Transform your 3D scans into professional floor plans instantly. Our AI automatically generates accurate floor plans from your Gaussian Splats, then lets you stylize them with different visual themes, add descriptive labels, and create interactive mini-maps that show exactly where viewers are in the scene.",
    bullets: [
      'AI-powered floor plan generation from scans',
      'Multiple stylization themes & visual options',
      'Interactive mini-map for spatial orientation',
      'Custom text labels & room annotations',
      'Upload existing plans or download AI-generated ones',
    ],
    video: '/videos/SpotLabs-FloorPlan.mp4',
    href: '/features/floor-plans',
    isLocalVideo: true,
  },
  {
    title: 'AI-Powered Virtual Staging',
    description:
      "Stop imagining 'what if.' Use our Gemini-powered AI to modify your scenes with simple text prompts. Furnish empty homes, visualize renovations, or clear construction debris from your view—instantly, non-destructively, and photorealistically.",
    bullets: [
      'Context-aware AI that respects geometry',
      'Multiple style variations per view',
      'Non-destructive overlays',
    ],
    video: '/videos/rock-gaussian-splat-AI-Virtual-staging.mp4',
    href: '/features/ai-staging',
    isLocalVideo: true,
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
    video: '/videos/rock-gaussian-splat-over-time.mp4',
    href: '/features/4d-timelines',
    isLocalVideo: true,
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
    video: '/videos/rock-gaussian-splat-portals.mp4',
    href: '/features/portals',
    isLocalVideo: true,
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
    video: '/videos/rock-Gaussian-splat-measurements.mp4',
    href: '/features/measurements',
    isLocalVideo: true,
  },
  {
    title: 'Virtual Tours & Guided Walkthroughs',
    description:
      'Transform static scans into cinematic experiences. Create guided tours with annotations, auto-playing camera paths, and a filmstrip navigator that lets viewers explore at their own pace or sit back and watch.',
    bullets: [
      'Auto-animated camera paths between waypoints',
      'Rich annotations with media embeds',
      'Drag-and-drop tour ordering',
    ],
    video: '/videos/rock-splat-virtual-tour-walkthrough.mp4',
    href: '/features/virtual-tours',
    isLocalVideo: true,
  },
  {
    title: 'Cinematic Fly-Through Movies',
    description:
      "Turn your Gaussian Splats into stunning cinematic experiences. Create and save unlimited fly-through movies with precise waypoint control. Set your path, fine-tune the motion, and export professional-quality videos that bring your 3D captures to life.",
    bullets: [
      'Unlimited saved fly-through movies',
      'Waypoint-based path creation',
      'Advanced camera & motion controls',
      'Professional video export options',
      'Reusable movie templates',
    ],
    video: '/videos/SplatLabs-Fly-Through.mp4',
    href: '/features/fly-through',
    isLocalVideo: true,
  },
]

interface FeatureCardProps {
  title: string
  description: string
  bullets: string[]
  video: string
  href: string
  index: number
  isLocalVideo?: boolean
}

function FeatureCard({
  title,
  description,
  bullets,
  video,
  href,
  index,
  isLocalVideo,
}: FeatureCardProps) {
  const isReversed = index % 2 !== 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card glass-card-glow p-6 md:p-8 lg:p-10 3xl:p-12 4xl:p-16"
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 3xl:gap-16 4xl:gap-20 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Text Content */}
        <div className={isReversed ? 'lg:col-start-2' : ''}>
          <span className="inline-block text-rock-orange text-xs 3xl:text-sm font-semibold uppercase tracking-wider mb-3 3xl:mb-4 px-3 py-1 3xl:px-4 3xl:py-1.5 rounded-full bg-rock-orange/10">
            Feature {index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl 4xl:text-6xl font-heading font-bold text-content-primary mb-4 3xl:mb-6">
            {title}
          </h3>
          <p className="text-base md:text-lg 3xl:text-xl 4xl:text-2xl text-content-secondary leading-relaxed mb-6 3xl:mb-8">
            {description}
          </p>

          <ul className="space-y-3 3xl:space-y-4 mb-6 3xl:mb-8">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-content-secondary text-sm md:text-base 3xl:text-lg 4xl:text-xl">
                <div className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-rock-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 3xl:w-2 3xl:h-2 rounded-full bg-rock-orange" />
                </div>
                {bullet}
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-rock-orange font-semibold hover:gap-3 transition-all group text-sm md:text-base 3xl:text-lg 4xl:text-xl"
          >
            Learn more
            <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video */}
        <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <div className="rounded-2xl 3xl:rounded-3xl overflow-hidden shadow-lg">
            {isLocalVideo ? (
              <div className="relative w-full pb-[56.25%] bg-light-bg-subtle">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <VideoPlaceholder
                youtubeUrl={video}
                className="relative"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesShowcase() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 3xl:py-40 4xl:py-48">
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
        className="absolute -top-40 -left-40 w-[600px] h-[600px] 3xl:w-[800px] 3xl:h-[800px] 4xl:w-[1000px] 4xl:h-[1000px] rounded-full bg-gradient-to-br from-rock-orange/10 via-amber-200/15 to-orange-100/5 blur-3xl pointer-events-none"
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
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] 4xl:w-[900px] 4xl:h-[900px] rounded-full bg-gradient-to-tr from-orange-200/15 via-rock-orange/8 to-amber-100/10 blur-3xl pointer-events-none"
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
        className="absolute bottom-40 left-1/4 w-[450px] h-[450px] 3xl:w-[650px] 3xl:h-[650px] 4xl:w-[850px] 4xl:h-[850px] rounded-full bg-gradient-to-br from-amber-100/10 via-orange-100/8 to-rock-orange/5 blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20 3xl:mb-24 4xl:mb-28"
        >
          <span className="inline-block text-rock-orange text-sm 3xl:text-base font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 3xl:px-5 3xl:py-2 rounded-full bg-rock-orange/10">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-heading font-bold text-content-primary">
            More than just a viewer
          </h2>
          <p className="mt-4 3xl:mt-6 text-lg 3xl:text-xl 4xl:text-2xl text-content-secondary max-w-2xl 3xl:max-w-3xl mx-auto">
            Professional tools that transform how you work with Gaussian Splats
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-8 lg:space-y-12 3xl:space-y-16 4xl:space-y-20">
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
