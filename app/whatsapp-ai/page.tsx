"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Bot, Settings, Zap, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function WhatsAppAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Removed h1 and p elements as per instructions */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-4">StuFind WhatsApp AI Chatbot</h1>
          <p className="text-lg text-muted-foreground">
            Connect with our AI-powered chatbot on WhatsApp for instant support, marketplace queries, and more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 text-center">
                <MessageCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold text-primary-700">Instant Support</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardDescription className="text-base text-gray-700">
                  Get immediate answers to your questions about StuFind, marketplace rules, verification, and more.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Chat on WhatsApp</Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 text-center">
                <Bot className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold text-primary-700">Marketplace Queries</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardDescription className="text-base text-gray-700">
                  Ask the bot about product availability, pricing, or even get recommendations based on your needs.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full text-primary-500 hover:bg-primary-50">
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 text-center">
                <Settings className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold text-primary-700">Customizable Bots</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardDescription className="text-base text-gray-700">
                  (Coming Soon) Create your own custom bots for student organizations or personal projects.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button disabled className="w-full">
                  Build Your Bot
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 text-center">
                <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold text-primary-700">Quick & Efficient</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardDescription className="text-base text-gray-700">
                  Our AI chatbot is designed for speed, providing quick responses to keep you moving.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full text-primary-500 hover:bg-primary-50">
                  See Features
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="shadow-lg border-primary-200 h-full flex flex-col">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 text-center">
                <Globe className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold text-primary-700">Multi-Language Support</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardDescription className="text-base text-gray-700">
                  Communicate with the bot in multiple languages for a truly inclusive experience.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full text-primary-500 hover:bg-primary-50">
                  Supported Languages
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
