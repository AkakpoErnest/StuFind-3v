"use client"

import { useState } from "react"
import { MapPin, Clock, DollarSign, Briefcase, GraduationCap, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StufindLogo } from "@/components/stufind-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"

const jobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "MTN Ghana",
    type: "Internship",
    location: "Accra",
    salary: "₵800/month",
    duration: "3 months",
    description: "Work on mobile money platform frontend using React and React Native.",
    requirements: ["React", "JavaScript", "CSS", "Git"],
    posted: "2 days ago",
    applicants: 23,
    remote: false,
    verified: true,
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Vodafone Ghana",
    type: "Internship",
    location: "Accra",
    salary: "₵1,000/month",
    duration: "6 months",
    description: "Analyze customer data and build ML models for network optimization.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
    posted: "1 week ago",
    applicants: 45,
    remote: true,
    verified: true,
  },
  {
    id: 3,
    title: "Campus Brand Ambassador",
    company: "Stufind",
    type: "Part-time",
    location: "University of Ghana",
    salary: "₵300/month + commission",
    duration: "Ongoing",
    description: "Promote Stufind on campus and help students get started with the platform.",
    requirements: ["Communication", "Social Media", "Leadership"],
    posted: "3 days ago",
    applicants: 12,
    remote: false,
    verified: true,
  },
  {
    id: 4,
    title: "Mobile App Developer",
    company: "Hubtel",
    type: "Full-time",
    location: "Accra",
    salary: "₵3,500/month",
    duration: "Permanent",
    description: "Develop and maintain mobile applications for payment solutions.",
    requirements: ["Flutter", "Dart", "API Integration", "Mobile UI/UX"],
    posted: "5 days ago",
    applicants: 67,
    remote: false,
    verified: true,
  },
  {
    id: 5,
    title: "Blockchain Developer Intern",
    company: "Ghana Blockchain Association",
    type: "Internship",
    location: "Remote",
    salary: "₵600/month",
    duration: "4 months",
    description: "Learn and contribute to blockchain projects in the Ghanaian ecosystem.",
    requirements: ["Solidity", "Web3", "JavaScript", "Smart Contracts"],
    posted: "1 day ago",
    applicants: 8,
    remote: true,
    verified: false,
  },
  {
    id: 6,
    title: "UI/UX Design Intern",
    company: "Zeepay",
    type: "Internship",
    location: "Accra",
    salary: "₵700/month",
    duration: "3 months",
    description: "Design user interfaces for fintech products serving African markets.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    posted: "4 days ago",
    applicants: 34,
    remote: false,
    verified: true,
  },
]

export default function JobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterJobs(query, selectedType, selectedLocation)
  }

  const filterJobs = (query: string, type: string, location: string) => {
    let filtered = jobs

    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.requirements.some((req) => req.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (type !== "all") {
      filtered = filtered.filter((job) => job.type.toLowerCase() === type.toLowerCase())
    }

    if (location !== "all") {
      filtered = filtered.filter(
        (job) => job.location.toLowerCase().includes(location.toLowerCase()) || (location === "remote" && job.remote),
      )
    }

    setFilteredJobs(filtered)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    filterJobs(searchQuery, type, selectedLocation)
  }

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
    filterJobs(searchQuery, selectedType, location)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StufindLogo size={32} showText />
              <Badge variant="outline">Jobs & Internships</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">Post a Job</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Discover internships and jobs from top companies in Ghana
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} placeholder="Search jobs, companies, or skills..." />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="accra">Accra</SelectItem>
              <SelectItem value="kumasi">Kumasi</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} opportunities
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={job.type === "Internship" ? "default" : job.type === "Part-time" ? "secondary" : "outline"}
                  >
                    {job.type}
                  </Badge>
                  {job.verified && <Badge className="bg-green-500">✓ Verified</Badge>}
                </div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <p className="text-primary font-semibold">{job.company}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                    {job.remote && (
                      <Badge variant="outline" className="ml-1 text-xs">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.duration}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{job.posted}</span>
                  <span>{job.applicants} applicants</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Save
                </Button>
                <Button className="flex-1">Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedType("all")
                setSelectedLocation("all")
                setFilteredJobs(jobs)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
          <GraduationCap className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Looking to hire students?</h2>
          <p className="text-muted-foreground mb-6">
            Post your internship or job opportunity and connect with talented Ghanaian students.
          </p>
          <Button size="lg">Post a Job</Button>
        </div>
      </div>
    </div>
  )
}
