import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get user from database
    const users = await sql`
      SELECT id, email, wallet_address, first_name, last_name, is_verified, university, auth_method
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
      university: user.university,
      authMethod: user.auth_method,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
