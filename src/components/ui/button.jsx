import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold tracking-tight",
    "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-gold-gradient bg-[length:200%_200%] text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-[position:100%_50%] hover:shadow-glow-lg",
        secondary:
          "border border-white/10 bg-white/10 text-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/15",
        outline:
          "border border-white/15 bg-white/[0.03] text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
        ghost:
          "text-muted-foreground hover:bg-white/10 hover:text-foreground",
        destructive:
          "bg-gradient-to-r from-fiery-terracotta to-[#b8452a] text-white shadow-glow-terracotta hover:-translate-y-0.5 hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-[15px]",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
