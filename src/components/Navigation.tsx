'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'What We Do', href: '#what-we-do' },
  { name: 'Programs', href: '#programs' },
  { name: 'Spaces', href: '#spaces' },
  { name: 'Partners', href: '#partners' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
]

const programsDropdown = [
  { name: 'Tech Training', href: '#tech-training' },
  { name: 'Career Assistance', href: '#career-assistance' },
  { name: 'Professional Development', href: '#professional-development' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
    setIsProgramsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16 lg:h-20 min-w-0">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 mr-2 sm:mr-3 flex-shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Nyansa Tech Hub"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 40px, 48px"
              />
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-nyansa-dark-gray truncate">
                Nyansa Tech Hub
              </h1>
              <p className="text-xs sm:text-sm text-nyansa-dark-gray/70 truncate">
                Empowering Africa&apos;s Tech Innovation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.name === 'Programs' ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                      className="flex items-center gap-1 text-nyansa-dark-gray hover:text-nyansa-light-blue transition-colors duration-200 font-medium"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        isProgramsOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {isProgramsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        {programsDropdown.map((program) => (
                          <button
                            key={program.name}
                            onClick={() => scrollToSection(program.href)}
                            className="block w-full text-left px-4 py-2 text-nyansa-dark-gray hover:bg-nyansa-complementary hover:text-nyansa-light-blue transition-colors duration-200"
                          >
                            {program.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-nyansa-dark-gray hover:text-nyansa-light-blue transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button onClick={() => scrollToSection('#contact')}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-nyansa-dark-gray hover:text-nyansa-light-blue transition-colors duration-200 flex-shrink-0 ml-1 relative z-10"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-200 shadow-lg" role="navigation" aria-label="Mobile navigation">
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.name === 'Programs' ? (
                    <div>
                      <button
                        onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                        className="flex items-center justify-between w-full text-left text-nyansa-dark-gray hover:text-nyansa-light-blue transition-colors duration-200 font-medium py-2"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          isProgramsOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {isProgramsOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {programsDropdown.map((program) => (
                            <button
                              key={program.name}
                              onClick={() => scrollToSection(program.href)}
                              className="block w-full text-left text-nyansa-dark-gray/80 hover:text-nyansa-light-blue transition-colors duration-200 py-1"
                            >
                              {program.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-nyansa-dark-gray hover:text-nyansa-light-blue transition-colors duration-200 font-medium py-2"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => scrollToSection('#contact')}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 