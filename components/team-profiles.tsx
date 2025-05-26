"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Joe Emmanuel",
    role: "Co-Founder & Product Designer",
    bio: "Product designer and entrepreneur passionate about creating accessible solutions for African students. Focused on bridging the gap between traditional and digital commerce.",
    image: "/placeholder.svg?height=150&width=150",
    university: "Ho Technical University (HTU)",
    skills: ["UI/UX Design", "Product Strategy", "User Research", "Figma"],
    social: {
      github: "https://github.com/joeemmanuel",
      linkedin: "https://linkedin.com/in/joeemmanuel",
      twitter: "https://twitter.com/joeemmanuel",
      email: "joe@stufind.app",
    },
    achievements: [
      "Winner - Ghana Tech Innovation Awards 2023",
      "Featured in African Tech Weekly",
      "Led design for 3 successful student platforms",
    ],
  },
  {
    id: 2,
    name: "Akakpo Ernest",
    role: "Lead Developer",
    bio: "Full-stack developer and blockchain enthusiast from HTU. Specializes in building scalable platforms that serve emerging markets with focus on financial inclusion.",
    image: "/placeholder.svg?height=150&width=150",
    university: "Ho Technical University (HTU)",
    skills: ["React", "Solidity", "Node.js", "Web3", "Smart Contracts"],
    social: {
      github: "https://github.com/akakpoernest",
      linkedin: "https://linkedin.com/in/akakpoernest",
      twitter: "https://twitter.com/akakpoernest",
      email: "ernest@stufind.app",
    },
    achievements: ["Blockchain Developer Certification", "Built 5+ DeFi applications", "Mentor at HTU Tech Hub"],
  },
]

export function TeamProfiles() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Founders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two passionate students who saw the need for a better way for Ghanaian students to trade safely and
            securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="text-xs">
                      {member.university}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Achievements</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${member.social.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
