"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Pause, Play, Trash2 } from "lucide-react"

interface Swap {
  id: string
  sourceCurrency: string
  targetCurrency: string
  trigger: string
  amount: number
  status: "active" | "paused"
}

// Mock data
const mockSwaps: Swap[] = [
  {
    id: "1",
    sourceCurrency: "BTC",
    targetCurrency: "USD",
    trigger: "Price > 50000",
    amount: 0.1,
    status: "active",
  },
  {
    id: "2",
    sourceCurrency: "ETH",
    targetCurrency: "EUR",
    trigger: "Every 24 hours",
    amount: 1,
    status: "active",
  },
  {
    id: "3",
    sourceCurrency: "USD",
    targetCurrency: "NGN",
    trigger: "Price < 400",
    amount: 100,
    status: "paused",
  },
]

export function ActiveSwapsList() {
  const [swaps, setSwaps] = useState<Swap[]>(mockSwaps)

  const handlePause = (id: string) => {
    setSwaps(swaps.map(swap =>
      swap.id === id ? { ...swap, status: swap.status === "active" ? "paused" : "active" } : swap
    ))
  }

  const handleDelete = (id: string) => {
    setSwaps(swaps.filter(swap => swap.id !== id))
  }

  const handleEdit = (id: string) => {
    // Placeholder for edit functionality
    console.log("Edit swap", id)
  }

  if (swaps.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No active auto swaps found.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {swaps.map((swap) => (
        <div
          key={swap.id}
          className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-medium">
                {swap.sourceCurrency} → {swap.targetCurrency}
              </span>
              <Badge variant={swap.status === "active" ? "default" : "secondary"}>
                {swap.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-400">
              Trigger: {swap.trigger} | Amount: {swap.amount} {swap.sourceCurrency}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(swap.id)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePause(swap.id)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              {swap.status === "active" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDelete(swap.id)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}