/**
 * Enhanced error handling utilities
 * Provides logging, user-friendly messages, and retry mechanisms
 */

export interface ErrorDetails {
  type: 'network' | 'validation' | 'server' | 'unknown'
  message: string
  code?: string
  retryable: boolean
  userMessage: string
}

export interface LogEntry {
  level: 'info' | 'warn' | 'error'
  message: string
  details?: unknown
  timestamp: string
  userId?: string
}

// Error logger with fallback to console
class ErrorLogger {
  private logs: LogEntry[] = []
  private maxLogs = 100

  log(level: LogEntry['level'], message: string, details?: unknown) {
    const entry: LogEntry = {
      level,
      message,
      details,
      timestamp: new Date().toISOString()
    }

    // Add to internal log
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // Log to console with appropriate level
    switch (level) {
      case 'info':
        console.info(`[${entry.timestamp}] ${message}`, details || '')
        break
      case 'warn':
        console.warn(`[${entry.timestamp}] ${message}`, details || '')
        break
      case 'error':
        console.error(`[${entry.timestamp}] ${message}`, details || '')
        break
    }

    // In production, you might want to send logs to a service like Sentry
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      this.sendToErrorService(entry)
    }
  }

  private sendToErrorService(entry: LogEntry) {
    // Example: Send to Sentry, LogRocket, or custom error tracking service
    // This is a placeholder for production error tracking
    try {
      // Example: Sentry.captureException(new Error(entry.message), { extra: entry.details })
      console.log('Error tracking service call would go here:', entry)
    } catch (error) {
      console.error('Failed to send error to tracking service:', error)
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }
}

// Global error logger instance
export const errorLogger = new ErrorLogger()

// Error classification and user-friendly messages
export function classifyError(error: unknown): ErrorDetails {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: 'network',
      message: error.message,
      retryable: true,
      userMessage: 'Network connection issue. Please check your internet connection and try again.'
    }
  }

  // Handle error objects with status property
  const errorWithStatus = error as { status?: number }
  if (errorWithStatus.status === 429) {
    return {
      type: 'server',
      message: 'Rate limit exceeded',
      code: 'RATE_LIMIT',
      retryable: true,
      userMessage: 'Too many attempts. Please wait a moment before trying again.'
    }
  }

  if (errorWithStatus.status && errorWithStatus.status >= 500) {
    return {
      type: 'server',
      message: `Server error: ${errorWithStatus.status}`,
      code: `HTTP_${errorWithStatus.status}`,
      retryable: true,
      userMessage: 'Our servers are experiencing issues. Please try again in a few moments.'
    }
  }

  if (errorWithStatus.status && errorWithStatus.status >= 400) {
    return {
      type: 'validation',
      message: `Client error: ${errorWithStatus.status}`,
      code: `HTTP_${errorWithStatus.status}`,
      retryable: false,
      userMessage: 'There was an issue with your request. Please check your input and try again.'
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      type: 'unknown',
      message: error.message,
      retryable: false,
      userMessage: 'An unexpected error occurred. Please try again.'
    }
  }

  // Fallback for unknown error types
  return {
    type: 'unknown',
    message: String(error),
    retryable: false,
    userMessage: 'An unexpected error occurred. Please try again.'
  }
}

// Retry mechanism with exponential backoff
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        break
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// Enhanced fetch with error handling
export async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
      ;(error as unknown as { status: number }).status = response.status
      throw error
    }

    return response
  } catch (error) {
    errorLogger.log('error', 'Fetch request failed', { url, error })
    throw error
  }
}

// Form submission with comprehensive error handling
export async function submitFormWithRetry(
  url: string,
  data: Record<string, unknown>,
  maxRetries: number = 2
): Promise<{ success: boolean; data?: unknown; error?: ErrorDetails }> {
  try {
    const response = await retryOperation(
      () => fetchWithErrorHandling(url, {
        method: 'POST',
        body: JSON.stringify(data)
      }),
      maxRetries
    )

    const responseData = await response.json()
    
    return {
      success: true,
      data: responseData
    }
  } catch (error) {
    const errorDetails = classifyError(error)
    errorLogger.log('error', 'Form submission failed', { url, error: errorDetails })
    
    return {
      success: false,
      error: errorDetails
    }
  }
}

// User-friendly error message generator
export function getUserFriendlyMessage(error: ErrorDetails): string {
  return error.userMessage
}

// Error boundary fallback UI component props
export interface ErrorFallbackProps {
  error: ErrorDetails
  resetError: () => void
  retry?: () => void
}

// Generate retry button text based on error type
export function getRetryButtonText(error: ErrorDetails): string {
  if (error.retryable) {
    return 'Try Again'
  }
  return 'Go Back'
} 