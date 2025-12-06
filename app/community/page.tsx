"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import {
  ImageIcon,
  FileText,
  Lightbulb,
  Users,
  Trophy,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PostType = "text" | "image" | "portfolio_drop" | "brainstorm" | "collab_call" | "win" | "feedback_request"

interface Post {
  id: string
  content: string
  type: PostType
  created_at: string
  author_id: string
  profiles: {
    id: string
    full_name: string
    role?: string
    avatar_url?: string
  }
  reactions: { fire: number; bulb: number; clap: number; heart: number }
  comments: number
}

const postTypes: { type: PostType; label: string; icon: any; color: string }[] = [
  { type: "text", label: "Text", icon: FileText, color: "text-blue-500" },
  { type: "image", label: "Image", icon: ImageIcon, color: "text-purple-500" },
  { type: "portfolio_drop", label: "Portfolio", icon: Trophy, color: "text-yellow-500" },
  { type: "brainstorm", label: "Brainstorm", icon: Lightbulb, color: "text-orange-500" },
  { type: "collab_call", label: "Collab", icon: Users, color: "text-green-500" },
  { type: "win", label: "Win", icon: Trophy, color: "text-primary" },
  { type: "feedback_request", label: "Feedback", icon: MessageSquare, color: "text-pink-500" },
]

const dailyPrompt = "Share your biggest career win this month - no matter how small!"

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState("")
  const [newPostType, setNewPostType] = useState<PostType>("text")
  const [sortBy, setSortBy] = useState<"latest" | "trending">("latest")
  const [showComposer, setShowComposer] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/posts?sort=${sortBy}`)
        if (!response.ok) throw new Error("Failed to fetch posts")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("[v0] Error fetching posts:", error)
        toast({
          title: "Error",
          description: "Failed to load community posts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [sortBy, toast])

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return

    try {
      setSubmitting(true)
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPost,
          type: newPostType,
        }),
      })

      if (!response.ok) throw new Error("Failed to create post")

      const postsResponse = await fetch(`/api/posts?sort=${sortBy}`)
      const updatedPosts = await postsResponse.json()
      setPosts(updatedPosts)

      setNewPost("")
      setNewPostType("text")
      setShowComposer(false)
      toast({
        title: "Success",
        description: "Your post has been shared with the community!",
      })
    } catch (error) {
      console.error("[v0] Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleReaction = async (postId: string, reaction: keyof Post["reactions"]) => {
    try {
      const response = await fetch(`/api/posts/${postId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      })

      if (!response.ok) throw new Error("Failed to add reaction")

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              reactions: {
                ...post.reactions,
                [reaction]: post.reactions[reaction] + 1,
              },
            }
          }
          return post
        }),
      )
    } catch (error) {
      console.error("[v0] Error adding reaction:", error)
      toast({
        title: "Error",
        description: "Failed to add reaction",
        variant: "destructive",
      })
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const getPostTypeConfig = (type: PostType) => postTypes.find((pt) => pt.type === type) || postTypes[0]

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const then = new Date(date)
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return then.toLocaleDateString()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold sm:text-3xl">Community</h1>
            <p className="mt-1 text-sm text-muted-foreground">Connect, share, and grow with fellow creatives</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main feed */}
            <div className="space-y-6">
              {/* Daily prompt */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Daily Prompt</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{dailyPrompt}</p>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          setShowComposer(true)
                          setNewPost(dailyPrompt + " ")
                        }}
                      >
                        Share Your Story
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Composer */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  {!showComposer ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 text-muted-foreground bg-transparent"
                      onClick={() => setShowComposer(true)}
                    >
                      Share something with the community...
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      {/* Post type selector */}
                      <div className="flex flex-wrap gap-2">
                        {postTypes.map((pt) => (
                          <button
                            key={pt.type}
                            onClick={() => setNewPostType(pt.type)}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                              newPostType === pt.type
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            <pt.icon className="h-3.5 w-3.5" />
                            {pt.label}
                          </button>
                        ))}
                      </div>

                      {/* Content */}
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />

                      {/* Tags */}
                      <Input
                        placeholder="Add tags (comma-separated)"
                        disabled
                        className="text-muted-foreground"
                        value="Tags saved with post content"
                      />

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button onClick={handlePostSubmit} disabled={submitting} className="gap-2">
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Post
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowComposer(false)
                            setNewPost("")
                          }}
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sort tabs */}
              <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Feed */}
              <div className="space-y-4">
                {loading ? (
                  <Card>
                    <CardContent className="p-12 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </CardContent>
                  </Card>
                ) : posts.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
                    </CardContent>
                  </Card>
                ) : (
                  posts.map((post) => {
                    const typeConfig = getPostTypeConfig(post.type)
                    return (
                      <Card key={post.id} className="relative overflow-hidden border-2">
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={80}
                          inactiveZone={0.2}
                          borderWidth={2}
                        />
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 font-semibold text-primary">
                                {getInitials(post.profiles.full_name)}
                              </AvatarFallback>
                            </Avatar>

                            {/* Content */}
                            <div className="flex-1 space-y-3">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-semibold">{post.profiles.full_name}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">
                                    {post.profiles.role || "Community Member"}
                                  </span>
                                  <Badge variant="secondary" className={`gap-1 text-xs ${typeConfig.color}`}>
                                    <typeConfig.icon className="h-3 w-3" />
                                    {typeConfig.label}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{formatTimeAgo(post.created_at)}</p>
                              </div>

                              <p className="leading-relaxed">{post.content}</p>

                              {/* Reactions */}
                              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                                <button
                                  onClick={() => handleReaction(post.id, "fire")}
                                  className="flex items-center gap-1 text-sm transition-transform hover:scale-110"
                                >
                                  <span>🔥</span>
                                  <span className="text-muted-foreground">{post.reactions.fire}</span>
                                </button>
                                <button
                                  onClick={() => handleReaction(post.id, "bulb")}
                                  className="flex items-center gap-1 text-sm transition-transform hover:scale-110"
                                >
                                  <span>💡</span>
                                  <span className="text-muted-foreground">{post.reactions.bulb}</span>
                                </button>
                                <button
                                  onClick={() => handleReaction(post.id, "clap")}
                                  className="flex items-center gap-1 text-sm transition-transform hover:scale-110"
                                >
                                  <span>👏</span>
                                  <span className="text-muted-foreground">{post.reactions.clap}</span>
                                </button>
                                <button
                                  onClick={() => handleReaction(post.id, "heart")}
                                  className="flex items-center gap-1 text-sm transition-transform hover:scale-110"
                                >
                                  <span>❤</span>
                                  <span className="text-muted-foreground">{post.reactions.heart}</span>
                                </button>
                                <button className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 hidden lg:block">
              {/* Trending topics placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Community Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total posts: {posts.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total reactions:{" "}
                    {posts.reduce(
                      (sum, p) => sum + Object.values(p.reactions).reduce((a: number, b: number) => a + b, 0),
                      0,
                    )}
                  </p>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Be respectful and supportive</p>
                  <p>• Share authentic experiences</p>
                  <p>• Give constructive feedback</p>
                  <p>• Celebrate wins together</p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
