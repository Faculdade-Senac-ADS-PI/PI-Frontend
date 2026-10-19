import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/shared/Logo"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PUBLIC_LINKS = [
  { label: "Buscar profissionais", to: "/buscar" },
  { label: "Como funciona", to: "/#como-funciona" },
  { label: "Para profissionais", to: "/#para-profissionais" },
]

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  function handleLogout() {
    logout()
    navigate("/")
  }

  function handleSubmitSearch(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get("search")
    navigate(`/buscar?search=${encodeURIComponent(search || "")}`)
  }

  function isActive(to) {
    if (to === "/buscar") return location.pathname.startsWith("/buscar")
    return false
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "glass-strong mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-2xl px-3 transition-all duration-500 sm:px-4",
          scrolled &&
            "h-[60px] border-white/15 bg-[#0f1530]/85 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)]"
        )}
      >
        <Link
          to="/"
          className="group shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="ChamaServ — página inicial"
        >
          <Logo />
        </Link>

        <form
          onSubmit={handleSubmitSearch}
          className="ml-2 hidden flex-1 lg:block"
          role="search"
        >
          <div className="group relative max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-primary" />
            <input
              name="search"
              placeholder="Buscar profissionais, serviços..."
              className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-white/20 focus:border-primary/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-active={isActive(link.to)}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Meu painel
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="group ml-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label="Abrir menu da conta"
                  >
                    <span className="block rounded-full bg-gold-gradient p-[2px] transition-transform duration-300 group-hover:scale-105">
                      <Avatar className="h-9 w-9 border-2 border-[#0f1530]">
                        <AvatarImage
                          src={user.photoUrl || "https://i.pravatar.cc/100"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name ? user.name.charAt(0) : <UserRound />}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="normal-case tracking-normal">
                    <div className="font-semibold text-foreground">
                      {user.name}
                    </div>
                    <div className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil">
                      <UserRound className="mr-1 h-4 w-4" />
                      Meu perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-1 h-4 w-4" />
                      Painel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-fiery-terracotta focus:bg-destructive/10 focus:text-fiery-terracotta"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/10 md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-strong mx-auto mt-2 max-w-7xl animate-slide-down rounded-2xl p-4 md:hidden">
          <form onSubmit={handleSubmitSearch} className="relative mb-3">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <input
              name="search"
              placeholder="Buscar profissionais..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/50"
            />
          </form>

          <nav className="grid gap-1">
            {PUBLIC_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  Meu painel
                </Link>
                <Link
                  to="/perfil"
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  Meu perfil
                </Link>
              </>
            )}
          </nav>

          <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
            {user ? (
              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4" />
                Sair da conta
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/cadastro">Criar conta grátis</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
