import React from 'react'

function BookingsReports() {
  const metrics = [
    { label: 'Total Tickets Uploaded', value: '8,900', badge: '+26.8%', badgeColor: 'green' },
    { label: 'Verified Tickets', value: '6,420', badge: '+12.8%', badgeColor: 'pink' },
    { label: 'Rejected Tickets', value: '762', badge: '+1.6%', badgeColor: 'green' },
    { label: 'Premium Subscribers', value: '2.3K', badge: '+5.3%', badgeColor: 'green' }
  ]

  const popularRoutes = [
    { country: 'Europe', flag: '🇪🇺', travelers: '50 travellers' },
    { country: 'Thailand', flag: '🇹🇭', travelers: '42 travellers' },
    { country: 'United Kingdom', flag: '🇬🇧', travelers: '32 travellers' },
    { country: 'Dubai', flag: '🇦🇪', travelers: '24 travellers' },
    { country: 'Vietnam', flag: '🇻🇳', travelers: '14travellers' },
    { country: 'USA', flag: '🇺🇸', travelers: '12 travellers' }
  ]

  const recentBookings = [
    { ticketId: '#TCK001', user: 'Rohan Mehra', route: 'HYD → DXB', airline: 'Indigo' }
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
        {/* Tickets Pending vs Verified Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tickets Pending vs Verified</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Verified</span>
              </div>
              <select className="text-xs border border-gray-200 rounded px-2 py-1">
                <option>Jan 2024 - Dec 2024</option>
              </select>
            </div>
          </div>
          
          {/* Bar chart representation */}
          <div className="h-64 flex items-end justify-between space-x-1">
            {/* January */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '40%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '30%'}}></div>
            </div>
            {/* February */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '50%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '35%'}}></div>
            </div>
            {/* March */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '65%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '25%'}}></div>
            </div>
            {/* April */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '70%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '45%'}}></div>
            </div>
            {/* May */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '60%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '55%'}}></div>
            </div>
            {/* June */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '80%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '35%'}}></div>
            </div>
            {/* July */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '55%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '20%'}}></div>
            </div>
            {/* August */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '75%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '40%'}}></div>
            </div>
            {/* September */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '45%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '50%'}}></div>
            </div>
            {/* October */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '25%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '15%'}}></div>
            </div>
            {/* November */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '85%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '55%'}}></div>
            </div>
            {/* December */}
            <div className="flex-1 flex flex-col items-center justify-end space-y-1">
              <div className="w-full bg-blue-400 rounded-t" style={{height: '70%'}}></div>
              <div className="w-full bg-pink-300 rounded-t" style={{height: '60%'}}></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Routes</h3>
          
          <div className="space-y-4">
            {popularRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{route.flag}</span>
                  <span className="text-sm font-medium text-gray-900">{route.country}</span>
                </div>
                <span className="text-sm text-gray-600">{route.travelers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Airline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.ticketId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.airline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      View
                    </button>
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

export default BookingsReports
