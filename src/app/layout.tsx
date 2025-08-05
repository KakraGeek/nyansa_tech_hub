import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
  description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
  metadataBase: new URL('https://nyansa-tech-hub-web.vercel.app'),
  openGraph: {
    title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
    description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
    url: 'https://nyansa-tech-hub-web.vercel.app',
    siteName: 'Nyansa Tech Hub',
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Nyansa Tech Hub Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
    description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
    images: ['/images/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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