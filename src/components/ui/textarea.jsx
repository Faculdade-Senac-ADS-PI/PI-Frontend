import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-base text-foreground shadow-inner shadow-black/20 backdrop-blur-md transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-foreground/20 focus-visible:border-primary/60 focus-visible:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
