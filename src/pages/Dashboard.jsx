import { Link } from "react-router-dom"
import { ArrowRight, Briefcase, Star, UserRound } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function EmptyState({ title, description, action, actionText }) {
  return (
    <div className="rounded-lg border bg-muted/30 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <UserRound className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && (
        <Button className="mt-5" asChild>
          <Link to={action}>
            {actionText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}

function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Serviços contratados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Em andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Avaliações recebidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minha atividade</CardTitle>
          <CardDescription>
            Aqui aparecerão seus contratos e serviços solicitados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="Nenhum serviço ainda"
            description="Comece buscando um profissional para o que você precisa."
            action="/buscar"
            actionText="Buscar profissionais"
          />
        </CardContent>
      </Card>
    </div>
  )
}

function WorkerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Anúncios ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Solicitações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Avaliação média
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-1">
            <span className="text-3xl font-bold">0.0</span>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus anúncios</CardTitle>
          <CardDescription>
            Divulgue seus serviços e apareça nas buscas dos clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="Você ainda não divulgou serviços"
            description="Crie seu primeiro anúncio para começar a receber solicitações de clientes."
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const isWorker = user?.userType === "worker"

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.photoUrl || "https://i.pravatar.cc/100"} />
          <AvatarFallback>
            {user?.name ? user.name.charAt(0) : <UserRound />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Olá, {user?.name?.split(" ")[0]}</h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {isWorker ? (
              <>
                <Briefcase className="h-4 w-4" />
                Acesso de profissional autônomo
              </>
            ) : (
              "Acesso de contratante"
            )}
          </p>
        </div>
      </div>

      {isWorker ? <WorkerDashboard /> : <ClientDashboard />}
    </div>
  )
}