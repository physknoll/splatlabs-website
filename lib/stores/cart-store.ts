'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, SelectedOption } from '@/lib/ecwid/types'
import { analytics, type CartItemProperties } from '@/lib/analytics'

// ============================================
// ANALYTICS HELPERS
// ============================================

/**
 * Convert CartItem to CartItemProperties for analytics
 */
function toAnalyticsItem(item: CartItem): CartItemProperties {
  return {
    product_id: item.productId,
    product_name: item.name,
    product_sku: item.sku,
    product_price: item.price,
    quantity: item.quantity,
    selected_options: item.selectedOptions,
    combination_id: item.combinationId,
  }
}

// ============================================
// CART STORE TYPES
// ============================================

export interface CartState {
  // State
  items: CartItem[]
  isOpen: boolean
  isHydrated: boolean
  
  // Computed (implemented as functions)
  getItemCount: () => number
  getSubtotal: () => number
  getTotalWeight: () => number
  requiresShipping: () => boolean
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: number, combinationId?: number) => void
  updateQuantity: (productId: number, quantity: number, combinationId?: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  setHydrated: () => void
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if two cart items are the same product (including variant)
 */
function isSameItem(a: CartItem, b: { productId: number; combinationId?: number }): boolean {
  return a.productId === b.productId && a.combinationId === b.combinationId
}

/**
 * Check if two selected options arrays are equivalent
 */
function areOptionsEqual(a?: SelectedOption[], b?: SelectedOption[]): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  
  return a.every((optA, index) => {
    const optB = b[index]
    return optA.name === optB.name && optA.value === optB.value
  })
}

/**
 * Find an item in the cart
 */
function findItemIndex(items: CartItem[], productId: number, combinationId?: number): number {
  return items.findIndex(item => isSameItem(item, { productId, combinationId }))
}

// ============================================
// CART STORE
// ============================================

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      isHydrated: false,
      
      // Computed values
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
      
      getTotalWeight: () => {
        return get().items.reduce((sum, item) => sum + (item.weight ?? 0) * item.quantity, 0)
      },
      
      requiresShipping: () => {
        return get().items.some(item => item.isShippingRequired !== false)
      },
      
      // Actions
      addItem: (item) => {
        const currentItems = get().items
        const isFirstItem = currentItems.length === 0
        const analyticsItem = toAnalyticsItem(item)
        
        set((state) => {
          const existingIndex = findItemIndex(state.items, item.productId, item.combinationId)
          
          if (existingIndex !== -1) {
            // Check if options match
            const existing = state.items[existingIndex]
            if (areOptionsEqual(existing.selectedOptions, item.selectedOptions)) {
              // Same item with same options - increase quantity
              const newItems = [...state.items]
              newItems[existingIndex] = {
                ...existing,
                quantity: existing.quantity + item.quantity,
              }
              return { items: newItems }
            }
          }
          
          // New item or different options - add to cart
          return { items: [...state.items, item] }
        })
        
        // Track analytics after state update
        const newItems = get().items.map(toAnalyticsItem)
        
        // Track cart created if this is the first item
        if (isFirstItem) {
          analytics.trackCartCreated(analyticsItem)
        }
        
        // Always track add to cart
        analytics.trackAddToCart(analyticsItem, newItems)
      },
      
      removeItem: (productId, combinationId) => {
        const currentItems = get().items
        const removedItem = currentItems.find(item => isSameItem(item, { productId, combinationId }))
        
        set((state) => ({
          items: state.items.filter(item => !isSameItem(item, { productId, combinationId })),
        }))
        
        // Track analytics after state update
        if (removedItem) {
          const newItems = get().items.map(toAnalyticsItem)
          analytics.trackRemoveFromCart(toAnalyticsItem(removedItem), newItems)
        }
      },
      
      updateQuantity: (productId, quantity, combinationId) => {
        if (quantity <= 0) {
          get().removeItem(productId, combinationId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            isSameItem(item, { productId, combinationId })
              ? { ...item, quantity }
              : item
          ),
        }))
      },
      
      clearCart: () => {
        const previousItems = get().items
        
        set({ items: [] })
        
        // Track cart cleared
        if (previousItems.length > 0) {
          analytics.trackCartCleared(previousItems.map(toAnalyticsItem))
        }
      },
      
      openCart: () => {
        set({ isOpen: true })
      },
      
      closeCart: () => {
        set({ isOpen: false })
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },
      
      setHydrated: () => {
        set({ isHydrated: true })
      },
    }),
    {
      name: 'splatlabs-cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI state
      partialize: (state) => ({
        items: state.items,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)

// ============================================
// HOOKS
// ============================================

/**
 * Hook to check if cart is hydrated (safe to use cart data)
 */
export function useCartHydration() {
  return useCartStore((state) => state.isHydrated)
}

/**
 * Hook to get cart item count (handles hydration)
 */
export function useCartItemCount() {
  const isHydrated = useCartStore((state) => state.isHydrated)
  const getItemCount = useCartStore((state) => state.getItemCount)
  
  return isHydrated ? getItemCount() : 0
}

/**
 * Hook to get cart subtotal (handles hydration)
 */
export function useCartSubtotal() {
  const isHydrated = useCartStore((state) => state.isHydrated)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  
  return isHydrated ? getSubtotal() : 0
}

/**
 * Hook to check if product is in cart
 */
export function useIsInCart(productId: number, combinationId?: number) {
  return useCartStore((state) =>
    state.items.some(item => isSameItem(item, { productId, combinationId }))
  )
}

/**
 * Hook to get quantity of a specific item in cart
 */
export function useCartItemQuantity(productId: number, combinationId?: number) {
  return useCartStore((state) => {
    const item = state.items.find(item => isSameItem(item, { productId, combinationId }))
    return item?.quantity ?? 0
  })
}
