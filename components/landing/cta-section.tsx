import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary via-primary to-accent px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 shadow-2xl">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-1/4 -top-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl text-center relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground text-balance leading-tight">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-primary-foreground/90 text-pretty leading-relaxed">
              Join thousands of Sierra Leone youth who are already using Kwik Konnect to discover jobs, build their
              careers, and verify their achievements.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto gap-2 h-13 sm:h-12 text-base shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/certificates" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent h-13 sm:h-12 text-base backdrop-blur-sm"
                >
                  Verify a Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
