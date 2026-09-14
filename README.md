# Projeto Integrador — Plataforma de Serviços Autônomos

Bem-vindo(a)! Este repositório contém o **front-end** da plataforma de
divulgação de serviços e contratação de trabalhadores autônomos (no estilo do
GetNinjas e do LinkedIn). O objetivo deste projeto é ser uma base de código
**fácil de entender e editar**, mesmo para quem nunca teve contato com
programação web.

> **Importante:** O **back-end** (API com dados e regras de negócio) será
> desenvolvido **separadamente, em Python**, em outro repositório. Este projeto
> já está preparado para se conectar a essa API.

---

## 1. O que preciso saber antes de começar?

Muito pouco! Recomendamos que você leia este README inteiro antes de mexer no
código. As seções a seguir explicam, em linguagem simples, as peças que formam
este projeto.

### O que é React?

React é uma biblioteca JavaScript usada para construir **interfaces** (telas).
Com ele, você escreve páginas como se fossem pequenos blocos de construção
chamados **componentes**. Um componente é uma função que devolve HTML.

Exemplo — um componente de saudação:

```jsx
function Saudacao() {
  return <h1>Olá, mundo!</h1>
}
```

Esse componente pode ser usado em qualquer lugar da página:

```jsx
return <Saudacao />
```

A magia do React é que, quando os dados mudam, apenas a parte certa da tela é
atualizada automaticamente. Você não precisa "recarregar" a página.

### O que é Vite?

Vite é a ferramenta usada para **iniciar o projeto, exibi-lo no navegador e
gerar a versão final** do site. Quando você roda `npm run dev`, o Vite abre o
site localmente e atualiza a tela automaticamente a cada mudança que você
salva.

### JavaScript embutido no HTML (JSX)

No React, escrevemos HTML dentro do JavaScript usando uma sintaxe chamada
**JSX**. A única diferença prática é que, para usar JavaScript dentro do JSX,
abrimos chaves `{}`:

```jsx
const nome = "Ana"
return <h1>Olá, {nome}!</h1>
```

> **Nota sobre o manual textual:** este projeto usa `javascript` puro, não
> TypeScript. Isso foi feito de propósito para facilitar o aprendizado.

---

## 2. Como rodar o projeto?

Instale o **Node.js** (versão LTS) em https://nodejs.org. Depois, no terminal,
dentro da pasta do projeto:

```bash
# 1. Instala todas as dependências (faz uma única vez)
npm install

# 2. Inicia o servidor de desenvolvimento
npm run dev
```

O Vite mostrará um endereço (normalmente `http://localhost:5173`). Abra esse
endereço no navegador. Ao editar qualquer arquivo, a página recarrega
automaticamente.

Outros comandos úteis:

| Comando          | O que faz                                      |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | Roda o site localmente (ambiente de desenvolvimento) |
| `npm run build`  | Gera a versão final do site (pasta `dist/`)    |
| `npm run preview`| Exibe a versão final gerada                    |
| `npm run lint`   | Verifica o código em busca de problemas        |

---

## 3. As bibliotecas (dependências) e por que usamos cada uma

Tudo que o projeto usa está listado no arquivo `package.json`. As principais:

| Biblioteca      | Papel                                                                  |
| --------------- | ---------------------------------------------------------------------- |
| **React**       | Cria as telas (componentes) e reage a mudanças de dados.               |
| **Vite**        | Servidor de desenvolvimento, compilação e otimização do site.          |
| **React Router**| Cuida da **navegação entre páginas** (links e endereços da URL).       |
| **React Query** | **Busca e mantém dados atualizados** vindo da API de forma organizada. |
| **Axios**       | Faz as **requisições HTTP** para o back-end Python (GET, POST, PUT...).|
| **Tailwind CSS**| Ensina a **estilizar** (cores, espaçamentos) usando classes no HTML.   |
| **shadcn/ui**   | Conjunto de **componentes prontos** (botões, campos, cards...).        |
| **Lucide**      | Pacote de **ícones** (ícones de busca, perfil, estrela etc.).          |

### 3.1 React Router — as rotas (páginas)

