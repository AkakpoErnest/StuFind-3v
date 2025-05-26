import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const products = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals - 8th Edition",
    price: 45,
    originalPrice: 120,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Sarah M.",
    condition: "Like New",
    category: "Textbooks",
    timePosted: "2 hours ago",
  },
  {
    id: 2,
    title: "MacBook Air M1 - 2021 (256GB)",
    price: 850,
    originalPrice: 1200,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Mike R.",
    condition: "Good",
    category: "Electronics",
    timePosted: "5 hours ago",
  },
  {
    id: 3,
    title: "Mini Fridge - Perfect for Dorms",
    price: 80,
    originalPrice: 150,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Emma L.",
    condition: "Excellent",
    category: "Dorm Items",
    timePosted: "1 day ago",
  },
  {
    id: 4,
    title: "Chemistry Lab Coat - Size Medium",
    price: 15,
    originalPrice: 35,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Alex K.",
    condition: "Good",
    category: "Clothing",
    timePosted: "2 days ago",
  },
  {
    id: 5,
    title: "Nintendo Switch + 3 Games Bundle",
    price: 220,
    originalPrice: 350,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Jordan P.",
    condition: "Like New",
    category: "Gaming",
    timePosted: "3 days ago",
  },
  {
    id: 6,
    title: "Organic Chemistry Textbook + Study Guide",
    price: 65,
    originalPrice: 180,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Lisa W.",
    condition: "Good",
    category: "Textbooks",
    timePosted: "4 days ago",
  },
]

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">StudentMarket</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">My Listings</Button>
              <Button variant="ghost">Messages</Button>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for items..." className="pl-10" />
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
                  <SelectItem value="condition">Best Condition</SelectItem>
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
                  <Label className="font-medium mb-3 block">Price Range</Label>
                  <div className="space-y-3">
                    <Slider defaultValue={[0, 500]} max={1000} step={10} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$0</span>
                      <span>$1000+</span>
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
              <p className="text-muted-foreground">Showing {products.length} results</p>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">{product.condition}</Badge>
                    </div>
                    <h4 className="font-semibold mb-2 line-clamp-2">{product.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>by {product.seller}</span>
                      <span>{product.timePosted}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                    <Button className="flex-1">View Details</Button>
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
