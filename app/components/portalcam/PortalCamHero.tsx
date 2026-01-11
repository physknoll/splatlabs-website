'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '../ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function PortalCamHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

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
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-hero-gradient overflow-hidden"
    >
      {/* Animated Gradient Blobs */}
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
        className="absolute -top-40 -right-40 w-[600px] h-[600px] 3xl:w-[800px] 3xl:h-[800px] rounded-full bg-gradient-to-br from-rock-orange/15 via-amber-200/20 to-orange-100/10 blur-3xl pointer-events-none"
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
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] rounded-full bg-gradient-to-tr from-orange-200/20 via-rock-orange/10 to-amber-100/15 blur-3xl pointer-events-none"
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
            <span className="font-heading text-2xl md:text-3xl font-bold text-content-secondary/60 tracking-tight">
              PortalCam
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl tracking-tight text-content-primary mb-6 leading-[1.1]"
          >
            The First True{' '}
            <span className="gradient-text-orange">Spatial Camera.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl 3xl:text-2xl text-content-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Powered by 3D Gaussian Splatting. Turn any location into a
            photorealistic, navigable 3D world in minutes.
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
            >
              Buy PortalCam
            </Button>
            <Button
              variant="outline"
              size="xl"
              leftIcon={<Play className="w-5 h-5" />}
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
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/portalcam/videos/banner_2.mp4" type="video/mp4" />
              </video>
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
          className="w-6 h-10 rounded-full border-2 border-content-muted flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-content-muted rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
