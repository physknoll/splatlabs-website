import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-rock-text mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-rock-panel border rounded-xl',
            'text-rock-text placeholder:text-rock-text-dim',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-rock-orange focus:border-transparent',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-rock-border hover:border-rock-border-light',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-rock-text-dim">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

