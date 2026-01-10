'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EcwidProduct, GalleryImage } from '@/lib/ecwid/types'

interface ProductGalleryProps {
  product: EcwidProduct
  className?: string
}

export function ProductGallery({ product, className }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  
  // Build array of all images
  const images: { url: string; thumbnail: string; alt: string }[] = []
  
  // Add main image first
  if (product.originalImageUrl || product.imageUrl) {
    images.push({
      url: product.originalImageUrl || product.imageUrl || '',
      thumbnail: product.thumbnailUrl || product.imageUrl || '',
      alt: product.name,
    })
  }
  
  // Add gallery images
  if (product.galleryImages) {
    product.galleryImages.forEach((img: GalleryImage, index: number) => {
      images.push({
        url: img.originalImageUrl || img.imageUrl,
        thumbnail: img.thumbnailUrl || img.thumbnail,
        alt: `${product.name} - Image ${index + 2}`,
      })
    })
  }
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    } else if (e.key === 'ArrowRight') {
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'Escape') {
      setIsZoomed(false)
    }
  }
  
  if (images.length === 0) {
    return (
      <div className={cn('aspect-square bg-light-bg-subtle rounded-2xl flex items-center justify-center', className)}>
        <span className="text-content-muted">No image available</span>
      </div>
    )
  }
  
  const currentImage = images[selectedIndex]
  
  return (
    <div className={cn('space-y-4', className)} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image */}
      <div className="relative aspect-square bg-light-bg-subtle rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              className={cn(
                'object-contain transition-transform duration-300',
                isZoomed && 'cursor-zoom-out scale-150'
              )}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-content-primary" />
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-content-primary" />
            </button>
          </>
        )}
        
        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          <Maximize2 className="w-4 h-4 text-content-primary" />
        </button>
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all',
                selectedIndex === index
                  ? 'border-rock-orange ring-2 ring-rock-orange/20'
                  : 'border-transparent hover:border-light-border-strong'
              )}
            >
              <Image
                src={image.thumbnail}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
