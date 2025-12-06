"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Banknote, Building2 } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Gig"
  salary?: string
  skills: string[]
  postedAt: string
  description: string
  logo?: string
}

interface JobCardProps {
  job: Job
  style?: React.CSSProperties
  className?: string
}

export function JobCard({ job, style, className = "" }: JobCardProps) {
  return (
    <div className="relative h-full w-full" style={style}>
      <GlowingEffect spread={50} glow={true} disabled={false} proximity={100} inactiveZone={0.2} borderWidth={3} />
      <Card
        className={`relative h-full w-full cursor-grab rounded-2xl border-2 border-border/60 bg-card shadow-xl active:cursor-grabbing hover:shadow-2xl transition-shadow ${className}`}
      >
        <CardContent className="flex h-full flex-col p-6">
          {/* Company header */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xl font-bold">{job.title}</h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>

          {/* Job details */}
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
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

          {/* Description */}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">{job.description}</p>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>

          {/* Posted time */}
          <p className="mt-4 text-xs text-muted-foreground">Posted {job.postedAt}</p>
        </CardContent>
      </Card>
    </div>
  )
}
