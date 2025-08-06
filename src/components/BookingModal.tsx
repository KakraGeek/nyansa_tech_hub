'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, X, MapPin, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { validateBookingData } from '@/lib/security'
import { ErrorDisplay } from '@/components/ui/errorDisplay'

interface BookingFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  purpose: string
  guests: number
  message: string
}

interface TimeSlot {
  time: string
  available: boolean
  booked: boolean
}

interface DaySlots {
  date: string
  available: boolean
  slots: TimeSlot[]
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ErrorDetails {
  type: 'validation' | 'unknown' | 'network' | 'server'
  message: string
  retryable: boolean
  userMessage: string
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<'calendar' | 'time' | 'form' | 'confirmation'>('calendar')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    purpose: '',
    guests: 1,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>('')

  // Generate available dates for the next 30 days
  const generateAvailableDates = (): DaySlots[] => {
    const dates: DaySlots[] = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) continue
      
      const dateString = date.toISOString().split('T')[0]
      const timeSlots: TimeSlot[] = [
        { time: '09:00', available: true, booked: false },
        { time: '10:00', available: true, booked: false },
        { time: '11:00', available: true, booked: false },
        { time: '14:00', available: true, booked: false },
        { time: '15:00', available: true, booked: false },
        { time: '16:00', available: true, booked: false }
      ]
      
      dates.push({
        date: dateString,
        available: true,
        slots: timeSlots
      })
    }
    
    return dates
  }

  const [availableDates] = useState<DaySlots[]>(generateAvailableDates())

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setCurrentStep('time')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setBookingData(prev => ({ ...prev, date: selectedDate, time }))
    setCurrentStep('form')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Format phone number as user types
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '') // Remove all non-digits
      
      // Format as Ghanaian phone number
      if (formattedValue.length > 0) {
        if (formattedValue.startsWith('233')) {
          // International format: +233-24-429-9095
          formattedValue = formattedValue.replace(/^233/, '')
          if (formattedValue.length >= 9) {
            formattedValue = `+233-${formattedValue.slice(0, 2)}-${formattedValue.slice(2, 5)}-${formattedValue.slice(5, 9)}`
          }
        } else {
          // Local format: 024-429-9095
          if (formattedValue.length >= 10) {
            formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 10)}`
          }
        }
      }
      
      setBookingData(prev => ({ ...prev, [name]: formattedValue }))
    } else {
      setBookingData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorDetails(null)

    // Ensure date and time are set in booking data
    const finalBookingData = {
      ...bookingData,
      date: selectedDate,
      time: selectedTime
    }

    // Debug: Log the data being sent
    console.log('Submitting booking data:', finalBookingData)

    // Client-side validation
    const validation = validateBookingData(finalBookingData)
    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors)
      setSubmitStatus('error')
      setErrorDetails({
        type: 'validation',
        message: 'Form validation failed',
        retryable: false,
        userMessage: 'Please check your form and try again. ' + Object.values(validation.errors).join(', ')
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalBookingData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSuccessMessage('Your visit has been scheduled successfully! We\'ll send you a confirmation email shortly.')
        setCurrentStep('confirmation')
      } else {
        setSubmitStatus('error')
        console.log('Booking submission failed:', result)
        setErrorDetails({
          type: 'unknown',
          message: 'Unknown error occurred',
          retryable: false,
          userMessage: result.error?.userMessage || 'An unexpected error occurred. Please try again.'
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

  const handleClose = () => {
    setCurrentStep('calendar')
    setSelectedDate('')
    setSelectedTime('')
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      purpose: '',
      guests: 1,
      message: ''
    })
    setSubmitStatus('idle')
    setErrorDetails(null)
    setSuccessMessage('')
    onClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get selected day slots
  const selectedDaySlots = availableDates.find(day => day.date === selectedDate)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-nyansa-dark-gray">
            Schedule a Visit
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            {['calendar', 'time', 'form', 'confirmation'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === step 
                    ? 'bg-nyansa-light-blue text-white' 
                    : index < ['calendar', 'time', 'form', 'confirmation'].indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    index < ['calendar', 'time', 'form', 'confirmation'].indexOf(currentStep)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Calendar */}
          {currentStep === 'calendar' && (
            <div>
              <h3 className="text-lg font-semibold text-nyansa-dark-gray mb-4">
                Select a Date
              </h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {availableDates.slice(0, 21).map((day) => (
                  <button
                    key={day.date}
                    onClick={() => handleDateSelect(day.date)}
                    className="p-3 text-center hover:bg-nyansa-light-blue/10 rounded-lg transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-nyansa-dark-gray">
                      {new Date(day.date).getDate()}
                    </div>
                    <div className="text-xs text-nyansa-light-blue">
                      Available
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">
                Available dates for the next 3 weeks
              </p>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {currentStep === 'time' && selectedDaySlots && (
            <div>
              <h3 className="text-lg font-semibold text-nyansa-dark-gray mb-4">
                Select a Time for {formatDate(selectedDate)}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedDaySlots.slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available || slot.booked}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      slot.booked
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : slot.available
                        ? 'border-nyansa-light-blue hover:border-nyansa-accent hover:bg-nyansa-light-blue/5 cursor-pointer'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-lg font-semibold">{slot.time}</div>
                    <div className="text-sm text-gray-600">
                      {slot.booked ? 'Booked' : 'Available'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Form */}
          {currentStep === 'form' && (
            <div>
              <h3 className="text-lg font-semibold text-nyansa-dark-gray mb-4">
                Complete Your Booking
              </h3>
              
              {submitStatus === 'error' && errorDetails && (
                <ErrorDisplay
                  error={errorDetails}
                  onRetry={() => {
                    // Reset error state and retry submission
                    setErrorDetails(null)
                    setSubmitStatus('idle')
                    // Trigger form submission again
                    const form = document.querySelector('form')
                    if (form) {
                      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
                      form.dispatchEvent(submitEvent)
                    }
                  }}
                  onDismiss={() => setErrorDetails(null)}
                  className="mb-4"
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="(\+233-)?(0[235679][0-9]-[0-9]{3}-[0-9]{4})"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                      placeholder="024-429-9095"
                      title="Please enter a valid Ghanaian phone number (e.g., 024-429-9095)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: 024-429-9095 or +233-24-429-9095
                    </p>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Purpose of Visit *
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={bookingData.purpose}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                  >
                    <option value="">Select purpose</option>
                    <option value="facility-tour">Facility Tour</option>
                    <option value="program-inquiry">Program Inquiry</option>
                    <option value="partnership">Partnership Discussion</option>
                    <option value="event-visit">Event Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-nyansa-dark-gray mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                    placeholder="Tell us more about your visit..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('time')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-nyansa-dark-gray mb-2">
                Visit Scheduled Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                {successMessage}
              </p>
              <div className="bg-nyansa-complementary rounded-lg p-4 mb-6">
                <div className="text-sm text-nyansa-dark-gray">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedDate)} at {selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Nyansa Square, 4 Bathur Street, East Legon, Accra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{bookingData.name}</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 