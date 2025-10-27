import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'
import FilterModal from '../FilterModal'

function Bookings() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    status: {
      verified: false,
      pending: false,
      rejected: false
    },
    sortBy: {
      newest: false,
      oldest: false
    }
  })

  const bookingsData = [
    { id: 1, ticketId: '#TCK001', user: 'Rohan Mehta', route: 'HYD → DXB', airline: 'Indigo', status: 'Verified' },
    { id: 2, ticketId: '#TCK002', user: 'Priya Agarwal', route: 'BOM → DXB', airline: 'Emirates', status: 'Pending' },
    { id: 3, ticketId: '#TCK003', user: 'Sia Sen', route: 'BLR → BKK', airline: 'AirAsia', status: 'Verified' },
    { id: 4, ticketId: '#TCK004', user: 'Lily singh', route: 'HYD → DXB', airline: 'Emirates', status: 'Pending' },
    { id: 5, ticketId: '#TCK005', user: 'Nia Sharma', route: 'BOM → DXB', airline: 'Emirates', status: 'Verified' },
    { id: 6, ticketId: '#TCK006', user: 'Sam Das', route: 'BLR → BKK', airline: 'Emirates', status: 'Rejected' },
    { id: 7, ticketId: '#TCK007', user: 'Mehak S', route: 'BLR → BKK', airline: 'Emirates', status: 'Verified' },
    { id: 8, ticketId: '#TCK008', user: 'Disha shah', route: 'HYD → DXB', airline: 'Emirates', status: 'Pending' }
  ]

  const filteredBookings = bookingsData.filter(booking => {
    // Search filter
    const matchesSearch = booking.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.airline.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter
    const statusFilter = appliedFilters.status.verified || appliedFilters.status.pending || appliedFilters.status.rejected
    const matchesStatus = !statusFilter || 
                         (appliedFilters.status.verified && booking.status === 'Verified') ||
                         (appliedFilters.status.pending && booking.status === 'Pending') ||
                         (appliedFilters.status.rejected && booking.status === 'Rejected')
    
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredBookings.length / 10)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentBookings = filteredBookings.slice(startIndex, endIndex)

  const handleViewBooking = (bookingId) => {
    console.log('Viewing booking:', bookingId)
    navigate('/booking-details')
  }

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const getActiveFiltersCount = () => {
    let count = 0
    Object.values(appliedFilters).forEach(category => {
      Object.values(category).forEach(isActive => {
        if (isActive) count++
      })
    })
    return count
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.1em' }}>
        <div className="max-w-7xl mx-auto">
            {/* Page Header with Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">All Bookings</h1>
                  <p className="text-gray-600 mt-1">
                    Manage all uploaded tickets and their verification status.
                  </p>
                </div>
                
                {/* Search and Filters - Top Right */}
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Filters Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontSize: '1.8em' }}>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Ticket ID</th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">User</th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Route</th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Airline</th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-lg font-semibold text-gray-900">
                          {booking.ticketId}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-lg text-gray-600">
                          {booking.user}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-lg text-gray-600">
                          {booking.route}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-lg text-gray-600">
                          {booking.airline}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-lg">
                          <button
                            onClick={() => handleViewBooking(booking.id)}
                            className="px-4 py-2 bg-blue-200 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} of {filteredBookings.length}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Modal */}
          <FilterModal
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={appliedFilters}
            type="bookings"
          />
        </div>
    </MainLayout>
  )
}

export default Bookings
