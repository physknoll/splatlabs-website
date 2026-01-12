'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import { Button } from '../ui/Button'
import { CartIcon } from '../store/CartIcon'
import { useHydrated } from '../ui/MotionWrapper'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hydrated = useHydrated()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    // Check initial scroll position
    setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-light-border py-4 shadow-soft'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo/SVG/splatlabs_logo_full.svg"
              alt="Splat Labs Logo"
              className="h-9 3xl:h-11 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 3xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 3xl:px-5 3xl:py-2.5 text-sm 3xl:text-base font-medium rounded-lg transition-colors',
                    'text-content-secondary hover:text-content-primary hover:bg-light-bg-subtle'
                  )}
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeDropdown === item.title && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.title && (
                    <motion.div
                      initial={hydrated ? { opacity: 0, y: 10 } : false}
                      animate={hydrated ? { opacity: 1, y: 0 } : false}
                      exit={hydrated ? { opacity: 0, y: 10 } : undefined}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="w-80 p-2 bg-white border border-light-border rounded-xl shadow-soft-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="flex flex-col gap-1 p-3 rounded-lg hover:bg-light-bg-subtle transition-colors group/item"
                          >
                            <span className="text-sm font-medium text-content-primary group-hover/item:text-rock-orange transition-colors">
                              {child.title}
                            </span>
                            {child.description && (
                              <span className="text-xs text-content-muted">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4 3xl:gap-6">
            {/* Store Link */}
            <Link
              href="/store"
              className="text-sm 3xl:text-base font-medium text-content-secondary hover:text-content-primary transition-colors"
            >
              Store
            </Link>
            
            {/* Cart Icon */}
            <CartIcon />
            
            <a
              href="https://cloud.rockrobotic.com/"
              className="text-sm 3xl:text-base font-medium text-content-secondary hover:text-content-primary transition-colors"
            >
              Log In
            </a>
            <a href="https://cloud.rockrobotic.com/">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />}>
                Start for Free
              </Button>
            </a>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <CartIcon />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-content-primary hover:bg-light-bg-subtle rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={hydrated ? { opacity: 0 } : false}
            animate={hydrated ? { opacity: 1 } : false}
            exit={hydrated ? { opacity: 0 } : undefined}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={hydrated ? { x: '100%' } : false}
              animate={hydrated ? { x: 0 } : false}
              exit={hydrated ? { x: '100%' } : undefined}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-light-border overflow-y-auto shadow-soft-xl"
            >
              <div className="p-6 pt-20">
                {/* Mobile Nav Items */}
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-lg font-medium text-content-primary hover:bg-light-bg-subtle rounded-lg transition-colors"
                      >
                        {item.title}
                        {item.children && <ChevronDown className="w-5 h-5 text-content-muted" />}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-light-bg-subtle rounded-lg transition-colors"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTAs */}
                <div className="mt-8 pt-8 border-t border-light-border space-y-4">
                  <a href="https://cloud.rockrobotic.com/" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      Start for Free
                    </Button>
                  </a>
                  <a href="https://cloud.rockrobotic.com/" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Log In
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
