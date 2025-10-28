import React from 'react'
import {
  DollarSign,
  Users,
  Target,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { ChartAreaRevenue } from '../ui/area-chart-revenue'

function RevenueReports() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$42,500",
      change: "26.8%",
      changeType: "increase",
      icon: "dollarSign",
    },
    {
      title: "Total Subscription",
      value: "1,246",
      change: "12.8%",
      changeType: "increase",
      icon: "users",
    },
    {
      title: "Avg Spend per Premium User",
      value: "$25",
      change: "1.6%",
      changeType: "increase",
      icon: "target",
    },
    {
      title: "Top Region by Revenue",
      value: "USA 40%",
      change: "5.3%",
      changeType: "increase",
      icon: "mapPin",
    },
  ]

  const getIcon = (iconName) => {
    const icons = {
      dollarSign: <DollarSign className="w-4 h-4 text-neutral-400" />,
      users: <Users className="w-4 h-4 text-neutral-400" />,
      target: <Target className="w-4 h-4 text-neutral-400" />,
      mapPin: <MapPin className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };


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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
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

          {/* Revenue Area Chart */}
          <ChartAreaRevenue />
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
          
          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* UPI - 40% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#4480d3" strokeWidth="20" strokeDasharray="100.5 251.2" />
                {/* Cards - 30% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#66a3f8" strokeWidth="20" strokeDasharray="75.4 251.2" strokeDashoffset="-100.5" />
                {/* Net Banking - 20% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#abbcd6" strokeWidth="20" strokeDasharray="50.2 251.2" strokeDashoffset="-175.9" />
                {/* Others - 10% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d597c1" strokeWidth="20" strokeDasharray="25.1 251.2" strokeDashoffset="-226.1" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#4480d3'}}></div>
              <span className="text-sm text-gray-600">UPI</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#66a3f8'}}></div>
              <span className="text-sm text-gray-600">Cards</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#abbcd6'}}></div>
              <span className="text-sm text-gray-600">Net Banking</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#d597c1'}}></div>
              <span className="text-sm text-gray-600">Others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueReports
