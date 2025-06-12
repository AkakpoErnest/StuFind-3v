"use client"

import { Badge } from "@/components/ui/badge"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Wallet, TrendingUp, Gift, CalendarDays, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
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
  const { user, updateUserData, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isClaimingDaily, setIsClaimingDaily] = useState(false)
  const [isClaimingVerify, setIsClaimingVerify] = useState(false)
  const [timeToNextClaim, setTimeToNextClaim] = useState<string | null>(null)

  const userTokens = user?.stufindTokens || 0
  const dailyStreak = user?.daily_streak || 0
  const nextDailyClaimTime = user?.next_daily_claim_time || 0
  const claimedRewards = user?.claimedRewards || []

  const hasClaimedVerifyReward = claimedRewards.includes("verify-student")

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now()
      if (nextDailyClaimTime > now) {
        const timeLeft = nextDailyClaimTime - now
        const hours = Math.floor(timeLeft / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        setTimeToNextClaim(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        )
      } else {
        setTimeToNextClaim("Ready to claim!")
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [nextDailyClaimTime])

  const handleClaimDailyReward = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to claim daily rewards.",
        variant: "destructive",
      })
      return
    }

    setIsClaimingDaily(true)
    try {
      const response = await fetch("/api/stufind-tokens/claim-daily", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Daily Reward Claimed!",
          description: `You received ${data.amount} StuFind Tokens! Streak: ${data.newStreak}`,
          variant: "default",
        })
        updateUserData({
          ...user,
          stufindTokens: data.newBalance,
          daily_streak: data.newStreak,
          next_daily_claim_time: data.nextClaimTime,
        })
      } else {
        toast({
          title: "Claim Failed",
          description: data.message || "Could not claim daily reward.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error claiming daily reward:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while claiming.",
        variant: "destructive",
      })
    } finally {
      setIsClaimingDaily(false)
    }
  }

  const handleClaimVerificationReward = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to claim this reward.",
        variant: "destructive",
      })
      return
    }
    if (hasClaimedVerifyReward) {
      toast({
        title: "Already Claimed",
        description: "You have already claimed your student verification reward.",
        variant: "default",
      })
      return
    }
    if (!user.isVerified) {
      toast({
        title: "Not Verified",
        description: "Please complete student verification first to claim this reward.",
        variant: "destructive",
      })
      return
    }

    setIsClaimingVerify(true)
    try {
      const response = await fetch("/api/stufind-tokens/claim-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Verification Reward Claimed!",
          description: `You received ${data.amount} StuFind Tokens for verification!`,
          variant: "default",
        })
        updateUserData({
          ...user,
          stufindTokens: data.newBalance,
          claimedRewards: [...(user.claimedRewards || []), "verify-student"],
        })
      } else {
        toast({
          title: "Claim Failed",
          description: data.message || "Could not claim verification reward.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error claiming verification reward:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while claiming.",
        variant: "destructive",
      })
    } finally {
      setIsClaimingVerify(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md text-center p-6 shadow-lg border-primary-200">
          <CardHeader>
            <Wallet className="h-16 w-16 text-primary-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-primary-700">Access Your StuFind Wallet</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to view your StuFind Tokens, claim rewards, and manage your digital assets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold">
                Sign In / Sign Up
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">Your StuFind Wallet</h1>
            <p className="text-lg text-muted-foreground">Manage your StuFind Tokens and claim exciting rewards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Token Balance Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="shadow-lg border-primary-200 bg-gradient-to-br from-primary-500 to-purple-600 text-white h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <Wallet className="h-16 w-16 mb-4" />
                  <CardDescription className="text-white/80 text-lg">Your Current Balance</CardDescription>
                  <CardTitle className="text-6xl font-extrabold mt-2">{userTokens.toLocaleString()}</CardTitle>
                  <p className="text-white/90 text-xl font-semibold mt-2">StuFind Tokens</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Rewards Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-lg border-primary-200 h-full flex flex-col">
                <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                  <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                    <CalendarDays className="h-6 w-6 text-primary-600" />
                    Daily Login Reward
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700 text-base">
                      Log in daily to earn StuFind Tokens and build your streak!
                    </p>
                    <div className="flex items-center text-lg font-semibold text-primary-600">
                      <TrendingUp className="h-5 w-5 mr-2" /> Current Streak: {dailyStreak} days
                    </div>
                    <div className="text-muted-foreground text-sm">Next claim in: {timeToNextClaim}</div>
                  </div>
                  <Button
                    onClick={handleClaimDailyReward}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 text-lg font-semibold"
                    disabled={isClaimingDaily || nextDailyClaimTime > Date.now()}
                  >
                    {isClaimingDaily ? (
                      <>
                        <span className="animate-spin mr-2">⚙️</span> Claiming...
                      </>
                    ) : (
                      <>
                        <Gift className="h-6 w-6 mr-3" /> Claim Daily Reward
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Other Rewards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-primary-200">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100">
                <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary-600" />
                  One-Time Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Student Verification Reward */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Student Verification Bonus</h3>
                    <p className="text-muted-foreground text-sm">Earn tokens for verifying your student status.</p>
                  </div>
                  <Button
                    onClick={handleClaimVerificationReward}
                    disabled={isClaimingVerify || hasClaimedVerifyReward || !user?.isVerified}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {hasClaimedVerifyReward ? "Claimed" : isClaimingVerify ? "Claiming..." : "Claim"}
                  </Button>
                </div>

                {/* Add more one-time rewards here */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 opacity-70 cursor-not-allowed">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">First Listing Bonus</h3>
                    <p className="text-muted-foreground text-sm">
                      (Coming Soon) Get tokens when you create your first marketplace listing.
                    </p>
                  </div>
                  <Button disabled>Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                    <Wallet className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Coins className="h-4 w-4 mr-2" />
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
