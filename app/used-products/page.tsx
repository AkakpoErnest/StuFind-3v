"use client"

import { useState } from "react"
import { Filter, Clock, MapPin, GraduationCap, Package, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { PriceDisplayComponent } from "@/components/price-display"

const usedProducts = [
  {
    id: 1,
    title: "Complete Engineering Textbook Set",
    description: "All my mechanical engineering textbooks from 4 years. Perfect for incoming students!",
    priceUSD: 120,
    originalPrice: 450,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Kwame Asante",
    condition: "Good",
    category: "Textbooks",
    university: "Ho Technical University",
    graduationDate: "June 2024",
    reason: "Graduating - no longer needed",
    timePosted: "2 days ago",
    verified: true,
    urgent: true,
    items: ["Thermodynamics", "Fluid Mechanics", "Materials Science", "Machine Design", "+8 more"],
  },
  {
    id: 2,
    title: "Dorm Room Complete Setup",
    description: "Everything you need for your dorm: fridge, desk lamp, bedding, storage boxes, and more!",
    priceUSD: 200,
    originalPrice: 600,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Ama Osei",
    condition: "Excellent",
    category: "Dorm Bundle",
    university: "University of Ghana",
    graduationDate: "July 2024",
    reason: "Moving abroad for masters",
    timePosted: "1 day ago",
    verified: true,
    urgent: true,
    items: ["Mini fridge", "Study desk", "Bedding set", "Storage boxes", "Desk lamp"],
  },
  {
    id: 3,
    title: "MacBook Pro + Accessories Bundle",
    description: "My trusty laptop that got me through computer science degree. Includes charger, mouse, and bag.",
    priceUSD: 800,
    originalPrice: 1200,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Ernest Akakpo",
    condition: "Good",
    category: "Electronics",
    university: "Ho Technical University",
    graduationDate: "June 2024",
    reason: "Got new laptop for job",
    timePosted: "3 hours ago",
    verified: true,
    urgent: false,
    items: ["MacBook Pro 2020", "Original charger", "Wireless mouse", "Laptop bag", "Screen protector"],
  },
  {
    id: 4,
    title: "Business Administration Books & Notes",
    description: "Complete set of business books plus my handwritten notes. Great for BBA students!",
    priceUSD: 80,
    originalPrice: 300,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Akosua Mensah",
    condition: "Like New",
    category: "Textbooks",
    university: "GIMPA",
    graduationDate: "August 2024",
    reason: "Completed degree",
    timePosted: "1 week ago",
    verified: true,
    urgent: false,
    items: ["Marketing Management", "Financial Accounting", "Business Law", "Economics", "Personal notes"],
  },
  {
    id: 5,
    title: "Lab Equipment & Supplies",
    description: "Chemistry lab equipment and supplies. Perfect for science students starting lab work.",
    priceUSD: 60,
    originalPrice: 180,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Yaw Boateng",
    condition: "Good",
    category: "Lab Equipment",
    university: "KNUST",
    graduationDate: "May 2024",
    reason: "Switching to industry",
    timePosted: "4 days ago",
    verified: false,
    urgent: true,
    items: ["Lab coat", "Safety goggles", "Beakers set", "Measuring tools", "Lab notebook"],
  },
  {
    id: 6,
    title: "Art & Design Complete Kit",
    description: "Professional art supplies and design tools. Everything needed for art and design courses.",
    priceUSD: 150,
    originalPrice: 400,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Efua Larbi",
    condition: "Excellent",
    category: "Art Supplies",
    university: "University of Cape Coast",
    graduationDate: "July 2024",
    reason: "Moving to digital art",
    timePosted: "5 days ago",
    verified: true,
    urgent: false,
    items: ["Drawing tablets", "Paint sets", "Brushes", "Sketchbooks", "Design software"],
  },
]

export default function UsedProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(usedProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterProducts(query, selectedCategory, selectedUniversity, showUrgentOnly)
  }

  const filterProducts = (query: string, category: string, university: string, urgentOnly: boolean) => {
    let filtered = usedProducts

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.seller.toLowerCase().includes(query.toLowerCase()) ||
          product.items.some((item) => item.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    if (university !== "all") {
      filtered = filtered.filter((product) => product.university.toLowerCase().includes(university.toLowerCase()))
    }

    if (urgentOnly) {
      filtered = filtered.filter((product) => product.urgent)
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterProducts(searchQuery, category, selectedUniversity, showUrgentOnly)
  }

  const handleUniversityChange = (university: string) => {
    setSelectedUniversity(university)
    filterProducts(searchQuery, selectedCategory, university, showUrgentOnly)
  }

  const toggleUrgent = () => {
    const newUrgentOnly = !showUrgentOnly
    setShowUrgentOnly(newUrgentOnly)
    filterProducts(searchQuery, selectedCategory, selectedUniversity, newUrgentOnly)
  }

  const getSavingsPercentage = (price: number, original: number) => {
    return Math.round(((original - price) / original) * 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge variant="outline">Used Products</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">List Your Items</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Package className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold mb-4">Graduating Student Sales</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Find amazing deals from graduating students selling their academic items
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} placeholder="Search textbooks, electronics, dorm items..." />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">65%</div>
              <div className="text-sm text-muted-foreground">Avg Savings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">234</div>
              <div className="text-sm text-muted-foreground">Items Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-muted-foreground">Graduating Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="textbooks">Textbooks</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="dorm bundle">Dorm Bundle</SelectItem>
              <SelectItem value="lab equipment">Lab Equipment</SelectItem>
              <SelectItem value="art supplies">Art Supplies</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedUniversity} onValueChange={handleUniversityChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              <SelectItem value="ho technical">Ho Technical University</SelectItem>
              <SelectItem value="university of ghana">University of Ghana</SelectItem>
              <SelectItem value="knust">KNUST</SelectItem>
              <SelectItem value="gimpa">GIMPA</SelectItem>
              <SelectItem value="cape coast">University of Cape Coast</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={showUrgentOnly ? "default" : "outline"} onClick={toggleUrgent}>
            <Clock className="h-4 w-4 mr-2" />
            Urgent Sales Only
          </Button>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {usedProducts.length} items from graduating students
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all hover:scale-105 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.urgent && (
                    <Badge className="bg-red-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {getSavingsPercentage(product.priceUSD, product.originalPrice)}% OFF
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  {product.verified && <Badge className="bg-blue-500">✓ Verified</Badge>}
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <Badge variant="secondary">{product.condition}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <PriceDisplayComponent priceUSD={product.priceUSD} size="lg" primaryCurrency="cedis" />
                    <p className="text-xs text-muted-foreground line-through">
                      Was ₵{(product.originalPrice * 12.5).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      Save ₵{((product.originalPrice - product.priceUSD) * 12.5).toFixed(0)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{product.seller}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{product.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Graduating {product.graduationDate}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{product.reason}"</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.items.slice(0, 3).map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {product.items.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.items.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">Posted {product.timePosted}</div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Message
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new listings.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedUniversity("all")
                setShowUrgentOnly(false)
                setFilteredProducts(usedProducts)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
          <GraduationCap className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Graduating Soon?</h2>
          <p className="text-muted-foreground mb-6">
            List your academic items and help incoming students while earning some money before you graduate!
          </p>
          <Button size="lg">List Your Items</Button>
        </div>
      </div>
    </div>
  )
}
