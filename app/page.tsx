"use client"

import { useState } from "react"
import {
  Search,
  BookOpen,
  Laptop,
  Shirt,
  Home,
  Coffee,
  Gamepad2,
  Shield,
  Zap,
  Globe,
  Smartphone,
  Briefcase,
  Heart,
  Package,
  CreditCard,
  MessageCircle,
  Coins,
  Star,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StufindLogo } from "@/components/stufind-logo"
import { PriceDisplayComponent } from "@/components/price-display"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { TeamProfiles } from "@/components/team-profiles"
import { UniversityShowcase } from "@/components/university-showcase"
import { StufindTokens } from "@/components/stufind-tokens"
import { ProductDetailModal } from "@/components/product-detail-modal"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  { name: "Textbooks", icon: BookOpen, count: 234, color: "from-blue-500 to-blue-600" },
  { name: "Electronics", icon: Laptop, count: 156, color: "from-purple-500 to-purple-600" },
  { name: "Clothing", icon: Shirt, count: 89, color: "from-pink-500 to-pink-600" },
  { name: "Dorm Items", icon: Home, count: 67, color: "from-green-500 to-green-600" },
  { name: "Food & Drinks", icon: Coffee, count: 45, color: "from-orange-500 to-orange-600" },
  { name: "Gaming", icon: Gamepad2, count: 78, color: "from-red-500 to-red-600" },
]

const featuredProducts = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals - 8th Edition",
    priceUSD: 45,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Kwame A.",
    condition: "Like New",
    category: "Textbooks",
    tokenId: "1001",
    verified: true,
    university: "University of Ghana",
    description:
      "Comprehensive calculus textbook in excellent condition. All pages intact, minimal highlighting. Perfect for engineering and mathematics students.",
    features: ["All chapters included", "Practice problems", "Solution manual", "Minimal wear"],
    timePosted: "2 hours ago",
    views: 24,
    location: "Legon Campus",
    rating: 4.9,
    totalSales: 15,
  },
  {
    id: 2,
    title: "MacBook Air M1 - 2021 (256GB)",
    priceUSD: 850,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Ama K.",
    condition: "Good",
    category: "Electronics",
    tokenId: "1002",
    verified: true,
    university: "KNUST",
    description:
      "Reliable MacBook Air perfect for students. Great battery life, fast performance. Includes original charger and box.",
    features: ["M1 Chip", "256GB Storage", "8GB RAM", "Original charger included", "Box included"],
    timePosted: "5 hours ago",
    views: 89,
    location: "Kumasi Campus",
    rating: 4.7,
    totalSales: 8,
  },
  {
    id: 3,
    title: "Mini Fridge - Perfect for Dorms",
    priceUSD: 80,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Kofi M.",
    condition: "Excellent",
    category: "Dorm Items",
    tokenId: "1003",
    verified: false,
    university: "Ashesi University",
    description:
      "Compact mini fridge ideal for dorm rooms. Energy efficient and quiet operation. Perfect size for snacks and drinks.",
    features: ["Energy efficient", "Quiet operation", "Compact design", "Adjustable shelves"],
    timePosted: "1 day ago",
    views: 15,
    location: "Berekuso Campus",
    rating: 4.5,
    totalSales: 3,
  },
  {
    id: 4,
    title: "Chemistry Lab Coat - Size Medium",
    priceUSD: 15,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Akosua T.",
    condition: "Good",
    category: "Clothing",
    tokenId: "1004",
    verified: true,
    university: "UCC",
    description:
      "Standard chemistry lab coat in good condition. Properly maintained and cleaned. Essential for lab work.",
    features: ["Size Medium", "100% Cotton", "Properly cleaned", "All buttons intact"],
    timePosted: "2 days ago",
    views: 7,
    location: "Cape Coast Campus",
    rating: 4.8,
    totalSales: 12,
  },
  {
    id: 5,
    title: "Nintendo Switch + 3 Games Bundle",
    priceUSD: 220,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Yaw P.",
    condition: "Like New",
    category: "Gaming",
    tokenId: "1005",
    verified: true,
    university: "University of Ghana",
    description:
      "Nintendo Switch console with 3 popular games. Barely used, excellent condition. Perfect for gaming enthusiasts.",
    features: ["Console + dock", "3 games included", "Original controllers", "Carrying case"],
    timePosted: "3 days ago",
    views: 56,
    location: "Legon Campus",
    rating: 4.9,
    totalSales: 6,
  },
  {
    id: 6,
    title: "Organic Chemistry Textbook + Study Guide",
    priceUSD: 65,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Efua L.",
    condition: "Good",
    category: "Textbooks",
    tokenId: "1006",
    verified: false,
    university: "KNUST",
    description: "Complete organic chemistry package with textbook and study guide. Great for chemistry students.",
    features: ["Textbook + study guide", "Practice problems", "Answer key", "Good condition"],
    timePosted: "4 days ago",
    views: 33,
    location: "Kumasi Campus",
    rating: 4.6,
    totalSales: 9,
  },
]

