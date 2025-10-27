import React from 'react'

function ChatsReports() {
  const metrics = [
    { label: 'Total Chats', value: '12,899', badge: '+18.4%', badgeColor: 'green' },
    { label: 'Active Users', value: '1,200', badge: '+12.8%', badgeColor: 'pink' },
    { label: 'Inactive Users', value: '128', badge: '+1.6%', badgeColor: 'green' },
    { label: 'Total Messages Exchanged', value: '78k', badge: '+5.3%', badgeColor: 'green' }
  ]

  return (
    <div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
            <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
            <div className="flex items-center">
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                metric.badgeColor === 'green' ? 'bg-green-100 text-green-600' : 'bg-pink-100 text-pink-600'
              }`}>
                {metric.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Chats started per day Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Chats started per day</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">1,224</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-600">
                +12.6%
              </span>
            </div>
          </div>
          
          {/* Line/Area chart representation */}
          <div className="h-64 flex items-end justify-between space-x-2">
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '30%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '40%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '50%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '65%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '85%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '75%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '70%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-blue-100 to-transparent rounded-t" style={{height: '80%'}}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Active vs Inactive Chat */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active vs Inactive Chat</h3>
          
          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Active (blue) - 70% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="176 251.2" />
                {/* Inactive (pink) - 30% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="20" strokeDasharray="75.4 251.2" strokeDashoffset="-176" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Inactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatsReports
