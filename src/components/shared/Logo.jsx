import { Briefcase } from "lucide-react"

import { cn } from "@/lib/utils"

export function Logo({ className, markClassName, textClassName }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gold-gradient shadow-glow",
          markClassName
        )}
      >
        <span className="absolute inset-0 bg-sheen opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Briefcase className="relative h-4 w-4 text-primary-foreground" />
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/30" />
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight text-foreground",
          textClassName
        )}
      >
        Chama<span className="text-gradient">Serv</span>
      </span>
    </span>
  )
}
