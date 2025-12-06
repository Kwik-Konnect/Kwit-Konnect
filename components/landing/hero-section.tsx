"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] sm:h-[1000px] sm:w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl gradient-animate" />
        <div className="absolute top-1/4 right-0 h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] rounded-full bg-gradient-to-bl from-accent/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 sm:mb-8 rounded-full px-4 py-1.5 shadow-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Powered by AI & Blockchain
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Kwik
            </span>{" "}
            Jobs.{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Konnect
            </span>{" "}
            Faster.
          </h1>

          <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-pretty text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed px-4">
            The modern job platform for Sierra Leone youth. AI-powered matching, blockchain-verified credentials, smart
            CV builder, and interview coaching — all in one place.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5 px-4">
            <Link href="/jobs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 h-13 sm:h-12 text-base shadow-lg hover:shadow-xl">
                Start Swiping Jobs
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cv-builder" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-13 sm:h-12 text-base bg-transparent">
                Build Your CV
              </Button>
            </Link>
          </div>

          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-muted-foreground px-4">
            <div className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border/50">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border/50">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium">AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border/50">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Instant Applications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
