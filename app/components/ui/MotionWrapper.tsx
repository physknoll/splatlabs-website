'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type MotionProps, type HTMLMotionProps } from 'framer-motion'

/**
 * Hook to safely handle hydration for animations
 * Returns false on server/initial render, true after hydration
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  
  useEffect(() => {
    setHydrated(true)
  }, [])
  
  return hydrated
}

/**
 * Hydration-safe motion.div wrapper
 * Prevents the flash by only applying initial animation states after hydration
 */
interface SafeMotionDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export function SafeMotionDiv({ 
  children, 
  initial, 
  animate, 
  ...props 
}: SafeMotionDivProps) {
  const hydrated = useHydrated()
  
  return (
    <motion.div
      {...props}
      // Only apply initial state after hydration to prevent flash
      initial={hydrated ? initial : false}
      animate={hydrated ? animate : false}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hydration-safe motion.span wrapper
 */
interface SafeMotionSpanProps extends HTMLMotionProps<'span'> {
  children: React.ReactNode
}

export function SafeMotionSpan({ 
  children, 
  initial, 
  animate, 
  ...props 
}: SafeMotionSpanProps) {
  const hydrated = useHydrated()
  
  return (
    <motion.span
      {...props}
      initial={hydrated ? initial : false}
      animate={hydrated ? animate : false}
    >
      {children}
    </motion.span>
  )
}

/**
 * Hydration-safe motion.section wrapper
 */
interface SafeMotionSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode
}

export function SafeMotionSection({ 
  children, 
  initial, 
  animate, 
  ...props 
}: SafeMotionSectionProps) {
  const hydrated = useHydrated()
  
  return (
    <motion.section
      {...props}
      initial={hydrated ? initial : false}
      animate={hydrated ? animate : false}
    >
      {children}
    </motion.section>
  )
}
