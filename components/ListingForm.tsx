"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, ImageIcon, Tag, Info, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ListingForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Listing Data:", formData)
    toast({
      title: "Listing Created Successfully!",
      description: "Your item has been submitted for review.",
      variant: "default",
    })
    setIsSubmitting(false)
    // Optionally clear form or redirect
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "",
      location: "",
      image: null,
    })
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-primary-700">Create a New Listing</h1>
            <p className="text-lg text-muted-foreground">Sell your items to fellow students easily.</p>
          </div>

          <Card className="shadow-lg border-primary-200">
            <CardHeader className="bg-primary-50/50 border-b border-primary-100">
              <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                <Package className="h-6 w-6 text-primary-600" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary-500" /> Listing Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Calculus Textbook (Used)"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary-500" /> Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your item."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary-500" /> Price (GHS)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 50.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-primary-500" /> Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Textbooks">Textbooks</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Dorm Essentials">Dorm Essentials</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Anime & Manga">Anime & Manga</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition */}
                <div>
                  <Label htmlFor="condition" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary-500" /> Condition
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used - Like New">Used - Like New</SelectItem>
                      <SelectItem value="Used - Good">Used - Good</SelectItem>
                      <SelectItem value="Used - Fair">Used - Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary-500" /> Pickup Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., HTU Campus, Accra"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <ImageIcon className="h-4 w-4 text-primary-500" /> Product Image
                  </Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="text-sm text-muted-foreground mt-1">Upload a clear image of your product.</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⚙️</span> Creating Listing...
                    </>
                  ) : (
                    <>
                      <Package className="h-5 w-5 mr-2" /> Create Listing
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
