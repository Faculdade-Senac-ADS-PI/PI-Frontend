import { Link } from "react-router-dom"
import { Briefcase } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <Briefcase className="h-5 w-5 text-primary" />
            <span>TrabalhoJá</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Conectando profissionais autônomos a quem precisa de serviços de
            qualidade.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Navegação</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/buscar" className="hover:text-foreground">
                Contratar profissionais
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-foreground">
                Meu painel
              </Link>
            </li>
            <li>
              <Link to="/cadastro" className="hover:text-foreground">
                Criar conta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Para profissionais</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/cadastro" className="hover:text-foreground">
                Divulgue seus serviços
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="hover:text-foreground">
                Monte seu perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TrabalhoJá — Projeto Integrador
        </div>
      </div>
    </footer>
  )
}