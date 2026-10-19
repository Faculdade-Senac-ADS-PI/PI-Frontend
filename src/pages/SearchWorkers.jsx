import { useMemo, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import {
  ArrowLeft,
  MapPin,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { WorkerCard } from "@/components/shared/WorkerCard"
import { Reveal } from "@/components/shared/Reveal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  categories,
  getMockCategoryById,
  getMockWorkers,
  workers,
} from "@/assets/data/mockData"
import { cn } from "@/lib/utils"

const RATING_FILTERS = [
  { value: 0, label: "Qualquer nota" },
  { value: 4, label: "4,0 ou mais" },
  { value: 4.5, label: "4,5 ou mais" },
  { value: 4.8, label: "4,8 ou mais" },
]

export default function SearchWorkers() {
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [city, setCity] = useState("todas")
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState("relevance")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeCategory = categoryId || null
  const activeCategoryData = activeCategory
    ? getMockCategoryById(activeCategory)
    : null

  const cities = useMemo(
    () => [...new Set(workers.map((worker) => worker.city))].sort(),
    []
  )

  const categoryCounts = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => [
        category.id,
        workers.filter((worker) => worker.categories.includes(category.id))
          .length,
      ])
    )
  }, [])

  const filteredWorkers = useMemo(() => {
    const term = search.trim().toLowerCase()

    const result = getMockWorkers(activeCategory).filter((worker) => {
      const matchesTerm =
        !term ||
        worker.name.toLowerCase().includes(term) ||
        worker.title.toLowerCase().includes(term) ||
        worker.city.toLowerCase().includes(term) ||
        worker.description.toLowerCase().includes(term)

      const matchesCity = city === "todas" || worker.city === city
      const matchesRating = worker.rating >= minRating

      return matchesTerm && matchesCity && matchesRating
    })

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sort === "price-asc") {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour)
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour)
    } else {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount)
    }

    return result
  }, [activeCategory, search, city, minRating, sort])

  function handleSubmitSearch(event) {
    event.preventDefault()
    setSearchParams({ search })
  }

  function clearFilters() {
    setSearch("")
    setCity("todas")
    setMinRating(0)
    setSort("relevance")
    navigate("/buscar")
  }

  const hasFilters = Boolean(search || city !== "todas" || minRating > 0)

  return (
    <div className="shell py-10 sm:py-14">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Início
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-foreground/80">
            {activeCategoryData ? activeCategoryData.name : "Buscar profissionais"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {activeCategoryData
                ? `Especialistas em ${activeCategoryData.name}`
                : "Catálogo de profissionais"}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              {activeCategoryData ? (
                <>
                  Encontre um especialista em{" "}
                  <span className="text-gradient">{activeCategoryData.name}</span>
                </>
              ) : (
                <>
                  Encontre o profissional{" "}
                  <span className="text-gradient">ideal</span>
                </>
              )}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Compare avaliações, preços e experiência. Fale direto com quem vai
              executar o serviço.
            </p>
          </div>

          <form
            onSubmit={handleSubmitSearch}
            className="glass flex w-full max-w-md items-center gap-2 rounded-2xl p-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Serviço, nome ou cidade..."
                className="h-10 border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="submit" size="sm">
              Buscar
            </Button>
          </form>
        </div>
      </Reveal>

      {/* Mobile filter trigger */}
      <div className="mt-8 flex items-center justify-between gap-3 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {hasFilters && (
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          {filteredWorkers.length} resultado(s)
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-[17rem_1fr] lg:gap-8">
        <aside
          className={cn(
            "space-y-4",
            filtersOpen ? "animate-slide-down" : "hidden",
            "lg:block"
          )}
        >
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold">Categorias</h2>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary"
                >
                  <RotateCcw className="h-3 w-3" />
                  Limpar
                </button>
              )}
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/buscar"
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all duration-300",
                  !activeCategory
                    ? "border-primary/25 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
                )}
              >
                Todas as áreas
                <span className="text-[11px] text-muted-foreground">
                  {workers.length}
                </span>
              </Link>

              {categories.map((category) => {
                const active = activeCategory === category.id
                return (
                  <Link
                    key={category.id}
                    to={`/buscar/categoria/${category.id}`}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all duration-300",
                      active
                        ? "border-primary/25 bg-primary/10 text-primary"
                        : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
                    )}
                  >
                    {category.name}
                    <span className="text-[11px] text-muted-foreground">
                      {categoryCounts[category.id] || 0}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
              <MapPin className="h-4 w-4 text-primary" />
              Cidade
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCity("todas")}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-all duration-300",
                  city === "todas"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                Todas
              </button>
              {cities.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCity(item)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-all duration-300",
                    city === item
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
              <Star className="h-4 w-4 text-primary" />
              Avaliação mínima
            </h2>
            <div className="mt-3 space-y-1.5">
              {RATING_FILTERS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMinRating(option.value)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs transition-all duration-300",
                    minRating === option.value
                      ? "border-primary/25 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
                  )}
                >
                  {option.label}
                  {minRating === option.value && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border-primary/15 p-5">
            <p className="text-xs font-semibold text-foreground">
              Não encontrou o que precisa?
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              Conte o que você precisa e receba orçamentos de profissionais da
              sua região.
            </p>
            <Button size="sm" variant="outline" className="mt-3 w-full" asChild>
              <Link to="/cadastro">Publicar um pedido</Link>
            </Button>
          </div>
        </aside>

        <div>
          <div className="glass mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filteredWorkers.length}
              </span>{" "}
              {filteredWorkers.length === 1
                ? "profissional encontrado"
                : "profissionais encontrados"}
            </p>

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                Ordenar por
              </span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-[10.5rem] rounded-xl text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Mais relevantes</SelectItem>
                  <SelectItem value="rating">Melhor avaliados</SelectItem>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasFilters && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {search && (
                <Badge variant="secondary" className="gap-1.5 py-1">
                  “{search}”
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Remover busca"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {city !== "todas" && (
                <Badge variant="secondary" className="gap-1.5 py-1">
                  <MapPin className="h-3 w-3" />
                  {city}
                  <button
                    type="button"
                    onClick={() => setCity("todas")}
                    aria-label="Remover cidade"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="gap-1.5 py-1">
                  <Star className="h-3 w-3" />
                  {minRating.toFixed(1)}+
                  <button
                    type="button"
                    onClick={() => setMinRating(0)}
                    aria-label="Remover avaliação mínima"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <button
                type="button"
                onClick={clearFilters}
                className="text-[11px] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {filteredWorkers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredWorkers.map((worker, index) => (
                <Reveal key={worker.id} delay={Math.min(index, 6) * 60}>
                  <WorkerCard worker={worker} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="glass flex flex-col items-center rounded-3xl px-6 py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-muted-foreground">
                <SearchX className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold">
                Nenhum profissional encontrado
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                Tente outro termo, remova alguns filtros ou explore outra
                categoria.
              </p>
              <Button variant="outline" className="mt-6" onClick={clearFilters}>
                <RotateCcw className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
