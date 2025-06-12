"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { PriceDisplay } from "@/components/price-display"
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

const allProducts: Product[] = [
  {
    id: "1",
    name: "Calculus Textbook",
    price: 120,
    currency: "GHS",
    imageUrl: "/images/products/calculus-textbook.jpg",
    category: "Textbooks",
    condition: "Used - Good",
    location: "HTU Campus",
    postedAgo: "2 hours ago",
    description:
      "Used Calculus textbook, 8th edition. Good condition with minor highlights. Essential for engineering students.",
  },
  {
    id: "2",
    name: "MacBook Air M1",
    price: 6500,
    currency: "GHS",
    imageUrl: "/images/products/macbook-air.jpg",
    category: "Electronics",
    condition: "Used - Like New",
    location: "Accra Mall",
    postedAgo: "1 day ago",
    description: "Barely used MacBook Air M1, 8GB RAM, 256GB SSD. Perfect for students. Comes with charger.",
  },
  {
    id: "3",
    name: "Mini Fridge",
    price: 400,
    currency: "GHS",
    imageUrl: "/images/products/mini-fridge.jpg",
    category: "Dorm Essentials",
    condition: "Used - Fair",
    location: "HTU Hostel",
    postedAgo: "3 days ago",
    description: "Compact mini fridge, perfect for dorm rooms. Has a small freezer compartment. Some dents.",
  },
  {
    id: "4",
    name: "Lab Coat",
    price: 80,
    currency: "GHS",
    imageUrl: "/images/products/lab-coat.jpg",
    category: "Apparel",
    condition: "Used - Good",
    location: "HTU Science Dept",
    postedAgo: "5 hours ago",
    description: "White lab coat, size M. Cleaned and ready for use. Suitable for science and medical students.",
  },
  {
    id: "5",
    name: "Nintendo Switch",
    price: 1800,
    currency: "GHS",
    imageUrl: "/images/products/nintendo-switch.jpg",
    category: "Electronics",
    condition: "Used - Good",
    location: "Legon Campus",
    postedAgo: "1 week ago",
    description: "Nintendo Switch V2 with Joy-Cons and dock. Minor scratches, works perfectly. No games included.",
  },
  {
    id: "6",
    name: "Chemistry Textbook",
    price: 90,
    currency: "GHS",
    imageUrl: "/images/products/chemistry-textbook.jpg",
    category: "Textbooks",
    condition: "Used - Good",
    location: "KNUST Campus",
    postedAgo: "4 days ago ago",
    description: "General Chemistry textbook, 10th edition. Good condition, some wear on cover.",
  },
  {
    id: "7",
    name: "Engineering Books Set",
    price: 350,
    currency: "GHS",
    imageUrl: "/images/products/engineering-books.jpg",
    category: "Textbooks",
    condition: "Used - Fair",
    location: "Takoradi Technical Uni",
    postedAgo: "2 weeks ago",
    description: "Set of 3 engineering textbooks: Thermodynamics, Fluid Mechanics, and Materials Science.",
  },
  {
    id: "8",
    name: "Dorm Room Setup",
    price: 700,
    currency: "GHS",
    imageUrl: "/images/products/dorm-setup.jpg",
    category: "Dorm Essentials",
    condition: "Used - Good",
    location: "UCC Campus",
    postedAgo: "3 days ago",
    description: "Complete dorm room setup: desk, chair, small rug, and bedside lamp. All in good condition.",
  },
  {
    id: "9",
    name: "MacBook Pro 2019",
    price: 5000,
    currency: "GHS",
    imageUrl: "/images/products/macbook-pro.jpg",
    category: "Electronics",
    condition: "Used - Good",
    location: "Central University",
    postedAgo: "1 month ago",
    description: "MacBook Pro 2019, 16GB RAM, 512GB SSD. Minor cosmetic wear, excellent performance.",
  },
  {
    id: "10",
    name: "Business Studies Books",
    price: 200,
    currency: "GHS",
    imageUrl: "/images/products/business-books.jpg",
    category: "Textbooks",
    condition: "Used - Like New",
    location: "GIMPA",
    postedAgo: "5 days ago",
    description: "Collection of business studies textbooks, including Economics, Marketing, and Management.",
  },
  {
    id: "11",
    name: "Lab Equipment Set",
    price: 250,
    currency: "GHS",
    imageUrl: "/images/products/lab-equipment.jpg",
    category: "Other",
    condition: "Used - Good",
    location: "Accra Technical Uni",
    postedAgo: "1 week ago",
    description: "Basic lab equipment set: beakers, test tubes, Bunsen burner. Ideal for chemistry students.",
  },
  {
    id: "12",
    name: "Art Supplies Kit",
    price: 150,
    currency: "GHS",
    imageUrl: "/images/products/art-supplies.jpg",
    category: "Other",
    condition: "New",
    location: "Ghana Institute of Journalism",
    postedAgo: "2 days ago",
    description: "Brand new art supplies kit: sketchbooks, pencils, paints, brushes. Perfect for art students.",
  },
  {
    id: "13",
    name: "Attack on Titan Manga Set",
    price: 300,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "Used - Like New",
    location: "HTU Campus",
    postedAgo: "1 day ago",
    description: "Volumes 1-10 of Attack on Titan manga. Excellent condition, read once.",
  },
  {
    id: "14",
    name: "My Hero Academia Figure",
    price: 180,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "New",
    location: "Accra Mall",
    postedAgo: "3 days ago",
    description: "Limited edition Izuku Midoriya (Deku) action figure. Still in box.",
  },
  {
    id: "15",
    name: "Demon Slayer Kimono Replica",
    price: 450,
    currency: "GHS",
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "Anime & Manga",
    condition: "Used - Good",
    location: "Legon Campus",
    postedAgo: "5 days ago",
    description: "Tanjiro Kamado kimono replica, size M. Worn once for cosplay.",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ["All", "Textbooks", "Electronics", "Dorm Essentials", "Apparel", "Anime & Manga", "Other"]

  const filteredProducts = allProducts.filter((product) => {
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
