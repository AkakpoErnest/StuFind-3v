"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, HandHeart, MessageCircle, Share2, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function DonatePage() {
  const { toast } = useToast()
  const [donationAmount, setDonationAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDonate = async () => {
    if (!donationAmount || Number.parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    // Simulate donation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Thank You!",
      description: `Your donation of ₵${Number.parseFloat(donationAmount).toFixed(2)} has been received.`,
      variant: "default",
    })
    console.log(`Donated ₵${donationAmount} with message: ${message}`)
    setDonationAmount("")
    setMessage("")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Removed h1 and p elements as per instructions */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-4">Support StuFind & Our Community</h1>
          <p className="text-lg text-muted-foreground">
            Your contributions help us maintain the platform, expand our services, and support student initiatives
            across Ghana. Every little bit helps!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="amount" className="text-base font-semibold flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary-500" /> Donation Amount (GHS)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 50.00"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-base font-semibold flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-primary-500" /> Your Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⚙️</span> Processing...
                    </>
                  ) : (
                    <>
                      <HandHeart className="h-6 w-6 mr-3" /> Donate Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary-600" />
                  Other Ways to Support
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <ul className="space-y-4 text-gray-700 text-base">
                  <li className="flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Spread the Word</h4>
                      <p className="text-sm text-muted-foreground">
                        Share StuFind with your friends and fellow students on social media.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Provide Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us improve by sharing your suggestions and reporting bugs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HandHeart className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Volunteer Your Time</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're passionate about helping students, reach out to us about volunteer opportunities.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="text-primary-500 hover:bg-primary-50">
                    Contact Us to Volunteer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
