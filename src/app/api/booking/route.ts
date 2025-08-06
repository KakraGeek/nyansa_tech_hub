import { NextRequest, NextResponse } from 'next/server'
import { validateBookingData, sanitizeInput } from '@/lib/security'
import { sendBookingNotificationEmails } from '@/lib/email'

interface BookingFormData {
  id?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  purpose: string
  guests: number
  message: string
  status?: 'confirmed' | 'cancelled' | 'completed'
  createdAt?: string
}

// Simple in-memory storage for bookings (in production, use a database)
const bookings: BookingFormData[] = []

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Debug: Log the received data
    console.log('Received booking data:', body)
    
    // Validate and sanitize form data
    const validation = validateBookingData(body)
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors)
      return NextResponse.json(
        { 
          success: false, 
          error: {
            type: 'validation',
            message: 'Validation failed',
            userMessage: 'Please check your form and try again.',
            details: validation.errors
          }
        },
        { status: 400 }
      )
    }

    // Validate date and time
    const selectedDate = new Date(body.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate <= today) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid date selected' 
        },
        { status: 400 }
      )
    }

    // Check if the time slot is available
    const existingBooking = bookings.find(
      booking => booking.date === body.date && booking.time === body.time
    )
    
    if (existingBooking) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This time slot is already booked' 
        },
        { status: 409 }
      )
    }

    // Sanitize all inputs
    const sanitizedData: BookingFormData = {
      id: `BK-${Date.now()}`,
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: sanitizeInput(body.phone),
      date: body.date,
      time: body.time,
      purpose: sanitizeInput(body.purpose),
      guests: parseInt(body.guests) || 1,
      message: body.message ? sanitizeInput(body.message) : '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }

    // Store the booking
    bookings.push(sanitizedData)

    // Send notification emails to staff
    try {
      const emailResults = await sendBookingNotificationEmails(sanitizedData)
      console.log('Booking notification emails sent successfully:', emailResults)
      
      // Log email results
      emailResults.forEach((result) => {
        if (result.success) {
          console.log(`✅ Booking notification sent to ${result.email}`)
        } else {
          console.error(`❌ Failed to send booking notification to ${result.email}:`, result.error)
        }
      })
    } catch (error) {
      console.error('Failed to send booking notification emails:', error)
      // Don't fail the booking if email fails - just log the error
    }

    // Log successful booking
    console.log('Booking submitted successfully:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      date: sanitizedData.date,
      time: sanitizedData.time,
      purpose: sanitizedData.purpose,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Your visit has been scheduled successfully! We\'ll send you a confirmation email shortly.',
      bookingId: sanitizedData.id
    })

  } catch (error) {
    console.error('Booking submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
      },
      { status: 500 }
    )
  }
}

// PUT endpoint to update booking status
export async function PUT(request: NextRequest) {
  try {
    // Check for admin authorization header (in production, use proper JWT tokens)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized - Admin access required' 
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { bookingId, status } = body
    
    if (!bookingId || !status) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Booking ID and status are required' 
        },
        { status: 400 }
      )
    }
    
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId)
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Booking not found' 
        },
        { status: 404 }
      )
    }
    
    bookings[bookingIndex].status = status
    
    return NextResponse.json({
      success: true,
      message: 'Booking status updated successfully'
    })
    
  } catch (error) {
    console.error('Booking update error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// DELETE endpoint to delete a booking
export async function DELETE(request: NextRequest) {
  try {
    // Check for admin authorization header (in production, use proper JWT tokens)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized - Admin access required' 
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    
    if (!bookingId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Booking ID is required' 
        },
        { status: 400 }
      )
    }
    
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId)
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Booking not found' 
        },
        { status: 404 }
      )
    }
    
    bookings.splice(bookingIndex, 1)
    
    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    })
    
  } catch (error) {
    console.error('Booking deletion error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch bookings or check availability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const action = searchParams.get('action')
    
    // If action is 'list', return all bookings for admin panel
    if (action === 'list') {
      // Check for admin authorization header (in production, use proper JWT tokens)
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Unauthorized - Admin access required' 
          },
          { status: 401 }
        )
      }
      
      return NextResponse.json({
        success: true,
        bookings: bookings.sort((a, b) => 
          new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        )
      })
    }
    
    // If date is provided, check availability for that date
    if (date) {
      // Get booked slots for the specified date
      const bookedSlots = bookings
        .filter(booking => booking.date === date)
        .map(booking => booking.time)

      // Available time slots
      const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot))

      return NextResponse.json({
        success: true,
        date,
        availableSlots,
        bookedSlots
      })
    }
    
    // Default: return all bookings
    return NextResponse.json({
      success: true,
      bookings: bookings.sort((a, b) => 
        new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      )
    })

  } catch (error) {
    console.error('Booking fetch error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
} 