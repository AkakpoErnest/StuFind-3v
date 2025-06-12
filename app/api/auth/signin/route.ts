import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
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

export async function POST(request: NextRequest) {
  try {
    const sql = getSqlClient()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const users = await sql`
      SELECT id, email, password_hash, first_name, last_name, is_verified, is_student, auth_method
      FROM users 
      WHERE email = ${email} AND auth_method = 'email'
    `
    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    const user = users[0]

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    await sql`
      INSERT INTO user_activities (user_id, action, created_at)
      VALUES (${user.id}, 'login', NOW())
    `

    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      isVerified: user.is_verified,
      isStudent: user.is_student,
      authMethod: user.auth_method,
    })
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
