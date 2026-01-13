import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Splat Labs - Gaussian Splat Hosting Built for Pros'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Fetch the logo SVG from production
  const logoResponse = await fetch('https://splatlabs.ai/logo/SVG/splatlabs_logo_full.svg')
  const logoSvg = await logoResponse.text()
  
  // Convert SVG to data URI
  const logoDataUri = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`

  // SVG viewBox is 8336.3 x 1659.92 (aspect ratio ~5:1)
  // For width 1000, height should be ~200
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri}
          alt="Splat Labs Logo"
          width={1000}
          height={200}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
