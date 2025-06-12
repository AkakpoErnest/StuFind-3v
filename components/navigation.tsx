"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Home, User, Menu, X, Coins, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StufindLogo } from "@/components/stufind-logo"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth/auth-provider"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut, isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenu] = useState(false) // Renamed for clarity
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(pathname !== "/" && window.history.length > 1)
  }, [pathname])

  const handleBack = () => {
    if (canGoBack) {
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
      case "/profile":
        return "Profile"
      case "/post-job":
        return "Post a Job"
      default:
        return "Stufind"
    }
  }

  const isHomePage = pathname === "/"

  const navItems = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/used-products", label: "Used Products" },
    { href: "/jobs", label: "Jobs" },
    { href: "/donate", label: "Donate" },
    { href: "/verify", label: "Verify" },
    { href: "/whatsapp-ai", label: "WhatsApp AI" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {/* Back Button (ArrowLeft) - Visible on all non-home pages, all screen sizes */}
            <AnimatePresence>
              {!isHomePage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="hover:bg-primary/10 transition-colors duration-200"
                    aria-label="Go back to previous page"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo - Always links to Home */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <StufindLogo size={32} />
              <span className="text-xl font-bold text-primary hidden sm:block">StuFind</span>
            </Link>

            {/* Page Title */}
            <AnimatePresence mode="wait">
              {!isHomePage && (
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="outline" className="hidden md:flex">
                    {getPageTitle()}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                asChild
                className="transition-all duration-200"
              >
                <Link href={item.href}>
                  {item.label === "WhatsApp AI" ? <Bot className="h-4 w-4 mr-1" /> : null}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Home Button (House icon) - Now always visible on non-home pages, all screen sizes */}
            {!isHomePage && (
              <Button variant="ghost" size="icon" asChild aria-label="Go to Home page">
                <Link href="/">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* User Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm hidden md:block text-muted-foreground">
                  {user?.firstName || user?.walletAddress?.slice(0, 6)}
                </span>
                <Button variant="ghost" size="icon" asChild aria-label="User Profile">
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild aria-label="StuFind Tokens">
                  <Link href="/wallet">
                    <Coins className="h-5 w-5 text-yellow-500" />
                  </Link>
                </Button>
              </div>
            ) : null}

            <ThemeToggle />

            {/* Mobile Menu Button (Hamburger/X icon) - Visible only on mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenu(!isMobileMenuOpen)} // Corrected function call
              className="lg:hidden" // This button is specifically for mobile
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Collapsible) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 pb-4 border-t pt-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    asChild
                    className="justify-start"
                    onClick={() => setIsMobileMenu(false)} // Corrected function call
                  >
                    <Link href={item.href}>
                      {item.label === "WhatsApp AI" ? <Bot className="h-4 w-4 mr-2" /> : null}
                      {item.label}
                    </Link>
                  </Button>
                ))}

                {isAuthenticated && (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/profile" onClick={() => setIsMobileMenu(false)}>
                        {" "}
                        {/* Corrected function call */}
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/wallet" onClick={() => setIsMobileMenu(false)}>
                        {" "}
                        {/* Corrected function call */}
                        StuFind Wallet
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        signOut()
                        setIsMobileMenu(false) // Corrected function call
                      }}
                      className="justify-start"
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
