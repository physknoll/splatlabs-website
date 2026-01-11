'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Callout configuration - appears at specific frames
const callouts = [
  {
    frameRange: [0, 30],
    position: 'left' as const,
    title: 'Rotating LiDAR',
    description: 'Active scanning mechanism captures dense point clouds with precision depth data.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    frameRange: [40, 70],
    position: 'left' as const,
    title: 'Dual 48MP Panoramic Vision',
    description: 'Complete visual coverage with no external cameras needed for photo-quality colorization.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    frameRange: [80, 110],
    position: 'left' as const,
    title: 'High-precision 6DOF IMU',
    description: 'Rock-solid positioning with six degrees of freedom for accurate trajectory tracking.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    frameRange: [120, 147],
    position: 'left' as const,
    title: 'Multi-SLAM Optimization',
    description: 'Joint optimization of all sensors maximizes performance in any environment.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
]

export function L2ProScrollSpinner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const frameCount = 147

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const promises: Promise<void>[] = []
      const loadedImages: HTMLImageElement[] = []

      for (let i = 0; i <= frameCount; i++) {
        const img = new Image()
        const frameNum = i.toString().padStart(3, '0')
        img.src = `/lixell2pro/sequence/PRO${frameNum}.jpg`

        promises.push(
          new Promise((resolve) => {
            img.onload = () => resolve()
            img.onerror = () => resolve() // Continue even if image fails
          })
        )

        loadedImages.push(img)
      }

      await Promise.all(promises)
      imagesRef.current = loadedImages
      setImagesLoaded(true)
    }

    loadImages()
  }, [])

  // GSAP ScrollTrigger animation
  useEffect(() => {
    if (!imagesLoaded) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set canvas size
    const img = imagesRef.current[0]
    if (img) {
      canvas.width = img.naturalWidth || 1080
      canvas.height = img.naturalHeight || 1080
    }

    // Draw first frame
    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[Math.round(frameIndex)]
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    drawFrame(0)

    // GSAP animation
    const frame = { index: 0 }

    const ctx = gsap.context(() => {
      gsap.to(frame, {
        index: frameCount,
        snap: 'index',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80px', // Account for fixed header
          end: 'bottom bottom',
          scrub: 0.3,
          pin: '.l2pro-scroll-spinner-sticky',
          pinSpacing: true,
        },
        onUpdate: () => {
          drawFrame(frame.index)
          setCurrentFrame(Math.round(frame.index))
        },
      })
    }, container)

    return () => ctx.revert()
  }, [imagesLoaded])

  // Determine which callout to show
  const activeCallout = callouts.find(
    (c) => currentFrame >= c.frameRange[0] && currentFrame <= c.frameRange[1]
  )

  return (
    <section className="relative bg-[#0a0a0a]">
      {/* Cinema Band Container */}
      <div ref={containerRef} className="h-[400vh] w-full relative">
        {/* Sticky Content */}
        <div className="l2pro-scroll-spinner-sticky sticky top-20 h-[calc(100vh-5rem)] w-full flex items-center overflow-hidden">
          {/* Left Side - Header and Callouts */}
          <div className="w-1/2 lg:w-2/5 h-full flex flex-col justify-center pl-8 pr-4 md:pl-16 md:pr-8 lg:pl-24 lg:pr-12">
            {/* Section Header */}
            <div className="mb-10 lg:mb-12">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-cyan-400 text-sm md:text-base font-semibold uppercase tracking-wider mb-3"
              >
                Hardware Tour
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight"
              >
                Fully integrated and deeply optimized
              </motion.h2>
            </div>

            {/* Callouts */}
            <div className="relative min-h-[160px] md:min-h-[180px]">
              <AnimatePresence mode="wait">
                {activeCallout && (
                  <motion.div
                    key={activeCallout.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-md"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <div className="w-7 h-7 md:w-8 md:h-8">
                            {activeCallout.icon}
                          </div>
                        </div>
                        <h3 className="font-semibold text-white text-xl md:text-2xl">
                          {activeCallout.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed">
                        {activeCallout.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="mt-10 lg:mt-12 flex items-center gap-4 text-white/50 text-sm md:text-base">
              <span>Scroll to explore</span>
              <div className="w-24 md:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all duration-100"
                  style={{ width: `${(currentFrame / frameCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Camera Canvas */}
          <div className="w-1/2 lg:w-3/5 h-full flex items-center justify-center overflow-hidden">
            {/* Loading State */}
            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-lg">Loading device view...</div>
              </div>
            )}

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="h-[60vh] md:h-[65vh] lg:h-[70vh] w-auto object-contain"
              style={{ 
                opacity: imagesLoaded ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
