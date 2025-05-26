"use client"

import Image from "next/image"

interface StufindLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function StufindLogo({ size = 32, showText = false, className = "" }: StufindLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/stufind-logo-gray.png"
        alt="Stufind"
        width={size}
        height={size}
        className="object-contain dark:invert"
      />
      {showText && <span className="text-2xl font-bold text-primary">Stufind</span>}
    </div>
  )
}
