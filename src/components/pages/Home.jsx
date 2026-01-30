import React, { useState } from "react";
import MainLayout from "../common/MainLayout";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Ticket,
  Calendar,
  Star,
} from "lucide-react";
import { ChartAreaLinear } from "../ui/area-chart";

import { getDashboardData } from "../../api/reports";
import { format } from "date-fns";
import { useEffect } from "react";

function Home() {
  const [currentView, setCurrentView] = useState("today");

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Map 'total' view to API's expected filter if needed,
        // assuming API accepts 'today' and 'total' (or maybe 'all'? user request used 'total')
        const data = await getDashboardData(currentView);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentView]);

  if (loading || !dashboardData) {
    return (
      <MainLayout>
        <div className="p-6 bg-[#f6f6f6] h-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  const {
    kpis,
    userGrowthEngagement,
    popularRoutes: apiPopularRoutes,
    newUsers: apiNewUsers,
  } = dashboardData;

  const metricsData = [
    {
      title: "Total users",
      value: kpis?.totalUsers?.value || 0,
      change: `${kpis?.totalUsers?.change || 0}%`,
      changeType: kpis?.totalUsers?.isIncrease ? "increase" : "decrease",
      icon: "users",
    },
    {
      title: "Tickets Uploaded",
      value: kpis?.ticketsUploaded?.value || 0,
      change: `${kpis?.ticketsUploaded?.change || 0}%`,
      changeType: kpis?.ticketsUploaded?.isIncrease ? "increase" : "decrease",
      icon: "ticket",
    },
    {
      title: "Airport Upload - No. of Users",
      value: kpis?.airportUploadUsers?.value || 0,
      change: `${kpis?.airportUploadUsers?.change || 0}%`,
      changeType: kpis?.airportUploadUsers?.isIncrease
        ? "increase"
        : "decrease",
      icon: "calendar",
    },
    {
      title: "Premium Subscribers",
      value: kpis?.premiumSubscribers?.value || 0,
      change: `${kpis?.premiumSubscribers?.change || 0}%`,
      changeType: kpis?.premiumSubscribers?.isIncrease
        ? "increase"
        : "decrease",
      icon: "star",
    },
  ];

  const chartData =
    userGrowthEngagement?.chartData?.map((item) => ({
      day: format(new Date(item.date), "MMM d"),
      value: item.value,
    })) || [];

  const popularRoutes =
    apiPopularRoutes?.map((route) => ({
      country: route.destination,
      flag: "us", // Default flag as API doesn't return country code. In real app, we might need a mapping or backend change.
      travelers: `${route.travellers} travellers`,
    })) || [];

  const newUsers =
    apiNewUsers?.map((user) => ({
      name: user.name,
      email: user.email,
      joined: format(new Date(user.joinedOn), "MMM d"),
      plan: user.plan,
    })) || [];

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
    };
    return flags[countryCode] || null;
  };

  const getIcon = (iconName) => {
    const icons = {
      users: <Users className="w-4 h-4 text-neutral-400" />,
      ticket: <Ticket className="w-4 h-4 text-neutral-400" />,
      calendar: <Calendar className="w-4 h-4 text-neutral-400" />,
      star: <Star className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  return (
    <MainLayout>
      <div className="p-6 bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex bg-gray-100 rounded-full  border border-gray-200  ">
              <button
                onClick={() => setCurrentView("today")}
                className={`py-1 rounded-full text-sm font-semibold transition-colors px-10 ${
                  currentView === "today"
                    ? "text-gray-900 bg-[#acbed7]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setCurrentView("total")}
                className={`px-10 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentView === "total"
                    ? "text-gray-900 bg-[#acbed7]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Total
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
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

          {/* Charts and Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
            {/* Area Chart */}
            <ChartAreaLinear data={chartData} />

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

          {/* New Users Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  New Users
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
                  {newUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joined}
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
      </div>
    </MainLayout>
  );
}

export default Home;
