"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { JobCard, type Job } from "./job-card"
import { X, Heart, RotateCcw, Briefcase } from "lucide-react"

interface JobSwiperProps {
  jobs: Job[]
  onSwipeLeft: (job: Job) => void
  onSwipeRight: (job: Job) => void
}

export function JobSwiper({ jobs, onSwipeLeft, onSwipeRight }: JobSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])
  const [skippedJobs, setSkippedJobs] = useState<Job[]>([])

  const currentJob = jobs[currentIndex]

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (!currentJob) return

      setSwipeDirection(direction)

      if (direction === "right") {
        setAppliedJobs((prev) => [...prev, currentJob])
        onSwipeRight(currentJob)
      } else {
        setSkippedJobs((prev) => [...prev, currentJob])
        onSwipeLeft(currentJob)
      }

      setTimeout(() => {
        setSwipeDirection(null)
        setCurrentIndex((prev) => prev + 1)
      }, 400)
    },
    [currentJob, onSwipeLeft, onSwipeRight],
  )

  const handleUndo = useCallback(() => {
    if (currentIndex === 0) return

    const prevIndex = currentIndex - 1
    const prevJob = jobs[prevIndex]

    setAppliedJobs((prev) => prev.filter((j) => j.id !== prevJob.id))
    setSkippedJobs((prev) => prev.filter((j) => j.id !== prevJob.id))
    setCurrentIndex(prevIndex)
  }, [currentIndex, jobs])

  if (currentIndex >= jobs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
          <Briefcase className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold">All caught up!</h3>
        <p className="mt-2 text-muted-foreground">You have reviewed all available jobs</p>
        <p className="mt-4 text-sm text-muted-foreground">Applied to {appliedJobs.length} jobs</p>
        <Button
          variant="outline"
          className="mt-6 bg-transparent"
          onClick={() => {
            setCurrentIndex(0)
            setAppliedJobs([])
            setSkippedJobs([])
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="mb-4 flex w-full items-center justify-between text-sm text-muted-foreground">
        <span>
          {currentIndex + 1} of {jobs.length} jobs
        </span>
        <span>{appliedJobs.length} applied</span>
      </div>

      {/* Card stack */}
      <div className="relative h-[480px] w-full max-w-sm sm:h-[520px]">
        {/* Background cards */}
        {jobs
          .slice(currentIndex + 1, currentIndex + 3)
          .reverse()
          .map((job, index) => (
            <div
              key={job.id}
              className="absolute inset-0"
              style={{
                transform: `scale(${1 - (2 - index) * 0.05}) translateY(${(2 - index) * 8}px)`,
                zIndex: index,
                opacity: 0.5 - (1 - index) * 0.2,
              }}
            >
              <JobCard job={job} />
            </div>
          ))}

        {/* Current card */}
        <div
          className={`absolute inset-0 z-10 transition-transform ${
            swipeDirection === "right" ? "animate-swipe-right" : swipeDirection === "left" ? "animate-swipe-left" : ""
          }`}
        >
          <JobCard job={currentJob} />

          {/* Swipe indicators */}
          {swipeDirection === "right" && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-green-500/20 backdrop-blur-sm">
              <div className="rounded-full bg-green-500 p-4 shadow-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
          {swipeDirection === "left" && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-red-500/20 backdrop-blur-sm">
              <div className="rounded-full bg-red-500 p-4 shadow-xl">
                <X className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-transparent"
          onClick={handleUndo}
          disabled={currentIndex === 0}
        >
          <RotateCcw className="h-5 w-5" />
          <span className="sr-only">Undo</span>
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-7 w-7" />
          <span className="sr-only">Skip job</span>
        </Button>
        <Button
          size="icon"
          className="h-16 w-16 rounded-full bg-green-500 shadow-xl hover:bg-green-600 hover:shadow-2xl hover:scale-110 transition-all"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-7 w-7" />
          <span className="sr-only">Apply to job</span>
        </Button>
        <div className="h-12 w-12" /> {/* Spacer for balance */}
      </div>

      {/* Instructions */}
      <p className="mt-6 text-center text-sm text-muted-foreground">Swipe right or tap the heart to apply</p>
    </div>
  )
}
