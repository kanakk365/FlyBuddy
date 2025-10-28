import React from 'react'
import ChartBookingsBar from '../ui/bar-chart-bookings'
import {
  Ticket,
  CheckCircle,
  XCircle,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

function BookingsReports() {
  const metrics = [
    {
      title: "Total Tickets Uploaded",
      value: "8,900",
      change: "26.8%",
      changeType: "increase",
      icon: "ticket",
    },
    {
      title: "Verified Tickets",
      value: "6,420",
      change: "12.8%",
      changeType: "increase",
      icon: "check",
    },
    {
      title: "Rejected Tickets",
      value: "762",
      change: "1.6%",
      changeType: "increase",
      icon: "x",
    },
    {
      title: "Premium Subscribers",
      value: "2.3K",
      change: "5.3%",
      changeType: "increase",
      icon: "crown",
    },
  ]

  const getIcon = (iconName) => {
    const icons = {
      ticket: <Ticket className="w-4 h-4 text-neutral-400" />,
      check: <CheckCircle className="w-4 h-4 text-neutral-400" />,
      x: <XCircle className="w-4 h-4 text-neutral-400" />,
      crown: <Crown className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  const popularRoutes = [
    { country: "Europe", flag: "eu", travelers: "50 travellers" },
    { country: "Thailand", flag: "th", travelers: "42 travellers" },
    { country: "United Kingdom", flag: "gb", travelers: "32 travellers" },
    { country: "Dubai", flag: "ae", travelers: "24 travellers" },
    { country: "Vietnam", flag: "vn", travelers: "14 travellers" },
    { country: "USA", flag: "us", travelers: "12 travellers" },
    { country: "France", flag: "fr", travelers: "28 travellers" },
    { country: "Germany", flag: "de", travelers: "22 travellers" },
    { country: "Japan", flag: "jp", travelers: "18 travellers" },
    { country: "Australia", flag: "au", travelers: "15 travellers" }
  ]

  const getFlagIcon = (countryCode) => {
    const flags = {
      ae: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#00732F" />
          <rect width="24" height="5.33" fill="#FFFFFF" />
          <rect y="10.67" width="24" height="5.33" fill="#000000" />
          <rect x="0" y="0" width="6" height="16" fill="#FF0000" />
        </svg>
      ),
      gb: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2" />
        </svg>
      ),
      us: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#B22234" />
          <rect width="24" height="1.23" fill="#FFFFFF" />
          <rect y="2.46" width="24" height="1.23" fill="#FFFFFF" />
          <rect y="4.92" width="24" height="1.23" fill="#FFFFFF" />
          <rect y="7.38" width="24" height="1.23" fill="#FFFFFF" />
          <rect y="9.84" width="24" height="1.23" fill="#FFFFFF" />
          <rect y="12.3" width="24" height="1.23" fill="#FFFFFF" />
          <rect y="14.77" width="24" height="1.23" fill="#FFFFFF" />
          <rect width="9.6" height="8.62" fill="#3C3B6E" />
        </svg>
      ),
      fr: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#ED2939" />
        </svg>
      ),
      de: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="5.33" fill="#000000" />
          <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      ),
      jp: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="3" fill="#BC002D" />
        </svg>
      ),
      au: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#00008B" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="0.5" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="0.5" />
        </svg>
      ),
      ca: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#FF0000" />
          <rect width="24" height="8" fill="#FFFFFF" />
          <rect y="8" width="24" height="8" fill="#FF0000" />
        </svg>
      ),
      it: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="8" height="16" fill="#009246" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#CE2B37" />
        </svg>
      ),
      es: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="3" fill="#C60B1E" />
          <rect y="3" width="24" height="10" fill="#FFC400" />
          <rect y="13" width="24" height="3" fill="#C60B1E" />
        </svg>
      ),
      sg: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="8" fill="#ED2939" />
          <rect y="8" width="24" height="8" fill="#FFFFFF" />
        </svg>
      ),
      th: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="2.67" fill="#ED1C24" />
          <rect y="2.67" width="24" height="2.67" fill="#FFFFFF" />
          <rect y="5.34" width="24" height="5.32" fill="#241D4F" />
          <rect y="10.66" width="24" height="2.67" fill="#FFFFFF" />
          <rect y="13.33" width="24" height="2.67" fill="#ED1C24" />
        </svg>
      ),
      vn: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#DA0011" />
          <polygon points="12,2 14,6 18,6 15,9 16,13 12,11 8,13 9,9 6,6 10,6" fill="#FFFF00" />
        </svg>
      ),
      eu: (
        <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
          <rect width="24" height="16" fill="#003399" />
          <circle cx="12" cy="8" r="2" fill="#FFFF00" />
          <circle cx="12" cy="8" r="6" fill="none" stroke="#FFFF00" strokeWidth="1" />
          <circle cx="12" cy="8" r="8" fill="none" stroke="#FFFF00" strokeWidth="1" />
          <circle cx="12" cy="8" r="10" fill="none" stroke="#FFFF00" strokeWidth="1" />
          <circle cx="12" cy="8" r="12" fill="none" stroke="#FFFF00" strokeWidth="1" />
        </svg>
      ),
    };
    return flags[countryCode] || null;
  };

  const recentBookings = [
    {
      name: "Rohan Mehra",
      email: "rohan24@...",
      route: "HYD → DXB",
      airline: "Indigo",
      status: "Verified"
    },
    {
      name: "Priya Agarwal",
      email: "priya989@...",
      route: "DEL → SIN",
      airline: "Singapore Airlines",
      status: "Pending"
    },
    {
      name: "Sneha Iyer",
      email: "sneha@...",
      route: "BOM → LHR",
      airline: "British Airways",
      status: "Verified"
    }
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

      {/* Charts and Routes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
        {/* Bar Chart */}
        <ChartBookingsBar />

        {/* Popular Routes */}
        <div className="bg-white p-6 pr-2 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] ">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Routes
          </h3>
          <div className=" h-80 w-full overflow-y-auto overflow-x-hidden scrollbar-thin ">
            <div className="space-y-0 pr-4">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {getFlagIcon(route.flag)}
                    </div>
                    <span className="font-medium text-gray-900">
                      {route.country}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {route.travelers}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Bookings
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
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Airline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.airline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
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

export default BookingsReports
