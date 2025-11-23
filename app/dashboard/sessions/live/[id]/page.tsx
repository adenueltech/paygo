"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Share2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function LiveSessionPage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [duration, setDuration] = useState(0)
  const [cost, setCost] = useState(0)
  const [showLowBalance, setShowLowBalance] = useState(false)
  const router = useRouter()

  // Simulate timer and cost calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1)
      setCost((prev) => prev + 8.33) // ~500 NGN per min

      // Simulate low balance alert after 10 seconds for demo
      if (duration === 10) setShowLowBalance(true)
    }, 1000)

    return () => clearInterval(timer)
  }, [duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-black rounded-2xl overflow-hidden relative">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 text-white border border-white/10">
            <p className="text-xs text-gray-400">Session Cost</p>
            <p className="font-mono font-bold text-lg">₦{Math.floor(cost).toLocaleString()}</p>
          </div>
          <div className="bg-red-500/20 backdrop-blur-md rounded-lg px-4 py-2 text-red-400 border border-red-500/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono font-bold">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 text-white border border-white/10 text-right">
          <p className="text-xs text-gray-400">Remaining Balance</p>
          <p className={`font-mono font-bold text-lg ${showLowBalance ? "text-red-400" : "text-green-400"}`}>
            ₦{Math.max(5000 - cost, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Main Video Area (Mock) */}
      <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center text-4xl">
            👨‍⚕️
          </div>
          <h2 className="text-2xl font-bold text-white">Dr. Emily Watson</h2>
          <p className="text-gray-400">Connecting...</p>
        </div>

        {/* Self View */}
        <div className="absolute bottom-24 right-6 w-48 h-36 bg-gray-800 rounded-xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-gray-900 border-t border-white/10 flex items-center justify-center gap-4 px-6 z-20">
        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full ${isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full ${isVideoOff ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </Button>

        <Button
          variant="destructive"
          size="icon"
          className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 mx-4"
          onClick={() => router.push("/dashboard/sessions")}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Low Balance Alert */}
      <AnimatePresence>
        {showLowBalance && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 z-30"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Low Balance! Top up to continue session.</span>
            <Button size="sm" className="bg-white text-red-600 hover:bg-gray-100 rounded-full h-8">
              Top Up
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
