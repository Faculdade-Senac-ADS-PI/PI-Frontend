import { Link } from "react-router-dom"
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock3,
  Eye,
  Heart,
  MessageCircle,
  PlusCircle,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"
import { cn } from "@/lib/utils"

const CLIENT_STATS = [
  {
    icon: Briefcase,
    label: "Serviços contratados",
    value: "12",
    hint: "+2 este mês",
    tone: "gold",
  },
  {
    icon: Clock3,
    label: "Em andamento",
    value: "1",
    hint: "Acompanhe no painel",
    tone: "tiger",
  },
  {
    icon: Heart,
    label: "Profissionais salvos",
    value: "8",
    hint: "3 disponíveis hoje",
    tone: "terracotta",
  },
  {
    icon: Star,
    label: "Avaliações dadas",
    value: "6",
    hint: "Média de 4,8",
    tone: "emerald",
  },
]

const WORKER_STATS = [
  {
    icon: MessageCircle,
    label: "Solicitações novas",
    value: "4",
    hint: "+2 desde ontem",
    tone: "gold",
  },
  {
    icon: Briefcase,
    label: "Serviços concluídos",
    value: "87",
    hint: "+9 nos últimos 30 dias",
    tone: "tiger",
  },
  {
    icon: Star,
    label: "Avaliação média",
    value: "4,9",
    hint: "42 avaliações",
    tone: "emerald",
  },
  {
    icon: Wallet,
    label: "Ganhos no mês",
    value: "R$ 3.240",
    hint: "+18% vs. mês anterior",
    tone: "terracotta",
  },
]

const CLIENT_SERVICES = [
  {
    title: "Instalação de chuveiro elétrico",
    subtitle: "Carlos Pereira · Hoje, 14:00",
    status: "Em andamento",
    variant: "default",
    price: "R$ 180",
    photo: "https://i.pravatar.cc/100?img=12",
  },
  {
    title: "Pintura da sala e corredor",
    subtitle: "Mariana Souza · Amanhã, 09:00",
    status: "Confirmado",
    variant: "secondary",
    price: "R$ 420",
    photo: "https://i.pravatar.cc/100?img=47",
  },
  {
    title: "Limpeza pós-obra",
    subtitle: "Laura Fernandes · 12 de outubro",
    status: "Concluído",
    variant: "success",
    price: "R$ 260",
    photo: "https://i.pravatar.cc/100?img=23",
  },
]

const WORKER_REQUESTS = [
  {
    title: "Renata Alves",
    subtitle: "Instalação de 3 tomadas · Vila Mariana",
    status: "Novo pedido",
    variant: "default",
    price: "R$ 280",
    photo: "https://i.pravatar.cc/100?img=44",
  },
  {
    title: "Eduardo Nunes",
    subtitle: "Revisão do quadro de energia · Centro",
    status: "Aguardando",
    variant: "secondary",
    price: "R$ 350",
    photo: "https://i.pravatar.cc/100?img=13",
  },
  {
    title: "Juliana Prado",
    subtitle: "Troca de luminárias · Pinheiros",
    status: "Concluído",
    variant: "success",
    price: "R$ 190",
    photo: "https://i.pravatar.cc/100?img=26",
  },
]

const WEEK = [
  { day: "Seg", value: 46 },
  { day: "Ter", value: 68 },
  { day: "Qua", value: 54 },
  { day: "Qui", value: 82 },
  { day: "Sex", value: 100 },
  { day: "Sáb", value: 72 },
  { day: "Dom", value: 34 },
]

const TONES = {
  gold: "border-primary/25 bg-primary/10 text-primary",
  tiger: "border-tiger-orange/25 bg-tiger-orange/10 text-tiger-orange",
  terracotta:
    "border-fiery-terracotta/25 bg-fiery-terracotta/10 text-fiery-terracotta",
  emerald: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
}

function StatCard({ icon: Icon, label, value, hint, tone = "gold", delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Card className="card-lift relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-current opacity-[0.06] blur-2xl" />
        <div className="relative flex items-start justify-between gap-3">
          <p className="text-xs text-muted-foreground">{label}</p>
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl border",
              TONES[tone]
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <p className="relative mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {value}
        </p>
        <p className="relative mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <TrendingUp className="h-3 w-3 text-emerald-400" />
          {hint}
        </p>
      </Card>
    </Reveal>
  )
}

