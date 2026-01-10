'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EcwidProduct } from '@/lib/ecwid/types'
import { 
  createProductSlug, 
  formatPrice, 
  isOnSale, 
  getDiscountPercentage, 
  getStockStatus 
} from '@/lib/ecwid/products'
import { useCartStore } from '@/lib/stores/cart-store'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: EcwidProduct
  index?: number
  className?: string
}

export function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  
  const slug = createProductSlug(product)
  const onSale = isOnSale(product)
  const discountPercent = getDiscountPercentage(product)
  const stockStatus = getStockStatus(product)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.inStock) return
    
    addItem({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      thumbnailUrl: product.thumbnailUrl,
      weight: product.weight,
      isShippingRequired: product.isShippingRequired,
    })
    
    openCart()
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'group relative bg-white border border-light-border rounded-2xl overflow-hidden',
        'shadow-soft hover:shadow-soft-lg transition-all duration-300',
        'hover:border-light-border-strong hover:-translate-y-1',
        className
      )}
    >
      <Link href={`/store/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-light-bg-subtle overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-content-muted">
              <Eye className="w-12 h-12 opacity-30" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {onSale && (
              <span className="px-2.5 py-1 bg-rock-orange text-white text-xs font-semibold rounded-full">
                -{discountPercent}%
              </span>
            )}
            
            {stockStatus.status === 'low_stock' && (
              <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                {stockStatus.message}
              </span>
            )}
            
            {stockStatus.status === 'out_of_stock' && (
              <span className="px-2.5 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                Sold Out
              </span>
            )}
          </div>
          
          {/* Quick Add Button - appears on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-content-primary text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-rock-orange transition-colors">
            {product.name}
          </h3>
          
          {/* SKU */}
          {product.sku && (
            <p className="text-xs text-content-muted mb-2 font-mono">
              SKU: {product.sku}
            </p>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-rock-orange">
              {formatPrice(product.price)}
            </span>
            
            {onSale && product.compareToPrice && (
              <span className="text-sm text-content-muted line-through">
                {formatPrice(product.compareToPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
