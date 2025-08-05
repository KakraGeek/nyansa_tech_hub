/**
 * SEO utilities and metadata generation
 * Implements best practices for search engine optimization
 */

import { Metadata } from 'next'

// Base SEO configuration
export const SEO_CONFIG = {
  siteName: 'Nyansa Tech Hub',
  siteUrl: 'https://nyansa-tech-hub-web.vercel.app',
  siteDescription: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design. 95% employment rate with industry-aligned curriculum.',
  siteKeywords: [
    'tech training Ghana',
    'technology education Africa',
    'coding bootcamp Accra',
    'software development training',
    'digital skills training Ghana',
    'tech innovation hub',
    'programming courses Ghana',
    'web development training',
    'mobile app development Ghana',
    'data science training Africa',
    'STEM education Ghana',
    'computer programming courses',
    'IT training center Accra',
    'technology skills development',
    'digital transformation training',
    'cloud computing courses',
    'cybersecurity training Ghana',
    'UI/UX design courses',
    'DevOps training Africa',
    'artificial intelligence courses',
    'best tech training institute Ghana',
    'professional software development courses Accra',
    'career assistance technology Ghana',
    'tech mentorship programs Africa',
    'industry-aligned tech curriculum Ghana',
    'hands-on technology training',
    'tech career placement services',
    'innovation hub tech education',
    'professional development technology',
    'tech entrepreneurship training Ghana'
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
        description: 'Premier technology training and innovation center in Ghana. Expert-led courses in web development, mobile app development, data science, cybersecurity, and UI/UX design with 95% employment rate.',
        url: 'https://nyansa-tech-hub-web.vercel.app',
        logo: 'https://nyansa-tech-hub-web.vercel.app/images/logo.jpg',
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
          availableLanguage: 'English',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4 Bathur Street, East Legon',
          addressLocality: 'Accra',
          addressRegion: 'Greater Accra',
          addressCountry: 'GH',
          postalCode: '00233',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 5.6321673,
          longitude: -0.1743,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Ghana',
        },
        serviceArea: {
          '@type': 'Country',
          name: 'Ghana',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Technology Training Programs',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Tech Training',
                description: 'Comprehensive technology education programs',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Career Assistance',
                description: 'Professional career development services',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Professional Development',
                description: 'Advanced professional training programs',
              },
            },
          ],
        },
        ...data,
      }

    case 'LocalBusiness':
      return {
        ...baseData,
        name: 'Nyansa Tech Hub',
        description: 'Technology training and innovation center',
        url: 'https://nyansa-tech-hub-web.vercel.app',
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
        url: 'https://nyansa-tech-hub-web.vercel.app',
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
          url: 'https://nyansa-tech-hub-web.vercel.app',
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
      url: 'https://nyansa-tech-hub-web.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://nyansa-tech-hub-web.vercel.app/#what-we-do',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://nyansa-tech-hub-web.vercel.app/#programs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://nyansa-tech-hub-web.vercel.app/#spaces',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nyansa-tech-hub-web.vercel.app/#partners',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nyansa-tech-hub-web.vercel.app/#contact',
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

Sitemap: https://nyansa-tech-hub-web.vercel.app/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
`
} 