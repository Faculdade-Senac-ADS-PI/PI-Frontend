import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/shared/Reveal"
import { StarRating } from "@/components/shared/StarRating"
import {
  getMockCategoryById,
  getMockWorkerById,
} from "@/assets/data/mockData"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

const DISTRIBUTION = [
  { stars: 5, ratio: 0.74 },
  { stars: 4, ratio: 0.18 },
  { stars: 3, ratio: 0.05 },
  { stars: 2, ratio: 0.02 },
  { stars: 1, ratio: 0.01 },
]

const REVIEWS = [
  {
    name: "Patrícia Mendes",
    photo: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    date: "há 3 dias",
    text: "Serviço impecável do início ao fim. Chegou no horário, explicou cada etapa e deixou tudo limpo. Com certeza vou contratar novamente.",
  },
  {
    name: "Eduardo Nunes",
    photo: "https://i.pravatar.cc/100?img=13",
    rating: 5,
    date: "há 2 semanas",
    text: "Orçamento justo e sem surpresas. Resolveu um problema que outros dois profissionais não conseguiram identificar. Recomendo muito.",
  },
  {
    name: "Juliana Prado",
    photo: "https://i.pravatar.cc/100?img=26",
    rating: 4,
    date: "há 1 mês",
    text: "Muito atencioso e organizado. O trabalho ficou ótimo e o prazo foi cumprido. Só demorou um pouco para responder no primeiro contato.",
  },
]

