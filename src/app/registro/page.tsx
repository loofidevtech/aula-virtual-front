"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"
import { supabase } from "@/lib/supabase"




export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (data: any) => {
    setLoading(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            rol: 'ESTUDIANTE',
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // Intentar insertar en la tabla perfiles
        const { error: profileError } = await supabase.from('perfiles').insert({
          id: authData.user.id,
          full_name: data.name,
          email: data.email,
          telefono: data.phone,
          colegio: data.school,
          tipo_colegio: data.schoolType,
          grado: data.grade,
          departamento: data.department,
          distrito: data.district,
          rol: 'ESTUDIANTE'
        })

        if (profileError) {
          console.error("Aviso: Error al insertar en perfiles (posible falta de tabla o RLS):", profileError)
        }
      }

      alert("¡Registro exitoso en Supabase! Bienvenido a la plataforma.")
      router.push("/dashboard")
    } catch (error: any) {
      alert(error.message || "Error al registrarse en Supabase")
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
          onLogin={() => { }}
          onRegister={handleRegister}
          onSwitchToRegister={() => router.push("/registro")}
          onSwitchToLogin={() => router.push("/login")}
        />
      </main>
    </div>
  )
}
