import BookingManagement from '@/components/BookingManagement'
import Link from 'next/link'
import { ArrowLeft, Calendar, Home } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminBookingsPage() {
  return (
    <ProtectedRoute requiredRole="staff">
      <AdminBookingsContent />
    </ProtectedRoute>
  )
}

function AdminBookingsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-nyansa-accent transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Site</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-nyansa-accent" />
                <h1 className="text-xl font-semibold text-gray-900">Booking Management</h1>
              </div>
            </div>
            <Link 
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-nyansa-accent hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-nyansa-accent transition-colors duration-200">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900">Admin</span>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900">Bookings</span>
            </li>
          </ol>
        </nav>
        
        <BookingManagement />
      </div>
    </div>
  )
} 