"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, User, CheckCircle, AlertCircle } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { PriceDisplayComponent } from "@/components/price-display"
import { ProductDetailModal } from "@/components/product-detail-modal"

const usedProducts = [
  {
    id: 1,
    title: "Complete Engineering Textbook Set",
    description: "All my mechanical engineering textbooks from 4 years. Perfect for incoming students!",
    priceUSD: 120,
    originalPrice: 450,
    image: "/images/products/engineering-books.jpg",
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
    image: "/images/products/dorm-setup.jpg",
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
    image: "/images/products/macbook-pro.jpg",
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
    image: "/images/products/business-books.jpg",
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
    image: "/images/products/lab-equipment.jpg",
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
    image: "/images/products/art-supplies.jpg",
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
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Used Products</h1>
          <p className="text-muted-foreground">Quality pre-owned items from graduating students at great prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usedProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.urgent && (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Urgent
                  </Badge>
                )}
                {product.verified && (
                  <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{product.seller}</span>
                  <Badge variant="outline" className="text-xs">
                    {product.condition}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <PriceDisplayComponent priceUSD={product.priceUSD} size="sm" />
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{product.university}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{product.timePosted}</span>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </PageWrapper>
  )
}
