'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'subtle' | 'outline' | 'highlight'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hover = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl transition-all duration-300'

    const variants = {
      default: 'bg-white border border-light-border shadow-soft',
      subtle: 'bg-light-bg-subtle border border-light-border',
      outline: 'bg-transparent border border-light-border',
      highlight: 'bg-white border border-rock-orange/20 shadow-soft',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const hoverStyles = hover
      ? 'hover:-translate-y-1 hover:border-light-border-strong hover:shadow-soft-lg cursor-pointer'
      : ''

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

const CardHeader = ({ className, children }: CardHeaderProps) => (
  <div className={cn('mb-4', className)}>{children}</div>
)

interface CardTitleProps {
  className?: string
  children: React.ReactNode
  as?: 'h2' | 'h3' | 'h4'
}

const CardTitle = ({ className, children, as: Tag = 'h3' }: CardTitleProps) => (
  <Tag
    className={cn(
      'font-heading font-bold text-content-primary',
      Tag === 'h2' && 'text-2xl',
      Tag === 'h3' && 'text-xl',
      Tag === 'h4' && 'text-lg',
      className
    )}
  >
    {children}
  </Tag>
)

interface CardDescriptionProps {
  className?: string
  children: React.ReactNode
}

const CardDescription = ({ className, children }: CardDescriptionProps) => (
  <p className={cn('text-content-secondary text-sm mt-2', className)}>
    {children}
  </p>
)

interface CardContentProps {
  className?: string
  children: React.ReactNode
}

const CardContent = ({ className, children }: CardContentProps) => (
  <div className={cn('', className)}>{children}</div>
)

interface CardFooterProps {
  className?: string
  children: React.ReactNode
}

const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={cn('mt-6 pt-6 border-t border-light-border', className)}>
    {children}
  </div>
)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export type { CardProps }
