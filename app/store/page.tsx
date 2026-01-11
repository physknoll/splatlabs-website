import { Metadata } from 'next'
import { getEnabledProducts, getEnabledCategories } from '@/lib/ecwid/products'
import { SectionHeader } from '@/app/components/ui/SectionHeader'
import { ProductCard } from '@/app/components/store/ProductCard'
import { StoreFilters } from '@/app/components/store/StoreFilters'
import { StoreViewTracker } from '@/app/components/store/StoreViewTracker'

export const metadata: Metadata = {
  title: 'Store | Hardware & Accessories',
  description: 'Shop our collection of professional 3D scanning hardware, accessories, and equipment. From PortalCam to surveying tools.',
  openGraph: {
    title: 'Store | Splat Labs Hardware',
    description: 'Shop professional 3D scanning hardware and accessories.',
  },
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function StorePage() {
  // Fetch products and categories from Ecwid
  const [productsResponse, categoriesResponse] = await Promise.all([
    getEnabledProducts({ limit: 100 }),
    getEnabledCategories(),
  ])
  
  const products = productsResponse.items
  const categories = categoriesResponse.items
  
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      {/* Analytics tracking */}
      <StoreViewTracker 
        productCount={products.length} 
        categoryCount={categories.length} 
      />
      
      <div className="container-custom">
        {/* Header */}
        <SectionHeader
          badge="Store"
          title="Hardware & Accessories"
          description="Professional-grade equipment for 3D scanning and spatial capture"
        />
        
        {/* Filters and Products */}
        <div className="mt-12">
          {products.length > 0 ? (
            <>
              {/* Category Filters */}
              {categories.length > 0 && (
                <StoreFilters categories={categories} />
              )}
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                  />
                ))}
              </div>
              
              {/* Results Count */}
              <p className="text-center text-content-muted mt-8">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-light-bg-subtle rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-content-muted" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-content-primary mb-2">
                No products available
              </h3>
              <p className="text-content-muted max-w-md mx-auto">
                We&apos;re currently updating our store. Check back soon for our latest hardware and accessories.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
