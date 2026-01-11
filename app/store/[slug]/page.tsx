import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
  getProductById, 
  getEnabledProducts, 
  getProductIdFromSlug,
  getRelatedProducts,
  formatPrice,
  isOnSale,
  getDiscountPercentage,
  getStockStatus,
} from '@/lib/ecwid/products'
import { ProductGallery } from '@/app/components/store/ProductGallery'
import { ProductDetails } from '@/app/components/store/ProductDetails'
import { ProductCard } from '@/app/components/store/ProductCard'
import { ProductViewTracker } from '@/app/components/store/ProductViewTracker'
import type { EcwidProduct } from '@/lib/ecwid/types'

// Enable ISR with 60 second revalidation
export const revalidate = 60

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all products
export async function generateStaticParams() {
  try {
    const products = await getEnabledProducts({ limit: 100 })
    
    return products.items.map((product) => ({
      slug: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}-${product.id}`,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const productId = getProductIdFromSlug(slug)
  
  if (!productId) {
    return {
      title: 'Product Not Found',
    }
  }
  
  try {
    const product = await getProductById(productId)
    
    return {
      title: `${product.name} | Store`,
      description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Shop ${product.name} at Splat Labs`,
      openGraph: {
        title: product.name,
        description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160),
        images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
      },
    }
  } catch {
    return {
      title: 'Product Not Found',
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const productId = getProductIdFromSlug(slug)
  
  if (!productId) {
    notFound()
  }
  
  let product: EcwidProduct
  let relatedProducts: EcwidProduct[] = []
  
  try {
    product = await getProductById(productId)
    relatedProducts = await getRelatedProducts(product, 4)
  } catch (error) {
    console.error('Error fetching product:', error)
    notFound()
  }
  
  if (!product.enabled) {
    notFound()
  }
  
  const onSale = isOnSale(product)
  const discountPercent = getDiscountPercentage(product)
  const stockStatus = getStockStatus(product)
  
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      {/* Analytics tracking */}
      <ProductViewTracker
        productId={product.id}
        productName={product.name}
        productSku={product.sku}
        productPrice={product.price}
        productImageUrl={product.imageUrl}
      />
      
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-content-muted">
            <li>
              <a href="/" className="hover:text-rock-orange transition-colors">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/store" className="hover:text-rock-orange transition-colors">Store</a>
            </li>
            <li>/</li>
            <li className="text-content-primary font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>
        
        {/* Product Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <ProductGallery product={product} />
          
          {/* Right: Details */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {onSale && (
                <span className="px-3 py-1 bg-rock-orange text-white text-sm font-semibold rounded-full">
                  Save {discountPercent}%
                </span>
              )}
              
              {stockStatus.status === 'low_stock' && (
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full">
                  {stockStatus.message}
                </span>
              )}
              
              {stockStatus.status === 'out_of_stock' && (
                <span className="px-3 py-1 bg-gray-500 text-white text-sm font-semibold rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4 leading-tight">
              {product.name}
            </h1>
            
            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-content-muted mb-4 font-mono">
                SKU: {product.sku}
              </p>
            )}
            
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-rock-orange">
                {formatPrice(product.price)}
              </span>
              
              {onSale && product.compareToPrice && (
                <span className="text-xl text-content-muted line-through">
                  {formatPrice(product.compareToPrice)}
                </span>
              )}
            </div>
            
            {/* Product Details Component (handles options and add to cart) */}
            <ProductDetails product={product} />
            
            {/* Description */}
            {product.description && (
              <div className="mt-8 pt-8 border-t border-light-border">
                <h3 className="text-lg font-semibold text-content-primary mb-4">
                  Description
                </h3>
                <div 
                  className="prose prose-sm max-w-none text-content-secondary"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
            
            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="mt-8 pt-8 border-t border-light-border">
                <h3 className="text-lg font-semibold text-content-primary mb-4">
                  Specifications
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {product.attributes.map((attr) => (
                    <div key={attr.name} className="contents">
                      <dt className="text-sm text-content-muted">{attr.name}</dt>
                      <dd className="text-sm font-medium text-content-primary">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            
            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-light-border">
              <div className="flex flex-wrap gap-4 text-sm text-content-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Checkout
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Free Shipping (USA)
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Expert Support
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-content-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
