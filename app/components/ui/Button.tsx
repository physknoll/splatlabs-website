'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rock-orange focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-rock-orange text-white hover:bg-rock-orange-light hover:shadow-glow-sm active:bg-rock-orange-dark',
      secondary:
        'bg-content-primary text-white hover:bg-gray-800 active:bg-gray-900',
      ghost:
        'bg-transparent text-content-primary hover:bg-light-bg-subtle active:bg-light-bg-alt',
      outline:
        'bg-transparent text-content-primary border border-light-border hover:border-light-border-strong hover:bg-light-bg-subtle active:bg-light-bg-alt',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3 text-base gap-2',
      xl: 'px-10 py-4 text-lg gap-3',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
