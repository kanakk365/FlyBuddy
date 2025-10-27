import React, { useState } from 'react'
import MainLayout from '../common/MainLayout'
import UserReports from '../reports/UserReports'
import BookingsReports from '../reports/BookingsReports'
import ChatsReports from '../reports/ChatsReports'
import RevenueReports from '../reports/RevenueReports'

function Reports() {
  const [activeTab, setActiveTab] = useState('user')
  const [timeFilter, setTimeFilter] = useState('today')

  const tabs = [
    { id: 'user', label: 'User reports' },
    { id: 'booking', label: 'Booking reports' },
    { id: 'chats', label: 'Chats reports' },
    { id: 'revenue', label: 'Revenue reports' }
  ]

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600 mt-1">
                  View insights on user growth, bookings, and chat engagement.
                </p>
              </div>

              {/* Time Filter Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeFilter('today')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeFilter === 'today'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeFilter('total')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeFilter === 'total'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Total
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Report Content based on Active Tab */}
            {activeTab === 'user' && <UserReports />}
            {activeTab === 'booking' && <BookingsReports />}
            {activeTab === 'chats' && <ChatsReports />}
            {activeTab === 'revenue' && <RevenueReports />}
        </div>
      </div>
    </MainLayout>
  )
}

export default Reports
