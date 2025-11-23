"use client"

import { useState } from "react"
import { Search, Star, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = ["All", "Streaming", "SaaS Tools", "Consultation", "Data & Utilities"]

const services = [
  {
    id: 1,
    name: "Netflix Premium",
    category: "Streaming",
    rating: 4.9,
    reviews: 1250,
    price: "₦50",
    unit: "hour",
    image: "N",
    color: "bg-red-600",
    description: "Watch TV shows, movies, and more. Pay only for the time you watch.",
  },
  {
    id: 2,
    name: "Legal Advisory",
    category: "Consultation",
    rating: 4.8,
    reviews: 320,
    price: "₦200",
    unit: "min",
    image: "L",
    color: "bg-blue-600",
    description: "Connect with top legal experts for instant advice and consultation.",
  },
  {
    id: 3,
    name: "AWS EC2",
    category: "SaaS Tools",
    rating: 4.7,
    reviews: 850,
    price: "₦15",
    unit: "hour",
    image: "A",
    color: "bg-orange-500",
    description: "Scalable cloud computing capacity. Pay per second billing.",
  },
  {
    id: 4,
    name: "MTN Data",
    category: "Data & Utilities",
    rating: 4.6,
    reviews: 2100,
    price: "₦2",
    unit: "MB",
    image: "M",
    color: "bg-yellow-500",
    description: "High-speed mobile data. Pay exactly for what you consume.",
  },
  {
    id: 5,
    name: "Spotify Premium",
    category: "Streaming",
    rating: 4.8,
    reviews: 1500,
    price: "₦20",
    unit: "hour",
    image: "S",
    color: "bg-green-500",
    description: "Ad-free music listening. Offline playback support.",
  },
  {
    id: 6,
    name: "Zoom Pro",
    category: "SaaS Tools",
    rating: 4.5,
    reviews: 600,
    price: "₦100",
    unit: "hour",
    image: "Z",
    color: "bg-blue-500",
    description: "HD video conferencing with unlimited meeting duration.",
  },
]

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-gray-400">Discover and subscribe to pay-as-you-go services.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search services..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-white/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`h-12 w-12 rounded-xl ${service.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
              >
                {service.image}
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-none">
                {service.category}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="flex items-center gap-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{service.rating}</span>
              <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-lg font-bold text-white">{service.price}</span>
                <span className="text-gray-400 text-sm">/{service.unit}</span>
              </div>
              <Link href={`/dashboard/marketplace/${service.id}`}>
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                  View
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
