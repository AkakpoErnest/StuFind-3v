"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { getCurrentRates, convertPrice, type CurrencyRate, type PriceDisplay } from "@/lib/currency"

interface PriceDisplayProps {
  priceUSD: number
  size?: "sm" | "md" | "lg"
  showAllCurrencies?: boolean
  primaryCurrency?: "cedis" | "usd" | "eth"
}

export function PriceDisplayComponent({
  // CORRECTED: Changed from PriceDisplayComponent to PriceDisplay
  priceUSD = 0,
  size = "md",
  showAllCurrencies = false,
  primaryCurrency = "cedis",
}: PriceDisplayProps) {
  const [rates, setRates] = useState<CurrencyRate | null>(null)
  const [prices, setPrices] = useState<PriceDisplay | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState(primaryCurrency)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRates()
  }, [])

  useEffect(() => {
    if (rates && typeof priceUSD === "number" && !isNaN(priceUSD)) {
      try {
        setPrices(convertPrice(priceUSD, rates))
        setError(null)
      } catch (err) {
        console.error("Error converting price:", err)
        setError("Price conversion failed")
      }
    }
  }, [priceUSD, rates])

  const loadRates = async () => {
    try {
      setLoading(true)
      setError(null)
      const newRates = await getCurrentRates()
      setRates(newRates)
    } catch (error) {
      console.error("Failed to load rates:", error)
      setError("Failed to load exchange rates")
      // Set fallback rates
      setRates({
        usd: 1,
        ghs: 12.5,
        eth: 1800,
      })
    } finally {
      setLoading(false)
    }
  }

  const cycleCurrency = () => {
    const currencies = ["cedis", "usd", "eth"] as const
    const currentIndex = currencies.indexOf(currentCurrency)
    const nextIndex = (currentIndex + 1) % currencies.length
    setCurrentCurrency(currencies[nextIndex])
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    )
  }

  if (error || !prices) {
    return <div className="text-red-500 text-sm">Price unavailable</div>
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }

  const primaryPrice = prices.formatted[currentCurrency]
  const primaryLabel = currentCurrency === "cedis" ? "GHS" : currentCurrency === "usd" ? "USD" : "ETH"

  if (showAllCurrencies) {
    return (
      <div className="space-y-2">
        <div className={`font-bold text-blue-600 ${sizeClasses[size]}`}>{prices.formatted.cedis}</div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{prices.formatted.usd}</span>
          <span>•</span>
          <span>{prices.formatted.eth}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold text-blue-600 ${sizeClasses[size]}`}>{primaryPrice}</span>
      <Button variant="ghost" size="sm" onClick={cycleCurrency} className="h-6 px-2 text-xs">
        <RotateCcw className="h-3 w-3 mr-1" />
        {primaryLabel}
      </Button>
    </div>
  )
}
