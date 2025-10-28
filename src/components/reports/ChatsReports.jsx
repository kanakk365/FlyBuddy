import React from 'react'
import { ChartAreaLinearBlue } from '../ui/area-chart-blue'
import {
  MessageSquare,
  Users,
  UserX,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

function ChatsReports() {
  const metrics = [
    {
      title: "Total Chats",
      value: "12,899",
      change: "18.4%",
      changeType: "increase",
      icon: "messageSquare",
    },
    {
      title: "Active Users",
      value: "1,200",
      change: "12.8%",
      changeType: "increase",
      icon: "users",
    },
    {
      title: "Inactive Users",
      value: "128",
      change: "1.6%",
      changeType: "increase",
      icon: "userX",
    },
    {
      title: "Total Messages Exchanged",
      value: "78k",
      change: "5.3%",
      changeType: "increase",
      icon: "messageCircle",
    },
  ]

  const getIcon = (iconName) => {
    const icons = {
      messageSquare: <MessageSquare className="w-4 h-4 text-neutral-400" />,
      users: <Users className="w-4 h-4 text-neutral-400" />,
      userX: <UserX className="w-4 h-4 text-neutral-400" />,
      messageCircle: <MessageCircle className="w-4 h-4 text-neutral-400" />,
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
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-6">
        {/* Chat Activity Trends Chart */}
        <ChartAreaLinearBlue />

        {/* Active vs Inactive Chat */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active vs Inactive Chat</h3>
          
          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Active (blue) - 70% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#abbcd6" strokeWidth="20" strokeDasharray="176 251.2" />
                {/* Inactive (pink) - 30% */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d597c1" strokeWidth="20" strokeDasharray="75.4 251.2" strokeDashoffset="-176" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#abbcd6'}}></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#d597c1'}}></div>
              <span className="text-sm text-gray-600">Inactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatsReports
