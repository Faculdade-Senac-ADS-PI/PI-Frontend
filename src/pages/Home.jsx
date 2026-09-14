import { Link } from "react-router-dom"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryCard } from "@/components/shared/CategoryCard"
import { WorkerCard } from "@/components/shared/WorkerCard"
import { categories, workers } from "@/assets/data/mockData"

function Hero() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Encontre o profissional ideal para o seu serviço
          </h1>
          <p className="mt-4 max-w-lg text-lg text-primary-foreground/80">
            Divulgue seus serviços ou contrate trabalhadores autônomos
            qualificados perto de você. Simples, rápido e seguro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/buscar">
                Buscar profissionais
                <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/cadastro">
                Quero divulgar meus serviços
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-0 bg-primary-foreground/10 backdrop-blur">
          <CardContent className="p-6 text-primary-foreground">
            <h2 className="text-xl font-semibold">Como funciona?</h2>
            <ol className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 font-bold">
                  1
                </span>
                <p>
                  Crie sua conta gratuita como cliente ou profissional.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 font-bold">
                  2
                </span>
                <p>
                  Busque por categoria, cidade ou palavra-chave.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 font-bold">
                  3
                </span>
                <p>Compare perfis, avaliações e combine o serviço.</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function Categories({ list }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categorias de serviços</h2>
          <p className="text-muted-foreground">
            Encontre o que você precisa por categoria.
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/buscar">
            Ver todas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

function FeaturedWorkers({ list }) {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Profissionais em destaque</h2>
            <p className="text-muted-foreground">
              Os melhores avaliados da nossa comunidade.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/buscar">
              Ver mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 3).map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories list={categories} />
      <FeaturedWorkers list={workers} />
    </>
  )
}