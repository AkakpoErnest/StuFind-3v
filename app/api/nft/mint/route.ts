import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    // Simulate NFT minting (in real implementation, this would interact with smart contract)
    const tokenId = `STU_${Date.now()}_${userId}`

    await sql`
      INSERT INTO student_nfts (user_id, token_id, minted_at)
      VALUES (${userId}, ${tokenId}, NOW())
    `

    return NextResponse.json({ success: true, tokenId })
  } catch (error) {
    console.error("NFT minting error:", error)
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 })
  }
}
