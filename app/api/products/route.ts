import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getEnabledProducts } from '@/lib/ecwid/products'

export const dynamic = 'force-dynamic'

/**
 * GET /api/products
 * Fetch products from Ecwid
 * 
 * Query params:
 * - enabled: boolean (default: true)
 * - inStock: boolean
 * - category: number
 * - keyword: string
 * - limit: number (default: 100, max: 100)
 * - offset: number (default: 0)
 * - sortBy: string
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const enabled = searchParams.get('enabled')
    const inStock = searchParams.get('inStock')
    const category = searchParams.get('category')
    const keyword = searchParams.get('keyword')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const sortBy = searchParams.get('sortBy')
    
    // Default to enabled products
    const useEnabledOnly = enabled === null || enabled === 'true'
    
    const params = {
      enabled: useEnabledOnly ? true : enabled === 'true',
      inStock: inStock ? inStock === 'true' : undefined,
      category: category ? parseInt(category, 10) : undefined,
      keyword: keyword ?? undefined,
      limit: limit ? Math.min(parseInt(limit, 10), 100) : 100,
      offset: offset ? parseInt(offset, 10) : 0,
      sortBy: sortBy as 'RELEVANCE' | 'ADDED_TIME_DESC' | 'ADDED_TIME_ASC' | 'NAME_ASC' | 'NAME_DESC' | 'PRICE_ASC' | 'PRICE_DESC' | undefined,
    }
    
    const products = useEnabledOnly
      ? await getEnabledProducts(params)
      : await getProducts(params)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
