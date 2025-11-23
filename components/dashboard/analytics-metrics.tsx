"use client"

export function AnalyticsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h4 className="text-sm font-medium text-gray-400">Total Spending</h4>
        <p className="text-2xl font-bold text-white">₦45,230</p>
        <p className="text-xs text-green-400">+12% from last month</p>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h4 className="text-sm font-medium text-gray-400">Services Used</h4>
        <p className="text-2xl font-bold text-white">24</p>
        <p className="text-xs text-blue-400">Active this month</p>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h4 className="text-sm font-medium text-gray-400">Avg. Usage Time</h4>
        <p className="text-2xl font-bold text-white">2.5h</p>
        <p className="text-xs text-purple-400">Per session</p>
      </div>
    </div>
  )
}