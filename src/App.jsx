import { lazy, Suspense, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AmbientBackground } from "@/components/shared/AmbientBackground"
import { PageSkeleton } from "@/components/shared/PageSkeleton"
import Home from "@/pages/Home"

const Login = lazy(() => import("@/pages/Login"))
const Register = lazy(() => import("@/pages/Register"))
const SearchWorkers = lazy(() => import("@/pages/SearchWorkers"))
const WorkerDetail = lazy(() => import("@/pages/WorkerDetail"))
const Profile = lazy(() => import("@/pages/Profile"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const NotFound = lazy(() => import("@/pages/NotFound"))

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => {
        const target = document.querySelector(location.hash)
        target?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 80)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname, location.hash])

  return null
}

function Layout({ children }) {
  const location = useLocation()

  return (
    <div id="top" className="relative flex min-h-svh flex-col">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <AmbientBackground />
      <Navbar />
      <main
        id="conteudo"
        key={location.pathname}
        tabIndex={-1}
        className="page-enter flex-1 focus-visible:outline-none"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollManager />
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/buscar" element={<SearchWorkers />} />
            <Route
              path="/buscar/categoria/:categoryId"
              element={<SearchWorkers />}
            />
            <Route path="/profissional/:id" element={<WorkerDetail />} />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </AuthProvider>
  )
}
