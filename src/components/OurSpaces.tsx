'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import BookingModal from './BookingModal'

const spaces = [
  {
    id: 1,
    name: 'STEM Lab',
    description: 'State-of-the-art laboratory equipped with the latest technology for hands-on learning and experimentation.',
    image: '/images/20250501_111412_result.webp',
    features: ['3D Printers', 'Robotics Kits', 'Electronics Workstations', 'VR Equipment']
  },
  {
    id: 2,
    name: 'Epic Lounge',
    description: 'A collaborative space designed for networking, brainstorming, and creative problem-solving sessions.',
    image: '/images/20250501_111612_result.webp',
    features: ['Comfortable Seating', 'Whiteboards', 'Projection Systems', 'Coffee Bar']
  },
  {
    id: 3,
    name: 'Kube ase Gazebo',
    description: 'An outdoor learning environment perfect for workshops, presentations, and team-building activities.',
    image: '/images/20250501_111722_result.webp',
    features: ['Open Air Design', 'Audio System', 'Flexible Seating', 'Natural Lighting']
  },
  {
    id: 4,
    name: 'Adesua Training Center',
    description: 'Our main training facility with multiple classrooms and advanced learning technologies.',
    image: '/images/20250507_172505_result.webp',
    features: ['Multiple Classrooms', 'Interactive Displays', 'High-Speed Internet', 'Breakout Rooms']
  },
  {
    id: 5,
    name: 'Nokware Event Hall',
    description: 'A versatile event space for conferences, seminars, and large-scale training programs.',
    image: '/images/20250507_172509_result.webp',
    features: ['Large Capacity', 'Professional Audio/Video', 'Flexible Layout', 'Catering Kitchen']
  }
]

export default function OurSpaces() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const openModal = (id: number) => setSelectedImage(id)
  const closeModal = () => setSelectedImage(null)
  
  const openBookingModal = () => setIsBookingModalOpen(true)
  const closeBookingModal = () => setIsBookingModalOpen(false)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === spaces.length ? 1 : selectedImage + 1)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 1 ? spaces.length : selectedImage - 1)
    }
  }

  return (
    <section id="spaces" className="section-padding bg-nyansa-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center responsive-margin">
          <h2 className="responsive-heading text-nyansa-dark-gray mb-4 sm:mb-6">
            Our Spaces
          </h2>
          <p className="responsive-body text-nyansa-dark-gray/80 max-w-3xl mx-auto">
            Discover our world-class facilities designed to inspire learning, 
            foster collaboration, and accelerate innovation in technology education.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group touch-target"
              onClick={() => openModal(space.id)}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nyansa-dark-gray/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{space.name}</h3>
                  <p className="text-xs sm:text-sm text-white/90">{space.description}</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-nyansa-dark-gray mb-2 sm:mb-3">
                  {space.name}
                </h3>
                <p className="text-sm sm:text-base text-nyansa-dark-gray/70 mb-3 sm:mb-4">
                  {space.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {space.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-nyansa-complementary text-nyansa-dark-gray text-xs sm:text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {space.features.length > 2 && (
                    <span className="px-2 sm:px-3 py-1 bg-nyansa-light-blue text-white text-xs sm:text-sm rounded-full">
                      +{space.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-nyansa-dark-gray/90 z-50 flex items-center justify-center p-2 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200 touch-target"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200 touch-target"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200 touch-target"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Image Content */}
              {(() => {
                const space = spaces.find(s => s.id === selectedImage)
                if (!space) return null

                return (
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="relative h-64 sm:h-96 md:h-[500px]">
                      <Image
                        src={space.image}
                        alt={space.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-nyansa-dark-gray mb-2 sm:mb-3">
                        {space.name}
                      </h3>
                      <p id="modal-description" className="text-sm sm:text-base text-nyansa-dark-gray/70 mb-3 sm:mb-4">
                        {space.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {space.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-nyansa-light-blue rounded-full flex-shrink-0"></div>
                            <span className="text-sm sm:text-base text-nyansa-dark-gray/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-nyansa-dark-gray/80 mb-4 sm:mb-6">
            Want to experience our facilities firsthand?
          </p>
          <button 
            onClick={openBookingModal}
            className="bg-nyansa-accent hover:bg-nyansa-accent/90 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 touch-target"
            aria-label="Schedule a visit to our facilities"
          >
            Schedule a Visit
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={closeBookingModal} 
      />
    </section>
  )
} 