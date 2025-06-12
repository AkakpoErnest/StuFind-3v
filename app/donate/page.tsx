"use client"

import { useState } from "react"
import { Heart, Target, Users, TrendingUp, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { PaymentOptions } from "@/components/payment-options"

const campaigns = [
  {
    id: 1,
    title: "Help Kwame Get a Laptop for Engineering",
    description:
      "Computer Engineering student at KNUST needs a laptop to complete his final year project on IoT systems.",
    student: "Kwame Asante",
    university: "KNUST",
    target: 2500,
    raised: 1850,
    donors: 23,
    daysLeft: 12,
    image: "/placeholder.svg?height=200&width=300",
    category: "Education",
    verified: true,
    story:
      "I'm a final year Computer Engineering student working on an IoT project for smart farming. I need a laptop to run development tools and simulations.",
  },
  {
    id: 2,
    title: "Medical Textbooks for Ama",
    description: "Medical student at University of Ghana needs textbooks for her clinical rotations.",
    student: "Ama Osei",
    university: "University of Ghana",
    target: 800,
    raised: 650,
    donors: 15,
    daysLeft: 8,
    image: "/placeholder.svg?height=200&width=300",
    category: "Textbooks",
    verified: true,
    story:
      "Starting my clinical rotations next month and need essential medical textbooks. These books are expensive but crucial for my studies.",
  },
  {
    id: 3,
    title: "Stufind Platform Development Fund",
    description: "Help us build new features and expand Stufind to more universities across Ghana.",
    student: "Stufind Team",
    university: "Platform Development",
    target: 10000,
    raised: 3200,
    donors: 67,
    daysLeft: 30,
    image: "/placeholder.svg?height=200&width=300",
    category: "Platform",
    verified: true,
    story:
      "We're building the future of student commerce in Ghana. Your donation helps us add new features, support more universities, and keep the platform free for students.",
  },
  {
    id: 4,
    title: "Art Supplies for Akosua's Portfolio",
    description: "Fine Arts student needs professional art supplies to complete her graduation portfolio.",
    student: "Akosua Mensah",
    university: "Ashesi University",
    target: 600,
    raised: 420,
    donors: 12,
    daysLeft: 15,
    image: "/placeholder.svg?height=200&width=300",
    category: "Arts",
    verified: false,
    story:
      "I'm creating my final portfolio for my Fine Arts degree. Professional art supplies are expensive but essential for quality work that will help me get into graduate school.",
  },
]

export default function DonatePage() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const handleDonate = (campaignId: number) => {
    setSelectedCampaign(campaignId)
    setShowPayment(true)
  }

  const processDonation = () => {
    if (donationAmount && selectedPayment) {
      // In a real app, this would process the payment
      alert(`Thank you for donating ₵${donationAmount}! Your payment via ${selectedPayment} is being processed.`)
      setShowPayment(false)
      setDonationAmount("")
      setSelectedPayment(null)
    }
  }

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge variant="outline">Donate & Support</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">Start Campaign</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Support Fellow Students</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Help Ghanaian students achieve their academic dreams. Every donation, no matter the size, makes a
            difference.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₵45,230</div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-sm text-muted-foreground">Students Helped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">892</div>
              <div className="text-sm text-muted-foreground">Donors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">23</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Active Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    {campaign.verified && <Badge className="bg-green-500">✓ Verified</Badge>}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{campaign.student}</span>
                    <span>•</span>
                    <span>{campaign.university}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">₵{campaign.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">₵{campaign.target.toLocaleString()}</span>
                    </div>
                    <Progress value={getProgressPercentage(campaign.raised, campaign.target)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{campaign.donors} donors</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm italic">"{campaign.story}"</p>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Share
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-600"
                    onClick={() => handleDonate(campaign.id)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-muted/50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How Donations Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Choose a Campaign</h3>
              <p className="text-sm text-muted-foreground">
                Browse verified campaigns from students across Ghana who need support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Make a Donation</h3>
              <p className="text-sm text-muted-foreground">
                Donate any amount using Mobile Money, Bank Card, or Crypto.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Track Impact</h3>
              <p className="text-sm text-muted-foreground">
                Get updates on how your donation is helping students succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Start Your Own Campaign */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8">
          <Users className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Need Support for Your Studies?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Create your own campaign and get support from the Stufind community. Whether you need textbooks, equipment,
            or tuition assistance, we're here to help.
          </p>
          <Button size="lg">Start Your Campaign</Button>
        </div>
      </div>

      {/* Donation Modal */}
      {showPayment && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Supporting: {campaigns.find((c) => c.id === selectedCampaign)?.title}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount (₵)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 200].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      ₵{amount}
                    </Button>
                  ))}
                </div>
              </div>

              <PaymentOptions
                selectedOption={selectedPayment}
                onSelect={setSelectedPayment}
                amount={Number(donationAmount) || 0}
                showCryptoFirst={false}
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowPayment(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={processDonation} disabled={!donationAmount || !selectedPayment}>
                Donate ₵{donationAmount}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
