'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <Badge variant="orange" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          'font-heading font-bold text-content-primary',
          'text-3xl md:text-4xl lg:text-5xl',
          'tracking-tight',
          align === 'center' && 'max-w-3xl mx-auto',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-content-secondary text-lg md:text-xl',
            align === 'center' && 'max-w-2xl mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
