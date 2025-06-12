import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

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

export async function GET(request: NextRequest) {
  try {
    const sql = getSqlClient()
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const users = await sql`
      SELECT id, email, wallet_address, first_name, last_name, is_verified, is_student, auth_method
      FROM users 
      WHERE id = ${decoded.userId}
    `
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const user = users[0]

    return NextResponse.json({
      id: user.id,
      email: user.email,
      walletAddress: user.wallet_address,
      firstName: user.first_name,
      lastName: user.last_name,
      isVerified: user.is_verified,
      isStudent: user.is_student,
      authMethod: user.auth_method,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
