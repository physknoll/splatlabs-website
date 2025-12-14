import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

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
    default: 'ROCK Splat Labs | Cloud Gaussian Splat Hosting & 3D Viewer',
    template: '%s | ROCK Splat Labs',
  },
  description: 'Upload, view, and collaborate on Gaussian Splat models in the cloud. Features AI virtual staging, 4D timelines, measurements, and sub-centimeter accuracy.',
  keywords: [
    'Gaussian Splat Hosting',
    'Cloud 3D Viewer',
    'LiDAR to Splat',
    '4D Construction Timeline',
    'AI Virtual Staging',
    '3D Point Cloud Viewer',
    'Photogrammetry Hosting',
    'Virtual Tours',
    'ROCK Robotic',
  ],
  authors: [{ name: 'ROCK Robotic' }],
  creator: 'ROCK Robotic',
  publisher: 'ROCK Robotic',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://splatlabs.rockrobotic.com',
    siteName: 'ROCK Splat Labs',
    title: 'ROCK Splat Labs | Cloud Gaussian Splat Hosting',
    description: 'The world\'s most advanced cloud platform for hosting, sharing, and collaborating on Gaussian Splat models.',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'ROCK Splat Labs - Cloud 3D Viewer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROCK Splat Labs | Cloud Gaussian Splat Hosting',
    description: 'The world\'s most advanced cloud platform for hosting, sharing, and collaborating on Gaussian Splat models.',
    images: ['/og/default.jpg'],
    creator: '@rockrobotic',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

