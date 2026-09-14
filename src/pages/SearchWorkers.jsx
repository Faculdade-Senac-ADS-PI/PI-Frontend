import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WorkerCard } from "@/components/shared/WorkerCard"
import { categories, getMockWorkers } from "@/assets/data/mockData"

export default function SearchWorkers() {
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const activeCategory = categoryId || null

  const filteredWorkers = getMockWorkers(activeCategory).filter((worker) => {
    const term = search.toLowerCase()
    if (!term) return true
    return (
      worker.name.toLowerCase().includes(term) ||
      worker.title.toLowerCase().includes(term) ||
      worker.city.toLowerCase().includes(term) ||
      worker.description.toLowerCase().includes(term)
    )
  })

  function handleSubmitSearch(event) {
    event.preventDefault()
    setSearchParams({ search })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Encontre profissionais</h1>
        <p className="mt-2 text-muted-foreground">
          Busque por profissional, serviço ou cidade.
        </p>

        <form onSubmit={handleSubmitSearch} className="mt-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex: eletricista, pintura, São Paulo..."
              className="pl-9"
            />
          </div>
        </form>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button variant={activeCategory ? "outline" : "default"} asChild>
          <Link to="/buscar">Todas</Link>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            asChild
          >
            <Link to={`/buscar/categoria/${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        {filteredWorkers.length} profissional(is) encontrado(s)
      </div>

      {filteredWorkers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-muted/30 py-16 text-center">
          <p className="text-lg font-medium">Nenhum profissional encontrado</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tente buscar por outro termo ou categoria.
          </p>
        </div>
      )}
    </div>
  )
}