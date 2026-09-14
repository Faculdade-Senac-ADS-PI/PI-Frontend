import { Link, useParams } from "react-router-dom"
import { ArrowLeft, BadgeCheck, CalendarDays, MapPin, MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getMockCategoryById,
  getMockWorkerById,
} from "@/assets/data/mockData"
import { useAuth } from "@/contexts/AuthContext"

export default function WorkerDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const worker = getMockWorkerById(id)

  if (!worker) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Profissional não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          O perfil que você procura não existe ou foi removido.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/buscar">Voltar para a busca</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        to="/buscar"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para a busca
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={worker.photo} />
                  <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{worker.name}</h1>
                    {worker.verified && (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground">{worker.title}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{worker.rating}</span>
                      <span className="text-muted-foreground">
                        ({worker.reviewsCount} avaliações)
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {worker.city}
                    </span>
                    <span className="text-muted-foreground">
                      {worker.yearsExperience} anos de experiência
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {worker.categories.map((categoryId) => {
                      const category = getMockCategoryById(categoryId)
                      return (
                        <Badge key={categoryId} variant="secondary">
                          {category ? category.name : categoryId}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-lg font-semibold">Sobre o profissional</h2>
                <p className="mt-2 text-muted-foreground">{worker.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contratar serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Valor estimado</span>
                <span className="text-2xl font-bold">
                  R$ {worker.pricePerHour}
                  <span className="text-sm font-normal text-muted-foreground">
                    /hora
                  </span>
                </span>
              </div>

              {user ? (
                <>
                  <Button className="w-full">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Solicitar serviço
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar mensagem
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full" asChild>
                    <Link to="/login">Entre para contratar</Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Crie uma conta grátis para solicitar este serviço.
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{worker.rating}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.round(worker.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Baseado em {worker.reviewsCount} avaliações
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}