'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

// Toast types
type ToastType = 'success' | 'error' | 'info' | 'cart'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])
  
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Individual Toast
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const duration = toast.duration ?? 4000
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onRemove, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onRemove])
  
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    cart: <ShoppingCart className="w-5 h-5 text-rock-orange" />,
  }
  
  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    cart: 'bg-orange-50 border-orange-200',
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm',
        backgrounds[toast.type]
      )}
    >
      {icons[toast.type]}
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-content-primary text-sm">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-content-muted mt-0.5">{toast.message}</p>
        )}
      </div>
      
      <button
        onClick={onRemove}
        className="p-1 -mr-1 text-content-muted hover:text-content-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// Convenience functions for common toast types
export function showSuccessToast(addToast: ToastContextValue['addToast'], title: string, message?: string) {
  addToast({ type: 'success', title, message })
}

export function showErrorToast(addToast: ToastContextValue['addToast'], title: string, message?: string) {
  addToast({ type: 'error', title, message })
}

export function showCartToast(addToast: ToastContextValue['addToast'], productName: string) {
  addToast({ 
    type: 'cart', 
    title: 'Added to cart!', 
    message: productName,
    duration: 3000,
  })
}
