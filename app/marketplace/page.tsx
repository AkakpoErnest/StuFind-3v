"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, SlidersHorizontal, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { StufindLogo } from "@/components/stufind-logo"
import { PriceDisplayComponent } from "@/components/price-display"

const products = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals - 8th Edition",
    priceUSD: 45,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Kwame A.",
    condition: "Like New",
    category: "Textbooks",
    tokenId: "1001",
    timePosted: "2 hours ago",
    verified: true,
    views: 24,
    university: "University of Ghana",
    location: "Legon Campus",
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
    timePosted: "5 hours ago",
    verified: true,
    views: 89,
    university: "KNUST",
    location: "Kumasi Campus",
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
    timePosted: "1 day ago",
    verified: false,
    views: 15,
    university: "Ashesi University",
    location: "Berekuso Campus",
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
    timePosted: "2 days ago",
    verified: true,
    views: 7,
    university: "UCC",
    location: "Cape Coast Campus",
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
    timePosted: "3 days ago",
    verified: true,
    views: 56,
    university: "University of Ghana",
    location: "Legon Campus",
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
    timePosted: "4 days ago",
    verified: false,
    views: 33,
    university: "KNUST",
    location: "Kumasi Campus",
  },
]

export default function MarketplacePage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Kwame A.
              </Badge>
              <Button variant="ghost">My Items</Button>
              <Button>Create Listing</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">₵89,400</div>
              <div className="text-sm text-muted-foreground">24h Volume</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-muted-foreground">Active Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">₵31.25</div>
              <div className="text-sm text-muted-foreground">Avg Price</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">456</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search items by name, category, or university..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="trending">Most Popular</SelectItem>
                  <SelectItem value="nearby">Nearby First</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* University Filter */}
                <div>
                  <Label className="font-medium mb-3 block">University</Label>
                  <div className="space-y-2">
                    {["University of Ghana", "KNUST", "Ashesi University", "UCC", "GIMPA"].map((university) => (
                      <div key={university} className="flex items-center space-x-2">
                        <Checkbox id={university} />
                        <Label htmlFor={university} className="text-sm">
                          {university}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="font-medium mb-3 block">Category</Label>
                  <div className="space-y-2">
                    {["Textbooks", "Electronics", "Clothing", "Dorm Items", "Gaming", "Food & Drinks"].map(
                      (category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={category} />
                          <Label htmlFor={category} className="text-sm">
                            {category}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="font-medium mb-3 block">Price Range (₵)</Label>
                  <div className="space-y-3">
                    <Slider defaultValue={[0, 1000]} max={2000} step={10} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₵0</span>
                      <span>₵2000+</span>
                    </div>
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <Label className="font-medium mb-3 block">Condition</Label>
                  <div className="space-y-2">
                    {["New", "Like New", "Excellent", "Good", "Fair"].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition} />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">Showing {products.length} items</p>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/20"
                >
                  <CardHeader className="p-0 relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge variant="secondary" className="bg-black/80 text-white">
                        #{product.tokenId}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      {product.verified && <Badge className="bg-green-500">✓ Verified</Badge>}
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white/90">
                        <Clock className="h-3 w-3 mr-1" />
                        {product.views}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">{product.condition}</Badge>
                    </div>
                    <h4 className="font-semibold mb-2 line-clamp-2">{product.title}</h4>
                    <PriceDisplayComponent priceUSD={product.priceUSD} size="lg" primaryCurrency="cedis" />
                    <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{product.seller}</span>
                      <span>{product.timePosted}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{product.university}</div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600">Buy Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Items
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
