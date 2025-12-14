'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Upload, Users, Globe, Ruler } from 'lucide-react'
import { Button } from '../ui/Button'

const featurePills = [
  { icon: Upload, label: 'Instant Upload' },
  { icon: Globe, label: 'Browser-Based' },
  { icon: Users, label: 'Team Collaboration' },
  { icon: Ruler, label: 'Precision Measurements' },
]

// Set to true once you add your video file
const HAS_VIDEO = true
// Path to your video in the public folder
const VIDEO_PATH = '/videos/splat-homepage.mp4'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-hero-gradient overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] hero-glow opacity-60" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] hero-glow opacity-40" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
{/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-content-primary mb-6 leading-[1.1]"
            >
              Host, Share & Explore
              <br />
              <span className="gradient-text-orange">Your 3D World</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-lg text-lg md:text-xl text-content-secondary mb-8 leading-relaxed"
            >
              The cloud platform for Gaussian Splats. Upload your 3D scans and 
              share stunning, interactive experiences with anyone—no software required.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-6"
            >
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="xl"
                leftIcon={<Play className="w-5 h-5" />}
              >
                Book a Demo
              </Button>
            </motion.div>

            {/* Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm text-content-muted mb-10"
            >
              Free forever. No credit card required.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {featurePills.map((pill, i) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="feature-pill"
                >
                  <pill.icon className="w-4 h-4 text-content-muted" />
                  <span>{pill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Product Preview with Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Browser Frame */}
            <div className="product-frame overflow-hidden">
              {/* Browser Chrome - Title Bar */}
              <div className="bg-light-bg-subtle border-b border-light-border px-4 py-3 flex items-center gap-4">
                {/* Traffic Lights */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                
                {/* URL Bar */}
                <div className="flex-1">
                  <div className="h-8 bg-white rounded-lg border border-light-border flex items-center px-4">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs text-content-muted truncate">
                      splatlabs.io/view/your-project
                    </span>
                  </div>
                </div>
              </div>

              {/* Video/Content Area */}
              <div className="relative aspect-video bg-gradient-to-br from-light-bg-subtle to-white">
                {HAS_VIDEO ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={VIDEO_PATH} type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  /* Placeholder when no video */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-24 h-24 mb-6 rounded-2xl bg-rock-orange/10 border border-rock-orange/20 flex items-center justify-center"
                    >
                      <svg
                        className="w-12 h-12 text-rock-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-xl font-heading font-bold text-content-primary mb-2 text-center">
                      Your 3D Viewer
                    </h3>
                    <p className="text-content-muted text-center max-w-xs">
                      Interactive Gaussian Splat viewer will appear here
                    </p>
                  </div>
                )}
              </div>

              {/* Corner Accents */}
              <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-rock-orange/20 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-rock-orange/20 rounded-br-xl pointer-events-none" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-soft-lg border border-light-border p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-content-primary">Processing Complete</div>
                  <div className="text-xs text-content-muted">Ready in 2.4 seconds</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Users Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft-lg border border-light-border p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-rock-orange/20 border-2 border-white flex items-center justify-center text-xs font-bold text-rock-orange">J</div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">M</div>
                  <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold text-green-600">S</div>
                </div>
                <div className="text-xs text-content-muted">3 viewers online</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
