"use client"

const products = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals - 8th Edition",
    priceUSD: 45,
    image: "/images/products/calculus-textbook.jpg",
    seller: "Kwame A.",
    condition: "Like New",
    category: "Textbooks",
    tokenId: "1001",
    timePosted: "2 hours ago",
    verified: true,
    views: 24,
    university: "University of Ghana",
    location: "Legon Campus",
  },
  {
    id: 2,
    title: "MacBook Air M1 - 2021 (256GB)",
    priceUSD: 850,
    image: "/images/products/macbook-air.jpg",
    seller: "Ama K.",
    condition: "Good",
    category: "Electronics",
    tokenId: "1002",
    timePosted: "5 hours ago",
    verified: true,
    views: 89,
    university: "KNUST",
    location: "Kumasi Campus",
  },
  {
    id: 3,
    title: "Mini Fridge - Perfect for Dorms",
    priceUSD: 80,
    image: "/images/products/mini-fridge.jpg",
    seller: "Kofi M.",
    condition: "Excellent",
    category: "Dorm Items",
    tokenId: "1003",
    timePosted: "1 day ago",
    verified: false,
    views: 15,
    university: "Ashesi University",
    location: "Berekuso Campus",
  },
  {
    id: 4,
    title: "Chemistry Lab Coat - Size Medium",
    priceUSD: 15,
    image: "/images/products/lab-coat.jpg",
    seller: "Akosua T.",
    condition: "Good",
    category: "Clothing",
    tokenId: "1004",
    timePosted: "2 days ago",
    verified: true,
    views: 7,
    university: "UCC",
    location: "Cape Coast Campus",
  },
  {
    id: 5,
    title: "Nintendo Switch + 3 Games Bundle",
    priceUSD: 220,
    image: "/images/products/nintendo-switch.jpg",
    seller: "Yaw P.",
    condition: "Like New",
    category: "Gaming",
    tokenId: "1005",
    timePosted: "3 days ago",
    verified: true,
    views: 56,
    university: "University of Ghana",
    location: "Legon Campus",
  },
  {
    id: 6,
    title: "Organic Chemistry Textbook + Study Guide",
    priceUSD: 65,
    image: "/images/products/chemistry-textbook.jpg",
    seller: "Efua L.",
    condition: "Good",
    category: "Textbooks",
    tokenId: "1006",
    timePosted: "4 days ago",
    verified: false,
    views: 33,
    university: "KNUST",
    location: "Kumasi Campus",
  },
]

const MarketplacePage = () => {
  return (
    <div>
      <h1>Marketplace</h1>
      {/* Display products here */}
    </div>
  )
}

export default MarketplacePage
