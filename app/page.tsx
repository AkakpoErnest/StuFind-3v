"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingBag,
  Shield,
  Zap,
  TrendingUp,
  BookOpen,
  Laptop,
  Home,
  Gamepad2,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Heart,
} from "lucide-react"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { TeamProfiles } from "@/components/team-profiles"
import { UniversityShowcase } from "@/components/university-showcase"
import { StufindTokens } from "@/components/stufind-tokens"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/components/auth/auth-provider"
import { PriceDisplayComponent } from "@/components/price-display"
import { ProductDetailModal } from "@/components/product-detail-modal"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    title: "MacBook Air M2",
    price: 8500,
    originalPrice: 12000,
    image: "/images/products/macbook-air.jpg",
    category: "Electronics",
    condition: "Like New",
    seller: "Kwame A.",
    university: "UG",
    location: "Accra",
    timeLeft: "2 days",
    likes: 24,
    isUrgent: true,
    description: "Barely used MacBook Air M2 with 8GB RAM and 256GB SSD. Perfect for students.",
  },
  {
    id: 2,
    title: "Engineering Textbooks Set",
    price: 450,
    originalPrice: 800,
    image: "/images/products/engineering-books.jpg",
    category: "Books",
    condition: "Good",
    seller: "Ama K.",
    university: "KNUST",
    location: "Kumasi",
    timeLeft: "5 days",
    likes: 12,
    isUrgent: false,
    description: "Complete set of engineering textbooks for first and second year students.",
  },
  {
    id: 3,
    title: "Mini Fridge",
    price: 320,
    originalPrice: 500,
    image: "/images/products/mini-fridge.jpg",
    category: "Appliances",
    condition: "Excellent",
    seller: "Kofi M.",
    university: "UCC",
    location: "Cape Coast",
    timeLeft: "1 day",
    likes: 8,
    isUrgent: true,
    description: "Compact mini fridge perfect for dorm rooms. Energy efficient and quiet.",
  },
]

const categories = [
  { name: "Books", icon: BookOpen, count: "2.3k", color: "bg-blue-500" },
  { name: "Electronics", icon: Laptop, count: "1.8k", color: "bg-purple-500" },
  { name: "Furniture", icon: Home, count: "950", color: "bg-green-500" },
  { name: "Gaming", icon: Gamepad2, count: "720", color: "bg-red-500" },
]

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const getWelcomeMessage = () => {
    if (!isAuthenticated) return "Welcome to Stufind"

    const firstName = user?.firstName || user?.walletAddress?.slice(0, 6) || "User"
    const hour = new Date().getHours()

    if (hour < 12) return `Good morning, ${firstName}!`
    if (hour < 17) return `Good afternoon, ${firstName}!`
    return `Good evening, ${firstName}!`
  }

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (!user?.isVerified) {
        window.location.href = "/verify"
      } else {
        window.location.href = "/marketplace"
      }
    } else {
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = (userData: any) => {
    setShowAuthModal(false)
    // Redirect to verification if not verified
    if (!userData.isVerified) {
      setTimeout(() => {
        window.location.href = "/verify"
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={40} showText />
              <Badge variant="outline" className="hidden md:inline-flex">
                Ghana's #1 Student Marketplace
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/marketplace" className="text-slate-600 hover:text-blue-600 transition-colors">
                Marketplace
              </Link>
              <Link href="/used-products" className="text-slate-600 hover:text-blue-600 transition-colors">
                Used Products
              </Link>
              <Link href="/jobs" className="text-slate-600 hover:text-blue-600 transition-colors">
                Jobs
              </Link>
              <Link href="/whatsapp-ai" className="text-slate-600 hover:text-blue-600 transition-colors">
                AI Assistant
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {user?.firstName || user?.walletAddress?.slice(0, 6)}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/wallet">Wallet</Link>
                  </Button>
                  {!user?.isVerified && (
                    <Button size="sm" asChild>
                      <Link href="/verify">Verify</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 to-blue-700">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {getWelcomeMessage()}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            {isAuthenticated
              ? user?.isVerified
                ? "Ready to explore the marketplace? Find great deals from fellow students!"
                : "Complete your verification to unlock all features and start trading safely."
              : "The safest way for Ghanaian students to buy, sell, and trade. Join thousands of verified students today."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for books, electronics, furniture..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-700 h-12 px-8"
              onClick={() => (window.location.href = `/marketplace${searchQuery ? `?search=${searchQuery}` : ""}`)}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15K+</div>
              <div className="text-slate-600 dark:text-slate-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">8.2K+</div>
              <div className="text-slate-600 dark:text-slate-400">Items Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-slate-600 dark:text-slate-400">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.9★</div>
              <div className="text-slate-600 dark:text-slate-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800 dark:text-blue-200">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-blue-200"
                onClick={() => (window.location.href = `/marketplace?category=${category.name.toLowerCase()}`)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-blue-200"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isUrgent && <Badge className="absolute top-2 left-2 bg-red-500">Urgent Sale</Badge>}
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <Badge variant="secondary">{product.condition}</Badge>
                  </div>

                  <div className="mb-3">
                    <PriceDisplayComponent price={product.price} />
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through ml-2">GH₵{product.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {product.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {product.timeLeft}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        {product.seller.charAt(0)}
                      </div>
                      <span className="text-sm">{product.seller}</span>
                      <Badge variant="outline" className="text-xs">
                        {product.university}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {product.likes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800 dark:text-blue-200">Why Choose Stufind?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <Shield className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-4">Verified Students Only</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Trade safely with verified students from recognized Ghanaian universities.
              </p>
            </Card>
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <Zap className="h-16 w-16 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl font-semibold mb-4">Instant Transactions</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Fast and secure payments with mobile money and crypto wallet integration.
              </p>
            </Card>
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-4">Best Prices</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get the best deals on textbooks, electronics, and everything you need for campus life.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* University Showcase */}
      <UniversityShowcase />

      {/* Team Profiles */}
      <TeamProfiles />

      {/* Stufind Tokens */}
      <StufindTokens />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who trust Stufind for safe and secure trading.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-3"
          >
            {isAuthenticated ? (user?.isVerified ? "Browse Marketplace" : "Complete Verification") : "Get Started Now"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <StufindLogo size={32} showText className="mb-4" />
              <p className="text-slate-400">Ghana's premier student marketplace for safe and secure trading.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/marketplace">Browse Products</Link>
                </li>
                <li>
                  <Link href="/used-products">Used Products</Link>
                </li>
                <li>
                  <Link href="/create">Sell Items</Link>
                </li>
                <li>
                  <Link href="/jobs">Find Jobs</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/verify">Student Verification</Link>
                </li>
                <li>
                  <Link href="/wallet">StuFind Wallet</Link>
                </li>
                <li>
                  <Link href="/whatsapp-ai">AI Assistant</Link>
                </li>
                <li>
                  <Link href="/donate">Donate Items</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="mailto:support@stufind.app">Contact Us</a>
                </li>
                <li>
                  <a href="/help">Help Center</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Stufind. All rights reserved. Made with ❤️ for Ghanaian students.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating Action Button */}
      {isAuthenticated && user?.isVerified && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link href="/create">
              <ShoppingBag className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
