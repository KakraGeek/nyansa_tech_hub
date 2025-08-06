// Email service utilities for Nyansa Tech Hub

interface EmailConfig {
  service: 'resend' | 'formspree' | 'emailjs' | 'smtp'
  apiKey?: string
  fromEmail: string
  toEmails: string[]
}

interface EmailContent {
  to: string
  subject: string
  html: string
  from?: string
}

interface EmailResponse {
  success: boolean
  message?: string
  id?: string
}

interface EmailResult {
  success: boolean
  email: string
  result?: EmailResponse
  error?: string
}

interface BookingData {
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

// Email service configuration
const EMAIL_SERVICE_CONFIG: EmailConfig = {
  service: 'resend',
  apiKey: process.env.RESEND_API_KEY || process.env.EMAIL_SERVICE_API_KEY,
  fromEmail: 'noreply@nyansatechhub.com',
  toEmails: ['info@nyansatechhub.com', 'admissions@nyansatechhub.com']
}

/**
 * Send email using Resend service
 */
export async function sendEmailWithResend(emailContent: EmailContent): Promise<EmailResponse> {
  if (!EMAIL_SERVICE_CONFIG.apiKey) {
    throw new Error('Email service not configured - RESEND_API_KEY is required')
  }

  const emailData = {
    from: emailContent.from || EMAIL_SERVICE_CONFIG.fromEmail,
    to: emailContent.to,
    subject: emailContent.subject,
    html: emailContent.html
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${EMAIL_SERVICE_CONFIG.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailData)
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(`Email service error: ${error.message || response.statusText}`)
  }

  return response.json()
}

/**
 * Send email using Formspree service (fallback)
 */
export async function sendEmailWithFormspree(emailContent: EmailContent): Promise<EmailResponse> {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT
  
  if (!formspreeEndpoint) {
    throw new Error('Formspree endpoint not configured')
  }

  const formData = new FormData()
  formData.append('email', emailContent.to)
  formData.append('subject', emailContent.subject)
  formData.append('message', emailContent.html)

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error(`Formspree error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Send email with fallback support
 */
export async function sendEmail(emailContent: EmailContent): Promise<EmailResponse> {
  try {
    // Try primary service (Resend)
    return await sendEmailWithResend(emailContent)
  } catch (primaryError) {
    console.error('Primary email service failed:', primaryError)
    
    try {
      // Try fallback service (Formspree)
      return await sendEmailWithFormspree(emailContent)
    } catch (fallbackError) {
      console.error('Fallback email service failed:', fallbackError)
      throw new Error('All email services are currently unavailable')
    }
  }
}

/**
 * Send multiple emails to different recipients
 */
export async function sendMultipleEmails(emailContents: EmailContent[]): Promise<EmailResult[]> {
  const emailPromises = emailContents.map(async (content) => {
    try {
      const result = await sendEmail(content)
      return { success: true, email: content.to, result }
    } catch (error) {
      return { 
        success: false, 
        email: content.to, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  })

  const results = await Promise.allSettled(emailPromises)
  
  // Process results
  const processedResults = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return { 
        success: false, 
        email: emailContents[index]?.to || 'unknown', 
        error: result.reason 
      }
    }
  })

  return processedResults
}

/**
 * Generate HTML email template for booking notifications
 */
export function generateBookingNotificationEmail(booking: BookingData): string {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const purposeLabels: { [key: string]: string } = {
    'facility-tour': 'Facility Tour',
    'program-inquiry': 'Program Inquiry',
    'partnership-discussion': 'Partnership Discussion',
    'event-visit': 'Event Visit',
    'other': 'Other'
  }

  const purposeLabel = purposeLabels[booking.purpose] || booking.purpose

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin: 0; font-size: 24px;">Nyansa Tech Hub</h1>
          <p style="color: #64748b; margin: 5px 0 0 0;">New Booking Request</p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📅 Booking Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Visitor Name:</td>
              <td style="padding: 8px 0; color: #1f2937;">${booking.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937;">${booking.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
              <td style="padding: 8px 0; color: #1f2937;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Visit Date:</td>
              <td style="padding: 8px 0; color: #1f2937;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Visit Time:</td>
              <td style="padding: 8px 0; color: #1f2937;">${booking.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Purpose:</td>
              <td style="padding: 8px 0; color: #1f2937;">${purposeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Number of Guests:</td>
              <td style="padding: 8px 0; color: #1f2937;">${booking.guests}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Booking ID:</td>
              <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">${booking.id}</td>
            </tr>
          </table>
        </div>
        
        ${booking.message ? `
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">💬 Additional Message</h3>
          <p style="color: #1f2937; margin: 0; line-height: 1.6;">${booking.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; border-left: 4px solid #1e40af;">
          <p style="margin: 0; color: #1e40af; font-weight: 500;">
            <strong>Action Required:</strong> Please review this booking request and confirm the appointment or contact the visitor if additional information is needed.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #64748b; font-size: 14px; margin: 0;">
            This notification was sent automatically from the Nyansa Tech Hub booking system.<br>
            Booking submitted on ${new Date(booking.createdAt || '').toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  `
}

/**
 * Send booking notification emails to staff
 */
export async function sendBookingNotificationEmails(booking: BookingData): Promise<EmailResult[]> {
  const subject = `New Booking Request - ${booking.name} (${booking.date} at ${booking.time})`
  const htmlContent = generateBookingNotificationEmail(booking)
  
  const emailContents: EmailContent[] = EMAIL_SERVICE_CONFIG.toEmails.map(email => ({
    to: email,
    subject,
    html: htmlContent
  }))

  return await sendMultipleEmails(emailContents)
} 