function ActivityList({ items }) {
  return (
    <div className="mt-5 space-y-1.5">
      {items.map((item) => (
        <div
          key={item.title}
          className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
        >
          <Avatar className="h-10 w-10 shrink-0 border border-white/10">
            <AvatarImage src={item.photo} alt={item.title} />
            <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <Badge variant={item.variant}>{item.status}</Badge>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              {item.subtitle}
            </p>
          </div>

          <p className="hidden text-sm font-semibold text-foreground sm:block">
            {item.price}
          </p>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      ))}
    </div>
  )
}

function QuickActions({ isWorker }) {
  const actions = isWorker
    ? [
        { icon: PlusCircle, label: "Criar um novo anúncio", to: "/perfil" },
        { icon: MessageCircle, label: "Responder solicitações", to: "/perfil" },
        { icon: UserRound, label: "Atualizar meu perfil", to: "/perfil" },
        { icon: Eye, label: "Ver como cliente", to: "/buscar" },
      ]
    : [
        { icon: Search, label: "Buscar profissionais", to: "/buscar" },
        { icon: Briefcase, label: "Meus serviços", to: "/dashboard" },
        { icon: Heart, label: "Perfis salvos", to: "/buscar" },
        { icon: UserRound, label: "Editar meu perfil", to: "/perfil" },
      ]

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="font-display text-sm font-semibold">Ações rápidas</h2>
        <div className="mt-4 space-y-1.5">
          {actions.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-primary/80 transition-colors group-hover:border-primary/30 group-hover:text-primary">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileProgress() {
  const completion = 72

  return (
    <Card className="relative overflow-hidden border-primary/15">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
      <CardContent className="relative p-6">
        <div className="flex items-center gap-4">
          <div
            className="grid h-[70px] w-[70px] shrink-0 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#f0a202 ${completion * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
          >
            <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#141a33]">
              <span className="font-display text-sm font-bold">{completion}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Seu perfil está quase lá
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Adicione fotos do portfólio para aparecer melhor nas buscas.
            </p>
          </div>
        </div>
        <Button size="sm" className="mt-4 w-full" asChild>
          <Link to="/perfil">
            Completar perfil
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function NextServiceCard() {
  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fiery-terracotta/15 blur-3xl" />
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">Próximo serviço</h2>
          <Badge variant="default">Confirmado</Badge>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-center">
            <span className="font-display text-lg font-bold leading-none text-primary">
              12
            </span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
              out
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Pintura da sala</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Mariana Souza · 09:00
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock3 className="h-3 w-3" />2 horas estimadas
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <MessageCircle className="h-3.5 w-3.5" />
            Mensagem
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to="/buscar">Detalhes</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceCard() {
  return (
    <Card>
      <CardContent className="p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Desempenho da semana
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pedidos recebidos nos últimos 7 dias
            </p>
          </div>
          <Badge variant="success">
            <TrendingUp className="h-3 w-3" />
            +18% vs. semana anterior
          </Badge>
        </div>

        <div className="mt-7 flex h-40 items-end gap-2 sm:gap-3">
          {WEEK.map((item) => (
            <div
              key={item.day}
              className="group flex h-full flex-1 flex-col items-center"
            >
              <div className="relative flex w-full flex-1 items-end">
                <span className="absolute inset-x-0 -top-5 text-center text-[10px] font-medium text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {Math.max(1, Math.round(item.value / 10))}
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-golden-orange/30 via-golden-orange/70 to-fiery-terracotta transition-all duration-500 group-hover:brightness-125"
                  style={{ height: `${item.value}%` }}
                />
              </div>
              <span className="mt-2 text-[10px] text-muted-foreground">
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Visitas ao perfil", value: "248" },
            { label: "Taxa de resposta", value: "96%" },
            { label: "Tempo médio", value: "1h 12m" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"
            >
              <p className="font-display text-lg font-bold text-foreground">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const isWorker = user?.userType === "worker"
  const firstName = user?.name?.split(" ")[0] || "visitante"

  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date())
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1)

  const stats = isWorker ? WORKER_STATS : CLIENT_STATS
  const activities = isWorker ? WORKER_REQUESTS : CLIENT_SERVICES

  return (
    <div className="shell py-8 sm:py-12">
      <Reveal>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gold-gradient p-[2px] shadow-glow">
              <Avatar className="h-16 w-16 border-2 border-[#121831] sm:h-[4.5rem] sm:w-[4.5rem]">
                <AvatarImage
                  src={user?.photoUrl || "https://i.pravatar.cc/150?img=12"}
                  alt={user?.name}
                />
                <AvatarFallback className="text-xl">
                  {user?.name ? user.name.charAt(0) : <UserRound />}
                </AvatarFallback>
              </Avatar>
            </div>

            <div>
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {isWorker ? "Painel do profissional" : "Painel do contratante"}
              </span>
              <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                Olá, {firstName}
                <span className="ml-1 inline-block origin-bottom-right animate-float text-2xl">
                  👋
                </span>
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {isWorker
                    ? "Eletricista · São Paulo"
                    : "Contratante · São Paulo"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Notificações" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-fiery-terracotta shadow-[0_0_8px_rgba(217,93,57,0.9)]" />
            </Button>
            <Button asChild>
              <Link to={isWorker ? "/perfil" : "/buscar"}>
                {isWorker ? (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Novo anúncio
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Buscar profissionais
                  </>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={index * 70}
          />
        ))}
      </div>

      {isWorker && (
        <Reveal delay={120}>
          <div className="glass mt-4 flex flex-col gap-3 rounded-2xl border-primary/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <Eye className="h-4 w-4" />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Seu perfil apareceu{" "}
                <span className="font-semibold text-foreground">248 vezes</span>{" "}
                esta semana e recebeu{" "}
                <span className="font-semibold text-foreground">12 contatos</span>.
              </p>
            </div>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/perfil">
                Ver meu perfil público
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_20rem] xl:items-start">
        <div className="space-y-6">
          <Reveal delay={100}>
            <Card>
              <CardContent className="p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      {isWorker ? "Solicitações recentes" : "Meus serviços"}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {isWorker
                        ? "Responda rápido para manter sua taxa de aprovação alta."
                        : "Acompanhe o andamento de cada contratação."}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={isWorker ? "/perfil" : "/buscar"}>
                      Ver {isWorker ? "todas" : "serviços"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>

                <ActivityList items={activities} />
              </CardContent>
            </Card>
          </Reveal>

          {isWorker ? (
            <Reveal delay={150}>
              <PerformanceCard />
            </Reveal>
          ) : (
            <Reveal delay={150}>
              <Card>
                <CardContent className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-lg font-semibold">
                        Recomendados para você
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Baseado nos serviços que você costuma contratar.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/buscar">
                        Explorar todos
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        name: "Carlos Pereira",
                        role: "Eletricista profissional",
                        rating: "4,8",
                        city: "São Paulo",
                        price: "R$ 60",
                        photo: "https://i.pravatar.cc/100?img=12",
                        id: 1,
                      },
                      {
                        name: "Mariana Souza",
                        role: "Pintora residencial",
                        rating: "4,9",
                        city: "Campinas",
                        price: "R$ 45",
                        photo: "https://i.pravatar.cc/100?img=47",
                        id: 2,
                      },
                    ].map((pro) => (
                      <Link
                        key={pro.name}
                        to={`/profissional/${pro.id}`}
                        className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
                      >
                        <Avatar className="h-11 w-11 border border-white/10">
                          <AvatarImage src={pro.photo} alt={pro.name} />
                          <AvatarFallback>{pro.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {pro.name}
                          </p>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {pro.role}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-[11px]">
                            <Star className="h-3 w-3 fill-golden-orange text-golden-orange" />
                            <span className="font-medium text-foreground/85">
                              {pro.rating}
                            </span>
                            <span className="text-muted-foreground">
                              · {pro.city}
                            </span>
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          {pro.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )}
        </div>

        <div className="space-y-4">
          <Reveal delay={130}>
            <QuickActions isWorker={isWorker} />
          </Reveal>

          {isWorker ? (
            <Reveal delay={170}>
              <ProfileProgress />
            </Reveal>
          ) : (
            <Reveal delay={170}>
              <NextServiceCard />
            </Reveal>
          )}

          <Reveal delay={210}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-sm font-semibold">
                    Precisa de ajuda?
                  </h2>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Nosso time responde em até 1 hora nos dias úteis. Conte com a
                  gente em qualquer etapa.
                </p>
                <Button size="sm" variant="outline" className="mt-3 w-full">
                  Falar com o suporte
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
