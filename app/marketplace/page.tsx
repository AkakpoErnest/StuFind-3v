"use client"

import { useState } from "react"
import {
  Search,
  Grid3X3,
  List,
  BookOpen,
  Laptop,
  Shirt,
  Home,
  Coffee,
  Gamepad2,
  Star,
  TrendingUp,
  MessageCircle,
  Heart,
  Eye,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PriceDisplayComponent } from "@/components/price-display"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const categories = [
  { name: "All Categories", value: "all", icon: Grid3X3 },
  { name: "Textbooks", value: "textbooks", icon: BookOpen },
  { name: "Electronics", value: "electronics", icon: Laptop },
  { name: "Clothing", value: "clothing", icon: Shirt },
  { name: "Dorm Items", value: "dorm", icon: Home },
  { name: "Food & Drinks", value: "food", icon: Coffee },
  { name: "Gaming", value: "gaming", icon: Gamepad2 },
]

const allProducts = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals - 8th Edition",
    priceUSD: 45,
    image: "/images/products/calculus-textbook.jpg",
    seller: "Kwame A.",
    condition: "Like New",
    category: "textbooks",
    tokenId: "1001",
    verified: true,
    university: "University of Ghana",
    description: "Comprehensive calculus textbook in excellent condition. All pages intact, minimal highlighting.",
    features: ["All chapters included", "Practice problems", "Solution manual", "Minimal wear"],
    timePosted: "2 hours ago",
    views: 24,
    location: "Legon Campus",
    rating: 4.9,
    totalSales: 15,
    likes: 12,
  },
  {
    id: 2,
    title: "MacBook Air M1 - 2021 (256GB)",
    priceUSD: 850,
    image: "/images/products/macbook-air.jpg",
    seller: "Ama K.",
    condition: "Good",
    category: "electronics",
    tokenId: "1002",
    verified: true,
    university: "KNUST",
    description: "Reliable MacBook Air perfect for students. Great battery life, fast performance.",
    features: ["M1 Chip", "256GB Storage", "8GB RAM", "Original charger included"],
    timePosted: "5 hours ago",
    views: 89,
    location: "Kumasi Campus",
    rating: 4.7,
    totalSales: 8,
    likes: 34,
  },
  {
    id: 3,
    title: "Mini Fridge - Perfect for Dorms",
    priceUSD: 80,
    image: "/images/products/mini-fridge.jpg",
    seller: "Kofi M.",
    condition: "Excellent",
    category: "dorm",
    tokenId: "1003",
    verified: false,
    university: "Ashesi University",
    description: "Compact mini fridge ideal for dorm rooms. Energy efficient and quiet operation.",
    features: ["Energy efficient", "Quiet operation", "Compact design", "Adjustable shelves"],
    timePosted: "1 day ago",
    views: 15,
    location: "Berekuso Campus",
    rating: 4.5,
    totalSales: 3,
    likes: 8,
  },
  {
    id: 4,
    title: "Chemistry Lab Coat - Size Medium",
    priceUSD: 15,
    image: "/images/products/lab-coat.jpg",
    seller: "Akosua T.",
    condition: "Good",
    category: "clothing",
    tokenId: "1004",
    verified: true,
    university: "UCC",
    description: "Standard chemistry lab coat in good condition. Properly maintained and cleaned.",
    features: ["Size Medium", "100% Cotton", "Properly cleaned", "All buttons intact"],
    timePosted: "2 days ago",
    views: 7,
    location: "Cape Coast Campus",
    rating: 4.8,
    totalSales: 12,
    likes: 5,
  },
  {
    id: 5,
    title: "Nintendo Switch + 3 Games Bundle",
    priceUSD: 220,
    image: "/images/products/nintendo-switch.jpg",
    seller: "Yaw P.",
    condition: "Like New",
    category: "gaming",
    tokenId: "1005",
    verified: true,
    university: "University of Ghana",
    description: "Nintendo Switch console with 3 popular games. Barely used, excellent condition.",
    features: ["Console + dock", "3 games included", "Original controllers", "Carrying case"],
    timePosted: "3 days ago",
    views: 56,
    location: "Legon Campus",
    rating: 4.9,
    totalSales: 6,
    likes: 28,
  },
  {
    id: 6,
    title: "Organic Chemistry Textbook + Study Guide",
    priceUSD: 65,
    image: "/images/products/chemistry-textbook.jpg",
    seller: "Efua L.",
    condition: "Good",
    category: "textbooks",
    tokenId: "1006",
    verified: false,
    university: "KNUST",
    description: "Complete organic chemistry package with textbook and study guide.",
    features: ["Textbook + study guide", "Practice problems", "Answer key", "Good condition"],
    timePosted: "4 days ago",
    views: 33,
    location: "Kumasi Campus",
    rating: 4.6,
    totalSales: 9,
    likes: 15,
  },
  {
    id: 7,
    title: "Engineering Mathematics Books Set",
    priceUSD: 120,
    image: "/images/products/engineering-books.jpg",
    seller: "Kwaku B.",
    condition: "Like New",
    category: "textbooks",
    tokenId: "1007",
    verified: true,
    university: "KNUST",
    description: "Complete set of engineering mathematics books for first and second year students.",
    features: ["5 books included", "All solutions manuals", "Excellent condition", "No missing pages"],
    timePosted: "1 week ago",
    views: 42,
    location: "Kumasi Campus",
    rating: 4.8,
    totalSales: 11,
    likes: 19,
  },
  {
    id: 8,
    title: "Complete Dorm Room Setup",
    priceUSD: 300,
    image: "/images/products/dorm-setup.jpg",
    seller: "Abena S.",
    condition: "Good",
    category: "dorm",
    tokenId: "1008",
    verified: true,
    university: "University of Ghana",
    description: "Everything you need for your dorm room. Bed sheets, pillows, desk lamp, and more.",
    features: ["Bed sheets set", "Pillows", "Desk lamp", "Storage boxes", "Curtains"],
    timePosted: "5 days ago",
    views: 67,
    location: "Legon Campus",
    rating: 4.6,
    totalSales: 4,
    likes: 23,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.university.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.priceUSD - b.priceUSD
      case "price-high":
        return b.priceUSD - a.priceUSD
      case "popular":
        return b.views - a.views
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Student Marketplace</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing deals from fellow students across Ghana. Buy and sell safely with verified users.
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search for products, sellers, or universities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                </div>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">{allProducts.length}</div>
                  <div className="text-sm text-blue-200">Total Items</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-blue-200">Universities</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">456</div>
                  <div className="text-sm text-blue-200">Verified Sellers</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">₵89K</div>
                  <div className="text-sm text-blue-200">Total Volume</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {filteredProducts.length} Products Found
            </h2>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/create">
                <TrendingUp className="h-4 w-4 mr-2" />
                Sell Your Items
              </Link>
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sortBy}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader className="p-0 relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg?height=200&width=200"}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <Badge variant="secondary" className="bg-black/80 text-white">
                          #{product.tokenId}
                        </Badge>
                        {product.verified && (
                          <Badge className="bg-green-500">
                            <Star className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +5 tokens
                        </Badge>
                      </div>

                      {/* Like button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute bottom-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => toggleLike(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${likedProducts.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                        />
                      </Button>

                      {/* Views */}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="outline" className="bg-white/90">
                          <Eye className="h-3 w-3 mr-1" />
                          {product.views}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-800">
                        {categories.find((c) => c.value === product.category)?.name}
                      </Badge>

                      <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h4>

                      <PriceDisplayComponent priceUSD={product.priceUSD} size="lg" primaryCurrency="cedis" />

                      <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mb-2 mt-2">
                        <div className="flex items-center gap-1">
                          <span>{product.seller}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {product.condition}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{product.timePosted}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-300">No products found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/create">List Your First Item</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
