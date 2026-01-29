import React, { useState, useEffect } from "react";
import ChartBookingsBar from "../ui/bar-chart-bookings";
import {
  Ticket,
  CheckCircle,
  XCircle,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { getBookingReports } from "../../api/reports";

function BookingsReports({ startDate, endDate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getBookingReports(startDate, endDate);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch booking reports:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const metrics = [
    {
      title: "Total Tickets Uploaded",
      key: "totalTicketsUploaded",
      icon: "ticket",
    },
    {
      title: "Verified Tickets",
      key: "verifiedTickets",
      icon: "check",
    },
    {
      title: "Rejected Tickets",
      key: "rejectedTickets",
      icon: "x",
    },
    {
      title: "Premium Subscribers",
      key: "premiumSubscribers",
      icon: "crown",
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      ticket: <Ticket className="w-4 h-4 text-neutral-400" />,
      check: <CheckCircle className="w-4 h-4 text-neutral-400" />,
      x: <XCircle className="w-4 h-4 text-neutral-400" />,
      crown: <Crown className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  // Helper for flags (simplified mapping or default)
  const getFlagIcon = () => {
    // A simple heuristic or map could go here, but for now returning a generic placeholder or null
    // to avoid broken images/svgs. The user didn't provide country codes in the API.
    // We could try to map city/country names to codes if we had a library, but let's stick to simple display.
    return (
      <div className="w-6 h-6 bg-gray-200 rounded-sm text-[10px] flex items-center justify-center text-gray-500">
        ?
      </div>
    );
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return null;

  // Transform chart data
  const chartData =
    data.ticketsPendingVsVerified?.months?.map((month, index) => ({
      month,
      pending: data.ticketsPendingVsVerified.pending[index] || 0,
      verified: data.ticketsPendingVsVerified.verified[index] || 0,
    })) || [];

  return (
    <div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => {
          const metricData = data.metrics[metric.key] || {
            value: 0,
            change: 0,
            isIncrease: true,
          };
          return (
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
                  {metricData.value}
                </p>
                <div
                  className={`px-2 py-1 rounded text-xs ${
                    metricData.isIncrease ? "text-green-500" : "text-red-500"
                  }`}
                  style={{
                    backgroundColor: metricData.isIncrease
                      ? "#05C16833"
                      : "#FEE2E2",
                  }}
                >
                  <span className="flex items-center">
                    {metricData.change}%
                    {metricData.isIncrease ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Routes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
        {/* Bar Chart */}
        <ChartBookingsBar data={chartData} />

        {/* Popular Routes */}
        <div className="bg-white p-6 pr-2 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] ">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Routes
          </h3>
          <div className=" h-80 w-full overflow-y-auto overflow-x-hidden scrollbar-thin ">
            <div className="space-y-0 pr-4">
              {data.popularRoutes?.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {getFlagIcon(route.destination)}
                    </div>
                    <span className="font-medium text-gray-900">
                      {route.destination}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {route.travellers} travellers
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
            <button className=" py-1.5 text-black px-6 rounded-full text-sm bg-[#B8C8E0]">
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
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Airline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentBookings?.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.ticketId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.airline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      {booking.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingsReports;
