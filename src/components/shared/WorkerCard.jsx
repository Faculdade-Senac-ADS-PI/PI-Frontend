import { Link } from "react-router-dom"
import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CATEGORY_LABELS = {
  eletrica: "Elétrica",
  hidraulica: "Hidráulica",
  pintura: "Pintura",
  marcenaria: "Marcenaria",
  reformas: "Reformas",
  eletronicos: "Eletrônicos",
  limpeza: "Limpeza",
  informatica: "Informática",
}

export function WorkerCard({ worker }) {
  return (
    <Link
      to={`/profissional/${worker.id}`}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="card-lift relative flex h-full flex-col overflow-hidden">
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <CardContent className="relative flex flex-1 flex-col p-6">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="rounded-full bg-gold-gradient p-[2px] shadow-glow transition-transform duration-500 group-hover:scale-105">
                <Avatar className="h-14 w-14 border-2 border-[#131a33]">
                  <AvatarImage src={worker.photo} alt={worker.name} />
                  <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              {worker.verified && (
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-[#131a33] bg-gold-gradient">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {worker.name}
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {worker.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-golden-orange text-golden-orange" />
                  <span className="font-semibold text-foreground">
                    {worker.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({worker.reviewsCount})
                  </span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {worker.city}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {worker.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {worker.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {CATEGORY_LABELS[category] || category}
              </Badge>
            ))}
          </div>

          <div className="mt-auto pt-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {worker.yearsExperience} anos de experiência
            </span>
          </div>
        </CardContent>

        <CardFooter className="relative flex items-center justify-between gap-3 border-t border-white/[0.07] px-6 py-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              A partir de
            </span>
            <p className="font-display text-lg font-bold text-foreground">
              R$ {worker.pricePerHour}
              <span className="text-xs font-normal text-muted-foreground">
                /hora
              </span>
            </p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/15 group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
