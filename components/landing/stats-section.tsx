const stats = [
  { value: "10K+", label: "Jobs Listed" },
  { value: "5K+", label: "Verified Credentials" },
  { value: "98%", label: "Match Accuracy" },
  { value: "24/7", label: "AI Support" },
]

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="grid gap-8 sm:gap-10 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