const SKILLS = {
  eletrica: ["Instalações residenciais", "Quadros de energia", "Iluminação", "Manutenção preventiva"],
  hidraulica: ["Caça-vazamentos", "Instalação de tubulação", "Torneiras e chuveiros", "Desentupimento"],
  pintura: ["Pintura interna", "Pintura externa", "Acabamento fino", "Papel de parede"],
  marcenaria: ["Móveis sob medida", "Restauração", "Reparos em madeira", "Projetos 3D"],
  reformas: ["Alvenaria", "Revestimentos", "Pisos", "Gestão de obra"],
  eletronicos: ["Troca de tela", "Reparo em placa", "Baterias", "Diagnóstico"],
  limpeza: ["Limpeza pós-obra", "Limpeza pesada", "Organização", "Conservação"],
  informatica: ["Manutenção de PCs", "Redes", "Instalação de software", "Recuperação de dados"],
}

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export default function WorkerDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const worker = getMockWorkerById(id)

  const [saved, setSaved] = useState(false)
  const [requested, setRequested] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  if (!worker) {
    return (
      <div className="shell py-24">
        <div className="glass mx-auto max-w-lg rounded-3xl px-8 py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-muted-foreground">
            <Award className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">
            Profissional não encontrado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            O perfil que você procura não existe ou foi removido.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/buscar">
              <ArrowLeft className="h-4 w-4" />
              Voltar para a busca
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const categories = worker.categories
    .map((categoryId) => getMockCategoryById(categoryId))
    .filter(Boolean)

  const skills = worker.categories
    .flatMap((categoryId) => SKILLS[categoryId] || [])
    .slice(0, 4)

  const firstName = worker.name.split(" ")[0]

  return (
    <div className="shell py-8 sm:py-12">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/buscar"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Voltar para a busca
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSaved((value) => !value)}
              aria-pressed={saved}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-all duration-300",
                saved
                  ? "border-fiery-terracotta/40 bg-fiery-terracotta/15 text-fiery-terracotta"
                  : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              <Heart className={cn("h-3.5 w-3.5", saved && "fill-current")} />
              {saved ? "Salvo" : "Salvar"}
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-white/20 hover:text-foreground"
            >
              <Share2 className="h-3.5 w-3.5" />
              Compartilhar
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-7">
        <div className="space-y-6">
          <Reveal delay={70}>
            <Card className="overflow-hidden p-0">
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-space-indigo via-[#1b2347] to-[#331f24] sm:h-36">
                <div className="absolute inset-0 grid-overlay opacity-50" />
                <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-golden-orange/25 blur-[70px]" />
                <div className="absolute -bottom-20 left-16 h-44 w-44 rounded-full bg-fiery-terracotta/20 blur-[70px]" />
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Disponível para novos serviços
                </div>
              </div>

              <CardContent className="relative px-6 pb-7">
                <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-end gap-4">
                    <div className="relative shrink-0 rounded-full bg-gold-gradient p-[3px] shadow-glow">
                      <Avatar className="h-24 w-24 border-4 border-[#121831]">
                        <AvatarImage src={worker.photo} alt={worker.name} />
                        <AvatarFallback className="text-2xl">
                          {worker.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {worker.verified && (
                        <span className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-[#121831] bg-gold-gradient">
                          <BadgeCheck className="h-4 w-4 text-primary-foreground" />
                        </span>
                      )}
                    </div>

                    <div className="pb-1">
                      <h1 className="font-display text-2xl font-bold sm:text-3xl">
                        {worker.name}
                      </h1>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {worker.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pb-1">
                    {worker.verified && (
                      <Badge variant="success">
                        <BadgeCheck className="h-3 w-3" />
                        Verificado
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      <Clock3 className="h-3 w-3" />
                      Responde em ~1h
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <StarRating
                    rating={worker.rating}
                    reviews={worker.reviewsCount}
                  />
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary/70" />
                    {worker.city}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Award className="h-4 w-4 text-primary/70" />
                    {worker.yearsExperience} anos de experiência
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link key={category.id} to={`/buscar/categoria/${category.id}`}>
                      <Badge
                        variant="outline"
                        className="transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {category.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <Card>
              <CardContent className="p-6 md:p-7">
                <h2 className="font-display text-lg font-semibold">
                  Sobre o profissional
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {worker.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Atendo com horário marcado, orçamento transparente e garantia
                  de acabamento. Trabalho com materiais de qualidade e mantenho
                  você informado em cada etapa do serviço.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: CheckCircle2, label: "Serviço com garantia" },
                    { icon: CalendarDays, label: "Agenda flexível" },
                    { icon: ThumbsUp, label: "98% de recomendação" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-xs text-foreground/85"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={160}>
            <Card>
              <CardContent className="p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">
                    Especialidades
                  </h2>
                  <Sparkles className="h-4 w-4 text-primary/60" />
                </div>

                <div className="mt-5 space-y-4">
                  {skills.map((skill, index) => {
                    const level = 96 - index * 7
                    return (
                      <div key={skill}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground/85">{skill}</span>
                          <span className="text-muted-foreground">{level}%</span>
                        </div>
                        <div className="bar-track mt-2">
                          <div
                            className="bar-fill"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator className="my-6" />

                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Disponibilidade semanal
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <span
                      key={day}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/80"
                    >
                      {day}
                    </span>
                  ))}
                  <span className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground/50 line-through">
                    Dom
                  </span>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={200}>
            <Card>
              <CardContent className="p-6 md:p-7">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      Avaliações
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      O que os clientes dizem sobre {firstName}
                    </p>
                  </div>
                  <StarRating rating={worker.rating} showValue />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-[10rem_1fr] sm:items-center">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-5 text-center">
                    <p className="font-display text-4xl font-extrabold">
                      {worker.rating}
                    </p>
                    <StarRating
                      rating={worker.rating}
                      showValue={false}
                      starClassName="h-3.5 w-3.5"
                      className="mt-2 justify-center"
                    />
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {worker.reviewsCount} avaliações
                    </p>
                  </div>

                  <div className="space-y-2">
                    {DISTRIBUTION.map(({ stars, ratio }) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="flex w-8 items-center gap-1 text-[11px] text-muted-foreground">
                          {stars}
                          <Star className="h-2.5 w-2.5 fill-golden-orange text-golden-orange" />
                        </span>
                        <div className="bar-track h-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-golden-orange to-fiery-terracotta"
                            style={{ width: `${ratio * 100}%` }}
                          />
                        </div>
                        <span className="w-9 text-right text-[11px] text-muted-foreground">
                          {Math.round(worker.reviewsCount * ratio)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {REVIEWS.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 border border-white/10">
                          <AvatarImage src={review.photo} alt={review.name} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {review.name}
                            </p>
                            <span className="text-[11px] text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <StarRating
                            rating={review.rating}
                            showValue={false}
                            starClassName="h-3 w-3"
                            className="mt-1"
                          />
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-5 w-full">
                  Ver todas as {worker.reviewsCount} avaliações
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <Reveal delay={100}>
            <Card className="relative overflow-hidden border-primary/20">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <CardContent className="relative p-6">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Valor estimado
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-foreground">
                    R$ {worker.pricePerHour}
                  </span>
                  <span className="text-sm text-muted-foreground">/hora</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  O valor final é combinado direto com o profissional.
                </p>

                <Separator className="my-5" />

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5 text-primary/70" />
                      Tempo de resposta
                    </span>
                    <span className="font-medium text-foreground">
                      cerca de 1 hora
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary/70" />
                      Atendimento
                    </span>
                    <span className="font-medium text-foreground">
                      {worker.city} e região
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-primary/70" />
                      Próxima agenda
                    </span>
                    <span className="font-medium text-emerald-300">
                      amanhã
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {user ? (
                    <>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setRequested(true)}
                        disabled={requested}
                      >
                        {requested ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Solicitação enviada
                          </>
                        ) : (
                          <>
                            <CalendarDays className="h-4 w-4" />
                            Solicitar orçamento
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setMessageSent(true)}
                        disabled={messageSent}
                      >
                        <MessageCircle className="h-4 w-4" />
                        {messageSent ? "Mensagem enviada" : "Enviar mensagem"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" size="lg" asChild>
                        <Link to="/login">
                          Entre para contratar
                          <ArrowLeft className="h-4 w-4 rotate-180" />
                        </Link>
                      </Button>
                      <p className="text-center text-[11px] text-muted-foreground">
                        Crie uma conta grátis para solicitar este serviço.
                      </p>
                    </>
                  )}
                </div>

                {requested && (
                  <div className="mt-3 animate-slide-down rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2.5 text-[11px] text-emerald-300">
                    {firstName} recebeu seu pedido e responderá em breve pelo
                    painel.
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={160}>
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Contratação protegida
                </h3>
                <ul className="mt-4 space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    Perfil verificado pela plataforma
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    Histórico público de avaliações
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    Suporte em caso de imprevistos
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 text-[11px] leading-relaxed text-muted-foreground">
              Nunca faça pagamentos antecipados fora da plataforma. Combine tudo
              pelo painel para manter seu histórico protegido.
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
