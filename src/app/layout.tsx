import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import ConditionalNavigation from '@/components/ConditionalNavigation'
import AdminAccess from '@/components/AdminAccess'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
  description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
  keywords: 'tech training, Ghana, web development, mobile app development, data science, cybersecurity, UI/UX design, technology education',
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
    type: 'website',
    locale: 'en_US',
    url: 'https://nyansa-tech-hub-web.vercel.app',
    title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
    description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
    siteName: 'Nyansa Tech Hub',
    images: [
      {
        url: 'https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Nyansa Tech Hub Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
    description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design.',
    images: ['https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg'],
    creator: '@nyansatechhub',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta property="og:image" content="https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Nyansa Tech Hub Logo" />
        <meta name="twitter:image" content="https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-nyansa-light-blue text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        <div className="min-h-screen bg-nyansa-white">
          <ConditionalNavigation />
          <main id="main-content" role="main">
            {children}
          </main>
          <AdminAccess />
        </div>
      </body>
    </html>
  )
} 