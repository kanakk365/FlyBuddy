import React from 'react'

function UserReports() {
  const metrics = [
    { label: 'Total Active Users', value: '1,250', badge: '+24.8%', badgeColor: 'green' },
    { label: 'New Users This Month', value: '320', badge: '+12%', badgeColor: 'pink' },
    { label: 'Premium Conversion Rate', value: '18%', badge: '+0.8%', badgeColor: 'green' },
    { label: 'Average Trips per User', value: '2.4', badge: '+12.8%', badgeColor: 'green' }
  ]

  const topActiveUsers = [
    { name: 'Rohan Mehra', email: 'rohan24@...', joinedOn: 'Oct 6', plan: 'Free' },
    { name: 'Priya Agarwal', email: 'priya989@...', joinedOn: 'Oct 6', plan: 'Premium' }
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
        {/* User Growth Engagement Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth Engagement</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">257</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-600">
                +12.6%
              </span>
            </div>
          </div>
          
          {/* Simple line chart representation */}
          <div className="h-64 flex items-end justify-between space-x-2">
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '40%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '60%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '50%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '80%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '70%'}}></div>
            <div className="flex-1 bg-gradient-to-t from-pink-100 to-transparent rounded-t" style={{height: '65%'}}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan 2</span>
            <span>Jan 9</span>
            <span>Jan 16</span>
            <span>Jan 23</span>
            <span>Jan 31</span>
            <span>Feb 1</span>
          </div>
        </div>

        {/* Free vs Premium Distribution Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Free vs Premium Distribution</h3>
          
          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Premium (pink) - 60% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="20" strokeDasharray="150.8 251.2" />
                {/* Free (blue) - 40% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="100.5 251.2" strokeDashoffset="-150.8" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Free</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Active Users Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Top Active Users</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topActiveUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.joinedOn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.plan}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserReports
