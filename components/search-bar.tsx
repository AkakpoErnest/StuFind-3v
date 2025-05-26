"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search items..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState(["MacBook", "Textbooks", "iPhone", "Dorm items"])

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
      // Add to recent searches if not already there
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 3)])
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="pl-10 pr-20"
        />
        {query && (
          <Button variant="ghost" size="sm" onClick={clearSearch} className="absolute right-12 top-1 h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button onClick={handleSearch} className="absolute right-1 top-1 h-8">
          Search
        </Button>
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Recent:</span>
          {recentSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                setQuery(search)
                onSearch(search)
              }}
            >
              {search}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
