export interface CurrencyRate {
  usd: number
  ghs: number // Ghana Cedis
  eth: number
}

export interface PriceDisplay {
  cedis: number
  usd: number
  eth: number
  formatted: {
    cedis: string
    usd: string
    eth: string
  }
}

// Mock exchange rates - in production, fetch from API
export const getCurrentRates = async (): Promise<CurrencyRate> => {
  try {
    // In production, use real API like CoinGecko or exchangerate-api.com
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,ghs")
    const data = await response.json()

    return {
      usd: 1,
      ghs: data.ethereum?.ghs || 12.5, // Fallback rate
      eth: data.ethereum?.usd || 1800,
    }
  } catch (error) {
    console.error("Error fetching rates:", error)
    // Fallback rates
    return {
      usd: 1,
      ghs: 12.5, // 1 USD = 12.5 GHS (approximate)
      eth: 1800, // 1 ETH = 1800 USD (approximate)
    }
  }
}

export const convertPrice = (priceInUSD: number, rates: CurrencyRate): PriceDisplay => {
  const cedis = priceInUSD * rates.ghs
  const eth = priceInUSD / rates.eth

  return {
    cedis,
    usd: priceInUSD,
    eth,
    formatted: {
      cedis: `₵${cedis.toFixed(2)}`,
      usd: `$${priceInUSD.toFixed(2)}`,
      eth: `${eth.toFixed(4)} ETH`,
    },
  }
}

export const formatCedis = (amount: number): string => {
  return `₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const formatUSD = (amount: number): string => {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const formatETH = (amount: number): string => {
  return `${amount.toFixed(6)} ETH`
}
