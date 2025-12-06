"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Briefcase, Settings, Camera, Plus, X, Save } from "lucide-react"

export default function ProfilePage() {
  const [name, setName] = useState("Aminata Kamara")
  const [email, setEmail] = useState("aminata.kamara@email.com")
  const [title, setTitle] = useState("Frontend Developer")
  const [location, setLocation] = useState("Freetown, Sierra Leone")
  const [bio, setBio] = useState("Passionate about building accessible web applications for Sierra Leone.")
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS", "Next.js"])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="profile" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">My Profile</h1>
                <p className="mt-1 text-muted-foreground">Manage your account and preferences</p>
              </div>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="applications" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Applications</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile">
              <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                {/* Profile card */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/professional-woman-diverse.png" />
                          <AvatarFallback className="text-2xl">AK</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <h2 className="mt-4 text-xl font-bold">{name}</h2>
                      <p className="text-muted-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground">{location}</p>

                      <div className="mt-4 flex flex-wrap justify-center gap-1">
                        {skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-6 grid w-full grid-cols-3 gap-2 border-t border-border pt-6 text-center">
                        <div>
                          <div className="text-xl font-bold text-primary">12</div>
                          <div className="text-xs text-muted-foreground">Applied</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-primary">3</div>
                          <div className="text-xs text-muted-foreground">Interviews</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-primary">2</div>
                          <div className="text-xs text-muted-foreground">Certificates</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Edit profile */}
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        />
                        <Button variant="outline" onClick={addSkill}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                            {skill}
                            <button
                              onClick={() => setSkills((s) => s.filter((x) => x !== skill))}
                              className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full gap-2 sm:w-auto">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Frontend Developer",
                        company: "TechSalone",
                        status: "Under Review",
                        date: "2 days ago",
                      },
                      {
                        title: "Community Manager",
                        company: "Christex Foundation",
                        status: "Interview",
                        date: "1 week ago",
                      },
                      {
                        title: "Data Entry Clerk",
                        company: "Ministry of Health",
                        status: "Applied",
                        date: "2 weeks ago",
                      },
                    ].map((app, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{app.title}</p>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <Badge variant={app.status === "Interview" ? "default" : "secondary"}>{app.status}</Badge>
                          <span className="text-sm text-muted-foreground">{app.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Email notifications for new job matches", checked: true },
                        { label: "SMS alerts for interview invitations", checked: true },
                        { label: "Weekly job digest", checked: false },
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="h-4 w-4 rounded border-border"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Privacy</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Make my profile visible to recruiters", checked: true },
                        { label: "Show my verified certificates publicly", checked: true },
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="h-4 w-4 rounded border-border"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
