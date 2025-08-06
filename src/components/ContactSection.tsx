'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { validateFormData, RateLimiter } from '@/lib/security'
import { submitFormWithRetry, ErrorDetails } from '@/lib/errorHandling'
import { ErrorDisplay, SuccessDisplay, LoadingDisplay } from '@/components/ui/errorDisplay'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>('')
  
  // Rate limiting for form submissions
  const rateLimiter = React.useMemo(() => new RateLimiter(3, 60000), []) // 3 attempts per minute

  // Listen for custom events to pre-select subject (only from Apply Now button)
  React.useEffect(() => {
    const handleSetSubject = (event: CustomEvent) => {
      setFormData(prev => ({ ...prev, subject: event.detail.subject }));
    };

    window.addEventListener('setSubject', handleSetSubject as EventListener);

    return () => {
      window.removeEventListener('setSubject', handleSetSubject as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors and status
    setFormErrors({})
    setErrorDetails(null)
    setSubmitStatus('idle')
    
    // Rate limiting check
    const clientId = 'contact-form' // In a real app, use user session or IP
    if (!rateLimiter.isAllowed(clientId)) {
      setSubmitStatus('error')
      setErrorDetails({
        type: 'server',
        message: 'Rate limit exceeded',
        code: 'RATE_LIMIT',
        retryable: true,
        userMessage: 'Too many submission attempts. Please wait a minute before trying again.'
      })
      return
    }
    
    // Validate form data with security checks
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      setErrorDetails({
        type: 'validation',
        message: 'Form validation failed',
        retryable: false,
        userMessage: 'Please correct the errors in the form and try again.'
      })
      return
    }
    
    setIsSubmitting(true)

    try {
      // Submit form using enhanced error handling
      const result = await submitFormWithRetry('/api/contact', formData, 2)
      
      if (result.success) {
        setSubmitStatus('success')
        // Type assertion to access the message property safely
        const responseData = result.data as { message?: string } | undefined
        setSuccessMessage(responseData?.message || 'Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        rateLimiter.reset(clientId) // Reset rate limit on success
      } else {
        setSubmitStatus('error')
        setErrorDetails(result.error || {
          type: 'unknown',
          message: 'Unknown error occurred',
          retryable: false,
          userMessage: 'An unexpected error occurred. Please try again.'
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorDetails({
        type: 'unknown',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        retryable: false,
        userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetry = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent)
  }

  const handleDismissError = () => {
    setErrorDetails(null)
    setSubmitStatus('idle')
  }

  const handleDismissSuccess = () => {
    setSuccessMessage('')
    setSubmitStatus('idle')
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'Nyansa Square, 4 Bathur Street, East Legon, Accra'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+233 20 123 4567',
        '+233 24 987 6543'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@nyansatechhub.com',
        'admissions@nyansatechhub.com'
      ]
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 3:00 PM',
        'Sunday: Closed'
      ]
    }
  ]

  return (
    <section id="contact" className="section-padding bg-nyansa-complementary">
      <div className="container-max">
        {/* Header */}
        <div className="text-center responsive-margin">
          <h2 className="responsive-heading text-nyansa-dark-gray mb-4 sm:mb-6">
            Get in Touch
          </h2>
          <p className="responsive-body text-nyansa-dark-gray/80 max-w-3xl mx-auto">
            Ready to start your tech journey? Have questions about our programs? 
            We&apos;d love to hear from you. Reach out to us and let&apos;s discuss how 
            we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="responsive-subheading text-nyansa-dark-gray mb-6 sm:mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => {
                const colors = [
                  { bg: 'bg-nyansa-light-blue/10', icon: 'text-nyansa-light-blue' },
                  { bg: 'bg-nyansa-accent/10', icon: 'text-nyansa-accent' },
                  { bg: 'bg-nyansa-dark-gray/10', icon: 'text-nyansa-dark-gray' },
                  { bg: 'bg-nyansa-complementary', icon: 'text-nyansa-accent' }
                ]
                const colorScheme = colors[index % colors.length]
                
                return (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorScheme.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <info.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorScheme.icon}`} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-nyansa-dark-gray mb-1 sm:mb-2">
                        {info.title}
                      </h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-xs sm:text-sm text-nyansa-dark-gray/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-sm sm:text-base font-semibold text-nyansa-dark-gray mb-3 sm:mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3 sm:gap-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform, index) => {
                  const colors = [
                    'bg-nyansa-light-blue hover:bg-nyansa-light-blue/90',
                    'bg-nyansa-accent hover:bg-nyansa-accent/90',
                    'bg-nyansa-dark-gray hover:bg-nyansa-dark-gray/90',
                    'bg-nyansa-complementary hover:bg-nyansa-accent text-nyansa-accent'
                  ]
                  const colorClass = colors[index % colors.length]
                  
                  return (
                    <button
                      key={platform}
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${colorClass} text-white rounded-lg flex items-center justify-center transition-colors duration-200 touch-target`}
                    >
                      {platform.charAt(0)}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="responsive-subheading text-nyansa-dark-gray mb-4 sm:mb-6">
              Send us a Message
            </h3>

            {isSubmitting && (
              <LoadingDisplay 
                message="Sending your message..." 
                className="mb-6" 
              />
            )}

            {submitStatus === 'success' && (
              <SuccessDisplay
                message={successMessage}
                onDismiss={handleDismissSuccess}
                className="mb-6"
              />
            )}

            {submitStatus === 'error' && errorDetails && (
              <ErrorDisplay
                error={errorDetails}
                onRetry={handleRetry}
                onDismiss={handleDismissError}
                className="mb-6"
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="admissions">Admissions</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 touch-target"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 sm:mt-16">
          <h3 className="responsive-subheading text-nyansa-dark-gray mb-6 sm:mb-8 text-center">
            Find Us
          </h3>
          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full h-64 sm:h-96 md:h-[450px] lg:h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5089187728893!2d-0.1743!3d5.6321673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b005e36a73f%3A0x224cced2896a56f6!2sNyansa%20Square!5e0!3m2!1sen!2sgh!4v1694444453534!5m2!1sen!2sgh"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nyansa Square Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 