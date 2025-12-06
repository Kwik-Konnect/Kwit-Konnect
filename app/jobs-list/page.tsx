"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { MapPin, Banknote, Clock, Building2, Star, Filter, Search, Bookmark, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  remote: "Remote" | "Hybrid" | "On-site"
  type: "Full-time" | "Part-time" | "Internship" | "Contract"
  salary?: string
  skills: string[]
  experienceLevel: "Entry" | "Junior" | "Mid" | "Senior"
  postedAt: string
  description: string
  matchLevel: "high" | "good" | "explore"
  companyRating?: number
  reviewCount?: number
  tags: string[]
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechSalone",
    location: "Freetown",
    remote: "Hybrid",
    type: "Full-time",
    salary: "SLE 3,000-5,000/mo",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    experienceLevel: "Mid",
    postedAt: "2 days ago",
    description: "Join our growing team to build modern web applications for businesses across Sierra Leone.",
    matchLevel: "high",
    companyRating: 4.5,
    reviewCount: 12,
    tags: ["Tech", "Design"],
  },
  {
    id: "2",
    title: "Community Manager",
    company: "Christex Foundation",
    location: "Freetown",
    remote: "Remote",
    type: "Part-time",
    salary: "SLE 1,500-2,500/mo",
    skills: ["Social Media", "Communication", "Content Creation"],
    experienceLevel: "Junior",
    postedAt: "1 day ago",
    description: "Manage and grow our online community across social platforms.",
    matchLevel: "good",
    companyRating: 4.8,
    reviewCount: 8,
    tags: ["Marketing", "Social"],
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "Ministry of Health",
    location: "Freetown",
    remote: "On-site",
    type: "Contract",
    salary: "SLE 4,000-6,000/mo",
    skills: ["Excel", "SQL", "Data Visualization", "Python"],
    experienceLevel: "Mid",
    postedAt: "3 days ago",
    description: "Analyze health data to support policy decisions and improve healthcare delivery.",
    matchLevel: "explore",
    companyRating: 4.2,
    reviewCount: 25,
    tags: ["Data", "Health"],
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Digital Dreams SL",
    location: "Bo",
    remote: "Remote",
    type: "Full-time",
    salary: "SLE 3,500-5,500/mo",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    experienceLevel: "Mid",
    postedAt: "1 week ago",
    description: "Design beautiful and intuitive interfaces for mobile and web applications.",
    matchLevel: "high",
    companyRating: 4.6,
    reviewCount: 15,
    tags: ["Design", "Tech"],
  },
  {
    id: "5",
    title: "Sales Representative",
    company: "Africell Sierra Leone",
    location: "Freetown",
    remote: "On-site",
    type: "Full-time",
    salary: "SLE 2,500-4,000/mo",
    skills: ["Sales", "Communication", "Customer Service"],
    experienceLevel: "Entry",
    postedAt: "2 weeks ago",
    description: "Build relationships with customers and drive sales of our mobile products and services.",
    matchLevel: "explore",
    companyRating: 4.3,
    reviewCount: 42,
    tags: ["Sales", "Telecom"],
  },
]

const matchBadgeConfig = {
  high: { label: "High Match", variant: "default" as const, color: "bg-primary text-primary-foreground" },
  good: { label: "Good Match", variant: "secondary" as const, color: "bg-secondary text-secondary-foreground" },
  explore: { label: "Explore", variant: "outline" as const, color: "border-muted-foreground/30" },
}

export default function JobsListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [remoteFilter, setRemoteFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [experienceFilter, setExperienceFilter] = useState<string[]>([])
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesRemote = remoteFilter.length === 0 || remoteFilter.includes(job.remote)
    const matchesType = typeFilter.length === 0 || typeFilter.includes(job.type)
    const matchesExperience = experienceFilter.length === 0 || experienceFilter.includes(job.experienceLevel)

    return matchesSearch && matchesLocation && matchesRemote && matchesType && matchesExperience
  })

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Location</Label>
        <Input
          placeholder="e.g. Freetown"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold">Work Model</Label>
        <div className="space-y-2">
          {["Remote", "Hybrid", "On-site"].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={remoteFilter.includes(option)}
                onCheckedChange={(checked) => {
                  setRemoteFilter((prev) => (checked ? [...prev, option] : prev.filter((o) => o !== option)))
                }}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold">Job Type</Label>
        <div className="space-y-2">
          {["Full-time", "Part-time", "Internship", "Contract"].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={typeFilter.includes(option)}
                onCheckedChange={(checked) => {
                  setTypeFilter((prev) => (checked ? [...prev, option] : prev.filter((o) => o !== option)))
                }}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold">Experience Level</Label>
        <div className="space-y-2">
          {["Entry", "Junior", "Mid", "Senior"].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={experienceFilter.includes(option)}
                onCheckedChange={(checked) => {
                  setExperienceFilter((prev) => (checked ? [...prev, option] : prev.filter((o) => o !== option)))
                }}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setLocationFilter("")
          setRemoteFilter([])
          setTypeFilter([])
          setExperienceFilter([])
        }}
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Browse Jobs</h1>
              <p className="mt-1 text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by job title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Desktop filters sidebar */}
            <aside className="hidden lg:block">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterSection />
                </CardContent>
              </Card>
            </aside>

            {/* Job listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const matchConfig = matchBadgeConfig[job.matchLevel]
                const isSaved = savedJobs.includes(job.id)

                return (
                  <Card
                    key={job.id}
                    className="relative overflow-hidden border-2 hover:border-primary/50 transition-all"
                  >
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={80}
                      inactiveZone={0.2}
                      borderWidth={2}
                    />
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        {/* Job info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Building2 className="h-6 w-6 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-lg font-bold leading-tight">{job.title}</h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0"
                                  onClick={() => toggleSaveJob(job.id)}
                                >
                                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current text-primary" : ""}`} />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{job.company}</p>
                              {job.companyRating && (
                                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                                  <span className="font-medium">{job.companyRating}</span>
                                  <span>({job.reviewCount} reviews)</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {job.location} - {job.remote}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                            {job.salary && (
                              <div className="flex items-center gap-1.5">
                                <Banknote className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant={matchConfig.variant} className="font-medium">
                              {matchConfig.label}
                            </Badge>
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 sm:flex-col">
                          <Button className="flex-1 gap-2 sm:flex-none" size="sm">
                            Apply Now
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <Link href={`/companies/${job.id}`} className="flex-1 sm:flex-none">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              View Company
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        Posted {job.postedAt}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
