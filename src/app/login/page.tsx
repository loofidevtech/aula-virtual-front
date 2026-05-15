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

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/dashboard")
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión")
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
        />
      </main>
    </div>
  )
}
