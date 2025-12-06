"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Building2, MapPin, Star, Search, Briefcase } from "lucide-react"

interface Company {
  id: string
  name: string
  location: string
  industry: string[]
  rating: number
  reviewCount: number
  openRoles: number
  description: string
  hiringFocus: string[]
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechSalone",
    location: "Freetown",
    industry: ["Technology", "Software"],
    rating: 4.5,
    reviewCount: 12,
    openRoles: 5,
    description: "Leading tech company building digital solutions for Sierra Leone",
    hiringFocus: ["Engineering", "Design", "Product"],
  },
  {
    id: "2",
    name: "Christex Foundation",
    location: "Freetown",
    industry: ["Non-Profit", "Community"],
    rating: 4.8,
    reviewCount: 8,
    openRoles: 3,
    description: "Empowering youth through education and community development",
    hiringFocus: ["Marketing", "Operations"],
  },
  {
    id: "3",
    name: "Ministry of Health",
    location: "Freetown",
    industry: ["Government", "Healthcare"],
    rating: 4.2,
    reviewCount: 25,
    openRoles: 8,
    description: "National healthcare policy and service delivery",
    hiringFocus: ["Healthcare", "Data", "Administration"],
  },
  {
    id: "4",
    name: "Africell Sierra Leone",
    location: "Freetown",
    industry: ["Telecommunications", "Technology"],
    rating: 4.3,
    reviewCount: 42,
    openRoles: 12,
    description: "Connecting Sierra Leone with world-class mobile services",
    hiringFocus: ["Sales", "Engineering", "Customer Service"],
  },
  {
    id: "5",
    name: "Digital Dreams SL",
    location: "Bo",
    industry: ["Technology", "Design"],
    rating: 4.6,
    reviewCount: 15,
    openRoles: 4,
    description: "Creative digital agency specializing in mobile and web apps",
    hiringFocus: ["Design", "Development"],
  },
  {
    id: "6",
    name: "Feed Salone Initiative",
    location: "Nationwide",
    industry: ["Agriculture", "Social Enterprise"],
    rating: 4.4,
    reviewCount: 18,
    openRoles: 6,
    description: "Transforming agriculture through innovation and youth empowerment",
    hiringFocus: ["Agriculture", "Operations", "Finance"],
  },
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase())) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold sm:text-3xl">Companies</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore {filteredCompanies.length} companies hiring in Sierra Leone
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies, industries, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Company grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <Card className="group relative h-full overflow-hidden border-2 transition-all hover:border-primary/50">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.2}
                    borderWidth={2}
                  />
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Company avatar */}
                      <Avatar className="h-16 w-16 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg font-bold text-primary">
                          {getInitials(company.name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Company name */}
                      <h3 className="mt-4 text-lg font-bold group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>

                      {/* Location */}
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{company.location}</span>
                      </div>

                      {/* Rating */}
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="font-semibold">{company.rating}</span>
                        <span className="text-sm text-muted-foreground">({company.reviewCount} reviews)</span>
                      </div>

                      {/* Industry tags */}
                      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                        {company.industry.map((ind) => (
                          <Badge key={ind} variant="secondary" className="text-xs">
                            {ind}
                          </Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {company.description}
                      </p>

                      {/* Hiring focus */}
                      <div className="mt-4 w-full space-y-2 border-t border-border pt-4">
                        <div className="flex items-center justify-center gap-1.5 text-sm font-medium">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span>{company.openRoles} open roles</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1">
                          {company.hiringFocus.slice(0, 3).map((focus) => (
                            <Badge key={focus} variant="outline" className="text-xs">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Employer CTA */}
          <Card className="mt-12 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 sm:p-8 text-center">
              <Building2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-2xl font-bold">Are you an employer?</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Claim your company profile to showcase your brand, attract top talent, and manage your hiring presence
                on Kwik Konnect.
              </p>
              <Button className="mt-6" size="lg">
                Claim Your Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
