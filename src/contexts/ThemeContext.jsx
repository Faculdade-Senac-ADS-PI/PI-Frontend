import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "chamaserv-theme"
const THEMES = ["light", "dark"]

const ThemeContext = createContext(null)

function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "dark"
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark"
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark"

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(stored)) return stored
  } catch {
    /* localStorage can be unavailable in private contexts. */
  }

  return getSystemTheme()
}

function applyTheme(theme) {
  if (typeof document === "undefined") return

  const root = document.documentElement
  root.classList.toggle("light", theme === "light")
  root.classList.toggle("dark", theme === "dark")
  root.dataset.theme = theme
  root.style.colorScheme = theme

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) {
    themeColor.setAttribute(
      "content",
      theme === "dark" ? "#111731" : "#fcfbf8"
    )
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* Persisting the preference is best-effort. */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }, [])

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", toggleTheme, setTheme }),
    [theme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider")
  }
  return context
}
