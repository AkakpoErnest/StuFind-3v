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
    const data = await request.json()
    const { userId, firstName, lastName, idNumber, university, phoneNumber, verificationMethod, isStudent } = data

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
