'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-nyansa-complementary to-nyansa-white overflow-hidden pt-16 lg:pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-nyansa-light-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-nyansa-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-nyansa-dark-gray mb-4 sm:mb-6">
              Empowering{' '}
              <span className="text-gradient">Africa&apos;s Tech</span>{' '}
              Innovation
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-nyansa-dark-gray/80 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nyansa Tech Hub is Ghana&apos;s premier technology training and innovation center, 
              fostering the next generation of African tech leaders through comprehensive 
              programs and world-class facilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 touch-target"
                onClick={() => {
                  document.getElementById('programs')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Explore Our Programs
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 touch-target">
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-nyansa-light-blue">500+</div>
                <div className="text-xs sm:text-sm text-nyansa-dark-gray/70">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-nyansa-light-blue">50+</div>
                <div className="text-xs sm:text-sm text-nyansa-dark-gray/70">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-nyansa-light-blue">95%</div>
                <div className="text-xs sm:text-sm text-nyansa-dark-gray/70">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/logo.jpg"
                alt="Nyansa Tech Hub students and facilities"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nyansa-dark-gray/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-nyansa-light-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-nyansa-light-blue rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 