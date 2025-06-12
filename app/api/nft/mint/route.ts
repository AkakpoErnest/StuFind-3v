import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

let sqlInstance: ReturnType<typeof neon> | null = null

function getSqlClient() {
  if (!sqlInstance) {
    const databaseUrl = process.env.NEON_NEON_DATABASE_URL // Standardized variable name
    if (!databaseUrl) {
      throw new Error("Database connection string (NEON_DATABASE_URL) is not set.")
    }
    sqlInstance = neon(databaseUrl)
  }
  return sqlInstance
}

export async function POST(request: NextRequest) {
  try {
    const sql = getSqlClient()
    const { userId } = await request.json()

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
