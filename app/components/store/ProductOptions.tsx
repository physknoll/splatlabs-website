'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { EcwidProduct, ProductOption, ProductCombination, SelectedOption } from '@/lib/ecwid/types'
import { formatPrice } from '@/lib/ecwid/products'

interface ProductOptionsProps {
  product: EcwidProduct
  onOptionsChange: (options: SelectedOption[], combination: ProductCombination | null) => void
  className?: string
}

export function ProductOptions({ product, onOptionsChange, className }: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  
  const options = product.options || []
  const combinations = product.combinations || []
  
  // Initialize with default options
  useEffect(() => {
    const defaults: Record<string, string> = {}
    
    options.forEach((option) => {
      if (option.choices && option.choices.length > 0) {
        const defaultChoice = option.defaultChoice !== undefined 
          ? option.choices[option.defaultChoice]?.text 
          : option.choices[0]?.text
        
        if (defaultChoice) {
          defaults[option.name] = defaultChoice
        }
      }
    })
    
    setSelectedOptions(defaults)
  }, [product.id]) // eslint-disable-line react-hooks/exhaustive-deps
  
  // Find matching combination based on selected options
  const findMatchingCombination = (): ProductCombination | null => {
    if (combinations.length === 0) return null
    
    return combinations.find((combo) => {
      return combo.options.every((opt) => selectedOptions[opt.name] === opt.value)
    }) ?? null
  }
  
  // Convert selected options to API format
  const getSelectedOptionsArray = (): SelectedOption[] => {
    return Object.entries(selectedOptions).map(([name, value]) => ({
      name,
      value,
      type: 'CHOICE' as const,
    }))
  }
  
  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)
  }
  
  // Notify parent of changes
  useEffect(() => {
    const combination = findMatchingCombination()
    const optionsArray = getSelectedOptionsArray()
    onOptionsChange(optionsArray, combination)
  }, [selectedOptions]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (options.length === 0) {
    return null
  }
  
  return (
    <div className={cn('space-y-6', className)}>
      {options.map((option) => (
        <div key={option.name}>
          {/* Option Label */}
          <label className="block text-sm font-semibold text-content-primary mb-3 uppercase tracking-wider">
            {option.name}
            {option.required && <span className="text-rock-orange ml-1">*</span>}
          </label>
          
          {/* Option Choices */}
          {option.type === 'SELECT' || option.type === 'RADIO' ? (
            <div className="flex flex-wrap gap-2">
              {option.choices?.map((choice) => {
                const isSelected = selectedOptions[option.name] === choice.text
                const hasModifier = choice.priceModifier && choice.priceModifier !== 0
                
                return (
                  <button
                    key={choice.text}
                    onClick={() => handleOptionChange(option.name, choice.text)}
                    className={cn(
                      'px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all',
                      isSelected
                        ? 'border-rock-orange bg-rock-orange/5 text-rock-orange'
                        : 'border-light-border bg-white text-content-secondary hover:border-light-border-strong'
                    )}
                  >
                    {choice.text}
                    {hasModifier && (
                      <span className={cn(
                        'ml-2 text-xs',
                        isSelected ? 'text-rock-orange/80' : 'text-content-muted'
                      )}>
                        {choice.priceModifierType === 'PERCENT'
                          ? `(${choice.priceModifier! > 0 ? '+' : ''}${choice.priceModifier}%)`
                          : `(${choice.priceModifier! > 0 ? '+' : ''}${formatPrice(choice.priceModifier!)})`
                        }
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ) : option.type === 'TEXTFIELD' ? (
            <input
              type="text"
              placeholder={`Enter ${option.name.toLowerCase()}`}
              onChange={(e) => handleOptionChange(option.name, e.target.value)}
              className="w-full px-4 py-3 border border-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange transition-all"
            />
          ) : option.type === 'TEXTAREA' ? (
            <textarea
              placeholder={`Enter ${option.name.toLowerCase()}`}
              onChange={(e) => handleOptionChange(option.name, e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange transition-all resize-none"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
