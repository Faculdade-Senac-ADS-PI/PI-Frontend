import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  Cpu,
  Droplets,
  Hammer,
  HardHat,
  Laptop,
  Paintbrush,
  Sparkles,
  Zap,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const iconComponents = {
  "hard-hat": HardHat,
  paintbrush: Paintbrush,
  hammer: Hammer,
  zap: Zap,
  droplets: Droplets,
  cpu: Cpu,
  sparkles: Sparkles,
  laptop: Laptop,
}

const TONES = [
  "from-golden-orange/30 to-tiger-orange/5 text-golden-orange ring-golden-orange/20",
  "from-tiger-orange/30 to-golden-orange/5 text-tiger-orange ring-tiger-orange/20",
  "from-fiery-terracotta/30 to-fiery-terracotta/5 text-fiery-terracotta ring-fiery-terracotta/20",
  "from-[#8b9ae8]/30 to-space-indigo/5 text-[#a9b5f2] ring-[#8b9ae8]/20",
]

export function CategoryCard({ category, index = 0, count }) {
  const Icon = iconComponents[category.icon] || HardHat
  const tone = TONES[index % TONES.length]

  return (
    <Link
      to={`/buscar/categoria/${category.id}`}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="card-lift relative h-full overflow-hidden">
        <span className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-white/[0.03] blur-2xl transition-all duration-700 group-hover:bg-primary/10" />

        <CardContent className="relative flex h-full flex-col p-6">
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-inset transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110",
                tone
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-500 group-hover:border-primary/40 group-hover:text-primary">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <h3 className="mt-5 font-display text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {category.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>

          {count != null && (
            <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {count} {count === 1 ? "profissional" : "profissionais"}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
