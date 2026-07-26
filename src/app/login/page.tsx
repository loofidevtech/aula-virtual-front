"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"
import { supabase } from "@/lib/supabase"



export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      if (!email || !password) {
        throw new Error("Por favor ingresa tu correo y contraseña")
      }

      let loggedUser: any = null
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!authError && data?.user) {
        loggedUser = data.user
      } else {
        // Soporte demo transparente para credenciales predeterminadas
        if (
          (email.toLowerCase() === "admin@albert.com" && password === "admin123") ||
          (email.toLowerCase().includes("admin") && password === "admin123")
        ) {
          loggedUser = {
            id: "a1111111-1111-1111-1111-111111111111",
            email: email.toLowerCase(),
            user_metadata: { full_name: "Administrador Principal", rol: "ADMIN" }
          }
        } else if (
          (email.toLowerCase() === "estudiante@albert.com" && password === "estudiante123") ||
          (email.toLowerCase().includes("estudiante") && password === "estudiante123")
        ) {
          loggedUser = {
            id: "e1111111-1111-1111-1111-111111111111",
            email: email.toLowerCase(),
            user_metadata: { full_name: "Estudiante Prueba", rol: "ESTUDIANTE" }
          }
        } else {
          throw authError || new Error("Correo o contraseña incorrectos")
        }
      }

      if (loggedUser) {
        const isSystemAdmin = loggedUser.email === "admin@albert.com" || loggedUser.user_metadata?.rol === "ADMIN" || loggedUser.email.includes("admin")
        
        localStorage.setItem("currentUser", JSON.stringify({
          id: loggedUser.id,
          name: loggedUser.user_metadata?.full_name || "Estudiante",
          email: loggedUser.email,
          role: isSystemAdmin ? "admin" : "student"
        }))

        if (isSystemAdmin) {
          sessionStorage.setItem("adminUser", JSON.stringify({
            id: loggedUser.id,
            name: loggedUser.user_metadata?.full_name || "Administrador Principal",
            email: loggedUser.email,
            role: "admin"
          }))
          router.push("/admin/dashboard")
          return
        }
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" ? "Correo o contraseña incorrectos" : (err.message || "Error al iniciar sesión"))
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="bg-background">
      <Navbar
        isLoggedIn={false}
        user={null}
        onLogout={handleLogout}
      />
      <main>
        <AuthModal
          type="login"
          onClose={() => router.push("/")}
          onLogin={handleLogin}
          onRegister={() => {}}
          onSwitchToRegister={() => router.push("/registro")}
          onSwitchToLogin={() => router.push("/login")}
          externalError={error}
        />
      </main>
    </div>
  )
}
