import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm font-ui font-semibold uppercase tracking-wide transition-colors px-2.5 py-0.5 text-[0.68rem]",
  {
    variants: {
      variant: {
        // Content type - purple accent
        default:
          "bg-accent/20 text-accent border border-accent/30",
        // System tag - neutral
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        // Adventure type
        adventure:
          "bg-accent/20 text-accent border border-accent/30",
        // Campaign type
        campaign:
          "bg-accent/15 text-accent/80 border border-accent/20",
        // Free content - green
        free:
          "bg-[hsl(142_35%_12%)] text-[hsl(142_35%_42%)] border border-[hsl(142_35%_42%/0.3)]",
        // Premium content - gold
        premium:
          "bg-primary/20 text-primary border border-primary/30",
        // Warning
        warning:
          "bg-[hsl(43_45%_10%)] text-[hsl(43_85%_38%)] border border-[hsl(43_85%_38%/0.3)]",
        // Danger / destructive
        destructive:
          "bg-destructive/20 text-destructive border border-destructive/30",
        // Outline only
        outline:
          "border border-border text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
