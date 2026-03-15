import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
}

const sizeMap = {
  sm: { mark: "w-7 h-7 text-sm",  wordmark: "text-base" },
  md: { mark: "w-9 h-9 text-base", wordmark: "text-xl" },
  lg: { mark: "w-12 h-12 text-xl", wordmark: "text-3xl" },
}

export function Logo({ size = "md", className, href = "/" }: LogoProps) {
  const { mark, wordmark } = sizeMap[size]

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-3 group", className)}
      aria-label="PlayerLAB — Home"
    >
      {/* Mark: gold-bordered square with Cinzel "PL" */}
      <div
        className={cn(
          "flex items-center justify-center rounded-md border border-gold-muted bg-bg-elevated",
          "transition-all duration-[250ms] group-hover:border-gold-primary group-hover:shadow-gold",
          mark
        )}
        aria-hidden="true"
      >
        <span className="font-display font-bold text-gold-primary leading-none">PL</span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display font-bold text-text-primary tracking-wide",
            "transition-colors duration-[150ms] group-hover:text-gold-primary",
            wordmark
          )}
        >
          PlayerLAB
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-muted">
          TTRPG Platform
        </span>
      </div>
    </Link>
  )
}
