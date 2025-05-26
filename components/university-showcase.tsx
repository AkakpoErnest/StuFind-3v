"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Users, TrendingUp } from "lucide-react"

interface University {
  name: string
  shortName: string
  logo: string
  students: number
  color: string
  tier: "tier1" | "tier2" | "tier3"
}

const universities: University[] = [
  {
    name: "University of Ghana",
    shortName: "UG",
    logo: "/placeholder.svg?height=80&width=80&text=UG",
    students: 1250,
    color: "from-blue-500 to-blue-600",
    tier: "tier1",
  },
  {
    name: "Kwame Nkrumah University of Science and Technology",
    shortName: "KNUST",
    logo: "/placeholder.svg?height=80&width=80&text=KNUST",
    students: 980,
    color: "from-red-500 to-red-600",
    tier: "tier1",
  },
  {
    name: "Ho Technical University",
    shortName: "HTU",
    logo: "/placeholder.svg?height=80&width=80&text=HTU",
    students: 450,
    color: "from-green-500 to-green-600",
    tier: "tier1",
  },
  {
    name: "Ashesi University",
    shortName: "Ashesi",
    logo: "/placeholder.svg?height=80&width=80&text=ASH",
    students: 320,
    color: "from-purple-500 to-purple-600",
    tier: "tier2",
  },
  {
    name: "University of Cape Coast",
    shortName: "UCC",
    logo: "/placeholder.svg?height=80&width=80&text=UCC",
    students: 780,
    color: "from-orange-500 to-orange-600",
    tier: "tier1",
  },
  {
    name: "Ghana Institute of Management and Public Administration",
    shortName: "GIMPA",
    logo: "/placeholder.svg?height=80&width=80&text=GIMPA",
    students: 290,
    color: "from-teal-500 to-teal-600",
    tier: "tier2",
  },
  {
    name: "University for Development Studies",
    shortName: "UDS",
    logo: "/placeholder.svg?height=80&width=80&text=UDS",
    students: 180,
    color: "from-indigo-500 to-indigo-600",
    tier: "tier3",
  },
  {
    name: "University of Education, Winneba",
    shortName: "UEW",
    logo: "/placeholder.svg?height=80&width=80&text=UEW",
    students: 220,
    color: "from-pink-500 to-pink-600",
    tier: "tier3",
  },
  {
    name: "University of Mines and Technology",
    shortName: "UMaT",
    logo: "/placeholder.svg?height=80&width=80&text=UMaT",
    students: 150,
    color: "from-yellow-500 to-yellow-600",
    tier: "tier3",
  },
  {
    name: "University of Professional Studies",
    shortName: "UPSA",
    logo: "/placeholder.svg?height=80&width=80&text=UPSA",
    students: 340,
    color: "from-cyan-500 to-cyan-600",
    tier: "tier2",
  },
  {
    name: "Valley View University",
    shortName: "VVU",
    logo: "/placeholder.svg?height=80&width=80&text=VVU",
    students: 120,
    color: "from-emerald-500 to-emerald-600",
    tier: "tier3",
  },
]

export function UniversityShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const tier1Unis = universities.filter((uni) => uni.tier === "tier1")
  const tier2Unis = universities.filter((uni) => uni.tier === "tier2")
  const tier3Unis = universities.filter((uni) => uni.tier === "tier3")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const getTotalStudents = () => {
    return universities.reduce((total, uni) => total + uni.students, 0)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Trusted by Students Across Ghana
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Join {getTotalStudents().toLocaleString()}+ verified students from Ghana's top universities
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{getTotalStudents().toLocaleString()}+</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <GraduationCap className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">{universities.length}</div>
            <div className="text-sm text-muted-foreground">Universities</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </motion.div>

        {/* Tier-based University Display */}
        <div className="space-y-8">
          {/* Tier 1 - Major Universities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-600">Leading Universities</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {tier1Unis.map((university, index) => (
                <motion.div
                  key={university.shortName}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${university.color} p-1 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <img
                        src={university.logo || "/placeholder.svg"}
                        alt={university.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-sm">{university.shortName}</div>
                    <div className="text-xs text-muted-foreground">{university.students} students</div>
                  </div>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10"
                    >
                      {university.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tier 2 - Growing Universities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold mb-6 text-purple-600">Growing Universities</h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {tier2Unis.map((university, index) => (
                <motion.div
                  key={university.shortName}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${university.color} p-1 shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <img
                        src={university.logo || "/placeholder.svg"}
                        alt={university.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-medium text-sm">{university.shortName}</div>
                    <div className="text-xs text-muted-foreground">{university.students} students</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tier 3 - Emerging Universities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-base font-semibold mb-6 text-green-600">Emerging Universities</h3>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {tier3Unis.map((university, index) => (
                <motion.div
                  key={university.shortName}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${university.color} p-1 shadow-sm group-hover:shadow-md transition-all duration-300`}
                  >
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <img
                        src={university.logo || "/placeholder.svg"}
                        alt={university.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-center">
                    <div className="font-medium text-xs">{university.shortName}</div>
                    <div className="text-xs text-muted-foreground">{university.students}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"
          />
        </div>
      </div>
    </section>
  )
}