As telas e seus endereços estão definidos em `src/App.jsx`. Cada rota aponta
para um arquivo dentro de `src/pages/`.

| Endereço (URL)                      | Página                        | Arquivo                  |
| ----------------------------------- | ----------------------------- | ------------------------ |
| `/`                                 | Página inicial                | `src/pages/Home.jsx`     |
| `/buscar`                           | Busca de profissionais        | `src/pages/SearchWorkers.jsx` |
| `/buscar/categoria/:categoryId`     | Busca por categoria           | `src/pages/SearchWorkers.jsx` |
| `/profissional/:id`                 | Perfil de um profissional     | `src/pages/WorkerDetail.jsx`  |
| `/login`                            | Login                         | `src/pages/Login.jsx`    |
| `/cadastro`                         | Criação de conta              | `src/pages/Register.jsx` |
| `/perfil`                           | Edição do próprio perfil      | `src/pages/Profile.jsx`  |
| `/dashboard`                        | Painel do usuário             | `src/pages/Dashboard.jsx`|

Para criar uma página nova:

1. Crie o arquivo em `src/pages/` (ex.: `NovaPagina.jsx`).
2. Adicione uma rota em `src/App.jsx`:

```jsx
<Route path="/minha-rota" element={<NovaPagina />} />
```

Navegar de um lugar para outro dentro do código é feito com o componente
`Link` (semelhante a um link HTML):

```jsx
<Link to="/minha-rota">Ir para minha rota</Link>
```

Para capturar o valor da URL: `/profissional/:id` — o `:id` é o parâmetro.
Dentro da página, lê-se com:

```jsx
import { useParams } from "react-router-dom"
const { id } = useParams()
```

### 3.2 React Query — buscando dados da API

React Query guarda os dados "em cache" e os mantém atualizados. Os pedidos de
dados ficam concentrados em `src/hooks/useWorkers.js`:

```js
import { useQuery } from "@tanstack/react-query"
import { workerService } from "@/api/client"

export function useWorkers() {
  return useQuery({
    queryKey: ["workers"],                    // nome do dado buscado
    queryFn: () => workerService.list(),      // função que busca na API
  })
}
```

Para usar em uma página:

```jsx
const { data, isLoading, isError } = useWorkers()
```

- `data`    → os dados que a API devolveu
- `isLoading` → true enquanto os dados carregam (use para mostrar um "carregando…")
- `isError` → true se a requisição falhou

### 3.3 Axios — falando com o back-end Python

Toda comunicação com o back-end passa por `src/api/client.js`. Ali existe um
"cliente" (objeto configurado do axios) que já:

- aponta para a URL da API (definida no arquivo `.env`);
- envia o **token de autenticação** automaticamente em cada requisição.

O arquivo também organiza os **serviços** por assunto:
`authService` (login/cadastro), `workerService` (profissionais),
`categoryService` (categorias), `userService` (usuários) e
`contractService` (contratos).

### 3.4 Tailwind CSS — estilizando sem CSS complicado

O Tailwind oferece **classes prontas** que você coloca direto no HTML. Exemplos:

| Classe                 | Efeito                               |
| ---------------------- | ------------------------------------ |
| `bg-primary`           | Fundo com a cor principal do site    |
| `text-muted-foreground`| Texto com cor suave (esmaecido)      |
| `p-4`                  | Espaçamento interno de 1rem em todos os lados |
| `mt-2`                 | Margem superior pequena              |
| `flex`                 | Coloca os elementos em linha          |
| `rounded-lg`           | Cantos arredondados                  |
| `hover:shadow-md`      | Sombra (ao passar o mouse)           |

Os "tons" de cor (`primary`, `muted`, `destructive`...) são definidos no
arquivo `src/index.css`, nas variáveis CSS. Mudar a cor principal do site é
trocar a variável `--primary` lá.

### 3.5 shadcn/ui — componentes prontos

Os componentes prontos ficam em `src/components/ui/`. Exemplos: `Button`
(botão), `Card` (cartão), `Input` (campo de texto), `Badge` (etiqueta),
`Avatar` (foto de perfil), `DropdownMenu` (menu suspenso).

Como usar um componente shadcn (ex.: um botão):

