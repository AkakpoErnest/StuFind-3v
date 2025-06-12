"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { Briefcase, Building2, MapPin, DollarSign, Clock, PlusCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedAgo: string
  description: string
}

const allJobs: Job[] = [
  {
    id: "j1",
    title: "Frontend Developer Intern",
    company: "Tech Innovations Ltd.",
    location: "Accra, Remote",
    type: "Internship",
    salary: "₵800/month",
    postedAgo: "2 hours ago",
    description:
      "Join our team to build amazing user interfaces using React and Next.js. Opportunity to learn and grow.",
  },
  {
    id: "j2",
    title: "Marketing Assistant",
    company: "Brand Builders Ghana",
    location: "Kumasi",
    type: "Part-time",
    salary: "₵600/month",
    postedAgo: "1 day ago",
    description:
      "Assist in social media campaigns, content creation, and market research. Ideal for marketing students.",
  },
  {
    id: "j3",
    title: "Data Entry Clerk",
    company: "Accra Data Solutions",
    location: "Accra",
    type: "Full-time",
    salary: "₵1000/month",
    postedAgo: "3 days ago",
    description: "Responsible for accurate and efficient data entry. Strong attention to detail required.",
  },
  {
    id: "j4",
    title: "Graphic Design Intern",
    company: "Creative Hub Studios",
    location: "Tema, Hybrid",
    type: "Internship",
    salary: "₵700/month",
    postedAgo: "5 hours ago",
    description:
      "Work on various design projects, including logos, brochures, and digital graphics. Proficiency in Adobe Creative Suite.",
  },
  {
    id: "j5",
    title: "Customer Support Representative",
    company: "Global Connect Services",
    location: "Remote",
    type: "Full-time",
    salary: "₵950/month",
    postedAgo: "1 week ago",
    description: "Provide excellent customer service via phone and email. Strong communication skills essential.",
  },
  {
    id: "j6",
    title: "Backend Developer (Node.js)",
    company: "Innovate Ghana",
    location: "Accra",
    type: "Full-time",
    salary: "Negotiable",
    postedAgo: "2 days ago",
    description:
      "Develop and maintain robust backend services using Node.js and Express. Experience with databases a plus.",
  },
  {
    id: "j7",
    title: "Research Assistant",
    company: "University Research Dept.",
    location: "HTU Campus",
    type: "Part-time",
    salary: "₵500/month",
    postedAgo: "4 days ago",
    description:
      "Assist professors with data collection, literature review, and report writing for ongoing research projects.",
  },
  {
    id: "j8",
    title: "Social Media Manager",
    company: "Digital Growth Agency",
    location: "Remote",
    type: "Contract",
    salary: "₵1200/month",
    postedAgo: "6 days ago",
    description: "Manage social media presence, create engaging content, and analyze performance for various clients.",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  const jobTypes = ["All", "Internship", "Part-time", "Full-time", "Contract"]

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || job.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Removed h1 and p elements as per instructions */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="transition-all duration-200"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl font-semibold text-primary-700 line-clamp-2">{job.title}</CardTitle>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> {job.company}
                  </p>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center text-muted-foreground text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-1">
                    <Briefcase className="h-4 w-4 mr-1" /> {job.type}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <DollarSign className="h-4 w-4 mr-1" /> {job.salary}
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 border-t flex justify-between items-center">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Posted {job.postedAgo}
                  </span>
                  <Button variant="default" size="sm" className="bg-primary-500 hover:bg-primary-600">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
              No jobs found matching your criteria.
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/post-job">
            <Button className="bg-gradient-to-r from-primary-500 to-purple-600 text-white py-3 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusCircle className="h-6 w-6 mr-3" /> Post a New Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
