'use client'

import React from 'react'
import { AlertCircle, RefreshCw, X } from 'lucide-react'
import { Button } from './button'
import { ErrorDetails, getRetryButtonText } from '@/lib/errorHandling'

interface ErrorDisplayProps {
  error: ErrorDetails | null
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
  showRetry?: boolean
  showDismiss?: boolean
}

export function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  className = '',
  showRetry = true,
  showDismiss = true
}: ErrorDisplayProps) {
  if (!error) return null

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'validation':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'server':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getErrorStyles = () => {
    switch (error.type) {
      case 'network':
        return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'validation':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'server':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-red-50 border-red-200 text-red-800'
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getErrorStyles()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getErrorIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium mb-1">
                {error.type === 'network' && 'Connection Error'}
                {error.type === 'validation' && 'Validation Error'}
                {error.type === 'server' && 'Server Error'}
                {error.type === 'unknown' && 'Error'}
              </h4>
              <p className="text-sm leading-relaxed">
                {error.userMessage}
              </p>
              {error.code && (
                <p className="text-xs opacity-75 mt-1">
                  Error code: {error.code}
                </p>
              )}
            </div>
            
            {showDismiss && onDismiss && (
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {showRetry && error.retryable && onRetry && (
            <div className="mt-3">
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                {getRetryButtonText(error)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Success message component
interface SuccessDisplayProps {
  message: string
  onDismiss?: () => void
  className?: string
}

export function SuccessDisplay({
  message,
  onDismiss,
  className = ''
}: SuccessDisplayProps) {
  return (
    <div className={`rounded-lg border border-green-200 bg-green-50 text-green-800 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Success</h4>
              <p className="text-sm leading-relaxed">
                {message}
              </p>
            </div>
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
                aria-label="Dismiss success message"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading state component
interface LoadingDisplayProps {
  message?: string
  className?: string
}

export function LoadingDisplay({
  message = 'Processing...',
  className = ''
}: LoadingDisplayProps) {
  return (
    <div className={`rounded-lg border border-blue-200 bg-blue-50 text-blue-800 p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
} 