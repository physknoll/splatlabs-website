'use client'

import { useState, useMemo } from 'react'
import type { EcwidProduct, ProductCombination, SelectedOption } from '@/lib/ecwid/types'
import { ProductOptions } from './ProductOptions'
import { AddToCartButton } from './AddToCartButton'
import { formatPrice } from '@/lib/ecwid/products'

interface ProductDetailsProps {
  product: EcwidProduct
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])
  const [selectedCombination, setSelectedCombination] = useState<ProductCombination | null>(null)
  
  // Calculate effective price and stock based on selected combination
  const effectivePrice = useMemo(() => {
    if (selectedCombination?.price !== undefined) {
      return selectedCombination.price
    }
    
    // Calculate price with option modifiers
    let price = product.price
    
    selectedOptions.forEach((selectedOpt) => {
      const productOption = product.options?.find((o) => o.name === selectedOpt.name)
      if (productOption?.choices) {
        const choice = productOption.choices.find((c) => c.text === selectedOpt.value)
        if (choice?.priceModifier) {
          if (choice.priceModifierType === 'PERCENT') {
            price += product.price * (choice.priceModifier / 100)
          } else {
            price += choice.priceModifier
          }
        }
      }
    })
    
    return price
  }, [product, selectedOptions, selectedCombination])
  
  const effectiveStock = useMemo(() => {
    if (selectedCombination) {
      return {
        inStock: selectedCombination.inStock ?? product.inStock,
        quantity: selectedCombination.quantity ?? product.quantity,
        unlimited: selectedCombination.unlimited ?? product.unlimited,
      }
    }
    
    return {
      inStock: product.inStock,
      quantity: product.quantity,
      unlimited: product.unlimited,
    }
  }, [product, selectedCombination])
  
  const handleOptionsChange = (options: SelectedOption[], combination: ProductCombination | null) => {
    setSelectedOptions(options)
    setSelectedCombination(combination)
  }
  
  // Build cart item
  const cartItem = {
    productId: product.id,
    name: product.name,
    sku: selectedCombination?.sku || product.sku,
    price: effectivePrice,
    quantity: 1,
    imageUrl: selectedCombination?.imageUrl || product.imageUrl,
    thumbnailUrl: selectedCombination?.thumbnailUrl || product.thumbnailUrl,
    weight: selectedCombination?.weight ?? product.weight,
    isShippingRequired: product.isShippingRequired,
    selectedOptions: selectedOptions.length > 0 ? selectedOptions : undefined,
    combinationId: selectedCombination?.id,
  }
  
  const hasOptions = product.options && product.options.length > 0
  
  return (
    <div className="space-y-6">
      {/* Options */}
      {hasOptions && (
        <ProductOptions 
          product={product} 
          onOptionsChange={handleOptionsChange}
        />
      )}
      
      {/* Dynamic Price (if different from displayed) */}
      {hasOptions && effectivePrice !== product.price && (
        <div className="p-4 bg-light-bg-subtle rounded-xl">
          <p className="text-sm text-content-muted mb-1">Price with selected options:</p>
          <p className="text-2xl font-bold text-rock-orange">
            {formatPrice(effectivePrice)}
          </p>
        </div>
      )}
      
      {/* Stock Status for Combination */}
      {selectedCombination && !effectiveStock.inStock && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm font-medium text-red-700">
            This variant is currently out of stock
          </p>
        </div>
      )}
      
      {/* Add to Cart */}
      <AddToCartButton
        item={cartItem}
        disabled={!effectiveStock.inStock}
        size="lg"
      />
      
      {/* Stock Info */}
      {effectiveStock.inStock && !effectiveStock.unlimited && effectiveStock.quantity <= 10 && (
        <p className="text-sm text-amber-600 font-medium">
          ⚡ Only {effectiveStock.quantity} left in stock - order soon!
        </p>
      )}
    </div>
  )
}
