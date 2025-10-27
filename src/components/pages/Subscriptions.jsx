import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'
import FilterModal from '../FilterModal'

function Subscriptions() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    paymentType: {
      paid: false,
      unpaid: false
    },
    sortBy: {
      newest: false,
      oldest: false
    },
    currency: {
      inr: false,
      usd: false,
      eur: false
    }
  })

  // Subscription metrics
  const metrics = [
    { label: 'Active Subscriptions', value: '2,310' },
    { label: 'Expired', value: '320' },
    { label: 'Auto Renew Enabled', value: '1,980' },
    { label: 'Monthly recurring revenue', value: '$23,100' }
  ]

  // Subscriptions data
  const subscriptionsData = [
    { id: 1, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' },
    { id: 2, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' },
    { id: 3, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' },
    { id: 4, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' },
    { id: 5, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' },
    { id: 6, user: 'John Doe', payment: 'Paid', amount: '$25', purchasedDate: 'Oct 5, 2025' }
  ]

  const filteredSubscriptions = subscriptionsData.filter(subscription => {
    return subscription.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
           subscription.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
           subscription.amount.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleViewSubscription = (subscriptionId) => {
    console.log('Viewing subscription:', subscriptionId)
    navigate('/subscription-details')
  }

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters)
    setAppliedFilters(filters)
    setShowFilters(false)
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-7xl mx-auto">
              {/* Page Header with Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
                  <p className="text-gray-600 mt-1">
                    Manage active and expired user subscriptions
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
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200" style={{ fontSize: '1.8em' }}>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Purchased Date
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">{subscription.user}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{subscription.payment}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{subscription.amount}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{subscription.purchasedDate}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button
                            onClick={() => handleViewSubscription(subscription.id)}
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
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 01 of 10
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredSubscriptions.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters}
        type="subscriptions"
      />
        </div>
      </div>
    </MainLayout>
  )
}

export default Subscriptions
