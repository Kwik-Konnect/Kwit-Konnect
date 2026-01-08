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
import { Building2, MapPin, Star, Search, Briefcase, Mail, MessageSquare, Globe, ExternalLink, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

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
  type: "Startup" | "Big Company"
  bgImage: string
  displayImage: string
  email: string
  whatsapp: string
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
    description: "Leading tech company building digital solutions for Sierra Leone. We specialize in custom software development, cloud infrastructure, and tech consultancy. TechSalone is at the forefront of the digital revolution in Sierra Leone, providing world-class services to local and international clients.",
    hiringFocus: ["Engineering", "Design", "Product"],
    type: "Big Company",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=200",
    email: "hr@techsalone.sl",
    whatsapp: "+23277000000",
  },
  {
    id: "2",
    name: "Christex Foundation",
    location: "Freetown",
    industry: ["Non-Profit", "Community"],
    rating: 4.8,
    reviewCount: 8,
    openRoles: 3,
    description: "Empowering youth through education and community development. Christex Foundation works tirelessly to provide opportunities for underprivileged youth in Freetown, focusing on vocational training and mentorship programs.",
    hiringFocus: ["Marketing", "Operations"],
    type: "Startup",
    bgImage: "https://images.unsplash.com/photo-1521737706076-34a173df2424?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=200",
    email: "info@christex.org",
    whatsapp: "+23277111111",
  },
  {
    id: "3",
    name: "Ministry of Health",
    location: "Freetown",
    industry: ["Government", "Healthcare"],
    rating: 4.2,
    reviewCount: 25,
    openRoles: 8,
    description: "National healthcare policy and service delivery. The Ministry of Health is responsible for the overall healthcare system in Sierra Leone, ensuring access to quality health services for all citizens through policy making and implementation.",
    hiringFocus: ["Healthcare", "Data", "Administration"],
    type: "Big Company",
    bgImage: "https://images.unsplash.com/photo-1538108176635-dec3e47c62ee?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200",
    email: "contact@health.gov.sl",
    whatsapp: "+23277222222",
  },
  {
    id: "4",
    name: "Africell Sierra Leone",
    location: "Freetown",
    industry: ["Telecommunications", "Technology"],
    rating: 4.3,
    reviewCount: 42,
    openRoles: 12,
    description: "Connecting Sierra Leone with world-class mobile services. Africell is the largest mobile network operator in Sierra Leone, providing a wide range of services including voice, data, and mobile money to millions of customers.",
    hiringFocus: ["Sales", "Engineering", "Customer Service"],
    type: "Big Company",
    bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=200",
    email: "jobs@africell.sl",
    whatsapp: "+23277333333",
  },
  {
    id: "5",
    name: "Digital Dreams SL",
    location: "Bo",
    industry: ["Technology", "Design"],
    rating: 4.6,
    reviewCount: 15,
    openRoles: 4,
    description: "Creative digital agency specializing in mobile and web apps. Digital Dreams SL is a boutique agency focused on crafting beautiful and functional digital products for startups and established businesses in the southern region.",
    hiringFocus: ["Design", "Development"],
    type: "Startup",
    bgImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200",
    email: "hello@digitaldreams.sl",
    whatsapp: "+23277444444",
  },
  {
    id: "6",
    name: "Feed Salone Initiative",
    location: "Nationwide",
    industry: ["Agriculture", "Social Enterprise"],
    rating: 4.4,
    reviewCount: 18,
    openRoles: 6,
    description: "Transforming agriculture through innovation and youth empowerment. Feed Salone Initiative aims to achieve food security in Sierra Leone by supporting local farmers and encouraging youth participation in modern agriculture.",
    hiringFocus: ["Agriculture", "Operations", "Finance"],
    type: "Startup",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    displayImage: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=200",
    email: "apply@feedsalone.sl",
    whatsapp: "+23277555555",
  },
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"All" | "Startup" | "Big Company">("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company)
    setIsModalOpen(true)
  }

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase())) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterType === "All" || company.type === filterType

    return matchesSearch && matchesFilter
  })

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

          {/* Filters and View Toggle */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies, industries, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-border p-1 bg-muted/50">
                {(["All", "Startup", "Big Company"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    className="h-8 text-xs px-3"
                  >
                    {type === "All" ? "All" : type === "Startup" ? "Startups" : "Big Enterprise"}
                  </Button>
                ))}
              </div>
              <div className="flex rounded-lg border border-border p-1 bg-muted/50 ml-auto sm:ml-0">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" /> {/* Replace with Grid icon if available */}
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <Building2 className="h-4 w-4" /> {/* Replace with List icon if available */}
                </Button>
              </div>
            </div>
          </div>

          {/* Company list/grid */}
          <div
            className={
              viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4 max-w-4xl mx-auto"
            }
          >
            {filteredCompanies.map((company) => (
              <div key={company.id} className="cursor-pointer" onClick={() => handleCompanyClick(company)}>
                <Card
                  className={`group relative overflow-hidden border-2 transition-all hover:border-primary/50 bg-card/50 backdrop-blur-sm ${viewMode === "list" ? "flex flex-row items-center h-48" : "h-full"
                    }`}
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.2}
                    borderWidth={2}
                  />

                  {/* Background Image / Pattern */}
                  <div
                    className={`${viewMode === "list" ? "w-1/3 h-full" : "h-32 w-full"} relative bg-muted overflow-hidden`}
                  >
                    <img
                      src={company.bgImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {company.type}
                    </Badge>
                  </div>

                  <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className={`flex ${viewMode === "list" ? "flex-row gap-6 items-start" : "flex-col items-center text-center"}`}>
                      {/* Company Logo/Avatar */}
                      <div className={`relative ${viewMode === "list" ? "" : "-mt-16 mb-4"}`}>
                        <Avatar className="h-20 w-20 border-4 border-card shadow-xl">
                          <img src={company.displayImage} alt={company.name} className="h-full w-full object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl font-bold text-primary">
                            {getInitials(company.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Company name */}
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors truncate">
                          {company.name}
                        </h3>

                        <div className={`flex flex-wrap gap-3 ${viewMode === "list" ? "mt-2" : "justify-center mt-2"} items-center text-sm text-muted-foreground`}>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            <span className="font-semibold text-foreground">{company.rating}</span>
                            <span>({company.reviewCount})</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={`mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2 ${viewMode === "list" ? "max-w-xl" : ""}`}>
                          {company.description}
                        </p>

                        {/* Footer info */}
                        <div className={`mt-4 flex flex-wrap gap-2 ${viewMode === "list" ? "" : "justify-center"}`}>
                          {company.industry.slice(0, 2).map((ind) => (
                            <Badge key={ind} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">
                              {ind}
                            </Badge>
                          ))}
                          <div className="flex items-center gap-1.5 text-xs font-semibold ml-auto text-primary px-2 py-1 rounded-full bg-primary/10">
                            <Briefcase className="h-3 w-3" />
                            <span>{company.openRoles} Positions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

        {/* Company Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-card shadow-2xl">
            {selectedCompany && (
              <div className="flex flex-col">
                {/* Modal Header/Background */}
                <div className="relative h-48 sm:h-64">
                  <img
                    src={selectedCompany.bgImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Close button handled by DialogContent internally, but we can add more info here */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end gap-6">
                    <Avatar className="h-24 w-24 border-4 border-card shadow-2xl shrink-0">
                      <img src={selectedCompany.displayImage} alt={selectedCompany.name} className="h-full w-full object-cover" />
                      <AvatarFallback className="text-2xl">{getInitials(selectedCompany.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pb-2">
                      <Badge className="mb-2 bg-primary/90 text-primary-foreground">{selectedCompany.type}</Badge>
                      <DialogTitle className="text-3xl font-bold text-white">{selectedCompany.name}</DialogTitle>
                      <div className="flex items-center gap-4 mt-2 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedCompany.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="font-bold">{selectedCompany.rating}</span>
                          <span>({selectedCompany.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        About {selectedCompany.name}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedCompany.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold mb-3">Industries & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.industry.map((ind) => (
                          <Badge key={ind} variant="secondary" className="px-3 py-1">
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold mb-3">Currently Hiring For</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.hiringFocus.map((focus) => (
                          <Badge key={focus} variant="outline" className="px-3 py-1">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-muted/30 border-primary/10">
                      <CardContent className="p-4 space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Quick Stats</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Briefcase className="h-4 w-4" /> Open Roles
                            </span>
                            <span className="font-bold">{selectedCompany.openRoles}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-4 w-4" /> HQ
                            </span>
                            <span className="font-bold">{selectedCompany.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1">Connect with us</h4>
                      <Button className="w-full justify-start gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white border-none" asChild>
                        <a href={`https://wa.me/${selectedCompany.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="h-5 w-5" />
                          Chat on WhatsApp
                        </a>
                      </Button>
                      <Button className="w-full justify-start gap-3" variant="outline" asChild>
                        <a href={`mailto:${selectedCompany.email}`}>
                          <Mail className="h-5 w-5" />
                          Send an Email
                        </a>
                      </Button>
                      <Button className="w-full justify-start gap-3" variant="ghost" asChild>
                        <a href="#" target="_blank">
                          <Globe className="h-5 w-5" />
                          Visit Website
                        </a>
                      </Button>
                    </div>

                    <Button className="w-full mt-4" size="lg">
                      View Open Positions
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
