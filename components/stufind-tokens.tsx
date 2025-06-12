"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Coins, Gift, TrendingUp, Clock, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth/auth-provider"
import { motion } from "framer-motion"

interface TokenReward {
  id: string
  action: string
  tokens: number
  description: string
  icon: React.ReactNode
  claimed: boolean // Changed from 'completed' to 'claimed' for clarity
}

export function StufindTokens() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const [tokens, setTokens] = useState(user?.stufindTokens || 0)
  const [dailyStreak, setDailyStreak] = useState(user?.dailyStreak || 0)
  const [nextDailyClaimTime, setNextDailyClaimTime] = useState(user?.nextDailyClaimTime || 0) // Unix timestamp
  const [canClaimDaily, setCanClaimDaily] = useState(false)
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]) // Stores IDs of claimed one-time rewards

  const rewards: TokenReward[] = [
    {
      id: "daily",
      action: "Daily Login",
      tokens: 10,
      description: "Login every day to earn tokens",
      icon: <Clock className="h-4 w-4" />,
      claimed: false, // This will be dynamically set
    },
    {
      id: "first-login",
      action: "First Login Bonus",
      tokens: 50,
      description: "Claim tokens for your very first login",
      icon: <Gift className="h-4 w-4" />,
      claimed: claimedRewards.includes("first-login"),
    },
    {
      id: "verify-student",
      action: "Verify Student ID",
      tokens: 100,
      description: "Complete student verification",
      icon: <CheckCircle className="h-4 w-4" />,
      claimed: claimedRewards.includes("verify-student"),
    },
    {
      id: "first-purchase",
      action: "First Purchase",
      tokens: 50,
      description: "Make your first purchase",
      icon: <TrendingUp className="h-4 w-4" />,
      claimed: claimedRewards.includes("first-purchase"),
    },
    {
      id: "first-sale",
      action: "First Sale",
      tokens: 75,
      description: "Complete your first sale",
      icon: <Coins className="h-4 w-4" />,
      claimed: claimedRewards.includes("first-sale"),
    },
  ]

  // Update local state when user context changes
  useEffect(() => {
    if (user) {
      setTokens(user.stufindTokens || 0)
      setDailyStreak(user.dailyStreak || 0)
      setNextDailyClaimTime(user.nextDailyClaimTime || 0)
      setClaimedRewards(user.claimedRewards || [])
    }
  }, [user])

  // Timer for daily claim
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const timeLeft = nextDailyClaimTime - now
      if (timeLeft <= 0) {
        setCanClaimDaily(true)
        return 0
      }
      return Math.floor(timeLeft / 1000) // Convert ms to seconds
    }

    const timer = setInterval(() => {
      setNextDailyClaimTime((prev) => {
        const timeLeft = calculateTimeLeft()
        if (timeLeft <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1000 // Decrement by 1 second
      })
    }, 1000)

    // Initial check
    setCanClaimDaily(calculateTimeLeft() <= 0)

    return () => clearInterval(timer)
  }, [nextDailyClaimTime])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000))
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClaim = useCallback(
    async (rewardId: string, amount: number) => {
      if (!isAuthenticated || !user?.id) return

      try {
        const response = await fetch("/api/tokens/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, rewardType: rewardId, amount }),
        })

        if (response.ok) {
          const data = await response.json()
          updateUser({
            stufindTokens: data.newBalance,
            dailyStreak: data.newDailyStreak,
            nextDailyClaimTime: data.newNextDailyClaimTime,
            claimedRewards: data.newClaimedRewards,
          })
          setTokens(data.newBalance)
          setDailyStreak(data.newDailyStreak)
          setNextDailyClaimTime(data.newNextDailyClaimTime)
          setClaimedRewards(data.newClaimedRewards)
          alert(`Successfully claimed ${amount} tokens for ${rewardId}!`)
        } else {
          const errorData = await response.json()
          alert(`Failed to claim tokens: ${errorData.error}`)
        }
      } catch (error) {
        console.error("Error claiming tokens:", error)
        alert("An unexpected error occurred while claiming tokens.")
      }
    },
    [isAuthenticated, user, updateUser],
  )

  const dailyReward = rewards.find((r) => r.id === "daily")!
  const dailyClaimAmount = dailyReward.tokens + dailyStreak * 2

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gradient-to-br from-primary-50 to-background min-h-screen">
      {/* Token Balance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="card-v21 bg-gradient-to-r from-accent-yellow-500 to-accent-yellow-700 text-white shadow-lg hover-lift-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold drop-shadow-sm">{tokens.toLocaleString()}</h3>
                <p className="text-sm opacity-90">StuFind Tokens</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Daily Streak</div>
              <div className="text-2xl font-bold">{dailyStreak} days</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Claim */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="card-v21">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-700">
              <Gift className="h-6 w-6" />
              Daily Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-lg">Daily Token Claim</p>
                <p className="text-sm text-muted-foreground">
                  Base: {dailyReward.tokens} tokens + {dailyStreak * 2} streak bonus
                </p>
              </div>
              <div className="text-center sm:text-right">
                {canClaimDaily ? (
                  <Button
                    onClick={() => handleClaim("daily", dailyClaimAmount)}
                    className="btn-v21-primary"
                    disabled={!isAuthenticated}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Claim {dailyClaimAmount}
                  </Button>
                ) : (
                  <div>
                    <div className="text-sm text-muted-foreground">Next claim in:</div>
                    <div className="font-mono text-xl font-bold text-primary-600">
                      {formatTime(nextDailyClaimTime - Date.now())}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Progress
              value={((Date.now() - (nextDailyClaimTime - 86400000)) / 86400000) * 100}
              className="h-2 bg-primary-100"
              indicatorClassName="bg-gradient-to-r from-primary-400 to-primary-600"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* One-Time Reward Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-v21">
          <CardHeader>
            <CardTitle className="text-primary-700">Earn More Tokens (One-Time Rewards)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rewards
              .filter((r) => r.id !== "daily") // Filter out daily reward
              .map((reward) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border ${
                    reward.claimed
                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-700"
                      : "bg-primary-50 border-primary-100"
                  } hover-lift-shadow`}
                >
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                        reward.claimed ? "bg-green-500 text-white" : "bg-primary-200 text-primary-700"
                      }`}
                    >
                      {reward.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-base">{reward.action}</p>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col sm:flex-row items-end sm:items-center gap-2">
                    <div className="font-bold text-lg text-accent-yellow-700">+{reward.tokens}</div>
                    {reward.claimed ? (
                      <Badge className="bg-green-500 text-white">Claimed</Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleClaim(reward.id, reward.tokens)}
                        disabled={!isAuthenticated || claimedRewards.includes(reward.id)}
                        className="btn-v21-primary"
                      >
                        Claim
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Token Uses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="card-v21">
          <CardHeader>
            <CardTitle className="text-primary-700">Use Your Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="btn-v21-outline h-auto p-4 flex flex-col items-center gap-2 hover-lift-shadow"
              >
                <Zap className="h-8 w-8 text-blue-500" />
                <div className="text-center">
                  <div className="font-medium text-base">Boost Listing</div>
                  <div className="text-sm text-muted-foreground">50 tokens</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="btn-v21-outline h-auto p-4 flex flex-col items-center gap-2 hover-lift-shadow"
              >
                <Gift className="h-8 w-8 text-purple-500" />
                <div className="text-center">
                  <div className="font-medium text-base">Premium Features</div>
                  <div className="text-sm text-muted-foreground">100 tokens</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
