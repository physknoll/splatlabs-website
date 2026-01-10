import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

/**
 * POST /api/revalidate
 * Manually trigger ISR revalidation for specific paths
 * 
 * Query params:
 * - path: The path to revalidate (e.g., /store, /store/product-123)
 * - tag: A cache tag to invalidate (e.g., products, categories)
 * - secret: Optional secret for authorization
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')
    const secret = searchParams.get('secret')
    
    // Optional: Verify secret for external calls
    const expectedSecret = process.env.REVALIDATION_SECRET
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    
    if (!path && !tag) {
      return NextResponse.json(
        { error: 'Either path or tag parameter is required' },
        { status: 400 }
      )
    }
    
    const revalidated: { paths: string[]; tags: string[] } = {
      paths: [],
      tags: [],
    }
    
    // Revalidate path
    if (path) {
      revalidatePath(path)
      revalidated.paths.push(path)
      console.log('Revalidated path:', path)
    }
    
    // Revalidate tag
    if (tag) {
      revalidateTag(tag)
      revalidated.tags.push(tag)
      console.log('Revalidated tag:', tag)
    }
    
    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/revalidate
 * Health check for the revalidation endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Revalidation endpoint is ready',
    usage: {
      method: 'POST',
      params: {
        path: 'Path to revalidate (e.g., /store)',
        tag: 'Cache tag to invalidate (e.g., products)',
        secret: 'Optional authorization secret',
      },
    },
  })
}
