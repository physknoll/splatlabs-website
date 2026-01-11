'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, X } from 'lucide-react'
import { Button } from '../ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function L2ProHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const videoContainer = videoContainerRef.current

    if (!section || !videoContainer) return

    // GSAP animation: expand video from 70% to 100% width on scroll
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoContainer,
        {
          width: '70%',
          borderRadius: '24px',
        },
        {
          width: '100%',
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden"
      >
        {/* Animated Gradient Blobs - Using cyan/teal for L2 Pro branding */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1.1, 1],
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] 3xl:w-[800px] 3xl:h-[800px] rounded-full bg-gradient-to-br from-cyan-500/15 via-teal-400/20 to-blue-500/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            x: [0, -30, 40, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] rounded-full bg-gradient-to-tr from-teal-400/20 via-cyan-500/10 to-blue-400/15 blur-3xl pointer-events-none"
        />

        {/* Noise Texture */}
        <div className="noise-overlay z-[2]" />

        {/* Content */}
        <div className="container-custom relative z-10 pt-28 pb-8 lg:pt-36">
          <div className="text-center max-w-4xl mx-auto mb-12">
            {/* Product Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <img
                src="/lixell2pro/images/lixell2pro_logo_en.png"
                alt="Lixel L2 Pro"
                className="h-10 w-auto"
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl tracking-tight text-white mb-4 leading-[1.1]"
            >
              Real-time Scanning &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Modeling Device
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl 3xl:text-2xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              The new Lixel L2 Pro combines LiDAR, visual, and IMU modules with AI,
              delivering real-time point cloud data that rivals post-processed quality.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 border-none"
              >
                Book a Demo
              </Button>
              <Button
                variant="outline"
                size="xl"
                leftIcon={<Play className="w-5 h-5" />}
                className="border-cyan-400/50 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400"
                onClick={() => setShowModal(true)}
              >
                Watch Intro
              </Button>
            </motion.div>
          </div>

          {/* Expanding Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <div
              ref={videoContainerRef}
              className="relative overflow-hidden shadow-2xl"
              style={{ width: '70%', borderRadius: '24px' }}
            >
              <div className="relative aspect-video bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/lixell2pro/videos/5.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src="https://www.youtube.com/embed/uWdDDi2-xt8?autoplay=1"
                  title="Lixel L2 Pro Introduction"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
