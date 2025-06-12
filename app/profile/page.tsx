"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Wallet, LogOut, Coins } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    router.push("/") // Redirect to home or login if not authenticated
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/") // Redirect to home after sign out
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary-500 shadow-lg">
              <AvatarImage src={user.profilePicture || "/placeholder-avatar.svg"} alt={user.firstName || "User"} />
              <AvatarFallback className="bg-primary-100 text-primary-700 text-3xl font-bold">
                {user.firstName ? user.firstName.charAt(0) : <User className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold text-primary-800">
              {user.firstName || "Student User"} {user.lastName}
            </CardTitle>
            {user.university && <p className="text-lg text-muted-foreground">{user.university}</p>}
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              {user.walletAddress && (
                <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <Wallet className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wallet Address</p>
                    <p className="font-mono text-sm break-all">{user.walletAddress}</p>
                  </div>
                </div>
              )}
              {user.stufindTokens !== undefined && (
                <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">StuFind Tokens</p>
                    <p className="font-medium">{user.stufindTokens}</p>
                  </div>
                </div>
              )}
            </div>
            <Button
              onClick={handleSignOut}
              className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
