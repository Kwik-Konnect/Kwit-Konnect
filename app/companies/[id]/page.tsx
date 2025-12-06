"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { MapPin, Star, ExternalLink, Briefcase, Users, Heart, Clock, ArrowLeft } from "lucide-react"

interface Review {
  id: string
  author: string
  role: string
  rating: number
  headline: string
  body: string
  date: string
  helpful: number
}

interface Job {
  id: string
  title: string
  type: string
  location: string
  postedAt: string
}

const mockCompanyData: Record<string, any> = {
  "1": {
    name: "TechSalone",
    location: "Freetown, Sierra Leone",
    industry: ["Technology", "Software"],
    rating: 4.5,
    reviewCount: 12,
    website: "https://techsalone.com",
    description:
      "TechSalone is Sierra Leone's leading technology company, building innovative digital solutions that empower businesses and individuals across West Africa. We're committed to developing local tech talent and creating world-class products.",
    culture: ["Innovation", "Diversity", "Work-Life Balance", "Growth"],
    perks: ["Health Insurance", "Remote Work", "Learning Budget", "Flexible Hours"],
    openRoles: [
      { id: "1", title: "Frontend Developer", type: "Full-time", location: "Freetown", postedAt: "2 days ago" },
      { id: "2", title: "Product Designer", type: "Full-time", location: "Hybrid", postedAt: "1 week ago" },
      { id: "3", title: "Backend Engineer", type: "Full-time", location: "Freetown", postedAt: "2 weeks ago" },
    ],
    reviews: [
      {
        id: "1",
        author: "John K.",
        role: "Software Engineer",
        rating: 5,
        headline: "Great place to grow your career",
        body: "TechSalone has been an amazing place to work. The team is supportive, the projects are challenging, and there's a real focus on professional development.",
        date: "2 months ago",
        helpful: 8,
      },
      {
        id: "2",
        author: "Aminata S.",
        role: "Product Designer",
        rating: 4,
        headline: "Innovative and collaborative environment",
        body: "Love the creative freedom and the collaborative culture. Management is open to new ideas and truly values employee input.",
        date: "3 months ago",
        helpful: 12,
      },
    ],
  },
}

export default function CompanyDetailPage() {
  const params = useParams()
  const companyId = params.id as string
  const company = mockCompanyData[companyId] || mockCompanyData["1"]

  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-current text-yellow-500" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
    )
  }

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
          {/* Back button */}
          <Link href="/companies">
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Button>
          </Link>

          {/* Company header */}
          <Card className="mb-6">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-2xl font-bold text-primary">
                    {getInitials(company.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold sm:text-3xl">{company.name}</h1>
                    <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStars(company.rating)}
                    <span className="font-semibold">{company.rating}</span>
                    <span className="text-sm text-muted-foreground">({company.reviewCount} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {company.industry.map((ind: string) => (
                      <Badge key={ind} variant="secondary">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full gap-2 sm:w-auto">
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Jobs ({company.openRoles.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({company.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="leading-relaxed text-muted-foreground">{company.description}</p>

                  <div>
                    <h3 className="mb-3 font-semibold">Company Culture</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.culture.map((value: string) => (
                        <Badge key={value} variant="outline">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold">Perks & Benefits</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {company.perks.map((perk: string) => (
                        <div key={perk} className="flex items-center gap-2 text-sm">
                          <Heart className="h-4 w-4 text-primary" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              {company.openRoles.map((job: Job) => (
                <Card key={job.id} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.2}
                    borderWidth={2}
                  />
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </div>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">Posted {job.postedAt}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleSaveJob(job.id)}>
                          <Heart
                            className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current text-primary" : ""}`}
                          />
                        </Button>
                        <Link href="/jobs">
                          <Button>Apply Now</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {company.reviews.map((review: Review) => (
                <Card key={review.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(review.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{review.author}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{review.role}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{review.headline}</h4>
                          <p className="mt-1 leading-relaxed text-muted-foreground">{review.body}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                            <Users className="h-4 w-4" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
