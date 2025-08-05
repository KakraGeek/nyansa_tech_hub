import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyansa Tech Hub - Empowering Africa\'s Tech Innovation',
  description: 'Nyansa Tech Hub is a leading technology training and innovation center in Ghana, offering comprehensive programs in tech training, career assistance, and professional development.',
  keywords: 'tech hub, technology training, Ghana, innovation, STEM, career development, professional training',
  authors: [{ name: 'Nyansa Tech Hub' }],
  creator: 'Nyansa Tech Hub',
  publisher: 'Nyansa Tech Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nyansa-tech-hub-web.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nyansa Tech Hub - Empowering Africa\'s Tech Innovation',
    description: 'Leading technology training and innovation center in Ghana',
    url: 'https://nyansa-tech-hub-web.vercel.app',
    siteName: 'Nyansa Tech Hub',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nyansa Tech Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyansa Tech Hub - Empowering Africa\'s Tech Innovation',
    description: 'Leading technology training and innovation center in Ghana',
    images: ['/images/og-image.jpg'],
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-nyansa-light-blue text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        <div className="min-h-screen bg-nyansa-white">
          <Navigation />
          <main id="main-content" role="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 