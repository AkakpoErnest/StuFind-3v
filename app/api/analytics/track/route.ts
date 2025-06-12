import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Use a singleton pattern for the Neon client to ensure it's initialized once
// and that environment variables are available at runtime.
let sqlInstance: ReturnType<typeof neon> | null = null

function getSqlClient() {
  if (!sqlInstance) {
    const databaseUrl = process.env.NEON_NEON_DATABASE_URL // Standardized variable name
    if (!databaseUrl) {
      // Throw a more descriptive error if the environment variable is missing
      throw new Error(
        "Database connection string (NEON_DATABASE_URL) is not set. Please ensure it's configured in your Vercel project environment variables.",
      )
    }
    sqlInstance = neon(databaseUrl)
  }
  return sqlInstance
}

export async function POST(request: NextRequest) {
  try {
    const sql = getSqlClient() // Get the initialized client
    const { action, userId, timestamp } = await request.json()

    await sql`
      INSERT INTO user_activities (user_id, action, created_at)
      VALUES (${userId}, ${action}, ${timestamp})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking error:", error)
    // Provide a more specific error response for the client
    if (error instanceof Error && error.message.includes("Database connection string")) {
      return NextResponse.json(
        { error: "Server configuration error: Database URL missing. Please contact support." },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: "Failed to track activity" }, { status: 500 })
  }
}