```jsx
import { Button } from "@/components/ui/button"

<Button>Cadastre-se</Button>
```

**Como adicionar um novo componente shadcn:**

```bash
npx shadcn@latest add nome-do-componente
```

Ex.: `npx shadcn@latest add dialog`. O comando cria o arquivo automaticamente
na pasta `src/components/ui/`. Você pode consultar a lista de componentes em:
https://ui.shadcn.com/docs/components

> O shadcn deste projeto está configurado para **JavaScript** (não gera
> TypeScript). Essa configuração está salva no arquivo `components.json`
> (campo `"tsx": false`). Não altere esse arquivo sem necessidade.

---

## 4. Estrutura de pastas

```
projetointegrador/
├── index.html               # A página HTML base que abre no navegador
├── src/                     # Todo o código do site fica aqui
│   ├── main.jsx             # "Ponto de entrada": monta o React e os provedores
│   ├── App.jsx              # Define as rotas (páginas) do site
│   ├── index.css            # Tailwind + cores/estilos globais do tema
│   │
│   ├── api/
│   │   └── client.js        # Configuração do Axios + chamadas à API
│   │
│   ├── components/
│   │   ├── ui/              # Componentes shadcn (gerenciados pelo CLI)
│   │   ├── layout/          # Navbar (menu superior) e Footer (rodapé)
│   │   └── shared/          # Componentes reutilizados: Cartões de profissional
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx  # Guarda o usuário logado (login/logout/cadastro)
│   │
│   ├── hooks/
│   │   └── useWorkers.js    # Hooks do React Query (busca de dados)
│   │
│   ├── lib/
│   │   └── utils.js         # Função auxiliar do shadcn
│   │
│   ├── assets/
│   │   └── data/
│   │       └── mockData.js  # DADOS DE EXEMPLO para o site funcionar sem API
│   │
│   └── pages/               # Uma pasta = uma tela (rota) do site
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── SearchWorkers.jsx
│       ├── WorkerDetail.jsx
│       ├── Profile.jsx
│       ├── Dashboard.jsx
│       └── NotFound.jsx
│
├── components.json          # Configuração do shadcn (tsx: false = JavaScript)
├── jsconfig.json            # Permite usar o atalho @/ para a pasta src
├── tailwind.config.js       # Configuração do Tailwind CSS
├── vite.config.js           # Configuração do Vite (atalho @ e plugin React)
└── package.json             # Lista de dependências e comandos
```

---

## 5. Mapeando o fluxo: como as telas funcionam

### 5.1 A página inicial (`Home.jsx`)

Mostra a capa (hero), as categorias de serviços e profissionais em destaque.
Essas seções são componentes dentro da página (`Hero`, `Categories`,
`FeaturedWorkers`).

### 5.2 Busca de profissionais (`SearchWorkers.jsx`)

- Lê a categoria da URL (`/buscar/categoria/eletrica`).
- Lê o texto de busca da URL (`/buscar?search=encanador`).
- Filtra os dados de `mockData.js` e monta a grade de `<WorkerCard>`.
- Para testar a busca, digite algo no campo (ex.: "eletricista").

### 5.3 Página do profissional (`WorkerDetail.jsx`)

- Lê o `id` da URL (`/profissional/3`).
- Busca o profissional correspondente e mostra o perfil completo.

### 5.4 Login e Cadastro (`Login.jsx`, `Register.jsx`)

- Os formulários guardam os valores digitados em um **estado** (variáveis com
  `useState`).
- Ao enviar, chamam `login(...)` ou `register(...)` do `AuthContext`.
- Se o back-end estiver indisponível, a resposta será de erro (exibimos a
  mensagem no próprio formulário).

### 5.5 Menu de usuário e perfil (`Navbar`, `Dashboard`, `Profile`)

- O `AuthContext` guarda o usuário logado em memória e no `localStorage`,
  então a sessão continua mesmo ao atualizar a página.
- Páginas como `/perfil` e `/dashboard` são **protegidas**: se não há usuário
  logado, o React Router redireciona para `/login` (veja `ProtectedRoute` em
  `App.jsx`).

---

## 6. Dados de exemplo (mock) — o site funciona sem o back-end

