/**
 * Comprehensive error handling tests
 * Tests all error scenarios: network, validation, server, and unknown errors
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  classifyError, 
  retryOperation, 
  submitFormWithRetry,
  getUserFriendlyMessage,
  getRetryButtonText,
  errorLogger
} from '../src/lib/errorHandling'

// Mock fetch globally
global.fetch = vi.fn()

describe('Error Handling System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    errorLogger.clearLogs()
  })

  describe('Error Classification', () => {
    it('should classify network errors correctly', () => {
      const networkError = new TypeError('fetch failed')
      const result = classifyError(networkError)
      
      expect(result.type).toBe('network')
      expect(result.retryable).toBe(true)
      expect(result.userMessage).toContain('internet connection')
    })

    it('should classify rate limit errors correctly', () => {
      const rateLimitError = { status: 429 }
      const result = classifyError(rateLimitError)
      
      expect(result.type).toBe('server')
      expect(result.code).toBe('RATE_LIMIT')
      expect(result.retryable).toBe(true)
      expect(result.userMessage).toContain('Too many attempts')
    })

    it('should classify server errors correctly', () => {
      const serverError = { status: 500 }
      const result = classifyError(serverError)
      
      expect(result.type).toBe('server')
      expect(result.code).toBe('HTTP_500')
      expect(result.retryable).toBe(true)
      expect(result.userMessage).toContain('servers are experiencing issues')
    })

    it('should classify validation errors correctly', () => {
      const validationError = { status: 400, details: { name: 'Required' } }
      const result = classifyError(validationError)
      
      expect(result.type).toBe('validation')
      expect(result.retryable).toBe(false)
      expect(result.userMessage).toContain('check your input')
    })

    it('should classify unknown errors correctly', () => {
      const unknownError = { message: 'Something went wrong' }
      const result = classifyError(unknownError)
      
      expect(result.type).toBe('unknown')
      expect(result.retryable).toBe(false)
      expect(result.userMessage).toContain('unexpected error')
    })
  })

  describe('Retry Operation', () => {
    it('should succeed on first attempt', async () => {
      const operation = vi.fn().mockResolvedValue('success')
      
      const result = await retryOperation(operation)
      
      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should retry and succeed on second attempt', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue('success')
      
      const result = await retryOperation(operation, 3, 10) // Short delay for testing
      
      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(2)
    })

    it('should fail after max retries', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Persistent error'))
      
      await expect(retryOperation(operation, 2, 10)).rejects.toThrow('Persistent error')
      expect(operation).toHaveBeenCalledTimes(3) // Initial + 2 retries
    })

    it('should not retry non-retryable errors', async () => {
      const operation = vi.fn().mockRejectedValue({ 
        type: 'validation', 
        retryable: false 
      })
      
      await expect(retryOperation(operation)).rejects.toMatchObject({
        type: 'validation',
        retryable: false
      })
      expect(operation).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form Submission with Retry', () => {
    it('should handle successful submission', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve({ success: true, message: 'Success' }) }
      ;(fetch as any).mockResolvedValue(mockResponse)
      
      const result = await submitFormWithRetry('/api/contact', { name: 'Test' })
      
      expect(result.success).toBe(true)
      expect(result.data?.message).toBe('Success')
    })

    it('should handle network errors with retry', async () => {
      const mockResponse = { ok: false, status: 500, json: () => Promise.resolve({ error: 'Server error' }) }
      ;(fetch as any).mockRejectedValue(new TypeError('fetch failed'))
      
      const result = await submitFormWithRetry('/api/contact', { name: 'Test' })
      
      expect(result.success).toBe(false)
      expect(result.error?.type).toBe('network')
      expect(result.error?.retryable).toBe(true)
    })

    it('should handle validation errors without retry', async () => {
      const mockResponse = { 
        ok: false, 
        status: 400, 
        json: () => Promise.resolve({ 
          error: 'Validation failed',
          details: { name: 'Required' }
        })
      }
      ;(fetch as any).mockResolvedValue(mockResponse)
      
      const result = await submitFormWithRetry('/api/contact', { name: '' })
      
      expect(result.success).toBe(false)
      expect(result.error?.type).toBe('validation')
      expect(result.error?.retryable).toBe(false)
    })

    it('should handle rate limiting', async () => {
      const mockResponse = { 
        ok: false, 
        status: 429, 
        json: () => Promise.resolve({ 
          error: 'Too many attempts' 
        })
      }
      ;(fetch as any).mockResolvedValue(mockResponse)
      
      const result = await submitFormWithRetry('/api/contact', { name: 'Test' })
      
      expect(result.success).toBe(false)
      expect(result.error?.type).toBe('server')
      expect(result.error?.code).toBe('RATE_LIMIT')
      expect(result.error?.retryable).toBe(true)
    })
  })

  describe('User-Friendly Messages', () => {
    it('should generate appropriate network error messages', () => {
      const error = { type: 'network' as const, userMessage: 'Connection failed' }
      const message = getUserFriendlyMessage(error)
      
      expect(message).toBe('Connection failed')
    })

    it('should generate appropriate validation error messages', () => {
      const error = { type: 'validation' as const }
      const message = getUserFriendlyMessage(error)
      
      expect(message).toContain('check your input')
    })

    it('should generate appropriate server error messages', () => {
      const error = { type: 'server' as const }
      const message = getUserFriendlyMessage(error)
      
      expect(message).toContain('servers are temporarily unavailable')
    })

    it('should generate appropriate unknown error messages', () => {
      const error = { type: 'unknown' as const }
      const message = getUserFriendlyMessage(error)
      
      expect(message).toContain('unexpected error')
    })
  })

  describe('Retry Button Text', () => {
    it('should return appropriate text for network errors', () => {
      const error = { type: 'network' as const, retryable: true }
      const text = getRetryButtonText(error)
      
      expect(text).toBe('Retry Connection')
    })

    it('should return appropriate text for server errors', () => {
      const error = { type: 'server' as const, retryable: true }
      const text = getRetryButtonText(error)
      
      expect(text).toBe('Retry Request')
    })

    it('should return generic text for non-retryable errors', () => {
      const error = { type: 'validation' as const, retryable: false }
      const text = getRetryButtonText(error)
      
      expect(text).toBe('Try Again')
    })
  })

  describe('Error Logging', () => {
    it('should log errors appropriately', () => {
      errorLogger.log('error', 'Test error', { details: 'test' })
      
      const logs = errorLogger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].level).toBe('error')
      expect(logs[0].message).toBe('Test error')
      expect(logs[0].details).toEqual({ details: 'test' })
    })

    it('should limit log entries', () => {
      // Add more than maxLogs entries
      for (let i = 0; i < 150; i++) {
        errorLogger.log('info', `Log entry ${i}`)
      }
      
      const logs = errorLogger.getLogs()
      expect(logs.length).toBeLessThanOrEqual(100)
      expect(logs[logs.length - 1].message).toBe('Log entry 149')
    })

    it('should clear logs', () => {
      errorLogger.log('info', 'Test log')
      expect(errorLogger.getLogs()).toHaveLength(1)
      
      errorLogger.clearLogs()
      expect(errorLogger.getLogs()).toHaveLength(0)
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete error flow', async () => {
      // Simulate a network error that eventually succeeds
      let callCount = 0
      const mockFetch = vi.fn().mockImplementation(() => {
        callCount++
        if (callCount < 3) {
          throw new TypeError('Network error')
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, message: 'Success after retry' })
        })
      })
      ;(fetch as any).mockImplementation(mockFetch)
      
      const result = await submitFormWithRetry('/api/contact', { name: 'Test' })
      
      expect(result.success).toBe(true)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })

    it('should provide comprehensive error information', async () => {
      const mockResponse = { 
        ok: false, 
        status: 500, 
        json: () => Promise.resolve({ 
          error: 'Internal server error',
          details: { code: 'DB_CONNECTION_FAILED' }
        })
      }
      ;(fetch as any).mockResolvedValue(mockResponse)
      
      const result = await submitFormWithRetry('/api/contact', { name: 'Test' })
      
      expect(result.success).toBe(false)
      expect(result.error?.type).toBe('server')
      expect(result.error?.code).toBe('HTTP_500')
      expect(result.error?.retryable).toBe(true)
      expect(result.error?.userMessage).toContain('servers are experiencing issues')
    })
  })
}) 