import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, firstName, lastName, idNumber, university, phoneNumber, verificationMethod, isStudent } = data

    // Update user verification status
    await sql`
      UPDATE users 
      SET 
        first_name = ${firstName},
        last_name = ${lastName},
        student_id = ${idNumber},
        university = ${university},
        phone_number = ${phoneNumber},
        is_verified = true,
        is_student = ${isStudent},
        updated_at = NOW()
      WHERE id = ${userId}
    `

    // Track verification for algorithm
    await sql`
      INSERT INTO user_activities (user_id, action, metadata, created_at)
      VALUES (${userId}, 'verification_completed', ${JSON.stringify({ method: verificationMethod })}, NOW())
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
