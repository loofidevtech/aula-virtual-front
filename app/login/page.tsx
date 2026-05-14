"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"

export default function LoginPage() {
  const router = useRouter()
  // Mock state for prototyping layout
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  const handleLogin = (email: string, _password: string) => {
    setIsLoggedIn(true)
    setUser({ name: "Estudiante", email })
    router.push("/dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
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
