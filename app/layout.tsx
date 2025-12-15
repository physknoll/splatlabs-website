import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { StructuredData } from './components/seo/StructuredData'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://splatlabs.rockrobotic.com'),
  title: {
    default: 'Splat Labs | #1 Gaussian Splat Viewer & Cloud Hosting Platform',
    template: '%s | Splat Labs - Gaussian Splat Cloud',
  },
  description:
    'The leading platform to upload, view, and share Gaussian Splats online. Free 3DGS viewer with cloud hosting, embeddable player, measurements, and AI virtual staging. Host your splats and share immersive 3D experiences instantly.',
  keywords: [
    // Primary target keywords
    'Gaussian splat viewer',
    'Gaussian splat cloud',
    'share Gaussian splats',
    'Gaussian splat hosting',
    '3DGS viewer online',
    'Gaussian splatting platform',
    'upload Gaussian splats',
    'splat file viewer',
    'view splat online',
    'Gaussian splat player',
    // Secondary keywords
    '3D Gaussian splatting',
    'splat viewer online free',
    'NeRF to splat',
    'photogrammetry viewer',
    '3D scan hosting',
    'point cloud viewer',
    'LiDAR to Gaussian Splat',
    'radiance field viewer',
    // Feature keywords
    'AI virtual staging',
    '4D construction timeline',
    'sub-centimeter accuracy',
    '3D measurements online',
    'embeddable 3D viewer',
    'virtual tour platform',
    // Brand keywords
    'Splat Labs',
    'ROCK Robotic',
    'ROCK Splat Labs',
  ],
  authors: [{ name: 'ROCK Robotic', url: 'https://rockrobotic.com' }],
  creator: 'ROCK Robotic',
  publisher: 'ROCK Robotic',
  category: '3D Graphics Software',
  classification: 'Business/Technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://splatlabs.rockrobotic.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://splatlabs.rockrobotic.com',
    siteName: 'Splat Labs',
    title: 'Splat Labs | #1 Gaussian Splat Viewer & Cloud Hosting',
    description:
      'Upload, view, and share Gaussian Splats in the cloud. The leading platform for 3DGS hosting with free online viewer, embeddable player, and collaboration tools.',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Splat Labs - Host & Share Gaussian Splats in the Cloud',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rockrobotic',
    creator: '@rockrobotic',
    title: 'Splat Labs | #1 Gaussian Splat Viewer & Cloud Hosting',
    description:
      'Upload, view, and share Gaussian Splats online. Free 3DGS viewer with cloud hosting and embeddable player.',
    images: {
      url: '/og/default.jpg',
      alt: 'Splat Labs - Gaussian Splat Cloud Platform',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#FF5F1F',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Splat Labs',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#FF5F1F',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#FF5F1F',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-rock-dark text-rock-text antialiased">
        <StructuredData />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

