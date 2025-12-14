'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, Smartphone } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { Card } from '../ui/Card'

const values = [
  {
    icon: Upload,
    title: 'Universal Ingest',
    description:
      'XGRIDS, .ply, .splat, .ksplat. If you can scan it, we can host it. Drag and drop entire folders and we handle the rest.',
  },
  {
    icon: Zap,
    title: 'Instant Streaming',
    description:
      'Our LOD engine loads massive gigabyte-scale scenes in seconds, even on 4G. Progressive loading means no waiting.',
  },
  {
    icon: Smartphone,
    title: 'Device Agnostic',
    description:
      'From high-end workstations to iPhones in the field. Optimized rendering that adapts to any device automatically.',
  },
]

export function ValuePropositions() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-custom relative">
        <SectionHeader
          badge="Why Splat Labs?"
          title="Everything you need to put your 3D data to work"
          description="Stop letting your scans sit on hard drives. Turn them into interactive, shareable experiences."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card variant="subtle" hover className="h-full">
                <div className="w-14 h-14 rounded-xl bg-rock-orange/10 border border-rock-orange/20 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-rock-orange" />
                </div>
                <h3 className="text-xl font-heading font-bold text-content-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-content-secondary leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
