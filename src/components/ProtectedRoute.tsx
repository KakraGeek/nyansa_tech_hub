'use client'

import { useState, useEffect } from 'react'
import { isAuthenticated, getCurrentUser, logout } from '@/lib/auth'
import AdminLogin from './AdminLogin'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'staff'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ id: string; username: string; role: 'admin' | 'staff' } | null>(null)

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      const currentUser = getCurrentUser()
      
      setIsLoggedIn(authenticated)
      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setUser(getCurrentUser())
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUser(null)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nyansa-accent"></div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  // Check role permissions
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page. Required role: {requiredRole}
          </p>
          <button
            onClick={handleLogout}
            className="bg-nyansa-accent text-white px-4 py-2 rounded-lg hover:bg-nyansa-accent/90 transition-colors duration-200"
          >
            Sign in with different account
          </button>
        </div>
      </div>
    )
  }

  // Render protected content with user info and logout
  return (
    <div>
      {/* User header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-nyansa-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
      
      {/* Protected content */}
      {children}
    </div>
  )
} 