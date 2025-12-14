'use client'

import { motion } from 'framer-motion'
import { Play, Box } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface EmbedPlaceholderProps {
  title?: string
  description?: string
  className?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto'
  onAction?: () => void
  actionLabel?: string
}

export function EmbedPlaceholder({
  title = 'Interactive 3D Demo',
  description = 'Experience the full power of Splat Labs',
  className,
  aspectRatio = '16:9',
  onAction,
  actionLabel = 'Launch Demo',
}: EmbedPlaceholderProps) {
  const aspectRatios = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    'auto': '',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-light-bg-subtle border border-light-border group',
        aspectRatios[aspectRatio],
        aspectRatio === 'auto' && 'min-h-[400px]',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 rounded-2xl bg-rock-orange/10 border border-rock-orange/20 flex items-center justify-center mb-6"
        >
          <Box className="w-10 h-10 text-rock-orange" />
        </motion.div>

        <h3 className="text-2xl font-heading font-bold text-content-primary mb-2">
          {title}
        </h3>
        <p className="text-content-secondary max-w-md mb-6">{description}</p>

        <Button
          variant="primary"
          size="lg"
          leftIcon={<Play className="w-5 h-5" />}
          onClick={onAction}
        >
          {actionLabel}
        </Button>

        <p className="mt-4 text-xs text-content-muted">
          Coming Soon - Interactive Viewer Embed
        </p>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-rock-orange/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-rock-orange/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-rock-orange/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-rock-orange/30 rounded-br-lg" />
    </motion.div>
  )
}
