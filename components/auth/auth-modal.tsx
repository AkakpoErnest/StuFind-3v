"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Wallet, Eye, EyeOff } from "lucide-react"
import { useAuth } from "./auth-provider"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { signIn } = useAuth()

  const [emailForm, setEmailForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin"
      const body = isSignUp ? emailForm : { email: emailForm.email, password: emailForm.password }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed")
      }

      // Sign in the user
      signIn(data)
      onSuccess(data)
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    setError("")

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to connect your wallet")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const walletAddress = accounts[0]

      // Create signature message
      const message = `Sign this message to verify your wallet ownership for Stufind: ${Date.now()}`

      // Request signature
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletAddress],
      })

      // Send to backend for verification
      const response = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          message,
          signature,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Wallet authentication failed")
      }

      signIn(data)
      onSuccess(data)
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmailForm({ email: "", password: "", firstName: "", lastName: "" })
    setError("")
    setIsSignUp(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-800">Welcome to Stufind</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" onClick={resetForm}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="wallet" onClick={resetForm}>
              <Wallet className="h-4 w-4 mr-2" />
              Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={emailForm.firstName}
                      onChange={(e) => setEmailForm({ ...emailForm, firstName: e.target.value })}
                      required={isSignUp}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={emailForm.lastName}
                      onChange={(e) => setEmailForm({ ...emailForm, lastName: e.target.value })}
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={emailForm.password}
                    onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>

              <div className="text-center">
                <Button type="button" variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600">
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Connect your crypto wallet to get started with Stufind</p>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button onClick={handleWalletConnect} className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wallet className="mr-2 h-4 w-4" />
                Connect MetaMask
              </Button>

              <p className="text-xs text-muted-foreground">Make sure you have MetaMask installed and unlocked</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
