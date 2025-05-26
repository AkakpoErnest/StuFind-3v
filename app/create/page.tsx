import { Upload, DollarSign, Camera, Tag, Wallet, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 32 32" className="rounded-lg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
                  <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="2" />
                  <path d="16 16l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                  <rect x="20" y="22" width="8" height="2" rx="1" fill="white" opacity="0.8" />
                  <rect x="22" y="25" width="6" height="2" rx="1" fill="white" opacity="0.6" />
                </svg>
                Stufind
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                0x742d...35Cc
              </Badge>
              <Button variant="ghost">My NFTs</Button>
              <Button variant="outline">Disconnect</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create NFT Listing</h2>
            <p className="text-muted-foreground">
              Mint your item as an NFT and list it on the decentralized marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
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
                      Upload high-quality images. These will be stored on IPFS and linked to your NFT.
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
                      NFT Title
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
                      placeholder="Describe your item in detail. This will be permanently stored on the blockchain..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Blockchain */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing & Blockchain Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price */}
                  <div>
                    <Label htmlFor="price" className="text-base font-semibold">
                      Price in ETH
                    </Label>
                    <div className="relative mt-2">
                      <Input id="price" type="number" step="0.001" placeholder="0.025" className="pr-16" />
                      <span className="absolute right-3 top-3 text-sm text-muted-foreground">ETH</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">≈ $45 USD (current rate)</p>
                  </div>

                  {/* Royalties */}
                  <div>
                    <Label htmlFor="royalty" className="text-base font-semibold">
                      Creator Royalty (%)
                    </Label>
                    <Input id="royalty" type="number" placeholder="2.5" className="mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">Earn royalties on future resales of this NFT</p>
                  </div>

                  {/* Blockchain Network */}
                  <div>
                    <Label className="text-base font-semibold">Blockchain Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="polygon">Polygon (Lower fees)</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NFT Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Your NFT Title</h4>
                  <p className="text-sm text-muted-foreground mb-3">Collection: StudentMarket Items</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">-- ETH</span>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Minting Fee</span>
                    <span>0.002 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (2.5%)</span>
                    <span>0.001 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gas Fee (Est.)</span>
                    <span>0.005 ETH</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Cost</span>
                    <span>0.008 ETH</span>
                  </div>
                  <p className="text-xs text-muted-foreground">≈ $14.40 USD</p>
                </CardContent>
              </Card>

              {/* Blockchain Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blockchain Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Secure Escrow</h5>
                      <p className="text-sm text-muted-foreground">Smart contract holds payment until delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Instant Settlement</h5>
                      <p className="text-sm text-muted-foreground">Automatic payment release on confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">True Ownership</h5>
                      <p className="text-sm text-muted-foreground">NFT proves authenticity and ownership</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Alert */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Safety Reminder:</strong> Always meet in public campus locations and verify student ID before
                  completing transactions.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex gap-4 max-w-2xl">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">Mint & List NFT</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
