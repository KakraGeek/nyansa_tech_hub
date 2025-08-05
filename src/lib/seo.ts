/**
 * SEO utilities and metadata generation
 * Implements best practices for search engine optimization
 */

import { Metadata } from 'next'

// Base SEO configuration
export const SEO_CONFIG = {
  siteName: 'Nyansa Tech Hub',
  siteUrl: 'https://nyansatechhub.com',
  siteDescription: 'Leading technology training and innovation center in Ghana, empowering Africa\'s tech innovation through comprehensive programs and world-class facilities.',
  siteKeywords: [
    'tech hub',
    'technology training',
    'Ghana',
    'innovation',
    'STEM',
    'career development',
    'professional training',
    'coding bootcamp',
    'software development',
    'digital skills',
    'Africa tech',
    'tech education'
  ].join(', '),
  author: 'Nyansa Tech Hub',
  twitterHandle: '@nyansatechhub',
  defaultImage: '/images/og-image.jpg',
}

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.siteName
  const fullDescription = description || SEO_CONFIG.siteDescription
  const fullKeywords = keywords || SEO_CONFIG.siteKeywords
  const fullImage = image || SEO_CONFIG.defaultImage
  const fullUrl = url || SEO_CONFIG.siteUrl

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
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
}

// Generate structured data (JSON-LD)
export function generateStructuredData({
  type = 'Organization',
  data,
}: {
  type: 'Organization' | 'LocalBusiness' | 'EducationalOrganization' | 'Course'
  data: Record<string, unknown>
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: 'Nyansa Tech Hub',
        description: 'Leading technology training and innovation center in Ghana',
        url: 'https://nyansatechhub.com',
        logo: 'https://nyansatechhub.com/images/logo.jpg',
        sameAs: [
          'https://facebook.com/nyansatechhub',
          'https://twitter.com/nyansatechhub',
          'https://linkedin.com/company/nyansatechhub',
          'https://instagram.com/nyansatechhub',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+233-20-123-4567',
          email: 'info@nyansatechhub.com',
          contactType: 'customer service',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4 Bathur Street, East Legon',
          addressLocality: 'Accra',
          addressCountry: 'GH',
          postalCode: '00233',
        },
        ...data,
      }

    case 'LocalBusiness':
      return {
        ...baseData,
        name: 'Nyansa Tech Hub',
        description: 'Technology training and innovation center',
        url: 'https://nyansatechhub.com',
        telephone: '+233-20-123-4567',
        email: 'info@nyansatechhub.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4 Bathur Street, East Legon',
          addressLocality: 'Accra',
          addressCountry: 'GH',
          postalCode: '00233',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 5.6321673,
          longitude: -0.1743,
        },
        openingHours: [
          'Mo-Fr 08:00-18:00',
          'Sa 09:00-15:00',
        ],
        ...data,
      }

    case 'EducationalOrganization':
      return {
        ...baseData,
        name: 'Nyansa Tech Hub',
        description: 'Technology education and training institution',
        url: 'https://nyansatechhub.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4 Bathur Street, East Legon',
          addressLocality: 'Accra',
          addressCountry: 'GH',
        },
        ...data,
      }

    case 'Course':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'Nyansa Tech Hub',
          url: 'https://nyansatechhub.com',
        },
        ...data,
      }

    default:
      return baseData
  }
}

// Generate sitemap data
export function generateSitemapData() {
  return [
    {
      url: 'https://nyansatechhub.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://nyansatechhub.com/#what-we-do',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://nyansatechhub.com/#programs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://nyansatechhub.com/#spaces',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nyansatechhub.com/#partners',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nyansatechhub.com/#contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}

// Generate robots.txt content
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: https://nyansatechhub.com/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
`
} 