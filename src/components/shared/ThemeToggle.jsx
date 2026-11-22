import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"

export function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === "dark" ? "claro" : "escuro"
  const label = `Ativar tema ${nextTheme}`

  if (compact) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className="rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggleTheme}
      aria-label={label}
      className="w-full justify-start"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
      Tema {nextTheme}
    </Button>
  )
}
