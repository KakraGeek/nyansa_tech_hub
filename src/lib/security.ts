/**
 * Security utilities for input sanitization and validation
 * Implements OWASP Top 10 security best practices
 */

// HTML entity encoding to prevent XSS
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Sanitize user input for safe display
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }
  
  // Remove potentially dangerous characters and patterns
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Ghanaian format)
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters except + and -
  const cleaned = phone.replace(/[^\d+-]/g, '')
  
  // Ghanaian phone number patterns:
  // Mobile: 024-429-9095, 020-123-4567, 054-789-0123
  // Landline: 030-123-4567
  // International: +233-24-429-9095
  const ghanaPhoneRegex = /^(\+233-)?(0[235679][0-9]-[0-9]{3}-[0-9]{4})$/
  
  return ghanaPhoneRegex.test(cleaned)
}

// CSRF token generation (for future use with server-side implementation)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Rate limiting utility (client-side basic implementation)
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempt = this.attempts.get(key)

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs })
      return true
    }

    if (attempt.count >= this.maxAttempts) {
      return false
    }

    attempt.count++
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

// Form validation with security checks (for contact form)
export function validateFormData(data: Record<string, unknown>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  // Validate required fields with proper type checking
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  }

  if (!data.email || typeof data.email !== 'string' || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (data.phone && typeof data.phone === 'string' && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.subject = 'Please select a subject'
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  }

  // Sanitize all string inputs
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      data[key] = sanitizeInput(data[key])
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Booking form validation with security checks
export function validateBookingData(data: Record<string, unknown>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  // Validate required fields with proper type checking
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  }

  if (!data.email || typeof data.email !== 'string' || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.phone || typeof data.phone !== 'string' || !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid Ghanaian phone number (e.g., 024-429-9095)'
  }

  if (!data.date || typeof data.date !== 'string' || data.date.trim().length === 0) {
    errors.date = 'Please select a date'
  }

  if (!data.time || typeof data.time !== 'string' || data.time.trim().length === 0) {
    errors.time = 'Please select a time'
  }

  if (!data.purpose || typeof data.purpose !== 'string' || data.purpose.trim().length === 0) {
    errors.purpose = 'Please select a purpose for your visit'
  }

  // Message is optional for bookings, but if provided, sanitize it
  if (data.message && typeof data.message === 'string') {
    data.message = sanitizeInput(data.message)
  }

  // Sanitize all string inputs
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      data[key] = sanitizeInput(data[key])
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
} 