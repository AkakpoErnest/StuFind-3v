"use client"

import { useState } from "react"
import { MessageCircle, Bot, Smartphone, Zap, Shield, Users, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function WhatsAppAIPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const whatsappNumber = "+233 50 123 4567"
  const qrCodeUrl = "/placeholder.svg?height=200&width=200&text=WhatsApp+QR"

  const availableFeatures = [
    { id: "marketplace", name: "Marketplace Search", description: "Search and browse items via WhatsApp" },
    { id: "price-alerts", name: "Price Alerts", description: "Get notified when items match your budget" },
    { id: "verification", name: "Student Verification", description: "Verify student status through WhatsApp" },
    { id: "payment", name: "Payment Assistance", description: "Help with Mobile Money and crypto payments" },
    { id: "support", name: "24/7 Support", description: "Instant customer support and help" },
    { id: "notifications", name: "Smart Notifications", description: "Get updates on your listings and purchases" },
  ]

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) => (prev.includes(featureId) ? prev.filter((f) => f !== featureId) : [...prev, featureId]))
  }

  const copyWhatsAppNumber = () => {
    navigator.clipboard.writeText(whatsappNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const createChatbot = () => {
    // This would integrate with WhatsApp Business API
    alert("WhatsApp AI Chatbot created successfully! You'll receive setup instructions via WhatsApp.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge variant="outline">WhatsApp AI</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">Documentation</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <MessageCircle className="h-16 w-16 text-green-500" />
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">WhatsApp AI Chatbot</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Create intelligent WhatsApp chatbots for your student marketplace. Automate customer support, handle
            inquiries, and boost sales 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chatbot Builder */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Create Your AI Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business/Service Name</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Stufind Marketplace Assistant"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">WhatsApp Business Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Chatbot Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your chatbot should help users with..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Select Features</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {availableFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          features.includes(feature.id)
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleFeature(feature.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                          {features.includes(feature.id) && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={createChatbot} className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                  <Bot className="h-4 w-4 mr-2" />
                  Create AI Chatbot
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Demo & Info */}
          <div className="space-y-6">
            {/* Try Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Try Our Demo Bot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Experience our AI chatbot in action. Send a message to our demo WhatsApp number.
                </p>

                <div className="flex items-center justify-center">
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="WhatsApp QR Code"
                    className="w-48 h-48 border rounded-lg"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Or message directly:</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="bg-muted px-3 py-1 rounded">{whatsappNumber}</code>
                    <Button variant="outline" size="sm" onClick={copyWhatsAppNumber}>
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open in WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Why WhatsApp AI?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Instant Responses</h4>
                    <p className="text-sm text-muted-foreground">AI responds to customer inquiries 24/7 in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Student-Friendly</h4>
                    <p className="text-sm text-muted-foreground">Understands student needs and marketplace context</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure & Private</h4>
                    <p className="text-sm text-muted-foreground">End-to-end encrypted conversations on WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Multi-Language</h4>
                    <p className="text-sm text-muted-foreground">
                      Supports English, Twi, Ga, and other local languages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Customer Support</h3>
                <p className="text-sm text-muted-foreground">
                  Handle common questions about payments, shipping, returns, and account issues automatically.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Bot className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">Product Search</h3>
                <p className="text-sm text-muted-foreground">
                  Help students find specific textbooks, electronics, or dorm items through conversational search.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="font-semibold mb-2">Order Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Send automated updates about order status, payment confirmations, and delivery notifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold">Free</div>
                <p className="text-sm text-muted-foreground">Perfect for testing</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 100 messages/month</li>
                  <li>✓ Basic AI responses</li>
                  <li>✓ 1 WhatsApp number</li>
                  <li>✓ Email support</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <Badge className="w-fit">Most Popular</Badge>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold">₵50/month</div>
                <p className="text-sm text-muted-foreground">For growing businesses</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 5,000 messages/month</li>
                  <li>✓ Advanced AI features</li>
                  <li>✓ 3 WhatsApp numbers</li>
                  <li>✓ Analytics dashboard</li>
                  <li>✓ Priority support</li>
                </ul>
                <Button className="w-full mt-4">Choose Pro</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">₵200/month</div>
                <p className="text-sm text-muted-foreground">For large organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited messages</li>
                  <li>✓ Custom AI training</li>
                  <li>✓ Unlimited numbers</li>
                  <li>✓ API access</li>
                  <li>✓ Dedicated support</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg p-8">
          <MessageCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Customer Support?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of Ghanaian businesses using WhatsApp AI to provide better customer service and increase
            sales.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600">
            Create Your Chatbot Now
          </Button>
        </div>
      </div>
    </div>
  )
}
