"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { service: "Netflix", usage: 45 },
  { service: "Spotify", usage: 38 },
  { service: "Zoom", usage: 32 },
  { service: "AWS", usage: 28 },
  { service: "GitHub", usage: 22 },
]

export function TopServicesChart() {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Top Services Used</h3>
          <p className="text-sm text-gray-400">Most used services this month</p>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              dataKey="service"
              type="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
              formatter={(value) => [`${value} hours`, "Usage"]}
            />
            <Bar dataKey="usage" fill="#10b981" radius={[0, 4, 4, 0]} className="fill-green-500" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}