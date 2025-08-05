#!/usr/bin/env node

/**
 * Error Handling System Demo
 * 
 * This script demonstrates the error handling capabilities
 * implemented in Stage 5 of the Nyansa Tech Hub website.
 */

console.log('🧠 Nyansa Tech Hub - Error Handling System Demo\n')

// Simulate the error handling system
const errorScenarios = [
  {
    name: 'Network Error',
    error: new TypeError('fetch failed'),
    expected: {
      type: 'network',
      retryable: true,
      userMessage: 'Network connection issue. Please check your internet connection and try again.'
    }
  },
  {
    name: 'Rate Limit Error',
    error: { status: 429 },
    expected: {
      type: 'server',
      code: 'RATE_LIMIT',
      retryable: true,
      userMessage: 'Too many attempts. Please wait a moment before trying again.'
    }
  },
  {
    name: 'Server Error',
    error: { status: 500 },
    expected: {
      type: 'server',
      code: 'HTTP_500',
      retryable: true,
      userMessage: 'Our servers are experiencing issues. Please try again in a few moments.'
    }
  },
  {
    name: 'Validation Error',
    error: { status: 400, details: { name: 'Required' } },
    expected: {
      type: 'validation',
      retryable: false,
      userMessage: 'Please check your input and try again.'
    }
  },
  {
    name: 'Unknown Error',
    error: { message: 'Something went wrong' },
    expected: {
      type: 'unknown',
      retryable: false,
      userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
    }
  }
]

// Simulate error classification function
function classifyError(error) {
  // Network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      type: 'network',
      message: error.message,
      retryable: true,
      userMessage: 'Network connection issue. Please check your internet connection and try again.'
    }
  }

  if (error.status === 429) {
    return {
      type: 'server',
      message: 'Rate limit exceeded',
      code: 'RATE_LIMIT',
      retryable: true,
      userMessage: 'Too many attempts. Please wait a moment before trying again.'
    }
  }

  if (error.status >= 500) {
    return {
      type: 'server',
      message: `Server error: ${error.status}`,
      code: `HTTP_${error.status}`,
      retryable: true,
      userMessage: 'Our servers are experiencing issues. Please try again in a few moments.'
    }
  }

  if (error.status >= 400) {
    return {
      type: 'validation',
      message: `Client error: ${error.status}`,
      code: `HTTP_${error.status}`,
      retryable: false,
      userMessage: 'Please check your input and try again.'
    }
  }

  // Validation errors
  if (error.details && typeof error.details === 'object') {
    return {
      type: 'validation',
      message: 'Form validation failed',
      retryable: false,
      userMessage: 'Please correct the errors in the form and try again.'
    }
  }

  // Unknown errors
  return {
    type: 'unknown',
    message: error.message || 'Unknown error occurred',
    retryable: false,
    userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
  }
}

// Simulate retry mechanism
async function retryOperation(operation, maxRetries = 3, baseDelay = 1000) {
  let lastError

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        break
      }

      const errorDetails = classifyError(error)
      if (!errorDetails.retryable) {
        throw error
      }

      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`  ⏳ Retry attempt ${attempt + 1}/${maxRetries + 1} after ${delay}ms`)
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// Demo the error scenarios
console.log('📋 Testing Error Classification:\n')

errorScenarios.forEach((scenario, index) => {
  console.log(`${index + 1}. ${scenario.name}:`)
  
  const result = classifyError(scenario.error)
  
  console.log(`   Type: ${result.type}`)
  console.log(`   Retryable: ${result.retryable}`)
  console.log(`   User Message: ${result.userMessage}`)
  if (result.code) {
    console.log(`   Error Code: ${result.code}`)
  }
  
  // Validate against expected results
  const isCorrect = 
    result.type === scenario.expected.type &&
    result.retryable === scenario.expected.retryable &&
    result.userMessage === scenario.expected.userMessage
  
  console.log(`   ✅ ${isCorrect ? 'PASS' : 'FAIL'}\n`)
})

// Demo retry mechanism
console.log('🔄 Testing Retry Mechanism:\n')

async function demoRetry() {
  let attemptCount = 0
  
  const failingOperation = async () => {
    attemptCount++
    if (attemptCount < 3) {
      throw new TypeError('Network error')
    }
    return 'Success after retry!'
  }
  
  try {
    console.log('Simulating network failure with eventual success...')
    const result = await retryOperation(failingOperation, 2, 100) // Short delay for demo
    console.log(`✅ ${result}`)
  } catch (error) {
    console.log(`❌ Failed after all retries: ${error.message}`)
  }
}

demoRetry()

// Demo form submission flow
console.log('\n📝 Form Submission Flow Demo:\n')

const formSubmissionFlow = [
  '1. User fills out contact form',
  '2. Client-side validation runs',
  '3. Form data is sanitized',
  '4. API request is sent to /api/contact',
  '5. Server-side validation and rate limiting',
  '6. Email service integration (Resend/Formspree/EmailJS)',
  '7. Success/error response with user-friendly messages',
  '8. Retry mechanism for recoverable errors',
  '9. Comprehensive error logging'
]

formSubmissionFlow.forEach(step => {
  console.log(`   ${step}`)
})

console.log('\n🎯 Key Features Implemented:')
console.log('   ✅ Multiple email service providers supported')
console.log('   ✅ Comprehensive error classification')
console.log('   ✅ Retry mechanism with exponential backoff')
console.log('   ✅ User-friendly error messages')
console.log('   ✅ Rate limiting and security measures')
console.log('   ✅ Detailed error logging')
console.log('   ✅ Reusable error display components')
console.log('   ✅ Comprehensive test coverage')

console.log('\n📚 Documentation:')
console.log('   📖 Email Service Setup: docs/email-service-setup.md')
console.log('   🧪 Error Handling Tests: tests/errorHandling.spec.ts')
console.log('   🔧 API Route: src/app/api/contact/route.ts')
console.log('   🛠️ Error Utilities: src/lib/errorHandling.ts')
console.log('   🎨 UI Components: src/components/ui/errorDisplay.tsx')

console.log('\n🚀 Stage 5 Complete: Integrations & Error Handling')
console.log('   Ready to proceed to Stage 6: Responsive Design') 