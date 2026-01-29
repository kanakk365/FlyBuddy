import React, { useState, useEffect } from "react";
import { ChartAreaLinear } from "../ui/area-chart";
import {
  Users,
  UserPlus,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { getUserReports } from "../../api/reports";

function UserReports({ period }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUserReports(period);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch user reports:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  const metrics = [
    {
      title: "Total Active Users",
      key: "totalActiveUsers",
      icon: "users",
    },
    {
      title: "New Users This Month",
      key: "newUsersThisMonth",
      icon: "userPlus",
    },
    {
      title: "Premium Conversion Rate",
      key: "premiumConversionRate",
      icon: "trendingUp",
    },
    {
      title: "Average Trips per User",
      key: "avgTripsPerUser",
      icon: "mapPin",
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      users: <Users className="w-4 h-4 text-neutral-400" />,
      userPlus: <UserPlus className="w-4 h-4 text-neutral-400" />,
      trendingUp: <TrendingUp className="w-4 h-4 text-neutral-400" />,
      mapPin: <MapPin className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return null;

  // Pie Chart Calculations
  const totalUsers = data.freeVsPremiumDistribution?.total || 1;
  const freeUsers = data.freeVsPremiumDistribution?.free || 0;
  const premiumUsers = data.freeVsPremiumDistribution?.premium || 0;

  const circumference = 2 * Math.PI * 40; // 251.2
  const freeDash = (freeUsers / totalUsers) * circumference;
  const premiumDash = (premiumUsers / totalUsers) * circumference; // Not really needed if we just fill the rest, but good for dasharray

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

      {/* Charts and Pie Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
        {/* Area Chart */}
        <ChartAreaLinear data={data.userGrowthEngagement} />

        {/* User Distribution Pie Chart */}
        <div className="bg-white p-6 pr-2 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Distribution
          </h3>
          <div className="h-80 w-full flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Free (blue) - Base Layer or Segment 1 */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#abbcd6"
                  strokeWidth="20"
                  strokeDasharray={`${freeDash} ${circumference}`}
                />
                {/* Premium (pink) - Segment 2, offset by Free */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#d597c1"
                  strokeWidth="20"
                  strokeDasharray={`${premiumDash} ${circumference}`}
                  strokeDashoffset={-freeDash}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {totalUsers}
                  </div>
                  <div className="text-xs text-gray-500">Total Users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 pr-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: "#abbcd6" }}
                ></div>
                <span className="font-medium text-gray-900">Free Users</span>
              </div>
              <span className="text-sm text-gray-500">
                {freeUsers} ({((freeUsers / totalUsers) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: "#d597c1" }}
                ></div>
                <span className="font-medium text-gray-900">Premium Users</span>
              </div>
              <span className="text-sm text-gray-500">
                {premiumUsers} ({((premiumUsers / totalUsers) * 100).toFixed(0)}
                %)
              </span>
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
              {data.topActiveUsers?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinedOn).toLocaleDateString()}
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
  );
}

export default UserReports;
