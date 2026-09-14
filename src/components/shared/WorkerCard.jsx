import { Link } from "react-router-dom"
import { BadgeCheck, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WorkerCard({ worker }) {
  return (
    <Link to={`/profissional/${worker.id}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={worker.photo} />
              <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold">{worker.name}</h3>
                {worker.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">{worker.title}</p>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{worker.rating}</span>
                  <span className="text-muted-foreground">
                    ({worker.reviewsCount})
                  </span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {worker.city}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
            {worker.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {worker.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-4">
          <span className="text-xs text-muted-foreground">
            {worker.yearsExperience} anos de experiência
          </span>
          <span className="font-semibold">R$ {worker.pricePerHour}/h</span>
        </CardFooter>
      </Card>
    </Link>
  )
}