export default function HomePage() {
  const [searchResults, setSearchResults] = useState(featuredProducts)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showTokens, setShowTokens] = useState(false)

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(featuredProducts)
      return
    }

    const filtered = featuredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.seller.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(filtered)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-blue-950 dark:to-purple-950"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Base Network
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/marketplace">Marketplace</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/used-products">Used Products</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/jobs">Jobs</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/donate">Donate</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/verify">Verify</Link>
              </Button>
              <Button variant="ghost" onClick={() => setShowTokens(!showTokens)} className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">1,250</span>
              </Button>
              <ThemeToggle />
              <Button className="bg-gradient-to-r from-green-500 to-blue-600">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Token Panel */}
      {showTokens && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b bg-muted/50 p-4"
        >
          <div className="container mx-auto">
            <StufindTokens />
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <StufindLogo size={80} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Ghana's Student Marketplace
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Buy and sell with fellow students across Ghana. Earn StuFind tokens, pay with Mobile Money, Bank Cards, or
              Crypto. Built on blockchain for security, designed for everyone.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm"
              >
                <Smartphone className="h-12 w-12 text-green-500 mb-3" />
                <h3 className="font-semibold mb-2">Mobile Money</h3>
                <p className="text-sm text-muted-foreground">Pay with MTN, Vodafone, AirtelTigo</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm"
              >
                <Shield className="h-12 w-12 text-blue-500 mb-3" />
                <h3 className="font-semibold mb-2">Secure Escrow</h3>
                <p className="text-sm text-muted-foreground">Smart contracts protect every transaction</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm"
              >
                <Coins className="h-12 w-12 text-yellow-500 mb-3" />
                <h3 className="font-semibold mb-2">Earn Tokens</h3>
                <p className="text-sm text-muted-foreground">Get StuFind tokens for every action</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm"
              >
                <Zap className="h-12 w-12 text-orange-500 mb-3" />
                <h3 className="font-semibold mb-2">Low Fees</h3>
                <p className="text-sm text-muted-foreground">Powered by Base for minimal costs</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-md mx-auto"
            >
              <SearchBar onSearch={handleSearch} placeholder="Search for textbooks, electronics, and more..." />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/marketplace" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Browse Items
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/used-products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Used Products
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/jobs" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Find Jobs
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Support Students
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/verify" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Get Verified
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/whatsapp-ai" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp AI
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">₵89,400</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">456</div>
              <div className="text-sm text-muted-foreground">Verified Students</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Shop by Category
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold"
            >
              {searchResults.length === featuredProducts.length
                ? "Featured Items"
                : `Search Results (${searchResults.length})`}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="outline" asChild>
                <Link href="/marketplace">View All</Link>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="hover:shadow-xl transition-all border-2 hover:border-primary/20 group cursor-pointer">
                  <CardHeader className="p-0 relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
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
                      <Badge className="bg-blue-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5 tokens
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white/90">
                        👁️ {product.views}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h4>
                    <PriceDisplayComponent priceUSD={product.priceUSD} size="lg" primaryCurrency="cedis" />
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2 mt-2">
                      <div className="flex items-center gap-1">
                        <span>{product.seller}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{product.condition}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{product.university}</div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      onClick={() => handleProductClick(product)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">Try searching for something else or browse all categories.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            How Stufind Works
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <span className="text-white font-bold text-xl">1</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3">Verify & List</h4>
              <p className="text-muted-foreground">
                Verify your student status with your ID, then create listings with photos and details. Earn tokens for
                every action!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <span className="text-white font-bold text-xl">2</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3">Secure Payment</h4>
              <p className="text-muted-foreground">
                Buyer pays using Mobile Money, Bank Cards, or Crypto. Funds are held safely in escrow until confirmed.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <span className="text-white font-bold text-xl">3</span>
              </motion.div>
              <h4 className="text-xl font-semibold mb-3">Meet & Complete</h4>
              <p className="text-muted-foreground">
                Meet safely on campus, confirm the exchange, and funds are automatically released. Both parties earn
                tokens!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <TeamProfiles />

      {/* University Showcase */}
      <UniversityShowcase />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Trading?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of Ghanaian students already using Stufind to buy and sell safely.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary" className="flex items-center gap-2" asChild>
                <Link href="/verify">
                  <CreditCard className="h-5 w-5" />
                  Verify Student ID
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                asChild
              >
                <Link href="/marketplace">Browse Without Account</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <StufindLogo size={32} showText />
              <p className="text-muted-foreground mt-4">
                Ghana's first blockchain-powered student marketplace. Safe, secure, and accessible to everyone.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Marketplace</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/marketplace" className="hover:text-foreground transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-foreground transition-colors">
                    Create Listing
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-foreground transition-colors">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/verify" className="hover:text-foreground transition-colors">
                    Student Verification
                  </Link>
                </li>
                <li>
                  <Link href="/whatsapp-ai" className="hover:text-foreground transition-colors">
                    WhatsApp AI Bot
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-foreground transition-colors">
                    Jobs & Internships
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    WhatsApp Support
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-foreground transition-colors">
                    Safety Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Stufind. Built on Base Network. Made in Ghana 🇬🇭</p>
          </div>
        </div>
      </footer>

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
