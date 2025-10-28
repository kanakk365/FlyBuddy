import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'
import FilterModal from '../FilterModal'

function Users() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    plan: {
      premium: false,
      free: false
    },
    sortBy: {
      newest: false,
      oldest: false
    }
  })

  const usersData = [
    { id: 1, name: 'Rohan Mehta', email: 'rohan24@...', joined: 'Oct 6', plan: 'Premium', joinDate: new Date('2024-10-06') },
    { id: 2, name: 'Rohan Mehta', email: 'rohan24@...', joined: 'Oct 6', plan: 'Free', joinDate: new Date('2024-10-06') },
    { id: 3, name: 'Sia Sharma', email: 'Sia14@...', joined: 'Oct 5', plan: 'Free', joinDate: new Date('2024-10-05') },
    { id: 4, name: 'Lily Singh', email: 'lily12@...', joined: 'Oct 5', plan: 'Premium', joinDate: new Date('2024-10-05') },
    { id: 5, name: 'Nia Verma', email: 'Nia21@...', joined: 'Oct 4', plan: 'Premium', joinDate: new Date('2024-10-04') },
    { id: 6, name: 'Sen Das', email: 'Das23@...', joined: 'Oct 4', plan: 'Premium', joinDate: new Date('2024-10-04') },
    { id: 7, name: 'Mira Shah', email: 'MShah@...', joined: 'Oct 3', plan: 'Free', joinDate: new Date('2024-10-03') },
    { id: 8, name: 'Disha A.', email: 'Disha23@...', joined: 'Oct 2', plan: 'Premium', joinDate: new Date('2024-10-02') }
  ]

  const filteredUsers = usersData.filter(user => {
    // Search filter
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Plan filter
    const planFilter = appliedFilters.plan.premium || appliedFilters.plan.free
    const matchesPlan = !planFilter || 
                       (appliedFilters.plan.premium && user.plan === 'Premium') ||
                       (appliedFilters.plan.free && user.plan === 'Free')
    
    return matchesSearch && matchesPlan
  }).sort((a, b) => {
    // Sort filter
    if (appliedFilters.sortBy.newest) {
      return b.joinDate - a.joinDate
    } else if (appliedFilters.sortBy.oldest) {
      return a.joinDate - b.joinDate
    }
    return 0
  })

  const totalPages = Math.ceil(filteredUsers.length / 10)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  const handleViewUser = (userId) => {
    console.log('Viewing user:', userId)
    navigate('/user-details')
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
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.12em' }}>
        <div className="max-w-7xl mx-auto">
            {/* Page Header with Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-gray-900">All Users</h1>
                  <p className="text-gray-600 mt-1">
                    Manage all registered users, their plans, and uploaded tickets.
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
                      className="w-64 pl-10 pr-4 py-1.5 border border-neutral-300 focus:outline-neutral-300 rounded-lg  focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Filters Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
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

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Joined On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user, index) => (
                      <tr key={user.id} className={`hover:bg-gray-50 ${index === 0 ? 'pt-4' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {user.joined}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {user.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleViewUser(user.id)}
                            className="px-8 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer "
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
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} of {filteredUsers.length}
                </div>
                <div className="flex items-center  divide-x divide-neutral-500">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-l-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-r-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
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
          />
        </div>
    </MainLayout>
  )
}

export default Users
