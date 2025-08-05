'use client'

import Image from 'next/image'

const partners = [
  {
    name: 'Google',
    logo: '/images/partner-logos/google-removebg-preview.png',
    description: 'Technology and Innovation Partner',
    category: 'Tech'
  },
  {
    name: 'Microsoft',
    logo: '/images/partner-logos/microsoft-removebg-preview.png',
    description: 'Cloud Computing and Development Tools',
    category: 'Tech'
  },
  {
    name: 'IBM',
    logo: '/images/partner-logos/ibm-removebg-preview.png',
    description: 'AI and Enterprise Solutions',
    category: 'Tech'
  },
  {
    name: 'Ghana Tech Lab',
    logo: '/images/partner-logos/ghana_tech_lab_removebg-preview.png',
    description: 'Local Innovation Ecosystem',
    category: 'Local'
  },
  {
    name: 'MEST Africa',
    logo: '/images/partner-logos/MEST_Africa-removebg-preview.png',
    description: 'Pan-African Tech Training',
    category: 'Regional'
  },
  {
    name: 'University of Ghana',
    logo: '/images/partner-logos/University_of_Ghana-removebg-preview.png',
    description: 'Academic Partnership',
    category: 'Education'
  },
  {
    name: 'Ashesi University',
    logo: '/images/partner-logos/ashesi_university-removebg-preview.png',
    description: 'Higher Education Collaboration',
    category: 'Education'
  },
  {
    name: 'Ghana Innovation Hub',
    logo: '/images/partner-logos/ghana_innovation_hub-removebg-preview.png',
    description: 'National Innovation Network',
    category: 'Local'
  },
  {
    name: 'Telecel Ghana',
    logo: '/images/partner-logos/telecel_ghana-removebg-preview.png',
    description: 'Telecommunications Partner',
    category: 'Corporate'
  },
  {
    name: 'MTN Ghana',
    logo: '/images/partner-logos/mtn ghana.png',
    description: 'Digital Transformation Partner',
    category: 'Corporate'
  },
  {
    name: 'Stanbic Bank',
    logo: '/images/partner-logos/stanbic_bank-removebg-preview.png',
    description: 'Financial Services Partner',
    category: 'Corporate'
  },
  {
    name: 'Ecobank',
    logo: '/images/partner-logos/ecobank-removebg-preview.png',
    description: 'Banking and Financial Solutions',
    category: 'Corporate'
  }
]

const categories = [
  { id: 'all', name: 'All Partners', count: partners.length },
  { id: 'tech', name: 'Technology', count: partners.filter(p => p.category === 'Tech').length },
  { id: 'education', name: 'Education', count: partners.filter(p => p.category === 'Education').length },
  { id: 'corporate', name: 'Corporate', count: partners.filter(p => p.category === 'Corporate').length },
  { id: 'local', name: 'Local', count: partners.filter(p => p.category === 'Local').length },
  { id: 'regional', name: 'Regional', count: partners.filter(p => p.category === 'Regional').length }
]

export default function PartnersGrid() {
  return (
    <section id="partners" className="section-padding bg-nyansa-complementary">
      <div className="container-max">
        {/* Header */}
        <div className="text-center responsive-margin">
          <h2 className="responsive-heading text-nyansa-dark-gray mb-4 sm:mb-6">
            Our Partners
          </h2>
          <p className="responsive-body text-nyansa-dark-gray/80 max-w-3xl mx-auto">
            We collaborate with leading organizations across technology, education, 
            and business to provide our students with the best opportunities and resources.
          </p>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-xl sm:text-2xl font-bold text-nyansa-light-blue mb-1">
                {category.count}
              </div>
              <div className="text-xs sm:text-sm text-nyansa-dark-gray/70">
                {category.name}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Logo */}
              <div className="relative h-16 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center">
                {partner.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain transition-all duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-nyansa-light-blue/10 rounded-lg flex items-center justify-center">
                    <span className="text-nyansa-light-blue font-bold text-sm sm:text-lg">
                      {partner.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Partner Info */}
              <div className="text-center">
                <h3 className="text-sm sm:text-base font-semibold text-nyansa-dark-gray mb-1 sm:mb-2 group-hover:text-nyansa-light-blue transition-colors duration-200">
                  {partner.name}
                </h3>
                <p className="text-xs sm:text-sm text-nyansa-dark-gray/70 mb-2 sm:mb-3">
                  {partner.description}
                </p>
                <span className="inline-block px-2 sm:px-3 py-1 bg-nyansa-complementary text-nyansa-dark-gray text-xs rounded-full">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-nyansa-light-blue to-nyansa-accent rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white">
          <h3 className="responsive-subheading font-bold mb-3 sm:mb-4">
            Become a Partner
          </h3>
          <p className="responsive-body mb-4 sm:mb-6 max-w-2xl mx-auto opacity-90">
            Join our network of partners and help shape the future of technology 
            education in Africa. Together, we can create more opportunities for 
            aspiring tech professionals.
          </p>
          <div className="flex justify-center">
            <button 
              className="bg-white text-nyansa-light-blue font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-target"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 