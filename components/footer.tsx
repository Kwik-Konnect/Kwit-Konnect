import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Sierra Leone youth with AI-powered job matching and blockchain-verified credentials.
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Platform</h3>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/jobs" className="hover:text-primary transition-colors">
                Find Jobs
              </Link>
              <Link href="/cv-builder" className="hover:text-primary transition-colors">
                CV Builder
              </Link>
              <Link href="/certificates" className="hover:text-primary transition-colors">
                Certificate Verification
              </Link>
              <Link href="/interview" className="hover:text-primary transition-colors">
                Interview Coach
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Resources</h3>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/career-guide" className="hover:text-primary transition-colors">
                Career Guide
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/help" className="hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Built for Big 5 AI & Blockchain Hackathon</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Kwik Konnect. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
