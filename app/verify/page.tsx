"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, CheckCircle, CreditCard, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [verificationMethod, setVerificationMethod] = useState<"student" | "ghana-card">("student")
  const [idImage, setIdImage] = useState<string | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "processing" | "approved">("pending")

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    idNumber: "",
    university: "",
    phoneNumber: "",
    isStudent: true,
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "id" | "selfie") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "id") {
          setIdImage(result)
        } else {
          setSelfieImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const submitVerification = async () => {
    setIsLoading(true)
    setVerificationStatus("processing")

    try {
      const response = await fetch("/api/verification/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          verificationMethod,
          idImage,
          selfieImage,
          userId: user?.id,
        }),
      })

      if (response.ok) {
        setVerificationStatus("approved")
        updateUser({ isVerified: true, isStudent: formData.isStudent })

        // Mint NFT if student
        if (formData.isStudent) {
          await mintStudentNFT()
        }
      } else {
        throw new Error("Verification failed")
      }
    } catch (error) {
      console.error("Verification error:", error)
      alert("Verification failed. Please try again.")
      setVerificationStatus("pending")
    } finally {
      setIsLoading(false)
    }
  }

  const mintStudentNFT = async () => {
    try {
      await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      })
      alert("Student NFT minted successfully!")
    } catch (error) {
      console.error("NFT minting failed:", error)
    }
  }

  if (verificationStatus === "approved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <CardTitle className="text-2xl text-green-600">Verification Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              {formData.isStudent
                ? "Your student status has been verified! You can now access all student features."
                : "Your identity has been verified! Welcome to Stufind."}
            </p>

            {formData.isStudent && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">🎉 Student NFT Minted!</h3>
                <p className="text-sm text-muted-foreground">
                  Your verified student status is now recorded on the blockchain.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button className="flex-1" onClick={() => router.push("/marketplace")}>
                Start Shopping
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/create")}>
                Create Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (verificationStatus === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Processing Verification...</h3>
            <p className="text-muted-foreground">This usually takes 30 seconds to 1 minute.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="text-center mb-8">
          <CreditCard className="h-16 w-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Quick Verification</h1>
          <p className="text-slate-600 text-lg">Verify your identity to access all Stufind features</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Identity Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Verification Method */}
            <div>
              <Label className="text-base font-semibold">I am verifying as:</Label>
              <RadioGroup
                value={verificationMethod}
                onValueChange={(value: "student" | "ghana-card") => {
                  setVerificationMethod(value)
                  setFormData((prev) => ({ ...prev, isStudent: value === "student" }))
                }}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student (with Student ID)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ghana-card" id="ghana-card" />
                  <Label htmlFor="ghana-card">General User (with Ghana Card)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="idNumber">
                {verificationMethod === "student" ? "Student ID Number" : "Ghana Card Number"}
              </Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                placeholder={verificationMethod === "student" ? "e.g., 2021/12345" : "e.g., GHA-123456789-1"}
                required
              />
            </div>

            {verificationMethod === "student" && (
              <div>
                <Label htmlFor="university">University</Label>
                <Select value={formData.university} onValueChange={(value) => handleInputChange("university", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ug">University of Ghana</SelectItem>
                    <SelectItem value="knust">KNUST</SelectItem>
                    <SelectItem value="ucc">University of Cape Coast</SelectItem>
                    <SelectItem value="ashesi">Ashesi University</SelectItem>
                    <SelectItem value="gimpa">GIMPA</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="+233 XX XXX XXXX"
                required
              />
            </div>

            {/* ID Upload */}
            <div>
              <Label className="text-base font-semibold">
                Upload {verificationMethod === "student" ? "Student ID" : "Ghana Card"}
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                {idImage ? (
                  <div>
                    <img
                      src={idImage || "/placeholder.svg"}
                      alt="ID"
                      className="max-w-full h-32 mx-auto rounded-lg mb-4"
                    />
                    <p className="text-sm text-green-600 mb-4">✓ ID uploaded successfully</p>
                    <Button variant="outline" onClick={() => setIdImage(null)}>
                      Upload Different Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                    <p className="font-semibold mb-2">Upload ID Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "id")}
                      className="hidden"
                      id="idUpload"
                    />
                    <Button asChild>
                      <label htmlFor="idUpload" className="cursor-pointer">
                        <Camera className="h-4 w-4 mr-2" />
                        Choose Image
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Selfie Upload */}
            <div>
              <Label className="text-base font-semibold">Take a Selfie</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                {selfieImage ? (
                  <div>
                    <img
                      src={selfieImage || "/placeholder.svg"}
                      alt="Selfie"
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                    />
                    <p className="text-sm text-green-600 mb-4">✓ Selfie uploaded successfully</p>
                    <Button variant="outline" onClick={() => setSelfieImage(null)}>
                      Take New Selfie
                    </Button>
                  </div>
                ) : (
                  <div>
                    <User className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                    <p className="font-semibold mb-2">Take a Selfie</p>
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleImageUpload(e, "selfie")}
                      className="hidden"
                      id="selfieUpload"
                    />
                    <Button asChild>
                      <label htmlFor="selfieUpload" className="cursor-pointer">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Selfie
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting, you confirm that all information is accurate and agree to our terms of service.
              </AlertDescription>
            </Alert>

            <Button
              onClick={submitVerification}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
              disabled={!idImage || !selfieImage || isLoading}
            >
              {isLoading ? "Processing..." : "Submit Verification"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
