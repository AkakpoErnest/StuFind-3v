"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Coins, Gift, TrendingUp, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TokenReward {
  id: string
  action: string
  tokens: number
  description: string
  icon: React.ReactNode
  completed: boolean
}

export function StufindTokens() {
  const [tokens, setTokens] = useState(1250)
  const [dailyStreak, setDailyStreak] = useState(7)
  const [nextClaim, setNextClaim] = useState(3600) // seconds until next claim
  const [canClaim, setCanClaim] = useState(false)

  const rewards: TokenReward[] = [
    {
      id: "daily",
      action: "Daily Login",
      tokens: 10,
      description: "Login every day to earn tokens",
      icon: <Clock className="h-4 w-4" />,
      completed: true,
    },
    {
      id: "verify",
      action: "Verify Student ID",
      tokens: 100,
      description: "Complete student verification",
      icon: <Gift className="h-4 w-4" />,
      completed: false,
    },
    {
      id: "first-buy",
      action: "First Purchase",
      tokens: 50,
      description: "Make your first purchase",
      icon: <TrendingUp className="h-4 w-4" />,
      completed: false,
    },
    {
      id: "first-sell",
      action: "First Sale",
      tokens: 75,
      description: "Complete your first sale",
      icon: <Coins className="h-4 w-4" />,
      completed: false,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setNextClaim((prev) => {
        if (prev <= 1) {
          setCanClaim(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const claimDailyTokens = () => {
    setTokens((prev) => prev + 10 + dailyStreak * 2) // Bonus for streak
    setCanClaim(false)
    setNextClaim(86400) // 24 hours
    setDailyStreak((prev) => prev + 1)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {/* Token Balance */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{tokens.toLocaleString()}</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">StuFind Tokens</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Daily Streak</div>
              <div className="text-xl font-bold text-orange-600">{dailyStreak} days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Claim */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Daily Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Token Claim</p>
              <p className="text-sm text-muted-foreground">Base: 10 tokens + {dailyStreak * 2} streak bonus</p>
            </div>
            <div className="text-right">
              {canClaim ? (
                <Button onClick={claimDailyTokens} className="bg-gradient-to-r from-green-500 to-blue-600">
                  <Coins className="h-4 w-4 mr-2" />
                  Claim {10 + dailyStreak * 2}
                </Button>
              ) : (
                <div>
                  <div className="text-sm text-muted-foreground">Next claim in:</div>
                  <div className="font-mono text-lg">{formatTime(nextClaim)}</div>
                </div>
              )}
            </div>
          </div>
          <Progress value={(86400 - nextClaim) / 864} className="h-2" />
        </CardContent>
      </Card>

      {/* Reward Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Earn More Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                reward.completed ? "bg-green-50 border-green-200" : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    reward.completed ? "bg-green-500 text-white" : "bg-muted"
                  }`}
                >
                  {reward.icon}
                </div>
                <div>
                  <p className="font-medium">{reward.action}</p>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-600">+{reward.tokens}</div>
                {reward.completed && <Badge className="bg-green-500">Completed</Badge>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Token Uses */}
      <Card>
        <CardHeader>
          <CardTitle>Use Your Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Zap className="h-6 w-6 text-blue-500" />
              <div className="text-center">
                <div className="font-medium">Boost Listing</div>
                <div className="text-sm text-muted-foreground">50 tokens</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Gift className="h-6 w-6 text-purple-500" />
              <div className="text-center">
                <div className="font-medium">Premium Features</div>
                <div className="text-sm text-muted-foreground">100 tokens</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
