import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Target,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { ChartAreaRevenue } from "../ui/area-chart-revenue";
import { getRevenueReports } from "../../api/reports";

function RevenueReports({ period }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getRevenueReports(period);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch revenue reports:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  const metrics = [
    {
      title: "Total Revenue",
      key: "totalRevenue",
      icon: "dollarSign",
      prefix: "$",
    },
    {
      title: "Total Subscription",
      key: "totalSubscription",
      icon: "users",
    },
    {
      title: "Avg Spend per Premium User",
      key: "avgSpendPerPremiumUser",
      icon: "target",
      prefix: "$",
    },
    {
      title: "Top Region by Revenue",
      key: "topRegionByRevenue",
      icon: "mapPin",
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      dollarSign: <DollarSign className="w-4 h-4 text-neutral-400" />,
      users: <Users className="w-4 h-4 text-neutral-400" />,
      target: <Target className="w-4 h-4 text-neutral-400" />,
      mapPin: <MapPin className="w-4 h-4 text-neutral-400" />,
    };
    return icons[iconName] || null;
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return null;

  // Chart Data
  const chartData =
    data.totalRevenueLineGraph?.map((item) => ({
      month: item.month,
      revenue: item.value,
    })) || [];

  // Pie Chart Calculations
  const paymentMethods = data.paymentMethodDistribution || {
    upi: 0,
    cards: 0,
    netBanking: 0,
    others: 0,
  };
  const totalPayments =
    Object.values(paymentMethods).reduce((a, b) => a + Number(b), 0) || 1; // avoid div by 0

  const circumference = 2 * Math.PI * 40; // 251.2

  const getStrokeDash = (value) => (value / totalPayments) * circumference;

  const upiDash = getStrokeDash(paymentMethods.upi);
  const cardsDash = getStrokeDash(paymentMethods.cards);
  const netBankingDash = getStrokeDash(paymentMethods.netBanking);
  const othersDash = getStrokeDash(paymentMethods.others);

  // Calculate offsets (cumulative)
  const cardsOffset = -upiDash;
  const netBankingOffset = -(upiDash + cardsDash);
  const othersOffset = -(upiDash + cardsDash + netBankingDash);

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

          let displayValue = metricData.value;
          if (
            metric.key === "topRegionByRevenue" &&
            typeof metricData.value === "string" &&
            metricData.percentage
          ) {
            // Handle if it comes as object or specific format, assuming API sends value as string "Doha" and percentage as number
            // But based on response example: "topRegionByRevenue": { "value": "Doha", "percentage": 40 }
            // Wait, if value is "Doha" and percentage is 40.
            displayValue = `${metricData.value} ${metricData.percentage}%`;
          } else if (metric.prefix && typeof metricData.value === "number") {
            displayValue = `${metric.prefix}${metricData.value.toLocaleString()}`;
          }

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
                  {displayValue}
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[69%_29%] gap-6 mb-8">
        {/* Total revenue Chart */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Total revenue
            </h3>
            <select className="text-xs border border-gray-200 rounded px-2 py-1">
              <option>Jan 2024 - Dec 2024</option>
            </select>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${data.metrics?.totalRevenue?.value?.toLocaleString() || 0}
            </span>
            <span
              className={`ml-2 px-2 py-1 text-xs font-medium rounded ${data.metrics?.totalRevenue?.isIncrease ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              {data.metrics?.totalRevenue?.isIncrease ? "+" : "-"}
              {data.metrics?.totalRevenue?.change}%
            </span>
          </div>

          {/* Revenue Area Chart */}
          <ChartAreaRevenue data={chartData} />
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Method Distribution
          </h3>

          {/* Donut chart representation */}
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* UPI - Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4480d3"
                  strokeWidth="20"
                  strokeDasharray={`${upiDash} ${circumference}`}
                />

                {/* Cards - Light Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#66a3f8"
                  strokeWidth="20"
                  strokeDasharray={`${cardsDash} ${circumference}`}
                  strokeDashoffset={cardsOffset}
                />

                {/* Net Banking - Grey Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#abbcd6"
                  strokeWidth="20"
                  strokeDasharray={`${netBankingDash} ${circumference}`}
                  strokeDashoffset={netBankingOffset}
                />

                {/* Others - Pink */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#d597c1"
                  strokeWidth="20"
                  strokeDasharray={`${othersDash} ${circumference}`}
                  strokeDashoffset={othersOffset}
                />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#4480d3" }}
                ></div>
                <span className="text-sm text-gray-600">UPI</span>
              </div>
              <span className="text-sm font-medium">{paymentMethods.upi}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#66a3f8" }}
                ></div>
                <span className="text-sm text-gray-600">Cards</span>
              </div>
              <span className="text-sm font-medium">
                {paymentMethods.cards}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#abbcd6" }}
                ></div>
                <span className="text-sm text-gray-600">Net Banking</span>
              </div>
              <span className="text-sm font-medium">
                {paymentMethods.netBanking}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#d597c1" }}
                ></div>
                <span className="text-sm text-gray-600">Others</span>
              </div>
              <span className="text-sm font-medium">
                {paymentMethods.others}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueReports;
