"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { PriceDisplay } from "@/components/price-display" // Corrected import name
import { motion } from "framer-motion"
import { MapPin, Clock, Heart, MessageCircle, PlusCircle } from "lucide-react"
import Link from "next/link"

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

const allUsedProducts: Product[] = [
  {
    id: "u1",
    name: "Old Physics Textbook",
    price: 80,
    currency: "GHS",
    imageUrl: "/images/products/calculus-textbook.jpg",
    category: "Textbooks",
    condition: "Used - Fair",
    location: "HTU Campus",
    postedAgo: "1 day ago",
    description: "Physics textbook, 6th edition. Well-used with notes and highlights. Still very readable.",
  },
  {
    id: "u2",
    name: "Used Mini Fridge",
    price: 300,
    currency: "GHS",
    imageUrl: "/images/products/mini-fridge.jpg",
    category: "Dorm Essentials",
    condition: "Used - Good",
    location: "Accra Hostel",
    postedAgo: "4 days ago",
    description: "Reliable mini fridge, perfect for drinks and snacks. Minor scratches, works perfectly.",
  },
  {
    id: "u3",
    name: "Pre-loved Lab Coat",
    price: 60,
    currency: "GHS",
    imageUrl: "/images/products/lab-coat.jpg",
    category: "Apparel",
    condition: "Used - Good",
    location: "KNUST Science Dept",
    postedAgo: "2 days ago",
    description: "Cleaned lab coat, size L. Ready for your lab sessions.",
  },
  {
    id: "u4",
    name: "Vintage Gaming Console",
    price: 500,
    currency: "GHS",
    imageUrl: "/images/products/nintendo-switch.jpg",
    category: "Electronics",
    condition: "Used - Fair",
    location: "Legon Campus",
    postedAgo: "1 week ago",
    description: "Classic gaming console, comes with one controller. Some cosmetic wear, but functional.",
  },
  {
    id: "u5",
    name: "Old Chemistry Set",
    price: 100,
    currency: "GHS",
    imageUrl: "/images/products/chemistry-textbook.jpg",
    category: "Other",
    condition: "Used - Good",
    location: "UCC Campus",
    postedAgo: "3 days ago",
    description: "Basic chemistry set for experiments. Missing a few items, but most are present.",
  },
  {
    id: "u6",
    name: "Worn Engineering Textbooks",
    price: 250,
    currency: "GHS",
    imageUrl: "/images/products/engineering-books.jpg",
    category: "Textbooks",
    condition: "Used - Fair",
    location: "Takoradi Technical Uni",
    postedAgo: "2 weeks ago",
    description: "Set of engineering textbooks, well-worn but content is intact. Great for reference.",
  },
  {
    id: "u7",
    name: "Second-hand Dorm Furniture",
    price: 600,
    currency: "GHS",
    imageUrl: "/images/products/dorm-setup.jpg",
    category: "Dorm Essentials",
    condition: "Used - Good",
    location: "Central University",
    postedAgo: "5 days ago",
    description: "Used desk and chair set, perfect for a student dorm. Minor scratches.",
  },
  {
    id: "u8",
    name: "Pre-owned MacBook Pro",
    price: 4500,
    currency: "GHS",
    imageUrl: "/images/products/macbook-pro.jpg",
    category: "Electronics",
    condition: "Used - Good",
    location: "GIMPA",
    postedAgo: "1 month ago",
    description: "MacBook Pro 2017, 8GB RAM, 256GB SSD. Good working condition, some signs of use.",
  },
  {
    id: "u9",
    name: "Used Business Books",
    price: 150,
    currency: "GHS",
    imageUrl: "/images/products/business-books.jpg",
    category: "Textbooks",
    condition: "Used - Good",
    location: "Accra Technical Uni",
    postedAgo: "1 week ago",
    description: "Collection of business books, various topics. Good for introductory courses.",
  },
  {
    id: "u10",
    name: "Anime Manga Collection",
    price: 280,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "Used - Good",
    location: "HTU Campus",
    postedAgo: "2 days ago",
    description: "Mixed collection of popular manga series. Some volumes have minor wear.",
  },
  {
    id: "u11",
    name: "Cosplay Costume (Used)",
    price: 350,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "Used - Fair",
    location: "Accra Mall",
    postedAgo: "4 days ago",
    description: "Used cosplay costume from a popular anime. Size M. Needs a bit of repair.",
  },
  {
    id: "u12",
    name: "Anime Art Book",
    price: 120,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "Used - Like New",
    location: "Legon Campus",
    postedAgo: "1 week ago",
    description: "Beautiful art book featuring illustrations from various anime. Excellent condition.",
  },
]

export default function UsedProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ["All", "Textbooks", "Electronics", "Dorm Essentials", "Apparel", "Anime & Manga", "Other"]

  const filteredProducts = allUsedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
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
        {/* Removed h1 and p elements as per instructions */}
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
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold text-primary-700 mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {product.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" /> {product.postedAgo}
                  </div>
                  <div className="mt-3 text-2xl font-bold text-primary-600">
                    <PriceDisplay amount={product.price} currency={product.currency} />
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
              No products found matching your criteria.
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/create">
            <Button className="bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusCircle className="h-6 w-6 mr-3" /> Create New Listing
            </Button>
          </Link>
        </div>

        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  )
}
