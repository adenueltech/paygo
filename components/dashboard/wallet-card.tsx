"use client"

import { useState } from "react"
import { Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, Copy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TopUpModal } from "@/components/wallet/topup-modal"
import { TransferModal } from "@/components/wallet/transfer-modal"
import { AutoSwapperModal } from "@/components/dashboard/auto-swapper-modal"

export function WalletCard() {
  const [showBalance, setShowBalance] = useState(true)
  const [currency, setCurrency] = useState<"fiat" | "crypto">("fiat")
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [isReceiveOpen, setIsReceiveOpen] = useState(false)
  const [isAutoSwapOpen, setIsAutoSwapOpen] = useState(false)
  const [transferType, setTransferType] = useState<"send" | "withdraw">("send")

  const handleTransfer = (type: "send" | "withdraw") => {
    setTransferType(type)
    setIsTransferOpen(true)
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white shadow-xl border border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setCurrency("fiat")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                currency === "fiat" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              Fiat
            </button>
            <button
              onClick={() => setCurrency("crypto")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                currency === "crypto" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              Crypto
            </button>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold tracking-tight">
              {showBalance ? (currency === "fiat" ? "₦245,850.00" : "0.45 BTC") : "••••••••"}
            </h2>
            {showBalance && (
              <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                +12.5%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          <Button
            onClick={() => setIsTopUpOpen(true)}
            className="bg-white text-black hover:bg-gray-200 flex flex-col h-auto py-3 gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs">Top Up</span>
          </Button>
          <Button
            onClick={() => handleTransfer("send")}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white flex flex-col h-auto py-3 gap-1"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span className="text-xs">Send</span>
          </Button>
          <Button
            onClick={() => setIsReceiveOpen(true)}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white flex flex-col h-auto py-3 gap-1"
          >
            <ArrowDownLeft className="h-4 w-4" />
            <span className="text-xs">Receive</span>
          </Button>
          <Button
            onClick={() => handleTransfer("withdraw")}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white flex flex-col h-auto py-3 gap-1"
          >
            <ArrowDownLeft className="h-4 w-4" />
            <span className="text-xs">Withdraw</span>
          </Button>
          <Button
            onClick={() => setIsAutoSwapOpen(true)}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white flex flex-col h-auto py-3 gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">Swap</span>
          </Button>
        </div>
      </div>

      {/* Receive Modal */}
      <Dialog open={isReceiveOpen} onOpenChange={setIsReceiveOpen}>
        <DialogContent className="bg-[#696E71] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Receive Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 mb-2">Your Wallet Address</p>
                <div className="flex items-center gap-2 bg-black/20 rounded p-3">
                  <code className="text-sm font-mono flex-1">0x71C...39A2</code>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">QR Code</p>
                <div className="bg-white rounded p-4 w-32 h-32 mx-auto flex items-center justify-center">
                  <span className="text-black text-xs">QR Code</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsReceiveOpen(false)}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} type={transferType} />
      <AutoSwapperModal isOpen={isAutoSwapOpen} onClose={() => setIsAutoSwapOpen(false)} />
    </div>
  )
}
