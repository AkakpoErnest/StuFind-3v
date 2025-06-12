import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { ethers } from "ethers"
import jwt from "jsonwebtoken"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { address, message, signature } = await request.json()

    // Validate input
    if (!address || !message || !signature) {
      return NextResponse.json({ error: "Address, message, and signature are required" }, { status: 400 })
    }

    // Verify signature
    try {
      const recoveredAddress = ethers.utils.verifyMessage(message, signature)
      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    } catch (error) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Check if user exists
    const users = await sql`
      SELECT id, wallet_address, first_name, last_name, is_verified, university, auth_method
      FROM users 
      WHERE wallet_address = ${address.toLowerCase()} AND auth_method = 'wallet'
    `

    let user
    if (users.length === 0) {
      // Create new user
      const newUsers = await sql`
        INSERT INTO users (wallet_address, auth_method, created_at)
        VALUES (${address.toLowerCase()}, 'wallet', NOW())
        RETURNING id, wallet_address, first_name, last_name, is_verified, university, auth_method
      `
      user = newUsers[0]
    } else {
      user = users[0]
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id, walletAddress: user.wallet_address }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    // Set cookie
    const response = NextResponse.json({
      id: user.id,
      walletAddress: user.wallet_address,
      firstName: user.first_name,
      lastName: user.last_name,
      isVerified: user.is_verified,
      university: user.university,
      authMethod: user.auth_method,
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Wallet auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
