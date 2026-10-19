import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LayoutDashboard,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/shared/Logo"
import { Reveal } from "@/components/shared/Reveal"

const HIGHLIGHTS = [
  {
    icon: LayoutDashboard,
    title: "Tudo em um só painel",
    text: "Acompanhe pedidos, propostas e histórico em tempo real.",
  },
  {
    icon: ShieldCheck,
    title: "Contratação protegida",
    text: "Perfis verificados e suporte durante todo o serviço.",
  },
  {
    icon: Star,
    title: "Reputação que abre portas",
    text: "Avaliações reais de clientes que já contrataram.",
  },
]

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const result = await login(form.email, form.password)
    if (result.success) {
      navigate("/dashboard")
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="shell py-10 sm:py-14 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-8">
        <Reveal
          variant="left"
          className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-space-indigo/40 p-10 backdrop-blur-2xl lg:flex lg:flex-col lg:justify-between"
        >
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-golden-orange/25 blur-[90px] animate-pulse-glow" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-fiery-terracotta/20 blur-[90px]" />

          <div className="relative">
            <Link
              to="/"
              className="group inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <Logo />
            </Link>

            <span className="eyebrow mt-10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Bem-vindo de volta
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight xl:text-4xl">
              Seu próximo serviço está a um{" "}
              <span className="text-gradient">login de distância.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Entre para acompanhar solicitações, conversar com profissionais e
              manter tudo organizado em um só lugar.
            </p>

            <div className="mt-9 space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <p className="text-xs leading-relaxed text-foreground/85">
              “Em menos de uma hora encontrei um eletricista excelente. O painel
              deixou tudo simples e transparente.”
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src="https://i.pravatar.cc/80?img=44"
                alt=""
                className="h-8 w-8 rounded-full border border-white/10 object-cover"
              />
              <div>
                <p className="text-[11px] font-semibold text-foreground">
                  Renata Alves
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Contratante · São Paulo
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} variant="right" className="flex items-center">
          <Card className="mx-auto w-full max-w-md">
            <CardContent className="p-7 sm:p-9">
              <span className="eyebrow">Acesso à conta</span>
              <h2 className="mt-4 font-display text-2xl font-bold">Entrar</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Informe seus dados para continuar.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                {error && (
                  <div
                    role="alert"
                    className="animate-slide-down rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs text-fiery-terracotta"
                  >
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="group relative">
                    <Mail className="field-icon" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="voce@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className="pl-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="text-[11px] text-muted-foreground transition-colors hover:text-primary"
                    >
                      Esqueci minha senha
                    </a>
                  </div>
                  <div className="group relative">
                    <Lock className="field-icon" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="pl-11 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar na conta"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  ainda não tem conta?
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/cadastro">Criar conta gratuita</Link>
              </Button>

              <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
                Ao entrar, você concorda com nossos{" "}
                <a href="#" className="text-foreground/80 hover:text-primary">
                  Termos de uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-foreground/80 hover:text-primary">
                  Política de privacidade
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
