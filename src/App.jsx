import { useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AmbientBackground } from "@/components/shared/AmbientBackground"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import SearchWorkers from "@/pages/SearchWorkers"
import WorkerDetail from "@/pages/WorkerDetail"
import Profile from "@/pages/Profile"
import Dashboard from "@/pages/Dashboard"
import NotFound from "@/pages/NotFound"

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
      <AmbientBackground />
      <Navbar />
      <main key={location.pathname} className="page-enter flex-1">
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
      </Layout>
    </AuthProvider>
  )
}
