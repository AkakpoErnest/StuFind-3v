"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { PriceDisplay } from "@/components/price-display"
import { motion } from "framer-motion"
import { MapPin, Clock, Heart, MessageCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  currency: string
  imageUrl: string
  category: string
  condition: string
  location: string
  postedAgo: string
  description: string
}

const allBrowseItems: Product[] = [
  {
    id: "b1",
    name: "Digital Marketing Course Notes",
    price: 50,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Services",
    condition: "Digital",
    location: "Online",
    postedAgo: "1 hour ago",
    description: "Comprehensive notes for Digital Marketing course. Includes summaries and exam tips.",
  },
  {
    id: "b2",
    name: "Tutoring - Math & Physics",
    price: 75,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Services",
    condition: "Service",
    location: "HTU Campus / Online",
    postedAgo: "3 hours ago",
    description: "Experienced tutor offering sessions for Calculus, Algebra, and Physics. Flexible hours.",
  },
  {
    id: "b3",
    name: "Event Photography Service",
    price: 200,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Services",
    condition: "Service",
    location: "Accra",
    postedAgo: "1 day ago",
    description: "Professional photography for student events, parties, and portraits. High-quality edits included.",
  },
  {
    id: "b4",
    name: "Resume & Cover Letter Review",
    price: 40,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Services",
    condition: "Service",
    location: "Online",
    postedAgo: "6 hours ago",
    description: "Get your resume and cover letter professionally reviewed and optimized for job applications.",
  },
  {
    id: "b5",
    name: "Used Bicycle",
    price: 300,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Other",
    condition: "Used - Good",
    location: "Legon Campus",
    postedAgo: "2 days ago",
    description: "Mountain bike, good for campus commutes. Some wear and tear, but fully functional.",
  },
  {
    id: "b6",
    name: "Acoustic Guitar",
    price: 450,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Other",
    condition: "Used - Like New",
    location: "KNUST Campus",
    postedAgo: "4 days ago",
    description: "Well-maintained acoustic guitar, perfect for beginners. Comes with a soft case.",
  },
  {
    id: "b7",
    name: "Cooking Utensils Set",
    price: 100,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Dorm Essentials",
    condition: "Used - Good",
    location: "UCC Campus",
    postedAgo: "1 week ago",
    description: "Basic cooking utensils set: pots, pans, spatulas. Essential for dorm cooking.",
  },
  {
    id: "b8",
    name: "Portable Bluetooth Speaker",
    price: 180,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Electronics",
    condition: "Used - Like New",
    location: "Central University",
    postedAgo: "5 days ago",
    description: "Compact Bluetooth speaker with great sound. Long battery life, perfect for parties.",
  },
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ["All", "Textbooks", "Electronics", "Dorm Essentials", "Apparel", "Services", "Other"]

  const filteredProducts = allBrowseItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                onClick={() => handleProductClick(item)}
              >
                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold text-primary-700 mb-1 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {item.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" /> {item.postedAgo}
                  </div>
                  <div className="mt-3 text-2xl font-bold text-primary-600">
                    <PriceDisplay amount={item.price} currency={item.currency} />
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 border-t flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-primary-500 hover:bg-primary-50">
                    <MessageCircle className="h-4 w-4 mr-2" /> Chat
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
              No items found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
