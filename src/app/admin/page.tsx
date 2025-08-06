import Link from 'next/link'
import { Calendar, Users, Settings, BarChart3, ArrowRight } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
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
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Site</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-nyansa-accent" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <Link 
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-nyansa-accent hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
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
          </ol>
        </nav>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Panel</h2>
          <p className="text-gray-600 mb-6">
                Welcome to the Nyansa Tech Hub admin dashboard. Here you can manage bookings, view analytics, and oversee all aspects of the tech hub&apos;s operations.
              </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bookings Management */}
          <Link 
            href="/admin/bookings"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-nyansa-light-blue/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-nyansa-accent" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-nyansa-accent transition-colors duration-200" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Management</h3>
            <p className="text-gray-600 text-sm">View and manage facility visit bookings, update status, and track appointments.</p>
          </Link>

          {/* User Management (Future) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600 text-sm">Manage user accounts and permissions. (Coming Soon)</p>
          </div>

          {/* Analytics (Future) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">View detailed analytics and reports. (Coming Soon)</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today&apos;s Visits</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 