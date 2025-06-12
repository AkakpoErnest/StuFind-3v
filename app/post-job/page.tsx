"use client"

import PostJobForm from "@/components/PostJobForm"

export default function PostJobPage() {
  return (
    <div className="container mx-auto py-10">
      {/* The h1 and p tags are now inside PostJobForm component */}
      <PostJobForm />
    </div>
  )
}
