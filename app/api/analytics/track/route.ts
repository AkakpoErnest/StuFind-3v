import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { action, userId, timestamp } = await request.json()

    await sql`
      INSERT INTO user_activities (user_id, action, created_at)
      VALUES (${userId}, ${action}, ${timestamp})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json({ error: "Failed to track activity" }, { status: 500 })
  }
}
