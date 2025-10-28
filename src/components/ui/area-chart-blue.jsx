"use client"

import React from "react"
import { ArrowUpRight, Calendar, ChevronDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const description = "A linear area chart with blue theme"

const chartData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 150 },
  { day: "Thu", value: 100 },
  { day: "Fri", value: 250 },
  { day: "Sat", value: 200 },
  { day: "Sun", value: 290 },
]

export function ChartAreaLinearBlue() {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] border border-[#e5e7eb] p-8 w-full">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-slate-900">Chat Activity Trends</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-slate-900 leading-none">1,224</span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#dbeafe] px-2.5 py-1 text-[11px] font-semibold text-[#2563eb]">
              12.6%
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <button className="flex items-end justify-end gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-400" />
          Jan 2024
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <div className="mt-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="chatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f4f4f5" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              stroke="#a1a1aa"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 150, 250, 400]}
              fontSize={10}
              stroke="#a1a1aa"
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={1.5}
              fill="url(#chatGradient)"
              dot={false}
              activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
