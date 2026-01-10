'use client'

import { motion } from 'framer-motion'
import { Home, Film, Heart } from 'lucide-react'

const useCases = [
  {
    id: 'real-estate',
    icon: <Home className="w-6 h-6" />,
    title: 'Real Estate',
    tagline: 'True-to-Life Digital Replicas',
    description:
      'Create immersive property tours that let buyers walk through spaces from anywhere. Every detail preserved in photorealistic 3D.',
    video: '/portalcam/videos/RealEstate.mp4',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    id: 'film-vfx',
    icon: <Film className="w-6 h-6" />,
    title: 'VFX & Film',
    tagline: 'Virtual Production Ready',
    description:
      'Scan real locations for virtual production. Perfect for location scouting, set extension, and creating digital environments.',
    video: '/portalcam/videos/FilmProduction.mp4',
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    id: 'memories',
    icon: <Heart className="w-6 h-6" />,
    title: 'Personal Memories',
    tagline: 'Relive Moments in 6DOF',
    description:
      'Capture life\'s special moments in full 3D. Walk through your memories again, exactly as they were.',
    video: '/portalcam/videos/ContentCreation.mp4',
    color: 'from-rose-500/20 to-rose-600/10',
  },
]

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white border border-light-border shadow-soft hover:shadow-soft-lg transition-shadow">
        {/* Video Container */}
        <div className="relative aspect-video overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
            <source src={useCase.video} type="video/mp4" />
          </video>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Icon Badge */}
          <div className="absolute top-4 left-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} backdrop-blur-sm border border-white/20 flex items-center justify-center text-white`}
            >
              {useCase.icon}
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-rock-orange text-sm font-medium">
              {useCase.tagline}
            </span>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
              {useCase.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="p-6">
          <p className="text-content-secondary leading-relaxed">
            {useCase.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function UseCasesGrid() {
  return (
    <section className="section-padding bg-light-bg-alt relative overflow-hidden">
      {/* Background Decoration */}
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
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rock-orange/5 via-amber-200/10 to-orange-100/5 blur-3xl pointer-events-none"
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
            Use Cases
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-4">
            Built for <span className="gradient-text-orange">Professionals</span>
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto">
            From real estate to film production, PortalCam adapts to your workflow.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, i) => (
            <UseCaseCard key={useCase.id} useCase={useCase} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
