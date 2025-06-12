import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Jobs & Internships - IEEE NITK",
  description: "Explore job and internship opportunities for IEEE NITK members.",
}

const jobs = [
  {
    title: "Software Engineer Intern",
    company: "Google",
    location: "Mountain View, CA",
    link: "https://careers.google.com/students/",
  },
  {
    title: "Data Science Intern",
    company: "Microsoft",
    location: "Redmond, WA",
    link: "https://careers.microsoft.com/students/us/en",
  },
  {
    title: "Web Developer Intern",
    company: "Amazon",
    location: "Seattle, WA",
    link: "https://www.amazon.jobs/en/teams/student-programs",
  },
]

export default function JobsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Jobs & Internships</h1>

      {jobs.map((job, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-600">{job.location}</p>
          <Link
            href={job.link}
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </Link>
        </div>
      ))}
    </div>
  )
}
