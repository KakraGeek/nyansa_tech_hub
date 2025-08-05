import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana | Web Development, Mobile Apps, Data Science',
  description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design. 95% employment rate. Industry-aligned curriculum with hands-on training.',
  keywords: 'tech training Ghana, technology education Africa, coding bootcamp Accra, software development training, digital skills training Ghana, tech innovation hub, programming courses Ghana, web development training, mobile app development Ghana, data science training Africa, STEM education Ghana, computer programming courses, IT training center Accra, technology skills development, digital transformation training, cloud computing courses, cybersecurity training Ghana, UI/UX design courses, DevOps training Africa, artificial intelligence courses, best tech training institute Ghana, professional software development courses Accra, career assistance technology Ghana, tech mentorship programs Africa, industry-aligned tech curriculum Ghana, hands-on technology training, tech career placement services, innovation hub tech education, professional development technology, tech entrepreneurship training Ghana',
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
       title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
       description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design. 95% employment rate.',
       url: 'https://nyansa-tech-hub-web.vercel.app',
       siteName: 'Nyansa Tech Hub',
               images: [
          {
            url: 'https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg',
            width: 1200,
            height: 630,
            alt: 'Nyansa Tech Hub - Technology Training and Innovation Center',
            type: 'image/jpeg',
          },
        ],
       locale: 'en_US',
       type: 'website',
     },
             twitter: {
       card: 'summary_large_image',
       title: 'Nyansa Tech Hub - Leading Tech Training & Innovation Center in Ghana',
       description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design. 95% employment rate.',
               images: ['https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg'],
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
  category: 'Technology Education',
  classification: 'Technology Training Institute',
  other: {
    'geo.region': 'GH',
    'geo.placename': 'Accra, Ghana',
    'geo.position': '5.5600;-0.2057',
    'ICBM': '5.5600, -0.2057',
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
        {/* Explicit OpenGraph meta tags for better social media support */}
        <meta property="og:image" content="https://nyansa-tech-hub-web.vercel.app/images/social_preview_logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Nyansa Tech Hub - Technology Training and Innovation Center" />
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
          <Navigation />
          <main id="main-content" role="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 