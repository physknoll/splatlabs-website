'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/constants'

interface TierSliderProps {
  tiers: PricingTier[]
  selectedIndex: number
  onChange: (index: number) => void
  label?: string
  className?: string
}

export function TierSlider({
  tiers,
  selectedIndex,
  onChange,
  label = 'Active Projects',
  className,
}: TierSliderProps) {
  const maxIndex = tiers.length - 1
  const progressPercent = maxIndex > 0 ? (selectedIndex / maxIndex) * 100 : 0

  const tierLabels = useMemo(() => {
    return tiers.map((tier) => tier.projects)
  }, [tiers])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10))
  }

  const handleDotClick = (index: number) => {
    onChange(index)
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Label and current value */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-content-muted">{label}</span>
        <span className="text-sm font-semibold text-content-primary">
          {tierLabels[selectedIndex]}
        </span>
      </div>

      {/* Slider track container */}
      <div className="relative pb-6">
        {/* Custom slider track */}
        <div className="relative h-2 w-full">
          {/* Track background */}
          <div className="absolute inset-0 bg-light-bg-subtle border border-light-border rounded-full" />
          
          {/* Track fill */}
          <div
            className="absolute left-0 top-0 h-full bg-rock-orange rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Dots */}
          <div className="absolute inset-0 flex items-center justify-between px-0">
            {tiers.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                className={cn(
                  'w-3 h-3 rounded-full border-2 transition-all duration-150 z-10',
                  index <= selectedIndex
                    ? 'bg-rock-orange border-rock-orange'
                    : 'bg-white border-light-border-strong hover:border-rock-orange/50'
                )}
                style={{
                  transform: index === 0 ? 'translateX(0)' : index === maxIndex ? 'translateX(0)' : 'translateX(0)',
                }}
              />
            ))}
          </div>

          {/* Hidden range input for accessibility */}
          <input
            type="range"
            min={0}
            max={maxIndex}
            value={selectedIndex}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            aria-label={label}
          />
        </div>

        {/* Tier labels */}
        <div className="absolute w-full flex justify-between mt-3 text-xs text-content-muted">
          {tierLabels.map((tierLabel, index) => (
            <span
              key={index}
              className={cn(
                'transition-colors',
                index === selectedIndex && 'text-rock-orange font-semibold'
              )}
              style={{
                minWidth: index === 0 ? 'auto' : index === maxIndex ? 'auto' : '0',
                textAlign: index === 0 ? 'left' : index === maxIndex ? 'right' : 'center',
              }}
            >
              {tierLabel}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
