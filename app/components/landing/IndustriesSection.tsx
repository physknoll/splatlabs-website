'use client'

import { motion } from 'framer-motion'
import { Building2, Home, MapPin, Plane } from 'lucide-react'
import { Tabs } from '../ui/Tabs'
import { EmbedPlaceholder } from '../ui/EmbedPlaceholder'
import { SectionHeader } from '../ui/SectionHeader'
import Link from 'next/link'

const industries = [
  {
    id: 'aec',
    label: 'AEC',
    icon: <Building2 className="w-4 h-4" />,
    title: 'Architecture, Engineering & Construction',
    description:
      'Track construction progress over time, collaborate with remote stakeholders, and deliver interactive as-built documentation that clients can actually use.',
    benefits: [
      'Progress monitoring with 4D timelines',
      'Remote stakeholder collaboration',
      'Interactive as-built deliverables',
      'Measurement tools for verification',
    ],
    href: '/solutions/aec',
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    icon: <Home className="w-4 h-4" />,
    title: 'Real Estate & Property Marketing',
    description:
      "Create immersive virtual tours that sell properties faster. Use AI staging to furnish empty spaces and help buyers visualize their future home.",
    benefits: [
      'AI-powered virtual staging',
      'Unlimited shareable tour links',
      'Works on any device',
      'Embed directly on listings',
    ],
    href: '/solutions/real-estate',
  },
  {
    id: 'surveying',
    label: 'Surveying',
    icon: <MapPin className="w-4 h-4" />,
    title: 'Professional Surveying & Mapping',
    description:
      "Deliver more than just data files. Give clients interactive 3D models they can explore and measure themselves, directly in their browser.",
    benefits: [
      'Browser-based delivery',
      'Sub-cm measurement accuracy',
      'Annotations & documentation',
      'Client self-service access',
    ],
    href: '/solutions/surveying',
  },
  {
    id: 'drone',
    label: 'Drone Mapping',
    icon: <Plane className="w-4 h-4" />,
    title: 'Drone Mapping & Inspection',
    description:
      'Turn aerial scans into shareable 3D experiences. Link exterior drone captures to interior scans for complete asset documentation.',
    benefits: [
      'Aerial to interior portals',
      'Large-scale scene support',
      'Inspection annotations',
      'Progress documentation',
    ],
    href: '/solutions/drone-mapping',
  },
]

function IndustryContent({
  industry,
}: {
  industry: (typeof industries)[0]
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 3xl:gap-16 4xl:gap-20">
      {/* Info */}
      <div>
        <h3 className="text-2xl md:text-3xl 3xl:text-4xl 4xl:text-5xl font-heading font-bold text-content-primary mb-4 3xl:mb-6">
          {industry.title}
        </h3>
        <p className="text-content-secondary text-lg 3xl:text-xl 4xl:text-2xl mb-6 3xl:mb-8 leading-relaxed">
          {industry.description}
        </p>

        <ul className="space-y-3 3xl:space-y-4 mb-8 3xl:mb-10">
          {industry.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-rock-orange/10 border border-rock-orange/30 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 3xl:w-2 3xl:h-2 rounded-full bg-rock-orange" />
              </div>
              <span className="text-content-secondary 3xl:text-lg 4xl:text-xl">{benefit}</span>
            </li>
          ))}
        </ul>

        <Link
          href={industry.href}
          className="inline-flex items-center gap-2 px-6 py-3 3xl:px-8 3xl:py-4 bg-rock-orange/10 text-rock-orange font-semibold 3xl:text-lg rounded-full border border-rock-orange/20 hover:bg-rock-orange/20 transition-colors"
        >
          Learn more about {industry.label}
        </Link>
      </div>

      {/* Demo Placeholder */}
      <EmbedPlaceholder
        title={`${industry.label} Demo`}
        description={`See how ${industry.label} professionals use Splat Labs`}
        aspectRatio="4:3"
      />
    </div>
  )
}

export function IndustriesSection() {
  const tabData = industries.map((industry) => ({
    id: industry.id,
    label: industry.label,
    icon: industry.icon,
    content: <IndustryContent industry={industry} />,
  }))

  return (
    <section className="py-24 lg:py-32 3xl:py-40 4xl:py-48 bg-white relative">
      <div className="container-custom relative">
        <SectionHeader
          badge="Industries"
          title="Built for professionals who build the world"
          description="From architecture to real estate, surveying to drone mapping — see how industry leaders use Splat Labs."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs tabs={tabData} />
        </motion.div>
      </div>
    </section>
  )
}
