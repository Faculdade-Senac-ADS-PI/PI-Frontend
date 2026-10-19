import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  AtSign,
  Globe,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react"

import { Logo } from "@/components/shared/Logo"

const navigation = [
  { label: "Buscar profissionais", to: "/buscar" },
  { label: "Como funciona", to: "/#como-funciona" },
  { label: "Categorias", to: "/buscar" },
  { label: "Criar conta", to: "/cadastro" },
]

const forWorkers = [
  { label: "Divulgue seus serviços", to: "/cadastro" },
  { label: "Monte seu perfil", to: "/perfil" },
  { label: "Meu painel", to: "/dashboard" },
  { label: "Dicas para profissionais", to: "/#para-profissionais" },
]

const socials = [
  { label: "Instagram", icon: AtSign, href: "#" },
  { label: "LinkedIn", icon: Globe, href: "#" },
  { label: "Comunidade", icon: Send, href: "#" },
]

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="section-divider" />

      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-golden-orange/[0.07] blur-[100px]" />

      <div className="shell relative grid gap-12 pb-10 pt-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link
            to="/"
            className="group inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Conectamos profissionais autônomos a quem precisa de serviços de
            qualidade — com transparência, avaliações reais e contratação
            segura.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Todos os sistemas operacionais
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">
            Navegação
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">
            Para profissionais
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {forWorkers.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">
            Fale com a gente
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <a
                href="mailto:contato@chamaserv.com.br"
                className="transition-colors hover:text-foreground"
              >
                contato@chamaserv.com.br
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              São Paulo — SP
            </li>
          </ul>

          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Contratação protegida
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Perfis verificados e histórico de avaliações em cada contratação.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} ChamaServ — Projeto Integrador
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Termos de uso
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              Voltar ao topo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
