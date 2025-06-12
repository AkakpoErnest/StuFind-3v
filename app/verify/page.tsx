"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyEmail } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"

const VerifyPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState<"verifying" | "success" | "error">("verifying")

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          await verifyEmail(token)
          setVerificationStatus("success")
        } catch (error) {
          console.error("Verification error:", error)
          setVerificationStatus("error")
        }
      } else {
        setVerificationStatus("error")
      }
    }

    verify()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Email Verification</h1>

        {verificationStatus === "verifying" && <p className="text-center text-gray-600">Verifying your email...</p>}

        {verificationStatus === "success" && (
          <>
            <p className="text-center text-green-600 font-semibold mb-4">Email verified successfully!</p>
            <button
              onClick={() => router.push("/sign-in")}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Go to Sign In
            </button>
          </>
        )}

        {verificationStatus === "error" && (
          <>
            <p className="text-center text-red-600 font-semibold mb-4">
              Email verification failed. Please try again or contact support.
            </p>
            <button
              onClick={() => router.push("/sign-up")}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Go to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyPage
