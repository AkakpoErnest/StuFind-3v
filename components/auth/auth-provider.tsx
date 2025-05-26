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
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (user: User) => void
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = (userData: User) => {
    setUser(userData)
    // Store in localStorage for persistence
    localStorage.setItem("stufind_user", JSON.stringify(userData))
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

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
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
