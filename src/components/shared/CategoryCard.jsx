import { Link } from "react-router-dom"
import { HardHat, Paintbrush, Hammer, Zap, Droplets, Cpu, Sparkles, Laptop, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export function CategoryCard({ category }) {
  const Icon = iconComponents[category.icon] || HardHat

  return (
    <Link to={`/buscar/categoria/${category.id}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}