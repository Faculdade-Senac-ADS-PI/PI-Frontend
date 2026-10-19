import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  MousePointerClick,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CategoryCard } from "@/components/shared/CategoryCard"
import { WorkerCard } from "@/components/shared/WorkerCard"
import { Reveal } from "@/components/shared/Reveal"
import { StarRating } from "@/components/shared/StarRating"
import { categories, workers } from "@/assets/data/mockData"

const POPULAR = ["Eletricista", "Pintura", "Limpeza", "Montagem de móveis"]

const STATS = [
  { icon: Users, value: "12 mil+", label: "profissionais ativos" },
  { icon: Star, value: "4,9/5", label: "avaliação média" },
  { icon: ShieldCheck, value: "98%", label: "contratações seguras" },
  { icon: Clock3, value: "< 2h", label: "tempo médio de resposta" },
]

const STEPS = [
  {
    icon: Search,
    title: "Encontre quem resolve",
    text: "Busque por serviço, categoria ou cidade e compare perfis, preços e avaliações reais.",
  },
  {
    icon: MousePointerClick,
    title: "Combine direto",
    text: "Solicite um orçamento, alinhe o valor e a data. Sem intermediários, sem burocracia.",
  },
  {
    icon: CalendarCheck,
    title: "Contrate com segurança",
    text: "Acompanhe o serviço pelo painel e avalie o profissional ao final. Simples assim.",
  },
]

const WORKER_BENEFITS = [
  "Perfil profissional com portfólio e avaliações",
  "Receba solicitações de clientes da sua região",
  "Agenda e orçamentos organizados em um só painel",
  "Destaque nas buscas conforme sua reputação cresce",
]

const TESTIMONIALS = [
  {
    name: "Renata Alves",
    role: "Contratante · São Paulo",
    photo: "https://i.pravatar.cc/100?img=44",
    text: "Em menos de uma hora encontrei um eletricista excelente, com avaliações reais e preço justo. O painel facilitou demais o acompanhamento.",
  },
  {
    name: "Rodrigo Santos",
    role: "Marceneiro · São Paulo",
    photo: "https://i.pravatar.cc/100?img=15",
    text: "Meu perfil virou minha vitrine. Hoje recebo mais pedidos do que consigo atender e consigo organizar tudo pela plataforma.",
  },
  {
    name: "Camila Ribeiro",
    role: "Contratante · Campinas",
    photo: "https://i.pravatar.cc/100?img=32",
    text: "O que mais gostei foi a transparência: ver o histórico, a média de avaliações e responder rápido. Contratei com confiança.",
  },
]

