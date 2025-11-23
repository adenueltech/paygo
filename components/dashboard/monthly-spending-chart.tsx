"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", spending: 3200 },
  { month: "Feb", spending: 4100 },
  { month: "Mar", spending: 3800 },
  { month: "Apr", spending: 5200 },
  { month: "May", spending: 4800 },
  { month: "Jun", spending: 6100 },
  { month: "Jul", spending: 5500 },
  { month: "Aug", spending: 6700 },
  { month: "Sep", spending: 5900 },
  { month: "Oct", spending: 7200 },
  { month: "Nov", spending: 6500 },
  { month: "Dec", spending: 7800 },
]

export function MonthlySpendingChart() {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Monthly Spending</h3>
          <p className="text-sm text-gray-400">Spending trends over the year</p>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
              formatter={(value) => [`₦${value.toLocaleString()}`, "Spending"]}
            />
            <Line type="monotone" dataKey="spending" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}