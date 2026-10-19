import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export function StarRating({
  rating = 0,
  reviews,
  className,
  starClassName = "h-4 w-4",
  showValue = true,
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              starClassName,
              "transition-colors duration-300",
              index < Math.round(rating)
                ? "fill-golden-orange text-golden-orange drop-shadow-[0_0_6px_rgba(240,162,2,0.45)]"
                : "fill-transparent text-white/20"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviews != null && (
        <span className="text-xs text-muted-foreground">({reviews})</span>
      )}
    </div>
  )
}
