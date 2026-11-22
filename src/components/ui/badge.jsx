import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-[11px] font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/15 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        secondary:
          "border-foreground/10 bg-foreground/[0.07] text-foreground/80 backdrop-blur-md",
        destructive:
          "border-destructive/30 bg-destructive/15 text-destructive",
        success:
          "border-emerald-500/25 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        outline: "border-foreground/15 bg-transparent text-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
