"use client"

import React from "react"
import { Calendar, ChevronDown } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const bookingsData = [
  { month: "Jan", pending: 19000, verified: 10000 },
  { month: "Feb", pending: 29000, verified: 17000 },
  { month: "Mar", pending: 37000, verified: 27000 },
  { month: "Apr", pending: 43000, verified: 32000 },
  { month: "May", pending: 31000, verified: 28000 },
  { month: "Jun", pending: 50000, verified: 21000 },
  { month: "Jul", pending: 18000, verified: 13000 },
  { month: "Aug", pending: 42000, verified: 27000 },
  { month: "Sep", pending: 24000, verified: 15000 },
  { month: "Oct", pending: 10000, verified: 5000 },
  { month: "Nov", pending: 35000, verified: 12000 },
  { month: "Dec", pending: 27000, verified: 19000 }
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
        <div className="mt-1 space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{backgroundColor: '#abbcd6'}} />
            Pending: {payload[0]?.value?.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{backgroundColor: '#d597c1'}} />
            Verified: {payload[1]?.value?.toLocaleString()}
          </div>
        </div>
    </div>
  )
}

const tickFormatter = (value) => `${Math.round(value / 1000)}K`

export function ChartBookingsBar() {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] border border-[#e5e7eb] p-8 w-full">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-900">Tickets Pending vs Verified</h3>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-400" />
          Jan 2024 - Dec 2024
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <div className="flex justify-center mt-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 rounded-full" style={{backgroundColor: '#abbcd6'}} />
              Pending
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 rounded-full" style={{backgroundColor: '#d597c1'}} />
              Verified
            </div>
          </div>
      </div>

      <div className="mt-8 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bookingsData}
            barGap={0}
            barCategoryGap="20%"
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#f4f4f5" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tickMargin={12}
              fontSize={12}
              stroke="#64748b"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              stroke="#64748b"
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              domain={[0, 100000]}
              tickFormatter={tickFormatter}
            />
            <Tooltip cursor={{ fill: "rgba(148, 163, 184, 0.1)" }} content={<CustomTooltip />} />
            <Bar dataKey="pending" fill="#abbcd6" radius={[6, 6, 0, 0]} maxBarSize={15} />
            <Bar dataKey="verified" fill="#d597c1" radius={[6, 6, 0, 0]} maxBarSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartBookingsBar

