import { cn } from '@/lib/utils'

interface BadgeProps {
  className?: string
  variant?: 'default' | 'orange' | 'success' | 'warning' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full transition-colors'

  const variants = {
    default: 'bg-light-bg-subtle text-content-secondary border border-light-border',
    orange: 'bg-rock-orange/10 text-rock-orange border border-rock-orange/20',
    success: 'bg-green-50 text-green-600 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    outline: 'bg-transparent text-content-secondary border border-light-border',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}
