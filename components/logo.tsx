export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { container: "h-8 w-8", text: "text-lg", k: "text-sm" },
    default: { container: "h-10 w-10", text: "text-xl", k: "text-base" },
    lg: { container: "h-14 w-14", text: "text-3xl", k: "text-xl" },
  }

  const d = dimensions[size]

  return (
    <div className="flex items-center gap-2">
      <div className={`${d.container} relative flex items-center justify-center`}>
        <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />

          {/* Two K's forming a connection - stylized lightning bolt shape */}
          <path
            d="M16 12L16 24L24 18L16 24L16 36"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M32 12L32 24L24 30L32 24L32 36"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Connection dot in center */}
          <circle cx="24" cy="24" r="3" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${d.text} font-bold tracking-tight`}>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Kwik</span>
          <span className="text-foreground">Konnect</span>
        </span>
      </div>
    </div>
  )
}

export function LogoMark({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-14 w-14",
  }

  return (
    <div className={`${dimensions[size]} relative flex items-center justify-center`}>
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="logoMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#logoMarkGradient)" />
        <path
          d="M16 12L16 24L24 18L16 24L16 36"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M32 12L32 24L24 30L32 24L32 36"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="24" cy="24" r="3" fill="white" />
      </svg>
    </div>
  )
}
