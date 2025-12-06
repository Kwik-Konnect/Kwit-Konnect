"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Briefcase, FileText, Shield, MessageSquare, User, Building2, Users, LayoutDashboard } from "lucide-react"
import { Logo } from "@/components/logo"
import { useRole } from "@/lib/role-context"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navLinks = [
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/community", label: "Community", icon: Users },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/certificates", label: "Certificates", icon: Shield },
  { href: "/interview", label: "Interview Coach", icon: MessageSquare },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { role, setRole } = useRole()
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const toggleRole = () => {
    setRole(role === "talent" ? "employer" : "talent")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons and Role Toggle */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleRole}
            className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/80"
          >
            {role === "talent" ? <User className="h-3.5 w-3.5" /> : <Building2 className="h-3.5 w-3.5" />}
            <span className="capitalize">{role}</span>
          </button>
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Logo size="sm" />
              </Link>

              <button
                onClick={toggleRole}
                className="flex items-center justify-between rounded-lg bg-accent px-4 py-3 text-sm font-medium transition-colors hover:bg-accent/80"
              >
                <span className="flex items-center gap-2">
                  {role === "talent" ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  <span className="capitalize">{role}</span>
                </span>
                <Badge variant="secondary" className="text-xs">
                  Switch
                </Badge>
              </button>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start bg-transparent h-11">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent h-11"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full h-11 bg-transparent">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                      <Button className="w-full h-11">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
