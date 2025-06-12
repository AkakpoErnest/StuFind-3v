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
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const newUser = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, auth_method, is_verified, is_student)
      VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, 'email', false, false)
      RETURNING id, email, first_name, last_name, is_verified, is_student, auth_method
    `
    const user = newUser[0]

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

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
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
