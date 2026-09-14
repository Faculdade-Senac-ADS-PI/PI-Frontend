import { Link, useNavigate } from "react-router-dom"
import { Briefcase, LogOut, Search, UserRound } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-lg">TrabalhoJá</span>
        </Link>

        <form onSubmit={handleSubmitSearch} className="hidden flex-1 md:block">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Buscar profissionais, serviços..."
              className="pl-9"
            />
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/buscar">Contratar</Link>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Meu Painel</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 outline-none">
                    <Avatar>
                      <AvatarImage
                        src={user.photoUrl || "https://i.pravatar.cc/100"}
                      />
                      <AvatarFallback>
                        {user.name ? user.name.charAt(0) : <UserRound />}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Painel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}