function Hero() {
  const navigate = useNavigate()
  const [term, setTerm] = useState("")

  function handleSearch(event) {
    event.preventDefault()
    navigate(`/buscar?search=${encodeURIComponent(term)}`)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="shell grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <Reveal>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              A plataforma de serviços do seu bairro
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] sm:text-5xl lg:text-[3.9rem]">
              O talento certo,
              <br />
              <span className="text-gradient">no seu tempo.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Contrate profissionais autônomos verificados perto de você — ou
              divulgue seu trabalho e receba pedidos todos os dias. Sem
              complicação, com avaliações reais.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <form
              onSubmit={handleSearch}
              className="glass mt-8 flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center"
            >
              <div className="group relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-primary" />
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Ex: eletricista, pintura, limpeza..."
                  aria-label="Buscar profissionais"
                  className="h-12 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              <Button type="submit" size="lg" className="sm:min-w-[9.5rem]">
                Buscar agora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground/70">Populares:</span>
              {POPULAR.map((item) => (
                <Link
                  key={item}
                  to={`/buscar?search=${encodeURIComponent(item)}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  {item}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={390}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              {STATS.slice(0, 3).map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold leading-none text-foreground">
                      {value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={220} className="relative">
          <div className="relative mx-auto max-w-[28rem]">
            <div className="absolute -inset-10 animate-pulse-glow rounded-full bg-golden-orange/10 blur-3xl" />
            <div className="absolute inset-[-1.75rem] rounded-[3rem] border border-white/[0.05]" />
            <div className="absolute inset-[-3.5rem] rounded-[4rem] border border-white/[0.035]" />

            <div className="glass-strong relative animate-float-slow rounded-[2rem] p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Profissionais online
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] text-muted-foreground">
                  agora
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                {workers.slice(0, 3).map((worker, index) => (
                  <Link
                    key={worker.id}
                    to={`/profissional/${worker.id}`}
                    className="group flex items-center gap-3 rounded-2xl border border-transparent p-2.5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <Avatar className="h-11 w-11 border border-white/10">
                      <AvatarImage src={worker.photo} alt={worker.name} />
                      <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {worker.name}
                        </p>
                        {worker.verified && (
                          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                        )}
                      </div>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {worker.title} · {worker.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        R$ {worker.pricePerHour}
                      </p>
                      <p className="text-[10px] text-muted-foreground">/hora</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
                <div className="flex -space-x-2">
                  {workers.slice(0, 4).map((worker) => (
                    <Avatar
                      key={worker.id}
                      className="h-8 w-8 border-2 border-[#151c38]"
                    >
                      <AvatarImage src={worker.photo} alt="" />
                      <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#151c38] bg-white/10 text-[10px] font-semibold text-foreground">
                    +2k
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  contratando agora
                </span>
              </div>
            </div>

            <div className="glass-strong absolute -right-3 top-8 hidden animate-float items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-gradient text-primary-foreground shadow-glow">
                <Star className="h-4 w-4 fill-current" />
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-none text-foreground">
                  4,9/5
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  1,2 mil avaliações
                </p>
              </div>
            </div>

            <div className="glass-strong absolute -left-4 bottom-14 hidden animate-float-slow items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex [animation-delay:-3s]">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold leading-none text-foreground">
                  Orçamento aprovado
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  há 2 minutos
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="shell relative pb-6">
        <Reveal>
          <div className="glass grid grid-cols-2 gap-y-6 rounded-2xl px-4 py-6 sm:grid-cols-4 sm:divide-x sm:divide-white/[0.07]">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 text-center sm:px-4"
              >
                <Icon className="h-4 w-4 text-primary" />
                <p className="font-display text-xl font-bold text-foreground">
                  {value}
                </p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

function Categories() {
  return (
    <section id="categorias" className="shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Explore por área"
        title="Categorias de serviços"
        description="Do reparo urgente ao projeto completo: encontre o especialista certo para cada necessidade."
        action={
          <Button variant="ghost" asChild>
            <Link to="/buscar">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 70}>
            <CategoryCard
              category={category}
              index={index}
              count={
                workers.filter((worker) =>
                  worker.categories.includes(category.id)
                ).length
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FeaturedWorkers() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="shell">
        <SectionHeader
          eyebrow="Reputação em primeiro lugar"
          title="Profissionais em destaque"
          description="Perfis com as melhores avaliações e histórico consistente de serviços concluídos."
          action={
            <Button variant="ghost" asChild>
              <Link to="/buscar">
                Ver mais profissionais
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workers.slice(0, 3).map((worker, index) => (
            <Reveal key={worker.id} delay={index * 100}>
              <WorkerCard worker={worker} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Simples do começo ao fim"
        title="Como funciona"
        description="Três passos entre a sua necessidade e o serviço resolvido."
      />

      <div className="relative grid gap-4 md:grid-cols-3">
        <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-golden-orange/40 via-fiery-terracotta/40 to-transparent md:block" />

        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 120}>
            <div className="glass-card group relative h-full p-6">
              <div className="flex items-center justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-105 group-hover:bg-primary/15 group-hover:shadow-glow">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-4xl font-extrabold text-white/[0.07] transition-colors duration-500 group-hover:text-primary/20">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ForWorkers() {
  return (
    <section id="para-profissionais" className="shell py-16 sm:py-20">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-space-indigo/40 p-7 backdrop-blur-2xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-golden-orange/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-fiery-terracotta/15 blur-[90px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="eyebrow">Para profissionais</span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Transforme seu talento em uma{" "}
                <span className="text-gradient">agenda cheia.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Crie seu perfil em minutos, mostre seu portfólio e receba
                solicitações de clientes que já procuram exatamente o que você
                faz.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {WORKER_BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/cadastro">
                    Criar meu perfil grátis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">
                    Ver meu painel
                    <TrendingUp className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="glass-strong animate-float rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Nova solicitação
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    agora
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://i.pravatar.cc/100?img=44" alt="" />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Renata Alves
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Instalação de 3 tomadas · Vila Mariana
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-xs">
                    <span className="text-muted-foreground">Orçamento</span>
                    <span className="font-semibold text-primary">R$ 280,00</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 py-2 text-center text-xs font-semibold text-emerald-300">
                      Aceitar
                    </span>
                    <span className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-center text-xs font-medium text-muted-foreground">
                      Ver detalhes
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Pedidos", value: "12" },
                    { label: "Aprovação", value: "92%" },
                    { label: "Nota", value: "4,9" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-2 py-2.5"
                    >
                      <p className="font-display text-sm font-bold text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-strong absolute -right-3 -top-6 hidden animate-float-slow items-center gap-2 rounded-2xl px-3 py-2 text-[11px] font-medium text-foreground sm:flex [animation-delay:-4s]">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                Recebimento garantido
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Histórias reais"
        title="Quem usa, recomenda"
        description="Contratantes e profissionais que já transformaram a forma de trabalhar."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 110}>
            <div className="glass-card group relative h-full p-6">
              <Quote className="h-7 w-7 text-primary/40 transition-colors duration-500 group-hover:text-primary/70" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                “{testimonial.text}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarImage src={testimonial.photo} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <StarRating
                  rating={5}
                  showValue={false}
                  starClassName="h-3 w-3"
                  className="ml-auto"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="shell pb-8 pt-6">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-space-indigo/70 via-[#1b1630]/70 to-[#241318]/60 p-9 text-center backdrop-blur-2xl sm:p-14">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-golden-orange/20 blur-[90px] animate-pulse-glow" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Comece hoje, é grátis
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Seu próximo serviço começa{" "}
              <span className="text-gradient">com uma busca.</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Junte-se a milhares de pessoas que contratam e oferecem serviços
              com mais confiança.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/buscar">
                  Encontrar profissional
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/cadastro">
                  Quero oferecer serviços
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
              Sem mensalidade. Sem taxa de adesão.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedWorkers />
      <HowItWorks />
      <ForWorkers />
      <Testimonials />
      <FinalCta />
    </>
  )
}
