"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, User, Wallet, University, LogOut, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const { user, signOut, isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    // Redirect to home or show a message if not authenticated
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md text-center p-6 shadow-lg border-primary-200">
          <CardHeader>
            <User className="h-16 w-16 text-primary-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-primary-700">Access Your Profile</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please sign in to view and manage your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/")} // Assuming "/" is your sign-in/home page
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold"
            >
              Sign In / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">Your Profile</h1>
            <p className="text-lg text-muted-foreground">Manage your personal information and account settings.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-primary-200">
              <CardHeader className="bg-primary-50/50 border-b border-primary-100 flex flex-col items-center text-center py-6">
                <Avatar className="h-24 w-24 mb-4 border-4 border-primary-500 shadow-md">
                  <AvatarImage src={user?.avatarUrl || "/placeholder-user.jpg"} alt={user?.firstName || "User"} />
                  <AvatarFallback className="bg-primary-100 text-primary-700 text-3xl font-bold">
                    {user?.firstName ? user.firstName.charAt(0) : user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-bold text-primary-700">
                  {user?.firstName || "StuFind User"} {user?.lastName}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-5 w-5 text-primary-500" />
                    <span>Email: {user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Wallet className="h-5 w-5 text-primary-500" />
                    <span>
                      Wallet:{" "}
                      {user?.walletAddress
                        ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`
                        : "Not Connected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <University className="h-5 w-5 text-primary-500" />
                    <span>University: {user?.university || "Not Set"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className={`h-5 w-5 ${user?.isVerified ? "text-green-500" : "text-red-500"}`} />
                    <span>Status: {user?.isVerified ? "Verified Student" : "Not Verified"}</span>
                  </div>
                </div>

                <div className="pt-4 border-t mt-6">
                  <Button
                    onClick={() => signOut()}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
                  >
                    <LogOut className="h-6 w-6 mr-3" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
