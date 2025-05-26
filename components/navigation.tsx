"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Home, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StufindLogo } from "@/components/stufind-logo"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const canGoBack = pathname !== "/"
  const isHomePage = pathname === "/"

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  const getPageTitle = () => {
    switch (pathname) {
      case "/marketplace":
        return "Marketplace"
      case "/used-products":
        return "Used Products"
      case "/jobs":
        return "Jobs & Internships"
      case "/donate":
        return "Donate & Support"
      case "/verify":
        return "Student Verification"
      case "/whatsapp-ai":
        return "WhatsApp AI"
      case "/create":
        return "Create Listing"
      case "/browse":
        return "Browse Items"
      case "/wallet":
        return "Wallet"
      default:
        return "Stufind"
    }
  }

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {canGoBack && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <Link href="/" className="flex items-center gap-3">
              <StufindLogo size={32} />
              <span className="text-xl font-bold text-primary">Stufind</span>
            </Link>

            {!isHomePage && <Badge variant="outline">{getPageTitle()}</Badge>}
          </div>

          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
