import React from 'react'

function RevenueReports() {
  const metrics = [
    { label: 'Total Revenue', value: '$42,500', badge: '+26.8%', badgeColor: 'green' },
    { label: 'Total Subscription', value: '1,246', badge: '+12.8%', badgeColor: 'pink' },
    { label: 'Avg Spend per Premium User', value: '$25', badge: '+1.6%', badgeColor: 'green' },
    { label: 'Top Region by Revenue', value: 'USA 40%', badge: '+5.3%', badgeColor: 'green' }
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
        {/* Total revenue Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total revenue</h3>
            <select className="text-xs border border-gray-200 rounded px-2 py-1">
              <option>Jan 2024 - Dec 2024</option>
            </select>
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">$240.8K</span>
            <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-600">
              +5.6%
            </span>
          </div>

          {/* Curved Line Chart with gradient */}
          <div className="relative h-80">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
              <span>250K</span>
              <span>200K</span>
              <span>150K</span>
              <span>100K</span>
              <span>50K</span>
              <span>0K</span>
            </div>

            {/* Chart area with padding for y-axis */}
            <div className="ml-8 h-full relative">
              {/* Gradient background area */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#fecaca', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#fecaca', stopOpacity: 0.05}} />
                  </linearGradient>
                </defs>
                {/* Curved line path */}
                <path
                  d="M 0 90 Q 10 85, 15 80 T 25 70 T 35 60 T 45 50 T 55 45 T 65 42 T 75 38 T 85 32 T 100 28"
                  fill="none"
                  stroke="#f472b6"
                  strokeWidth="0.5"
                />
                {/* Fill area under curve */}
                <path
                  d="M 0 90 Q 10 85, 15 80 T 25 70 T 35 60 T 45 50 T 55 45 T 65 42 T 75 38 T 85 32 T 100 28 L 100 100 L 0 100 Z"
                  fill="url(#revenueGradient)"
                />
                {/* Data point at peak */}
                <circle cx="55" cy="45" r="1.5" fill="#1e293b" />
              </svg>

              {/* Tooltip */}
              <div className="absolute top-[42%] left-[52%] bg-pink-200 rounded-lg px-3 py-2 text-xs shadow-lg">
                <div className="font-semibold text-gray-900">$142.8K</div>
                <div className="text-gray-600">Jan 21,2024</div>
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium rounded bg-green-500 text-white">
                  +3.8%
                </span>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="ml-8 flex justify-between text-xs text-gray-500 mt-2">
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
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
          
          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* UPI (blue) - 40% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="100.5 251.2" />
                {/* Cards (light blue) - 30% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#60a5fa" strokeWidth="20" strokeDasharray="75.4 251.2" strokeDashoffset="-100.5" />
                {/* Net Banking (gray) - 20% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" strokeWidth="20" strokeDasharray="50.2 251.2" strokeDashoffset="-175.9" />
                {/* Others (pink) - 10% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="20" strokeDasharray="25.1 251.2" strokeDashoffset="-226.1" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">UPI</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Cards</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Net Banking</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueReports
