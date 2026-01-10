'use client'

import { motion } from 'framer-motion'
import { Tabs } from '../ui/Tabs'
import { Camera, Cloud, Layers } from 'lucide-react'

const workflowSteps = [
  {
    id: 'capture',
    label: 'Capture',
    icon: <Camera className="w-4 h-4" />,
    title: 'Walk Naturally',
    description:
      'The LCC App guides you through the space. Just walk at a normal pace—the PortalCam handles everything else, capturing complete spatial data with every step.',
    video: '/portalcam/videos/Capture.mp4',
    highlights: [
      'Guided capture paths',
      'Real-time feedback',
      'No tripod required',
    ],
  },
  {
    id: 'process',
    label: 'Process',
    icon: <Cloud className="w-4 h-4" />,
    title: 'Upload to Splat Labs',
    description:
      'Our cloud processes your capture automatically. Advanced 3D Gaussian Splatting algorithms transform raw data into photorealistic, navigable 3D worlds.',
    video: '/portalcam/videos/Process.mp4',
    highlights: [
      'Automatic processing',
      'No software to install',
      'Results in minutes',
    ],
  },
  {
    id: 'apply',
    label: 'Apply',
    icon: <Layers className="w-4 h-4" />,
    title: 'Share Anywhere',
    description:
      'Embed on the web, view in VR, or measure in the browser. Your 3D spaces work everywhere—no plugins, no downloads, just instant access.',
    video: '/portalcam/videos/Apply.mp4',
    highlights: [
      'Embed on any website',
      'VR-ready exports',
      'Browser measurements',
    ],
  },
]

function WorkflowContent({ step }: { step: (typeof workflowSteps)[0] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Video */}
      <div className="order-2 lg:order-1">
        <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
          <div className="aspect-video">
            <video
              key={step.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={step.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="order-1 lg:order-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rock-orange/10 text-rock-orange text-sm font-medium mb-4">
          {step.icon}
          <span>Step {workflowSteps.findIndex((s) => s.id === step.id) + 1}</span>
        </div>

        <h3 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-content-primary mb-4">
          {step.title}
        </h3>

        <p className="text-content-secondary text-lg leading-relaxed mb-6">
          {step.description}
        </p>

        <ul className="space-y-3">
          {step.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-rock-orange/10 border border-rock-orange/30 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-rock-orange" />
              </div>
              <span className="text-content-secondary">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function WorkflowTabs() {
  const tabData = workflowSteps.map((step) => ({
    id: step.id,
    label: step.label,
    icon: step.icon,
    content: <WorkflowContent step={step} />,
  }))

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg-alt via-white to-light-bg-alt pointer-events-none" />

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
            Workflow
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-4">
            Three Steps to{' '}
            <span className="gradient-text-orange">Spatial Content</span>
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto">
            From capture to sharing, the entire workflow is designed for speed
            and simplicity.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs
            tabs={tabData}
            tabsClassName="justify-center max-w-md mx-auto"
            contentClassName="mt-12"
          />
        </motion.div>
      </div>
    </section>
  )
}
