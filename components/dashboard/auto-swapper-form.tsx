"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "BTC", label: "BTC" },
  { value: "ETH", label: "ETH" },
  { value: "NGN", label: "NGN" },
]

const triggerTypes = [
  { value: "price", label: "Price Threshold" },
  { value: "time", label: "Time Interval" },
]

export function AutoSwapperForm() {
  const [sourceCurrency, setSourceCurrency] = useState("")
  const [targetCurrency, setTargetCurrency] = useState("")
  const [triggerType, setTriggerType] = useState("")
  const [priceThreshold, setPriceThreshold] = useState("")
  const [priceOperator, setPriceOperator] = useState(">")
  const [timeInterval, setTimeInterval] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      sourceCurrency,
      targetCurrency,
      triggerType,
      priceThreshold: triggerType === "price" ? `${priceOperator}${priceThreshold}` : null,
      timeInterval: triggerType === "time" ? timeInterval : null,
      amount,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="source-currency" className="text-white">Source Currency</Label>
          <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="target-currency" className="text-white">Target Currency</Label>
          <Select value={targetCurrency} onValueChange={setTargetCurrency}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="trigger-type" className="text-white">Trigger Type</Label>
        <Select value={triggerType} onValueChange={setTriggerType}>
          <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select trigger type" />
          </SelectTrigger>
          <SelectContent>
            {triggerTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {triggerType === "price" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price-operator" className="text-white">Operator</Label>
            <Select value={priceOperator} onValueChange={setPriceOperator}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=">">Greater than</SelectItem>
                <SelectItem value="<">Less than</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price-threshold" className="text-white">Threshold Value</Label>
            <Input
              id="price-threshold"
              type="number"
              placeholder="e.g., 50000"
              value={priceThreshold}
              onChange={(e) => setPriceThreshold(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
      )}

      {triggerType === "time" && (
        <div>
          <Label htmlFor="time-interval" className="text-white">Interval (hours)</Label>
          <Input
            id="time-interval"
            type="number"
            placeholder="e.g., 24"
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
      )}

      <div>
        <Label htmlFor="amount" className="text-white">Amount to Swap</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Create Auto Swap
      </Button>
    </form>
  )
}