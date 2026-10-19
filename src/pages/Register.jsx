import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Logo } from "@/components/shared/Logo"
import { Reveal } from "@/components/shared/Reveal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const CITIES = [
  { value: "sao-paulo", label: "São Paulo" },
  { value: "campinas", label: "Campinas" },
  { value: "santos", label: "Santos" },
  { value: "osasco", label: "Osasco" },
  { value: "guarulhos", label: "Guarulhos" },
]

const PERKS = [
  "Encontre profissionais por categoria, cidade e avaliação",
  "Publique seus serviços e receba pedidos da sua região",
  "Combine valores e prazos direto com a outra parte",
  "Acompanhe tudo em um painel simples e transparente",
]

function RoleOption({ value, current, icon: Icon, title, description }) {
  const active = current === value

  return (
    <Label
      htmlFor={value}
      className={cn(
        "group relative cursor-pointer rounded-2xl border p-4 transition-all duration-300",
        active
          ? "border-primary/40 bg-primary/[0.08] shadow-[0_0_0_1px_rgba(240,162,2,0.15),0_16px_40px_-24px_rgba(240,162,2,0.5)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      )}
    >
      <RadioGroupItem id={value} value={value} className="sr-only" />
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "grid h-9 w-9 place-items-center rounded-xl border transition-colors duration-300",
            active
              ? "border-primary/30 bg-primary/15 text-primary"
              : "border-white/10 bg-white/[0.05] text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
    </Label>
  )
}

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [userType, setUserType] = useState("client")
  const [city, setCity] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const result = await register({ ...form, userType, city })
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
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-golden-orange/25 blur-[90px] animate-pulse-glow" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fiery-terracotta/20 blur-[90px]" />

          <div className="relative">
            <Link
              to="/"
              className="group inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <Logo />
            </Link>

            <span className="eyebrow mt-10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Comece em minutos
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight xl:text-4xl">
              Dois jeitos de usar.
              <br />
              <span className="text-gradient">Uma só plataforma.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Se você precisa contratar ou oferecer serviços, seu perfil começa
              aqui — gratuito, sem mensalidade e sem burocracia.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.07] p-4">
                <Home className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Contratante
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Busque, compare e contrate o profissional certo.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Briefcase className="h-5 w-5 text-fiery-terracotta" />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Profissional
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Divulgue seu talento e receba pedidos.
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative mt-8 text-[11px] text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Entrar agora
            </Link>
          </p>
        </Reveal>

        <Reveal delay={120} variant="right" className="flex items-center">
          <Card className="mx-auto w-full max-w-lg">
            <CardContent className="p-7 sm:p-9">
              <span className="eyebrow">Criar conta gratuita</span>
              <h2 className="mt-4 font-display text-2xl font-bold">
                Vamos começar
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Escolha como você quer usar a plataforma.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && (
                  <div
                    role="alert"
                    className="animate-slide-down rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs text-fiery-terracotta"
                  >
                    {error}
                  </div>
                )}

                <RadioGroup
                  value={userType}
                  onValueChange={setUserType}
                  className="grid grid-cols-2 gap-3"
                >
                  <RoleOption
                    value="client"
                    current={userType}
                    icon={Home}
                    title="Quero contratar"
                    description="Busco profissionais"
                  />
                  <RoleOption
                    value="worker"
                    current={userType}
                    icon={UserRound}
                    title="Sou profissional"
                    description="Ofereço serviços"
                  />
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <UserRound className="field-icon" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome completo"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      className="pl-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="field-icon" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mín. 6 caracteres"
                        minLength={6}
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                        className="pl-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
                        className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger id="city">
                        <MapPin className="h-4 w-4 text-muted-foreground/70" />
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full"
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar minha conta"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>

                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  Ao criar a conta, você concorda com nossos{" "}
                  <a href="#" className="text-foreground/80 hover:text-primary">
                    Termos de uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-foreground/80 hover:text-primary">
                    Política de privacidade
                  </a>
                  .
                </p>
              </form>

              <p className="mt-6 border-t border-white/[0.07] pt-5 text-center text-xs text-muted-foreground">
                Já tem conta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
