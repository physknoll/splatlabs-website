'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Callout configuration - appears at specific frames
// Order: LiDAR first, Dual Fisheye second, Multi-SLAM third
const callouts = [
  {
    frameRange: [10, 25],
    position: 'left' as const,
    title: 'LiDAR Sensor',
    description: 'Active depth sensing for perfect scale accuracy.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    frameRange: [30, 45],
    position: 'left' as const,
    title: 'Dual Fisheye Lenses',
    description: 'Complete visual coverage with zero blind spots.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    frameRange: [50, 65],
    position: 'left' as const,
    title: 'Multi-SLAM Processing',
    description: 'Onboard chip fuses sensors in real-time. No heavy PC required.',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
]

export function ScrollSpinner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const frameCount = 70

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const promises: Promise<void>[] = []
      const loadedImages: HTMLImageElement[] = []

      for (let i = 0; i <= frameCount; i++) {
        const img = new Image()
        const frameNum = i.toString().padStart(4, '0')
        img.src = `/portalcam/sequence/Pz${frameNum}.jpg`

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
          pin: '.scroll-spinner-sticky',
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
      <div ref={containerRef} className="h-[300vh] w-full relative">
        {/* Sticky Content */}
        <div className="scroll-spinner-sticky sticky top-20 h-[calc(100vh-5rem)] w-full flex flex-col lg:flex-row items-center overflow-hidden">
          {/* Left Side - Header and Callouts */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 pt-6 pb-4 md:px-12 lg:px-16 lg:py-0 lg:h-full">
            {/* Section Header */}
            <div className="mb-4 lg:mb-10">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-rock-orange text-xs md:text-sm lg:text-base font-semibold uppercase tracking-wider mb-2 lg:mb-3"
              >
                Technical Breakdown
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-heading font-bold text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-white leading-tight"
              >
                Engineered for Spatial Capture
              </motion.h2>
            </div>

            {/* Callouts */}
            <div className="relative min-h-[120px] md:min-h-[140px] lg:min-h-[180px]">
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
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8">
                      <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-rock-orange/20 flex items-center justify-center text-rock-orange">
                          <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8">
                            {activeCallout.icon}
                          </div>
                        </div>
                        <h3 className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
                          {activeCallout.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                        {activeCallout.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scroll Progress Indicator - hidden on mobile */}
            <div className="hidden lg:flex mt-10 lg:mt-12 items-center gap-4 text-white/50 text-sm md:text-base">
              <span>Scroll to explore</span>
              <div className="w-24 md:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rock-orange rounded-full transition-all duration-100"
                  style={{ width: `${(currentFrame / frameCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Camera Canvas */}
          <div className="w-full lg:w-3/5 flex-1 lg:h-full flex items-center justify-center overflow-hidden">
            {/* Loading State */}
            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-lg">Loading camera view...</div>
              </div>
            )}

            {/* Canvas - centered on mobile, shifted on desktop */}
            <canvas
              ref={canvasRef}
              className="h-[35vh] md:h-[45vh] lg:h-[70vh] w-auto object-contain 
                         lg:-translate-x-[20%]"
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
