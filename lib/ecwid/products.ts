// Ecwid Products API Functions

import { ecwidGet } from './client'
import type { 
  EcwidProduct, 
  ProductsResponse, 
  EcwidCategory, 
  CategoriesResponse,
  StoreProfile 
} from './types'

// ============================================
// PRODUCT FUNCTIONS
// ============================================

export interface GetProductsParams {
  /** Filter by enabled status */
  enabled?: boolean
  /** Filter by in-stock status */
  inStock?: boolean
  /** Filter by category ID */
  category?: number
  /** Search by keyword */
  keyword?: string
  /** Number of products to return (max 100) */
  limit?: number
  /** Offset for pagination */
  offset?: number
  /** Sort order */
  sortBy?: 'RELEVANCE' | 'ADDED_TIME_DESC' | 'ADDED_TIME_ASC' | 'NAME_ASC' | 'NAME_DESC' | 'PRICE_ASC' | 'PRICE_DESC'
  /** Only include specific fields in response */
  responseFields?: string
}

/**
 * Fetch all products from the store
 */
export async function getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
  return ecwidGet<ProductsResponse>('/products', {
    enabled: params?.enabled,
    inStock: params?.inStock,
    category: params?.category,
    keyword: params?.keyword,
    limit: params?.limit ?? 100,
    offset: params?.offset ?? 0,
    sortBy: params?.sortBy,
    responseFields: params?.responseFields,
  })
}

/**
 * Fetch all enabled, in-stock products (for store display)
 */
export async function getEnabledProducts(params?: Omit<GetProductsParams, 'enabled'>): Promise<ProductsResponse> {
  return getProducts({
    ...params,
    enabled: true,
  })
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(productId: number): Promise<EcwidProduct> {
  return ecwidGet<EcwidProduct>(`/products/${productId}`)
}

/**
 * Fetch a single product by SKU
 */
export async function getProductBySku(sku: string): Promise<EcwidProduct | null> {
  const response = await getProducts({
    keyword: sku,
    limit: 10,
  })
  
  // Find exact SKU match
  const product = response.items.find(p => p.sku === sku)
  return product ?? null
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(categoryId: number, params?: Omit<GetProductsParams, 'category'>): Promise<ProductsResponse> {
  return getProducts({
    ...params,
    category: categoryId,
    enabled: params?.enabled ?? true,
  })
}

/**
 * Search products by keyword
 */
export async function searchProducts(keyword: string, params?: Omit<GetProductsParams, 'keyword'>): Promise<ProductsResponse> {
  return getProducts({
    ...params,
    keyword,
    enabled: params?.enabled ?? true,
  })
}

/**
 * Get related products for a product
 */
export async function getRelatedProducts(product: EcwidProduct, limit: number = 4): Promise<EcwidProduct[]> {
  // First, try to get products from the same category
  if (product.categoryIds && product.categoryIds.length > 0) {
    const categoryProducts = await getProductsByCategory(product.categoryIds[0], {
      limit: limit + 1, // Get one extra in case the current product is included
      enabled: true,
      inStock: true,
    })
    
    // Filter out the current product
    const related = categoryProducts.items.filter(p => p.id !== product.id).slice(0, limit)
    
    if (related.length >= limit) {
      return related
    }
  }
  
  // Fallback: get featured products
  const featuredProducts = await getProducts({
    limit: limit + 1,
    enabled: true,
    inStock: true,
    sortBy: 'ADDED_TIME_DESC',
  })
  
  return featuredProducts.items.filter(p => p.id !== product.id).slice(0, limit)
}

// ============================================
// CATEGORY FUNCTIONS
// ============================================

export interface GetCategoriesParams {
  /** Filter by parent category ID (0 for root categories) */
  parent?: number
  /** Filter by enabled status */
  enabled?: boolean
  /** Number of categories to return (max 100) */
  limit?: number
  /** Offset for pagination */
  offset?: number
  /** Only include specific fields in response */
  responseFields?: string
}

/**
 * Fetch all categories
 */
export async function getCategories(params?: GetCategoriesParams): Promise<CategoriesResponse> {
  return ecwidGet<CategoriesResponse>('/categories', {
    parent: params?.parent,
    enabled: params?.enabled,
    limit: params?.limit ?? 100,
    offset: params?.offset ?? 0,
    responseFields: params?.responseFields,
  })
}

/**
 * Fetch enabled categories only
 */
export async function getEnabledCategories(params?: Omit<GetCategoriesParams, 'enabled'>): Promise<CategoriesResponse> {
  return getCategories({
    ...params,
    enabled: true,
  })
}

/**
 * Fetch a single category by ID
 */
export async function getCategoryById(categoryId: number): Promise<EcwidCategory> {
  return ecwidGet<EcwidCategory>(`/categories/${categoryId}`)
}

/**
 * Fetch root-level categories
 */
export async function getRootCategories(): Promise<CategoriesResponse> {
  return getCategories({
    parent: 0,
    enabled: true,
  })
}

// ============================================
// STORE PROFILE
// ============================================

/**
 * Fetch store profile (settings, currency, etc.)
 */
export async function getStoreProfile(): Promise<StoreProfile> {
  return ecwidGet<StoreProfile>('/profile', undefined, { revalidate: 3600 }) // Cache for 1 hour
}

/**
 * Get store currency formatting info
 */
export async function getCurrencyInfo(): Promise<{
  currency: string
  prefix: string
  suffix: string
  precision: number
}> {
  const profile = await getStoreProfile()
  return {
    currency: profile.formatsAndUnits.currency,
    prefix: profile.formatsAndUnits.currencyPrefix,
    suffix: profile.formatsAndUnits.currencySuffix,
    precision: profile.formatsAndUnits.currencyPrecision,
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a URL-friendly slug from a product name
 */
export function createProductSlug(product: EcwidProduct): string {
  const slug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  return `${slug}-${product.id}`
}

/**
 * Extract product ID from a slug
 */
export function getProductIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/)
  if (match) {
    return parseInt(match[1], 10)
  }
  return null
}

/**
 * Format price with currency
 */
export function formatPrice(
  price: number, 
  options?: { 
    prefix?: string
    suffix?: string
    precision?: number 
  }
): string {
  const { prefix = '$', suffix = '', precision = 2 } = options ?? {}
  const formattedNumber = price.toFixed(precision)
  return `${prefix}${formattedNumber}${suffix}`
}

/**
 * Check if a product is on sale
 */
export function isOnSale(product: EcwidProduct): boolean {
  return !!(product.compareToPrice && product.compareToPrice > product.price)
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(product: EcwidProduct): number {
  if (!product.compareToPrice || product.compareToPrice <= product.price) {
    return 0
  }
  return Math.round((1 - product.price / product.compareToPrice) * 100)
}

/**
 * Check if product has low stock
 */
export function hasLowStock(product: EcwidProduct, threshold: number = 5): boolean {
  if (product.unlimited) return false
  return product.quantity > 0 && product.quantity <= threshold
}

/**
 * Get stock status message
 */
export function getStockStatus(product: EcwidProduct): { status: 'in_stock' | 'low_stock' | 'out_of_stock', message: string } {
  if (!product.inStock) {
    return { status: 'out_of_stock', message: 'Out of stock' }
  }
  
  if (product.unlimited) {
    return { status: 'in_stock', message: 'In stock' }
  }
  
  if (product.quantity <= 5) {
    return { status: 'low_stock', message: `Only ${product.quantity} left!` }
  }
  
  return { status: 'in_stock', message: 'In stock' }
}
