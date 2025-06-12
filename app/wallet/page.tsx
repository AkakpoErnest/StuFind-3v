"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ShoppingBag, DollarSign } from "lucide-react"
import { StufindLogo } from "@/components/stufind-logo" // StufindLogo is safe for SSR

// Dynamically import WalletConnect with SSR disabled
const DynamicWalletConnect = dynamic(() => import("@/components/wallet-connect").then((mod) => mod.WalletConnect), {
  ssr: false, // This is the key: prevents server-side rendering of this component
  loading: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 animate-pulse" />
          Loading Wallet...
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Please wait while we prepare your wallet connection.</p>
      </CardContent>
    </Card>
  ), // Optional loading state
})

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
                StuFind
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wallet Connection */}
            <div className="space-y-6">
              <DynamicWalletConnect /> {/* Use the dynamically imported component here */}
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
