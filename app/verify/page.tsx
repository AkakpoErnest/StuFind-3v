"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { CheckCircle, Upload, Camera, QrCode, ShieldCheck, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

export default function VerifyPage() {
  const [step, setStep] = useState(1)
  const [studentId, setStudentId] = useState("")
  const [idImage, setIdImage] = useState<File | null>(null)
  const [selfieImage, setSelfieImage] = useState<File | null>(null)
  const [university, setUniversity] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { user, updateUserData } = useAuth()

  const handleNextStep = () => {
    if (step === 1 && !studentId) {
      toast({
        title: "Student ID Required",
        description: "Please enter your student ID to proceed.",
        variant: "destructive",
      })
      return
    }
    if (step === 2 && !idImage) {
      toast({
        title: "ID Photo Required",
        description: "Please upload a clear photo of your student ID.",
        variant: "destructive",
      })
      return
    }
    if (step === 3 && !selfieImage) {
      toast({
        title: "Selfie Required",
        description: "Please take a selfie for verification.",
        variant: "destructive",
      })
      return
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleVerify = async () => {
    setIsProcessing(true)
    // Simulate API call for verification
    try {
      const response = await fetch("/api/verification/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, university, userId: user?.id }),
      })

      if (!response.ok) {
        throw new Error("Verification failed")
      }

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Verification Successful!",
          description: "Your student status has been verified. Claiming StuFind Tokens...",
          variant: "default",
        })

        // Trigger token claim upon successful verification
        const tokenClaimResponse = await fetch("/api/stufind-tokens/claim-verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id }),
        })

        if (!tokenClaimResponse.ok) {
          throw new Error("Failed to claim verification tokens.")
        }

        const tokenClaimData = await tokenClaimResponse.json()
        if (tokenClaimData.success) {
          toast({
            title: "Tokens Claimed!",
            description: `You received ${tokenClaimData.amount} StuFind Tokens for verification!`,
            variant: "default",
          })
          // Update user data in auth context
          if (user) {
            updateUserData({
              ...user,
              stufindTokens: (user.stufindTokens || 0) + tokenClaimData.amount,
              isVerified: true, // Assuming verification sets this
              claimedRewards: [...(user.claimedRewards || []), "verify-student"],
            })
          }
        } else {
          toast({
            title: "Token Claim Failed",
            description: tokenClaimData.message || "Could not claim verification tokens.",
            variant: "destructive",
          })
        }

        setStep(5) // Move to success step
      } else {
        toast({
          title: "Verification Failed",
          description: data.message || "Please check your details and try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message || "An unexpected error occurred during verification.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMintNFT = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id, studentId }),
      })

      if (!response.ok) {
        throw new Error("NFT minting failed.")
      }

      const data = await response.json()
      if (data.success) {
        toast({
          title: "NFT Minted!",
          description: "Your verified student status has been minted as an NFT!",
          variant: "default",
        })
        // Optionally update user context or redirect
        router.push("/wallet")
      } else {
        toast({
          title: "NFT Minting Failed",
          description: data.message || "Could not mint NFT.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "NFT Minting Error",
        description: error.message || "An unexpected error occurred during NFT minting.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center gap-3">
              <QrCode className="h-6 w-6 text-primary-600" /> Step 1: Enter Student ID
            </CardTitle>
            <CardDescription>Please enter your official student ID number.</CardDescription>
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="e.g., HTU/2023/001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <Label htmlFor="university">Your University</Label>
            <Input
              id="university"
              placeholder="e.g., Ho Technical University (HTU)"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center gap-3">
              <Upload className="h-6 w-6 text-primary-600" /> Step 2: Upload Student ID Photo
            </CardTitle>
            <CardDescription>
              Upload a clear photo of your student ID card. Ensure all details are legible.
            </CardDescription>
            <Label htmlFor="idImage">Student ID Photo</Label>
            <Input
              id="idImage"
              type="file"
              accept="image/*"
              onChange={(e) => setIdImage(e.target.files ? e.target.files[0] : null)}
              required
            />
            {idImage && (
              <div className="mt-4 text-sm text-muted-foreground">
                Selected: {idImage.name} ({(idImage.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center gap-3">
              <Camera className="h-6 w-6 text-primary-600" /> Step 3: Take a Selfie
            </CardTitle>
            <CardDescription>Take a clear selfie holding your student ID next to your face.</CardDescription>
            <Label htmlFor="selfieImage">Selfie Photo</Label>
            <Input
              id="selfieImage"
              type="file"
              accept="image/*"
              onChange={(e) => setSelfieImage(e.target.files ? e.target.files[0] : null)}
              required
            />
            {selfieImage && (
              <div className="mt-4 text-sm text-muted-foreground">
                Selected: {selfieImage.name} ({(selfieImage.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 text-center"
          >
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center justify-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary-600" /> Step 4: Review & Submit
            </CardTitle>
            <CardDescription>Please review your details before submitting for verification.</CardDescription>
            <div className="space-y-2 text-left">
              <p>
                <span className="font-semibold">Student ID:</span> {studentId}
              </p>
              <p>
                <span className="font-semibold">University:</span> {university}
              </p>
              {idImage && (
                <p>
                  <span className="font-semibold">ID Photo:</span> {idImage.name}
                </p>
              )}
              {selfieImage && (
                <p>
                  <span className="font-semibold">Selfie Photo:</span> {selfieImage.name}
                </p>
              )}
            </div>
            <Button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span> Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6 mr-3" /> Submit for Verification
                </>
              )}
            </Button>
          </motion.div>
        )
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="space-y-6 text-center"
          >
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-primary-700">Verification Complete!</CardTitle>
            <CardDescription className="text-lg">
              Congratulations! Your student status has been successfully verified.
            </CardDescription>
            <Button
              onClick={handleMintNFT}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 text-lg font-semibold mt-4"
              disabled={isProcessing || user?.claimedRewards?.includes("student-nft-mint")}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span> Minting NFT...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3" /> Mint Student NFT
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full mt-2 text-primary-500 hover:bg-primary-50"
            >
              Go to Homepage
            </Button>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Removed h1 and p elements as per instructions */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">Student Verification</h1>
            <p className="text-lg text-muted-foreground">
              Verify your student status to unlock exclusive features and rewards.
            </p>
          </div>

          <Card className="shadow-lg border-primary-200">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
              {step < 5 && (
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button variant="outline" onClick={handlePrevStep} disabled={isProcessing}>
                      Previous
                    </Button>
                  )}
                  {step < 4 && (
                    <Button onClick={handleNextStep} disabled={isProcessing}>
                      Next
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
