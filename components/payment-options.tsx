"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, CreditCard, Smartphone, Shield, Zap } from "lucide-react"

interface PaymentOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  type: "crypto" | "traditional"
  fees: string
  processingTime: string
  available: boolean
}

const paymentOptions: PaymentOption[] = [
  {
    id: "base-eth",
    name: "Base ETH",
    description: "Pay with ETH on Base network (low fees)",
    icon: <Wallet className="h-5 w-5" />,
    type: "crypto",
    fees: "~$0.01",
    processingTime: "Instant",
    available: true,
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "MTN, Vodafone, AirtelTigo",
    icon: <Smartphone className="h-5 w-5" />,
    type: "traditional",
    fees: "1.5%",
    processingTime: "1-2 minutes",
    available: true,
  },
  {
    id: "bank-card",
    name: "Bank Card",
    description: "Visa, Mastercard (Ghana banks)",
    icon: <CreditCard className="h-5 w-5" />,
    type: "traditional",
    fees: "2.5%",
    processingTime: "Instant",
    available: true,
  },
  {
    id: "usdc-base",
    name: "USDC",
    description: "Stablecoin on Base network",
    icon: <Shield className="h-5 w-5" />,
    type: "crypto",
    fees: "~$0.01",
    processingTime: "Instant",
    available: true,
  },
]

interface PaymentOptionsProps {
  selectedOption: string | null
  onSelect: (optionId: string) => void
  amount: number
  showCryptoFirst?: boolean
}

export function PaymentOptions({ selectedOption, onSelect, amount, showCryptoFirst = false }: PaymentOptionsProps) {
  const [filter, setFilter] = useState<"all" | "crypto" | "traditional">("all")

  const filteredOptions = paymentOptions.filter((option) => {
    if (filter === "all") return true
    return option.type === filter
  })

  const sortedOptions = showCryptoFirst
    ? [...filteredOptions].sort((a, b) => (a.type === "crypto" ? -1 : 1))
    : filteredOptions

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Payment Options
        </CardTitle>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "crypto" ? "default" : "outline"} size="sm" onClick={() => setFilter("crypto")}>
            Crypto
          </Button>
          <Button
            variant={filter === "traditional" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("traditional")}
          >
            Traditional
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedOption === option.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
            } ${!option.available ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => option.available && onSelect(option.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${option.type === "crypto" ? "bg-blue-100" : "bg-green-100"}`}>
                  {option.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{option.name}</h4>
                    <Badge variant={option.type === "crypto" ? "default" : "secondary"}>{option.type}</Badge>
                    {!option.available && <Badge variant="outline">Coming Soon</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span>Fee: {option.fees}</span>
                    <span>Time: {option.processingTime}</span>
                  </div>
                </div>
              </div>
              {selectedOption === option.id && (
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Secure Escrow Protection</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            All payments are protected by smart contracts. Funds are only released when both parties confirm the
            transaction.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
