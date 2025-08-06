'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, Calendar, Lock } from 'lucide-react'
import { isAuthenticated } from '@/lib/auth'

export default function AdminAccess() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on every render
  const checkAuth = useCallback(() => {
    const authenticated = isAuthenticated()
    if (authenticated !== isLoggedIn) {
      setIsLoggedIn(authenticated)
    }
    if (isLoading) {
      setIsLoading(false)
    }
  }, [isLoggedIn, isLoading])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Check auth state when pathname changes
  useEffect(() => {
    checkAuth()
  }, [pathname, checkAuth])

  // Check auth state periodically (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(checkAuth, 2000)
    return () => clearInterval(interval)
  }, [checkAuth])

  // Hide the admin access button when already in admin section
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Show loading state briefly
  if (isLoading) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-70">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <div className="flex flex-col gap-2">
          {isLoggedIn ? (
            <>
              <Link 
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-nyansa-accent hover:bg-gray-50 rounded-md transition-colors duration-200"
                title="Admin Dashboard"
              >
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <Link 
                href="/admin/bookings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-nyansa-accent hover:bg-gray-50 rounded-md transition-colors duration-200"
                title="Manage Bookings"
              >
                <Calendar className="w-4 h-4" />
                <span>Bookings</span>
              </Link>
            </>
          ) : (
            <Link 
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-nyansa-accent hover:bg-gray-50 rounded-md transition-colors duration-200"
              title="Admin Login"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 