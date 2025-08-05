import HeroSection from '@/components/HeroSection'
import WhatWeDo from '@/components/WhatWeDo'
import CoreInitiatives from '@/components/CoreInitiatives'
import OurSpaces from '@/components/OurSpaces'
import PartnersGrid from '@/components/PartnersGrid'
import WhyItMatters from '@/components/WhyItMatters'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { generateStructuredData } from '@/lib/seo'

export default function Home() {
  // Generate structured data for SEO
  const organizationData = generateStructuredData({
    type: 'Organization',
    data: {
      foundingDate: '2024',
      numberOfEmployees: '50+',
      areaServed: 'Ghana',
      serviceType: 'Technology Training and Innovation',
    }
  })

  const localBusinessData = generateStructuredData({
    type: 'LocalBusiness',
    data: {
      priceRange: '$$',
      areaServed: 'Ghana',
      serviceType: 'Technology Training and Innovation',
    }
  })

  return (
    <main className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      
      <HeroSection />
      <WhatWeDo />
      <CoreInitiatives />
      <OurSpaces />
      <PartnersGrid />
      <WhyItMatters />
      <ContactSection />
      <Footer />
    </main>
  )
} 