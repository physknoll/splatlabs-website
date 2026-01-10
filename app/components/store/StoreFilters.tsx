'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EcwidCategory } from '@/lib/ecwid/types'

interface StoreFiltersProps {
  categories: EcwidCategory[]
  selectedCategory?: number | null
  onCategoryChange?: (categoryId: number | null) => void
}

export function StoreFilters({ 
  categories, 
  selectedCategory = null, 
  onCategoryChange 
}: StoreFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(selectedCategory)
  
  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategory(categoryId)
    onCategoryChange?.(categoryId)
    
    // If this is client-side filtering, we could trigger a refetch here
    // For now, this is just visual state
  }
  
  if (categories.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-content-muted">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      
      {/* All Products */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          activeCategory === null
            ? 'bg-rock-orange text-white shadow-sm'
            : 'bg-light-bg-subtle text-content-secondary hover:bg-light-bg-muted hover:text-content-primary'
        )}
      >
        All Products
      </button>
      
      {/* Category Pills */}
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeCategory === category.id
              ? 'bg-rock-orange text-white shadow-sm'
              : 'bg-light-bg-subtle text-content-secondary hover:bg-light-bg-muted hover:text-content-primary'
          )}
        >
          {category.name}
          {category.productCount !== undefined && category.productCount > 0 && (
            <span className="ml-1.5 text-xs opacity-75">
              ({category.productCount})
            </span>
          )}
        </motion.button>
      ))}
      
      {/* Clear Filter */}
      {activeCategory !== null && (
        <button
          onClick={() => handleCategoryClick(null)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-content-muted hover:text-content-primary transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  )
}
