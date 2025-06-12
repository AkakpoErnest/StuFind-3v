"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building2, MapPin, DollarSign, Clock, ListChecks, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    salary: "",
    duration: "",
    description: "",
    requirements: "",
    remote: "no",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Job Post Data:", formData)
    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing has been submitted for review.",
      variant: "default",
    })
    setIsSubmitting(false)
    router.push("/jobs") // Redirect back to jobs page
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-primary-700">Post a New Job Opportunity</h1>
            <p className="text-muted-foreground text-lg">Reach thousands of talented students across Ghana.</p>
          </div>

          <Card className="shadow-lg border-primary-200">
            <CardHeader className="bg-primary-50/50 border-b border-primary-100">
              <CardTitle className="text-2xl font-semibold text-primary-700 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary-600" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-primary-500" /> Job Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Frontend Developer Intern"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <Label htmlFor="company" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-primary-500" /> Company Name
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g., MTN Ghana"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Job Type */}
                <div>
                  <Label htmlFor="type" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary-500" /> Job Type
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary-500" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Accra, Remote"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Specify "Remote" if applicable.</p>
                </div>

                {/* Remote Option */}
                <div>
                  <Label htmlFor="remote" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary-500" /> Remote Option
                  </Label>
                  <Select
                    value={formData.remote}
                    onValueChange={(value) => handleSelectChange("remote", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Is this a remote job?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, fully remote</SelectItem>
                      <SelectItem value="no">No, on-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary */}
                <div>
                  <Label htmlFor="salary" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary-500" /> Salary (per month)
                  </Label>
                  <Input
                    id="salary"
                    placeholder="e.g., ₵800/month or Negotiable"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary-500" /> Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 months, Ongoing"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary-500" /> Job Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the role and responsibilities."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Requirements */}
                <div>
                  <Label htmlFor="requirements" className="text-base font-semibold flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary-500" /> Key Requirements (comma-separated)
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="e.g., React, JavaScript, SQL, Communication"
                    value={formData.requirements}
                    onChange={handleChange}
                    className="min-h-[80px]"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Separate multiple requirements with commas.</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⚙️</span> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" /> Post Job
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
