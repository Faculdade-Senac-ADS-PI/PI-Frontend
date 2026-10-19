import { Link } from "react-router-dom"
import { ArrowLeft, Compass, Home, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"

const SUGGESTIONS = [
  { label: "Página inicial", to: "/", icon: Home },
  { label: "Buscar profissionais", to: "/buscar", icon: Search },
  { label: "Criar conta", to: "/cadastro", icon: Sparkles },
]

export default function NotFound() {
  return (
    <div className="shell flex min-h-[68svh] items-center justify-center py-16">
      <Reveal variant="scale" className="relative w-full max-w-2xl">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-golden-orange/15 blur-[90px] animate-pulse-glow" />
          <div className="absolute right-8 top-4 h-40 w-40 rounded-full bg-fiery-terracotta/15 blur-[70px]" />
        </div>

        <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />

          <div className="pointer-events-none absolute left-8 top-10 hidden animate-float text-primary/30 sm:block">
            <Compass className="h-7 w-7" />
          </div>
          <div className="pointer-events-none absolute bottom-12 right-10 hidden animate-float-slow text-fiery-terracotta/30 sm:block">
            <Search className="h-6 w-6" />
          </div>

          <div className="relative">
            <p className="font-display text-[5.5rem] font-extrabold leading-none tracking-tighter text-gradient sm:text-[7rem]">
              404
            </p>
            <span className="eyebrow mt-4">
              <Compass className="h-3.5 w-3.5 text-primary" />
              Página não encontrada
            </span>

            <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
              Parece que você se perdeu no caminho
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              O endereço que você acessou não existe, foi movido ou está
              temporariamente indisponível. Vamos voltar ao que importa?
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao início
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/buscar">
                  <Search className="h-4 w-4" />
                  Buscar profissionais
                </Link>
              </Button>
            </div>

            <div className="mt-9 border-t border-white/[0.07] pt-6">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Talvez você procurava
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map(({ label, to, icon: Icon }) => (
                  <Link
                    key={label}
                    to={to}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
