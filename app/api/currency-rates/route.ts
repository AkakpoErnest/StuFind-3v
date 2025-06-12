import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,ghs")

    if (!response.ok) {
      // If CoinGecko API returns an error, log it and return a fallback
      const errorText = await response.text()
      console.error(`CoinGecko API error: ${response.status} - ${errorText}`)
      // Return a successful response with fallback data
      return NextResponse.json(
        {
          usd: 1,
          ghs: 12.5,
          eth: 1800,
        },
        { status: 200 },
      )
    }

    const data = await response.json()

    const rates = {
      usd: 1, // Assuming 1 USD = 1 USD
      ghs: data.ethereum?.ghs || 12.5, // Fallback rate for GHS
      eth: data.ethereum?.usd || 1800, // Fallback rate for ETH in USD
    }

    return NextResponse.json(rates)
  } catch (error: any) {
    console.error("Error fetching rates from CoinGecko in API route:", error.message || error)
    // Return a successful response with fallback data even if fetch fails
    return NextResponse.json(
      {
        usd: 1,
        ghs: 12.5,
        eth: 1800,
      },
      { status: 200 },
    )
  }
}
