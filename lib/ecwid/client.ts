// Ecwid API Client
// Server-side only - uses secret token for reads, public token for writes

const ECWID_API_BASE = 'https://app.ecwid.com/api/v3'

/**
 * Get the Ecwid Store ID from environment variables
 */
export function getStoreId(): string {
  const storeId = process.env.ECWID_STORE_ID
  if (!storeId) {
    throw new Error('ECWID_STORE_ID environment variable is not set')
  }
  return storeId
}

/**
 * Get the Ecwid Secret Token from environment variables
 * Used for reading data (orders, products, profile)
 */
export function getSecretToken(): string {
  const token = process.env.ECWID_SECRET_TOKEN
  if (!token) {
    throw new Error('ECWID_SECRET_TOKEN environment variable is not set')
  }
  return token
}

/**
 * Get the Ecwid Public Token from environment variables
 * Used for creating/updating orders (has create_orders scope)
 */
export function getPublicToken(): string {
  const token = process.env.ECWID_PUBLIC_TOKEN
  if (!token) {
    // Fall back to secret token if public token not set
    console.warn('ECWID_PUBLIC_TOKEN not set, falling back to secret token')
    return getSecretToken()
  }
  return token
}

/**
 * Build the full API URL for an endpoint
 */
export function buildApiUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
  const storeId = getStoreId()
  const url = new URL(`${ECWID_API_BASE}/${storeId}${endpoint}`)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }
  
  return url.toString()
}

/**
 * Make an authenticated GET request to the Ecwid API
 */
export async function ecwidGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: { revalidate?: number | false }
): Promise<T> {
  const url = buildApiUrl(endpoint, params)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getSecretToken()}`,
      'Content-Type': 'application/json',
    },
    next: options?.revalidate !== undefined 
      ? { revalidate: options.revalidate } 
      : { revalidate: 60 }, // Default: revalidate every 60 seconds
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Ecwid API error [${response.status}]:`, errorText)
    throw new Error(`Ecwid API error: ${response.status} - ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Make an authenticated POST request to the Ecwid API
 * Uses secret token by default
 */
export async function ecwidPost<T, B = unknown>(
  endpoint: string,
  body: B,
  params?: Record<string, string | number | boolean | undefined>,
  options?: { usePublicToken?: boolean }
): Promise<T> {
  const url = buildApiUrl(endpoint, params)
  const token = options?.usePublicToken ? getPublicToken() : getSecretToken()
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Ecwid POST API error [${response.status}]:`, errorText)
    throw new Error(`Ecwid API error: ${response.status} - ${errorText}`)
  }
  
  return response.json()
}

/**
 * Make an authenticated PUT request to the Ecwid API
 */
export async function ecwidPut<T, B = unknown>(
  endpoint: string,
  body: B,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = buildApiUrl(endpoint, params)
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getSecretToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Ecwid API error [${response.status}]:`, errorText)
    throw new Error(`Ecwid API error: ${response.status} - ${response.statusText}`)
  }
  
  return response.json()
}
