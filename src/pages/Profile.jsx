import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Camera,
  CheckCircle2,
  Circle,
  Eye,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/components/shared/Reveal"
import { cn } from "@/lib/utils"

export default function Profile() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [accepting, setAccepting] = useState(true)
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    bio: user?.bio || "",
  })

  const completion = useMemo(() => {
    const fields = [form.name, form.email, form.phone, form.city, form.bio]
    const filled = fields.filter((value) => value && value.trim().length > 0)
    return Math.round((filled.length / fields.length) * 100)
  }, [form])

  if (!user) {
    return (
      <div className="shell py-24">
        <div className="glass mx-auto max-w-lg rounded-3xl px-8 py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-muted-foreground">
            <UserRound className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">
            Você precisa estar logado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre na sua conta para visualizar e editar seu perfil.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/login">Ir para o login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isWorker = user.userType === "worker"
  const roleLabel = isWorker ? "Profissional autônomo" : "Contratante"

  const checklist = [
    { label: "Nome e e-mail", done: Boolean(form.name && form.email) },
    { label: "Telefone de contato", done: Boolean(form.phone) },
    { label: "Cidade de atendimento", done: Boolean(form.city) },
    {
      label: "Descrição sobre você",
      done: form.bio.trim().length >= 40,
    },
  ]

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="shell py-8 sm:py-12">
      <Reveal>
        <Card className="overflow-hidden p-0">
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-space-indigo via-[#1a2348] to-[#33202a] sm:h-40">
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="absolute -left-12 -top-20 h-56 w-56 rounded-full bg-golden-orange/25 blur-[80px]" />
            <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-fiery-terracotta/20 blur-[80px]" />

            <button
              type="button"
              className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-md transition-colors hover:bg-black/40"
            >
              <Pencil className="h-3 w-3" />
              Editar capa
            </button>
          </div>

          <CardContent className="relative px-6 pb-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="group relative -mt-14 w-fit shrink-0 rounded-full bg-gold-gradient p-[3px] shadow-glow">
                  <Avatar className="h-24 w-24 border-4 border-[#121831] sm:h-28 sm:w-28">
                    <AvatarImage
                      src={user.photoUrl || "https://i.pravatar.cc/150?img=12"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {user.name ? user.name.charAt(0) : <UserRound />}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    aria-label="Alterar foto de perfil"
                    className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-[#121831] bg-gold-gradient text-primary-foreground transition-transform duration-300 hover:scale-110"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-2xl font-bold">
                      {user.name}
                    </h1>
                    {isWorker && (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {roleLabel}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                    {form.city && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {form.city}
                      </span>
                    )}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant={isWorker ? "success" : "secondary"}>
                      <ShieldCheck className="h-3 w-3" />
                      {isWorker ? "Perfil profissional" : "Conta verificada"}
                    </Badge>
                    <Badge variant="secondary">
                      Membro desde 2026
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                <div
                  className="grid h-[68px] w-[68px] place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(#f0a202 ${completion * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                >
                  <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-[#151c38]">
                    <span className="font-display text-sm font-bold text-foreground">
                      {completion}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Perfil completo
                  </p>
                  <p className="mt-0.5 max-w-[9rem] text-[11px] leading-relaxed text-muted-foreground">
                    Complete os dados para ganhar mais visibilidade.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        <Reveal delay={100}>
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold">
                  Editar perfil
                </h2>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Mantenha seus dados atualizados. Essas informações ficam
                visíveis para os outros usuários da plataforma.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                {saved && (
                  <div className="flex animate-slide-down items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    Perfil salvo com sucesso.
                  </div>
                )}

                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Dados básicos
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <UserRound className="field-icon" />
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
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
                          value={form.email}
                          onChange={handleChange}
                          className="pl-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="field-icon" />
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="(11) 99999-9999"
                          value={form.phone}
                          onChange={handleChange}
                          className="pl-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <div className="relative">
                        <MapPin className="field-icon" />
                        <Input
                          id="city"
                          name="city"
                          placeholder="Sua cidade"
                          value={form.city}
                          onChange={handleChange}
                          className="pl-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Sobre você
                    </h3>
                    <span className="text-[10px] text-muted-foreground">
                      {form.bio.length}/400
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="bio" className="sr-only">
                      Sobre você
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder={
                        isWorker
                          ? "Conte sobre sua experiência, especialidades e diferenciais..."
                          : "Conte um pouco sobre você e os serviços que costuma contratar..."
                      }
                      rows={5}
                      maxLength={400}
                      value={form.bio}
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Uma boa descrição aumenta suas chances de ser contatado.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit">
                    <Save className="h-4 w-4" />
                    Salvar alterações
                  </Button>
                  <Button type="button" variant="ghost" asChild>
                    <Link to="/dashboard">
                      Ir para o painel
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={140}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-sm font-semibold">
                  Complete seu perfil
                </h3>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2.5 text-xs"
                    >
                      {item.done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-white/20" />
                      )}
                      <span
                        className={cn(
                          item.done
                            ? "text-muted-foreground line-through decoration-white/20"
                            : "text-foreground/85"
                        )}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={180}>
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
                  <Eye className="h-4 w-4 text-primary" />
                  Visibilidade
                </h3>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {isWorker ? "Aceitar novos pedidos" : "Receber novidades"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {accepting ? "Ativado agora" : "Pausado"}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={accepting}
                    onClick={() => setAccepting((value) => !value)}
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300",
                      accepting
                        ? "border-primary/40 bg-primary/30"
                        : "border-white/10 bg-white/[0.06]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-[3px] h-[18px] w-[18px] rounded-full transition-all duration-300",
                        accepting
                          ? "left-[1.3rem] bg-gold-gradient shadow-glow"
                          : "left-0.5 bg-white/40"
                      )}
                    />
                  </button>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  {isWorker
                    ? "Seu perfil aparece nas buscas da sua cidade e categorias."
                    : "Seu perfil é usado apenas para contato com profissionais."}
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={220}>
            <div className="rounded-2xl border border-primary/15 bg-primary/[0.05] p-5">
              <p className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Seus dados estão seguros
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Usamos suas informações apenas para conectar você a serviços e
                nunca compartilhamos seus dados sem permissão.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
