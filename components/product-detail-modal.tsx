"use client"

import { useState } from "react"
import { X, Heart, Share2, MapPin, Clock, Shield, Star, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PriceDisplayComponent } from "@/components/price-display"
import { PaymentOptions } from "@/components/payment-options"

interface Product {
  id: number
  title: string
  priceUSD: number
  image: string
  seller: string
  condition: string
  category: string
  tokenId: string
  verified: boolean
  university: string
  description?: string
  features?: string[]
  timePosted?: string
  views?: number
  location?: string
  rating?: number
  totalSales?: number
}

interface ProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const images = [product.image, product.image, product.image] // Mock multiple images

  const handleBuyNow = () => {
    setShowPayment(true)
  }

  const processPurchase = () => {
    if (selectedPayment) {
      alert(`Purchase initiated! Payment method: ${selectedPayment}`)
      onClose()
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "bg-green-500"
      case "like new":
        return "bg-blue-500"
      case "excellent":
        return "bg-purple-500"
      case "good":
        return "bg-yellow-500"
      case "fair":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getConditionDescription = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "Brand new, never used, in original packaging"
      case "like new":
        return "Barely used, no visible wear, excellent condition"
      case "excellent":
        return "Lightly used, minor signs of wear, fully functional"
      case "good":
        return "Used with normal wear, good working condition"
      case "fair":
        return "Well used, visible wear but still functional"
      default:
        return "Condition details not specified"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">#{product.tokenId}</Badge>
            {product.verified && <Badge className="bg-green-500">✓ Verified Seller</Badge>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-white/80 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{product.category}</Badge>
                <Badge className={getConditionColor(product.condition)}>{product.condition}</Badge>
              </div>
              <PriceDisplayComponent priceUSD={product.priceUSD} size="lg" showAllCurrencies />
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {product.seller.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{product.seller}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating || 4.8}</span>
                        <span>•</span>
                        <span>{product.totalSales || 23} sales</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Condition Details */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Condition Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getConditionColor(product.condition)}`}></div>
                    <span className="font-medium">{product.condition}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{getConditionDescription(product.condition)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                {product.description ||
                  "This is a high-quality item in excellent condition. Perfect for students who need reliable equipment for their studies. Has been well-maintained and comes from a smoke-free environment."}
              </p>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location & Time */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{product.location || product.university}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{product.timePosted || "2 hours ago"}</span>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            {!showPayment ? (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Seller
                </Button>
                <Button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-green-500 to-blue-600">
                  <Zap className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <PaymentOptions
                  selectedOption={selectedPayment}
                  onSelect={setSelectedPayment}
                  amount={product.priceUSD}
                  showCryptoFirst={false}
                />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowPayment(false)}>
                    Back
                  </Button>
                  <Button
                    onClick={processPurchase}
                    disabled={!selectedPayment}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-600"
                  >
                    Complete Purchase
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
