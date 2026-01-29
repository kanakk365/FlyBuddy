"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const description = "A revenue area chart";

const revenueData = [
  { month: "Jan", revenue: 180000 },
  { month: "Feb", revenue: 195000 },
  { month: "Mar", revenue: 210000 },
  { month: "Apr", revenue: 225000 },
  { month: "May", revenue: 240000 },
  { month: "Jun", revenue: 235000 },
  { month: "Jul", revenue: 250000 },
  { month: "Aug", revenue: 265000 },
  { month: "Sep", revenue: 280000 },
  { month: "Oct", revenue: 290000 },
  { month: "Nov", revenue: 305000 },
  { month: "Dec", revenue: 320000 },
];

export function ChartAreaRevenue({ data }) {
  const chartData = data || revenueData;
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f4f4f5"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={10}
            stroke="#a1a1aa"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={10}
            stroke="#a1a1aa"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div
                    style={{
                      backgroundColor: "#f472b6",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "12px",
                      padding: "8px 12px",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {`${label} Revenue`}
                    </p>
                    <p style={{ margin: 0 }}>
                      {`$${payload[0].value.toLocaleString()}`}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="basis"
            dataKey="revenue"
            stroke="#f472b6"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
