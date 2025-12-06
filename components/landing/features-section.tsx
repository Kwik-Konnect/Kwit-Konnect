"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Shield, MessageSquare, Sparkles, QrCode } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const features = [
  {
    icon: Briefcase,
    title: "Swipe to Apply",
    description: "Tinder-style job browsing. Swipe right to apply, left to skip. Quick and intuitive job matching.",
  },
  {
    icon: Sparkles,
    title: "AI Job Matching",
    description: "Our AI analyzes your skills and preferences to show you the most relevant opportunities first.",
  },
  {
    icon: FileText,
    title: "Smart CV Builder",
    description: "Generate professional CVs instantly with AI. Tailored for each job you apply to.",
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    description: "Your certificates are hashed and stored on-chain. Employers can verify authenticity instantly.",
  },
  {
    icon: QrCode,
    title: "QR Code Credentials",
    description: "Each verified certificate gets a QR code. Scan to verify — no fraud, no fakes.",
  },
  {
    icon: MessageSquare,
    title: "Interview Coach",
    description: "Practice with AI mock interviews. Get real-time feedback, scores, and improvement tips.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            From job discovery to interview preparation — we have got you covered
          </p>
        </div>

        <div className="mt-14 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="relative group">
              <GlowingEffect
                spread={50}
                glow={true}
                disabled={false}
                proximity={90}
                inactiveZone={0.3}
                borderWidth={2}
              />
              <Card className="relative h-full rounded-2xl border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/40">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
