'use client'

import { useState, useEffect } from 'react'
import { Calendar, CheckCircle, XCircle, Trash2, RefreshCw } from 'lucide-react'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  purpose: string
  guests: number
  message: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'past'>('all')

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/booking?action=list', {
        headers: {
          'Authorization': 'Bearer admin-token' // In production, use real JWT tokens
        }
      })
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.bookings || [])
      } else {
        console.error('Failed to fetch bookings:', data.error)
        // Fallback to sample data if API fails
        setBookings([
          {
            id: 'BK-1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+233 20 123 4567',
            date: '2024-01-15',
            time: '10:00',
            purpose: 'facility-tour',
            guests: 2,
            message: 'Interested in seeing the STEM lab and training facilities.',
            status: 'confirmed',
            createdAt: '2024-01-10T10:30:00Z'
          },
          {
            id: 'BK-2',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            phone: '+233 24 987 6543',
            date: '2024-01-16',
            time: '14:00',
            purpose: 'program-inquiry',
            guests: 1,
            message: 'Looking to enroll in the tech training program.',
            status: 'confirmed',
            createdAt: '2024-01-11T14:20:00Z'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      // Fallback to sample data
      setBookings([
        {
          id: 'BK-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+233 20 123 4567',
          date: '2024-01-15',
          time: '10:00',
          purpose: 'facility-tour',
          guests: 2,
          message: 'Interested in seeing the STEM lab and training facilities.',
          status: 'confirmed',
          createdAt: '2024-01-10T10:30:00Z'
        },
        {
          id: 'BK-2',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+233 24 987 6543',
          date: '2024-01-16',
          time: '14:00',
          purpose: 'program-inquiry',
          guests: 1,
          message: 'Looking to enroll in the tech training program.',
          status: 'confirmed',
          createdAt: '2024-01-11T14:20:00Z'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const getPurposeLabel = (purpose: string) => {
    const purposes = {
      'facility-tour': 'Facility Tour',
      'program-inquiry': 'Program Inquiry',
      'partnership': 'Partnership Discussion',
      'event-visit': 'Event Visit',
      'other': 'Other'
    }
    return purposes[purpose as keyof typeof purposes] || purpose
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.confirmed
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    switch (filter) {
      case 'today':
        return bookingDate.toDateString() === today.toDateString()
      case 'upcoming':
        return bookingDate > today
      case 'past':
        return bookingDate < today
      default:
        return true
    }
  })

  const handleStatusChange = async (bookingId: string, newStatus: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const response = await fetch('/api/booking', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token' // In production, use real JWT tokens
        },
        body: JSON.stringify({ bookingId, status: newStatus })
      })

      if (response.ok) {
        // Update the booking in the local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        )
      } else {
        console.error('Failed to update booking status')
      }
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/booking?id=${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin-token' // In production, use real JWT tokens
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        setBookings(prev => prev.filter(booking => booking.id !== bookingId))
      } else {
        console.error('Failed to delete booking:', data.error)
        alert('Failed to delete booking. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Failed to delete booking. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 bg-gray-200 rounded w-12 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-nyansa-dark-gray mb-2">
          Manage Bookings
        </h2>
        <p className="text-nyansa-dark-gray/70">
          View and manage facility visit bookings
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        {[
          { key: 'all', label: 'All Bookings' },
          { key: 'today', label: 'Today' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'past', label: 'Past' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as 'all' | 'today' | 'upcoming' | 'past')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === key
                ? 'bg-nyansa-light-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
        
        <button
          onClick={fetchBookings}
          disabled={isLoading}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-nyansa-accent text-white hover:bg-nyansa-accent/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Refresh bookings"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No bookings found</p>
            <p className="text-sm">No bookings match the selected filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Visitor
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(booking.date)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(booking.time)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        {getPurposeLabel(booking.purpose)}
                      </div>
                      {booking.message && (
                        <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                          {booking.message}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.guests} {booking.guests === 1 ? 'person' : 'people'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value as 'confirmed' | 'cancelled' | 'completed')}
                          className="text-xs border border-gray-300 rounded-md px-2 py-1.5 bg-white focus:ring-2 focus:ring-nyansa-light-blue focus:border-transparent"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors duration-200"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-nyansa-dark-gray">{bookings.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Bookings</div>
            </div>
            <div className="w-12 h-12 bg-nyansa-light-blue/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-nyansa-accent" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Confirmed</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Completed</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-600">
                {bookings.filter(b => b.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Cancelled</div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 