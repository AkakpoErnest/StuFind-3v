"use client"

import { Compass } from "lucide-react" // Importing the Compass icon

interface StufindLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function StufindLogo({ size = 32, showText = false, className = "" }: StufindLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`w-${size} h-${size} bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg`}
      >
        <Compass className="text-white" size={size * 0.6} /> {/* Using Compass icon */}
      </div>
      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          StuFind {/* Corrected spelling */}
        </span>
      )}
    </div>
  )
}
