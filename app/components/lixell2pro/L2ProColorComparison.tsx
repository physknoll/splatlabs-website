'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function L2ProColorComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX)
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg-alt/50 via-white to-light-bg-alt/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-600 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10">
            Real-Time Output
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-content-primary mb-4">
            True SLAM with{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              real-time output
            </span>
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-3xl mx-auto">
            The real-time coloring effect rivals post-processing quality.
            L2 Pro delivers instant results with no waiting.
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Right Side - "Traditional/Post-processed" (grayscale/lower quality) */}
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale opacity-70"
              >
                <source src="/lixell2pro/videos/3.mp4" type="video/mp4" />
              </video>
              {/* Overlay to simulate lower quality */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-800/30" />
            </div>

            {/* Left Side - "L2 Pro Real-time" (full color, high fidelity) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/lixell2pro/videos/3.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div className="flex gap-0.5">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg z-10">
              L2 Pro Real-time
            </div>
            <div className="absolute top-4 right-4 px-4 py-2 bg-gray-800/80 text-white/80 text-sm font-medium rounded-full shadow-lg z-10">
              Traditional Post-processed
            </div>
          </div>

          {/* Key Stat Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-full">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-pulse" />
              <span className="text-lg font-semibold text-content-primary">
                Welcome to the <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Zero Post-Processing Era</span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Accuracy Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16"
        >
          {[
            { label: 'Absolute Vertical Accuracy', value: '3cm' },
            { label: 'Absolute Horizontal Accuracy', value: '3cm' },
            { label: 'Relative Accuracy', value: '2cm' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-content-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
