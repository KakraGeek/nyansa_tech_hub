'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Hide main navigation when in admin section
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <Navigation />
} 