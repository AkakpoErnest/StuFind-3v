"use client"

import ListingForm from "@/components/ListingForm"

export default function CreateListingPage() {
  return (
    <div className="container mx-auto py-10">
      {/* The h1 and p tags are now inside ListingForm component */}
      <ListingForm />
    </div>
  )
}
