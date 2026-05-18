"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"



export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (data: any) => {
    setLoading(true)
    try {
      // Simular un breve tiempo de carga para dar sensación de registro real
      await new Promise(resolve => setTimeout(resolve, 800))

      alert("¡Registro exitoso! Bienvenido a la plataforma de prueba.")
      router.push("/dashboard")
    } catch (error: any) {
      alert(error.message || "Error al registrarse")
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
          type="register"
          onClose={() => router.push("/")}
          onLogin={() => {}}
          onRegister={handleRegister}
          onSwitchToRegister={() => router.push("/registro")}
          onSwitchToLogin={() => router.push("/login")}
        />
      </main>
    </div>
  )
}
