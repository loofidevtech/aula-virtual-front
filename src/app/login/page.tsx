"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"



export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      // Simular un breve tiempo de carga para dar sensación de autenticación real
      await new Promise(resolve => setTimeout(resolve, 600))

      if (!email || !password) {
        throw new Error("Por favor ingresa tu correo y contraseña")
      }

      // Al ser una versión de prueba/maqueta, permitimos el ingreso directo al dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
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
