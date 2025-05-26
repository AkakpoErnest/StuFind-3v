import { Upload, DollarSign, Camera, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SellPage() {
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">List Your Item</h2>
            <p className="text-muted-foreground">Create a listing to sell your item to fellow students</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photos */}
              <div>
                <Label className="text-base font-semibold">Photos</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add up to 8 photos. The first photo will be your cover photo.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Add Photo</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer opacity-50">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Add Photo</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Title
                </Label>
                <Input id="title" placeholder="e.g., Calculus Textbook - 8th Edition" className="mt-2" />
              </div>

              {/* Category */}
              <div>
                <Label className="text-base font-semibold">Category</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textbooks">Textbooks</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="dorm">Dorm Items</SelectItem>
                    <SelectItem value="food">Food & Drinks</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Condition */}
              <div>
                <Label className="text-base font-semibold">Condition</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item, including any flaws or special features..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-base font-semibold">
                  Price
                </Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="price" type="number" placeholder="0.00" className="pl-10" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Set a competitive price to sell faster</p>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-base font-semibold">
                  Pickup Location
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campus-center">Campus Center</SelectItem>
                    <SelectItem value="library">Main Library</SelectItem>
                    <SelectItem value="student-union">Student Union</SelectItem>
                    <SelectItem value="dorm-lobby">Dorm Lobby</SelectItem>
                    <SelectItem value="other">Other (specify in description)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    ✓
                  </Badge>
                  <span>Meet in public places on campus</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    ✓
                  </Badge>
                  <span>Verify student ID before meeting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    ✓
                  </Badge>
                  <span>Use cash or secure payment methods</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    ✓
                  </Badge>
                  <span>Trust your instincts</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1">Publish Listing</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
