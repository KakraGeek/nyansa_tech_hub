/**
 * Accessibility utilities and constants
 * Implements WCAG 2.1 AA standards
 */

// ARIA labels and descriptions
export const ARIA_LABELS = {
  // Navigation
  NAV_MENU: 'Main navigation menu',
  NAV_TOGGLE: 'Toggle navigation menu',
  NAV_CLOSE: 'Close navigation menu',
  
  // Forms
  FORM_SUBMIT: 'Submit contact form',
  FORM_RESET: 'Reset form',
  
  // Images
  HERO_IMAGE: 'Students and facilities at Nyansa Tech Hub',
  SPACE_IMAGE: 'View details of this space',
  PARTNER_LOGO: 'Partner company logo',
  
  // Interactive elements
  MODAL_CLOSE: 'Close modal',
  MODAL_PREV: 'Previous image',
  MODAL_NEXT: 'Next image',
  TAB_PANEL: 'Tab content panel',
  
  // Social media
  SOCIAL_FACEBOOK: 'Visit our Facebook page',
  SOCIAL_TWITTER: 'Visit our Twitter page',
  SOCIAL_LINKEDIN: 'Visit our LinkedIn page',
  SOCIAL_INSTAGRAM: 'Visit our Instagram page',
  SOCIAL_YOUTUBE: 'Visit our YouTube channel',
}

// Focus management utilities
export function trapFocus(element: HTMLElement): void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  })
}

// Skip link utility
export function createSkipLink(): void {
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = 'Skip to main content'
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-nyansa-light-blue text-white px-4 py-2 rounded z-50'
  document.body.insertBefore(skipLink, document.body.firstChild)
}

// Announce changes to screen readers
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Color contrast utilities
export const CONTRAST_RATIOS = {
  AA_LARGE: 3.0, // 18pt+ or 14pt+ bold
  AA_NORMAL: 4.5, // Normal text
  AAA_LARGE: 4.5, // 18pt+ or 14pt+ bold
  AAA_NORMAL: 7.0, // Normal text
}

// Keyboard navigation utilities
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
}

// Focus visible utility for better keyboard navigation
export function addFocusVisibleStyles(): void {
  const style = document.createElement('style')
  style.textContent = `
    .focus-visible:focus {
      outline: 2px solid #00B6FF;
      outline-offset: 2px;
    }
    
    .focus-visible:focus:not(:focus-visible) {
      outline: none;
    }
  `
  document.head.appendChild(style)
}

// Form validation accessibility
export function createErrorAnnouncement(fieldName: string, errorMessage: string): void {
  announceToScreenReader(`${fieldName} error: ${errorMessage}`)
}

// Loading state announcements
export function announceLoadingState(isLoading: boolean): void {
  if (isLoading) {
    announceToScreenReader('Loading, please wait')
  } else {
    announceToScreenReader('Loading complete')
  }
} 