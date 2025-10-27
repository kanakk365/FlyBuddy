"use client"

import React from "react"
import { ArrowUpRight, Calendar, ChevronDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const description = "A linear area chart"

const chartData = [
  { day: "Jan 1", value: 0 },
  { day: "Jan 4", value: 90 },
  { day: "Jan 8", value: 60 },
  { day: "Jan 12", value: 140 },
  { day: "Jan 16", value: 140 },
  { day: "Jan 20", value: 280 },
  { day: "Jan 24", value: 280 },
  { day: "Jan 27", value: 150 },
  { day: "Jan 31", value: 200 },
  { day: "Feb 1", value: 440 },
]

export function ChartAreaLinear() {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] border border-[#e5e7eb] p-8 w-full">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-slate-900">User Growth Engagement</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-slate-900 leading-none">257</span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#dcfce7] px-2.5 py-1 text-[11px] font-semibold text-[#16a34a]">
              16.8%
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
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
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
              stroke="#EC4899"
              strokeWidth={1.5}
              fill="url(#growthGradient)"
              dot={false}
              activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}