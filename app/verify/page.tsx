"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, CheckCircle, AlertCircle, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"

interface VerificationStep {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function VerifyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [studentIdImage, setStudentIdImage] = useState<string | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    university: "",
    phoneNumber: "",
    email: "",
    program: "",
    yearOfStudy: "",
  })
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "processing" | "approved" | "rejected">(
    "pending",
  )

  const steps: VerificationStep[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Enter your basic details",
      completed: currentStep > 1,
    },
    {
      id: 2,
      title: "Student ID Upload",
      description: "Upload your student ID card",
      completed: currentStep > 2,
    },
    {
      id: 3,
      title: "Selfie Verification",
      description: "Take a selfie for identity verification",
      completed: currentStep > 3,
    },
    {
      id: 4,
      title: "Review & Submit",
      description: "Review your information and submit",
      completed: verificationStatus === "approved",
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "studentId" | "selfie") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "studentId") {
          setStudentIdImage(result)
        } else {
          setSelfieImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitVerification = () => {
    setVerificationStatus("processing")
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus("approved")
    }, 3000)
  }

  const mintStudentNFT = () => {
    // This would integrate with the smart contract to mint an NFT
    alert("Student NFT minted successfully! This NFT proves your verified student status.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge variant="outline">Student Verification</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">Help</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <CreditCard className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold mb-4">Verify Your Student Status</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Get verified to access exclusive student features and mint your Student NFT
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.completed ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full mt-4 ${step.completed ? "bg-green-500" : "bg-muted"} hidden md:block`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verification Form */}
        <div className="max-w-2xl mx-auto">
          {verificationStatus === "approved" ? (
            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <CardTitle className="text-2xl text-green-600">Verification Approved!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  Congratulations! Your student status has been verified. You can now access all student features.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">🎉 Mint Your Student NFT</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a unique NFT that proves your verified student status on the blockchain. This NFT can be used
                    for exclusive student discounts and access.
                  </p>
                  <Button onClick={mintStudentNFT} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    Mint Student NFT (Free)
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1" asChild>
                    <a href="/marketplace">Start Shopping</a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="/create">Create Listing</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : verificationStatus === "processing" ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Processing Verification...</h3>
                <p className="text-muted-foreground">We're reviewing your documents. This usually takes 1-2 minutes.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="studentId">Student ID Number</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        placeholder="e.g., HTU/2021/12345"
                      />
                    </div>

                    <div>
                      <Label htmlFor="university">University</Label>
                      <Select
                        value={formData.university}
                        onValueChange={(value) => handleInputChange("university", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your university" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="htu">Ho Technical University</SelectItem>
                          <SelectItem value="ug">University of Ghana</SelectItem>
                          <SelectItem value="knust">KNUST</SelectItem>
                          <SelectItem value="ucc">University of Cape Coast</SelectItem>
                          <SelectItem value="ashesi">Ashesi University</SelectItem>
                          <SelectItem value="gimpa">GIMPA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="program">Program of Study</Label>
                        <Input
                          id="program"
                          value={formData.program}
                          onChange={(e) => handleInputChange("program", e.target.value)}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      <div>
                        <Label htmlFor="yearOfStudy">Year of Study</Label>
                        <Select
                          value={formData.yearOfStudy}
                          onValueChange={(value) => handleInputChange("yearOfStudy", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                            <SelectItem value="graduate">Graduate Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@university.edu.gh"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please upload a clear photo of your student ID card. Make sure all text is readable and the
                        image is well-lit.
                      </AlertDescription>
                    </Alert>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {studentIdImage ? (
                        <div>
                          <img
                            src={studentIdImage || "/placeholder.svg"}
                            alt="Student ID"
                            className="max-w-full h-48 mx-auto rounded-lg mb-4"
                          />
                          <p className="text-sm text-green-600 mb-4">✓ Student ID uploaded successfully</p>
                          <Button variant="outline" onClick={() => setStudentIdImage(null)}>
                            Upload Different Image
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-semibold mb-2">Upload Student ID</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Drag and drop your student ID image here, or click to browse
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "studentId")}
                            className="hidden"
                            id="studentIdUpload"
                          />
                          <Button asChild>
                            <label htmlFor="studentIdUpload" className="cursor-pointer">
                              <Camera className="h-4 w-4 mr-2" />
                              Choose Image
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Take a clear selfie for identity verification. Make sure your face is clearly visible and
                        matches your student ID.
                      </AlertDescription>
                    </Alert>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {selfieImage ? (
                        <div>
                          <img
                            src={selfieImage || "/placeholder.svg"}
                            alt="Selfie"
                            className="w-48 h-48 mx-auto rounded-full object-cover mb-4"
                          />
                          <p className="text-sm text-green-600 mb-4">✓ Selfie uploaded successfully</p>
                          <Button variant="outline" onClick={() => setSelfieImage(null)}>
                            Take New Selfie
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-semibold mb-2">Take a Selfie</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Take a clear photo of yourself for identity verification
                          </p>
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
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Review Your Information</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                      </div>
                      <div>
                        <span className="font-medium">Student ID:</span> {formData.studentId}
                      </div>
                      <div>
                        <span className="font-medium">University:</span> {formData.university}
                      </div>
                      <div>
                        <span className="font-medium">Program:</span> {formData.program}
                      </div>
                      <div>
                        <span className="font-medium">Year:</span> {formData.yearOfStudy}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {formData.phoneNumber}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {studentIdImage && (
                        <div>
                          <p className="font-medium mb-2">Student ID:</p>
                          <img
                            src={studentIdImage || "/placeholder.svg"}
                            alt="Student ID"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      {selfieImage && (
                        <div>
                          <p className="font-medium mb-2">Selfie:</p>
                          <img
                            src={selfieImage || "/placeholder.svg"}
                            alt="Selfie"
                            className="w-32 h-32 object-cover rounded-full mx-auto"
                          />
                        </div>
                      )}
                    </div>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        By submitting, you confirm that all information provided is accurate and you agree to our terms
                        of service.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                  </Button>
                  {currentStep === 4 ? (
                    <Button onClick={submitVerification} className="bg-gradient-to-r from-green-500 to-blue-600">
                      Submit for Verification
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>Next</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Benefits of Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">Trusted Trading</h3>
                <p className="text-sm text-muted-foreground">
                  Trade only with verified students for safer transactions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Student NFT</h3>
                <p className="text-sm text-muted-foreground">
                  Get a unique NFT that proves your student status on-chain
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                <h3 className="font-semibold mb-2">Exclusive Access</h3>
                <p className="text-sm text-muted-foreground">Access student-only features and discounts</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
