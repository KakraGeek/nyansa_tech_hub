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
  // Generate comprehensive structured data for SEO
  const organizationData = generateStructuredData({
    type: 'Organization',
    data: {
      foundingDate: '2024',
      numberOfEmployees: '50+',
      areaServed: 'Ghana',
      serviceType: 'Technology Training and Innovation',
      award: [
        'Best Tech Training Institute 2024',
        'Excellence in STEM Education',
        'Innovation Hub of the Year'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
        bestRating: '5',
        worstRating: '1'
      }
    }
  })

  const localBusinessData = generateStructuredData({
    type: 'LocalBusiness',
    data: {
      priceRange: '$$',
      areaServed: 'Ghana',
      serviceType: 'Technology Training and Innovation',
      openingHours: [
        'Mo-Fr 08:00-18:00',
        'Sa 09:00-15:00'
      ],
      paymentAccepted: ['Cash', 'Bank Transfer', 'Mobile Money'],
      currenciesAccepted: 'GHS, USD'
    }
  })

  const educationalOrgData = generateStructuredData({
    type: 'EducationalOrganization',
    data: {
      educationalLevel: 'Professional Training',
      educationalProgramMode: 'In-person and Hybrid',
      educationalUse: 'Career Development',
      teaches: [
        'Web Development',
        'Mobile App Development',
        'Data Science',
        'Cybersecurity',
        'UI/UX Design',
        'Cloud Computing',
        'DevOps',
        'Artificial Intelligence'
      ],
      alumni: {
        '@type': 'Person',
        name: 'Nyansa Tech Hub Alumni Network',
        description: '500+ successful graduates'
      }
    }
  })

  const courseData = [
    generateStructuredData({
      type: 'Course',
      data: {
        name: 'Tech Training Program',
        description: 'Comprehensive technology education programs designed to build practical skills and theoretical knowledge in web development, mobile app development, data science, cybersecurity, cloud computing, and UI/UX design.',
        courseCode: 'TT001',
        coursePrerequisites: 'Basic computer literacy',
        educationalCredentialAwarded: 'Certificate of Completion',
        timeRequired: 'P6M',
        courseMode: 'In-person',
        offers: {
          '@type': 'Offer',
          price: '5000',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock'
        }
      }
    }),
    generateStructuredData({
      type: 'Course',
      data: {
        name: 'Career Assistance Program',
        description: 'Professional career development services including job placement, resume building, interview preparation, and industry networking.',
        courseCode: 'CA001',
        coursePrerequisites: 'Completed tech training or equivalent experience',
        educationalCredentialAwarded: 'Career Readiness Certificate',
        timeRequired: 'P3M',
        courseMode: 'Hybrid',
        offers: {
          '@type': 'Offer',
          price: '2000',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock'
        }
      }
    }),
    generateStructuredData({
      type: 'Course',
      data: {
        name: 'Professional Development Program',
        description: 'Advanced professional training programs for experienced tech professionals seeking to enhance their skills and advance their careers.',
        courseCode: 'PD001',
        coursePrerequisites: 'Minimum 2 years tech experience',
        educationalCredentialAwarded: 'Professional Development Certificate',
        timeRequired: 'P4M',
        courseMode: 'In-person',
        offers: {
          '@type': 'Offer',
          price: '8000',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock'
        }
      }
    })
  ]

  return (
    <main className="min-h-screen">
      {/* Comprehensive Structured Data for SEO */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalOrgData),
        }}
      />
      {courseData.map((course, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(course),
          }}
        />
      ))}
      
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