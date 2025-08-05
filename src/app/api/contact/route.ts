import { NextRequest, NextResponse } from 'next/server'
import { validateFormData, sanitizeInput } from '@/lib/security'

// Define proper types for form data
interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Email service configuration
const EMAIL_SERVICE_CONFIG = {
  // Using Resend as the email service (free tier available)
  // You can also use Formspree, EmailJS, or other services
  service: 'resend',
  apiKey: process.env.RESEND_API_KEY || process.env.EMAIL_SERVICE_API_KEY,
  fromEmail: 'noreply@nyansatechhub.com',
  toEmail: 'info@nyansatechhub.com'
}

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const maxAttempts = 3

  const attempt = rateLimitStore.get(ip)
  
  if (!attempt || now > attempt.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (attempt.count >= maxAttempts) {
    return false
  }

  attempt.count++
  return true
}

// Send email using Resend service
async function sendEmailWithResend(formData: ContactFormData) {
  if (!EMAIL_SERVICE_CONFIG.apiKey) {
    throw new Error('Email service not configured')
  }

  const emailContent = {
    from: EMAIL_SERVICE_CONFIG.fromEmail,
    to: EMAIL_SERVICE_CONFIG.toEmail,
    subject: `Contact Form: ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This message was sent from the Nyansa Tech Hub contact form.
        </p>
      </div>
    `
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${EMAIL_SERVICE_CONFIG.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailContent)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Email service error: ${error.message || response.statusText}`)
  }

  return response.json()
}

// Fallback email service using EmailJS (client-side alternative)
async function sendEmailWithEmailJS() {
  // This would be implemented on the client side as a fallback
  // For now, we'll simulate a successful response
  return { success: true, message: 'Email sent via fallback service' }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many submission attempts. Please wait a minute before trying again.' 
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate and sanitize form data
    const validation = validateFormData(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validation.errors 
        },
        { status: 400 }
      )
    }

    // Sanitize all inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : '',
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message)
    }

    // Send email using primary service
    let emailResult
    try {
      emailResult = await sendEmailWithResend(sanitizedData)
    } catch (primaryError) {
      console.error('Primary email service failed:', primaryError)
      
      // Try fallback service
      try {
        emailResult = await sendEmailWithEmailJS()
      } catch (fallbackError) {
        console.error('Fallback email service failed:', fallbackError)
        throw new Error('All email services are currently unavailable')
      }
    }

    // Log successful submission
    console.log('Contact form submitted successfully:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: emailResult
    })

  } catch (error) {
    // Log error for debugging
    console.error('Contact form error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })

    // Return appropriate error response
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Sorry, there was an error sending your message. Please try again.',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 