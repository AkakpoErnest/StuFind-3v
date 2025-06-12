"use client"

import { WalletConnect } from "@/components/wallet-connect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ShoppingBag, DollarSign } from "lucide-react"

const StufindLogo = () => (
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
)

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
                <StufindLogo />
                Stufind
              </h1>
              <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Ethereum
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Browse</Button>
              <Button variant="ghost">Create</Button>
              <Button>My NFTs</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground">Connect your Ethereum wallet to start buying and selling on Stufind</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wallet Connection */}
            <div className="space-y-6">
              <WalletConnect />

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Create Listing
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Connect Your Wallet?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Secure Transactions</h4>
                      <p className="text-sm text-muted-foreground">
                        All payments are protected by Ethereum smart contracts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Own Your Listings</h4>
                      <p className="text-sm text-muted-foreground">Each listing becomes an NFT that you truly own</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Instant Payments</h4>
                      <p className="text-sm text-muted-foreground">Receive ETH payments instantly when items sell</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported Wallets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">MetaMask</h4>
                      <p className="text-sm text-muted-foreground">Most popular Ethereum wallet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">W</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">WalletConnect</h4>
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Coinbase Wallet</h4>
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gas Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Gas Price:</span>
                      <span className="text-sm font-semibold">25 gwei</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Listing Cost:</span>
                      <span className="text-sm font-semibold">~$8-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Purchase Cost:</span>
                      <span className="text-sm font-semibold">~$5-8</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Gas fees vary based on network congestion. We recommend using Ethereum during off-peak hours for
                    lower fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