O arquivo `src/assets/data/mockData.js` contém categorias e profissionais de
exemplo. Assim, o site "funciona" mesmo antes de a API existir.

- `categories` → lista de categorias (Elétrica, Hidráulica, Pintura...).
- `workers` → lista de profissionais com foto, avaliação, preço etc.
- `getMockWorkers(categoryId)` e `getMockWorkerById(id)` → filtram/consultam.

**Quando conectar o back-end de verdade**, basta trocar essas funções pelas
chamadas via React Query (que já estão prontas em `src/hooks/useWorkers.js`).
As páginas continuarão funcionando sem precisar mudar a estrutura da tela.

---

## 7. Conectando ao back-end Python

O back-end será outro repositório, com uma API em Python. Para conectar este
front-end à API, siga estes passos:

1. Crie um arquivo chamado `.env` na raiz do projeto (copie do exemplo):

```bash
cp .env.example .env
```

2. Edite o `.env` indicando o endereço da API:

```env
VITE_API_URL=http://localhost:8000/api
```

3. Garanta que a API devolva os dados com a **mesma estrutura** usada no
   front-end. Exemplos de contratos esperados (formato JSON):

```jsonc
// POST /api/auth/login
// body: { "email": "...", "password": "..." }
// resposta esperada:
{
  "token": "seu-token-aqui",
  "user": {
    "name": "João",
    "email": "joao@email.com",
    "userType": "worker",      // "client" | "worker"
    "city": "São Paulo"
  }
}

// GET /api/workers
// resposta esperada: uma lista de objetos assim:
{
  "id": 1,
  "name": "Carlos Pereira",
  "photo": "https://.../foto.jpg",
  "title": "Eletricista profissional",
  "description": "Serviços de elétrica...",
  "categories": ["eletrica"],
  "rating": 4.8,
  "reviewsCount": 42,
  "pricePerHour": 60,
  "city": "São Paulo",
  "yearsExperience": 12,
  "verified": true
}
```

> **Dica importante:** alinhem os nomes dos campos do JSON com o time do
> back-end. Este README é sua referência de contrato da API.

O arquivo `src/api/client.js` já envia o token (`Authorization: Bearer ...`)
em todas as requisições, então o back-end só precisa verificar esse header.

---

## 8. Fluxo de trabalho para quem está aprendendo

1. **Abra o projeto no editor** (VS Code).
2. **Rode `npm run dev`** e mantenha o navegador aberto.
3. **Ache o arquivo da página** que quer mudar (seção 3.1 mostra onde).
4. **Mude algo simples** (um texto, uma cor) e salve — a tela atualiza na hora.
5. Consulte este README sempre que tiver dúvida sobre onde está cada coisa.

### Erros comuns e soluções

| Problema                                   | Solução                                                        |
| ------------------------------------------ | --------------------------------------------------------------- |
| `npm install` demora ou falha              | Verifique sua conexão e se o Node.js LTS está instalado.        |
| A página não atualiza após salvar          | Confira se o terminal do `npm run dev` continua rodando.        |
| Site abre, mas diz "rede/erro" na busca    | É o back-end — o front usa dados de exemplo, então volte para o normal. |
| Componente não aparece                     | Verifique o nome do import (archivo/componente).                |

---

## 9. Próximos passos sugeridos (idéias de evolução)

- Cadastro de anúncios/portfólio para os profissionais (formulário + fotos).
- Chat entre cliente e profissional.
- Avaliação de serviços concluídos.
- Pagamentos simulados (integração futura).
- Filtros extras na busca (preço máximo, avaliação mínima).
- Tema escuro (as variáveis CSS já preveem isso — veja `.dark` em
  `src/index.css`).

---

## Resumo dos comandos mais importantes

```bash
npm install     # instala as dependências (1ª vez / após pull)
npm run dev     # abre o site localmente em desenvolvimento
npm run build   # gera a versão final em dist/
npm run lint    # verifica problemas no código
npx shadcn@latest add <componente>   # adiciona um componente pronto
```

Bons estudos! Qualquer dúvida, procure o professor monitor ou colegas do time
de front-end. A melhor forma de aprender é abrir o código e experimentar.