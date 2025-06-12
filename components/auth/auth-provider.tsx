"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email?: string
  walletAddress?: string
  firstName?: string
  lastName?: string
  isVerified: boolean
  university?: string
  authMethod: "email" | "wallet"
  isStudent?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (user: User) => void
  signOut: () => void
  isAuthenticated: boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem("stufind_user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      }

      // Verify with server
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        localStorage.setItem("stufind_user", JSON.stringify(userData))
      } else {
        // Clear invalid session
        localStorage.removeItem("stufind_user")
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("stufind_user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = (userData: User) => {
    setUser(userData)
    localStorage.setItem("stufind_user", JSON.stringify(userData))

    // Track login for algorithm
    trackUserActivity("login", userData.id)
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setUser(null)
      localStorage.removeItem("stufind_user")
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("stufind_user", JSON.stringify(updatedUser))
    }
  }

  const trackUserActivity = async (action: string, userId: string) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userId, timestamp: new Date().toISOString() }),
      })
    } catch (error) {
      console.error("Failed to track activity:", error)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
