import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Página não encontrada</h2>
      <p className="mt-2 text-muted-foreground">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  )
}