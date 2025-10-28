import React from 'react'
import { ChartAreaLinear } from '../ui/area-chart'
import {
  Users,
  UserPlus,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

function UserReports() {
  const metrics = [
    {
      title: "Total Active Users",
      value: "1,250",
      change: "24.8%",
      changeType: "increase",
      icon: "users",
    },
    {
      title: "New Users This Month",
      value: "320",
      change: "12%",
      changeType: "increase",
      icon: "userPlus",
    },
    {
      title: "Premium Conversion Rate",
      value: "18%",
      change: "0.8%",
      changeType: "increase",
      icon: "trendingUp",
    },
    {
      title: "Average Trips per User",
      value: "2.4",
      change: "12.8%",
      changeType: "increase",
      icon: "mapPin",
    },
  ]

  const getIcon = (iconName) => {
    const icons = {
      users: <Users className="w-4 h-4 text-neutral-400" />,
      userPlus: <UserPlus className="w-4 h-4 text-neutral-400" />,
      trendingUp: <TrendingUp className="w-4 h-4 text-neutral-400" />,
      mapPin: <MapPin className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  const topActiveUsers = [
    { name: 'Rohan Mehra', email: 'rohan24@...', joinedOn: 'Oct 6', plan: 'Free' },
    { name: 'Priya Agarwal', email: 'priya989@...', joinedOn: 'Oct 6', plan: 'Premium' }
  ]

  return (
    <div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]"
          >
            <div className="flex items-center mb-4">
              <div className="mr-3">{getIcon(metric.icon)}</div>
              <h3 className="text-xs text-neutral-400">{metric.title}</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-medium text-gray-900 mr-3">
                {metric.value}
              </p>
              <div
                className={`px-2 py-1 rounded text-xs ${
                  metric.changeType === "increase"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
                style={{
                  backgroundColor:
                    metric.changeType === "increase"
                      ? "#05C16833"
                      : "#FEE2E2",
                }}
              >
                <span className="flex items-center">
                  {metric.change}
                  {metric.changeType === "increase" ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Pie Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
        {/* Area Chart */}
        <ChartAreaLinear />

        {/* User Distribution Pie Chart */}
        <div className="bg-white p-6 pr-2 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Distribution
          </h3>
          <div className="h-80 w-full flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Premium (pink) - 60% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d597c1" strokeWidth="20" strokeDasharray="150.8 251.2" />
                {/* Free (blue) - 40% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#abbcd6" strokeWidth="20" strokeDasharray="100.5 251.2" strokeDashoffset="-150.8" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,250</div>
                  <div className="text-xs text-gray-500">Total Users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 pr-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#abbcd6'}}></div>
                <span className="font-medium text-gray-900">Free Users</span>
              </div>
              <span className="text-sm text-gray-500">500 (40%)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#d597c1'}}></div>
                <span className="font-medium text-gray-900">Premium Users</span>
              </div>
              <span className="text-sm text-gray-500">750 (60%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Users Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Active Users
            </h3>
            <button
              className=" py-1.5 text-black px-6 rounded-full text-sm bg-[#B8C8E0]"

            >
              View all
            </button>
          </div>
        </div>
        <div className="overflow-x-auto px-6">
          <table className="w-full">
            <thead className="bg-neutral-100 py-4 rounded-xl">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Joined On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Plan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topActiveUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.plan === "Premium"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.plan}
                    </span>
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
