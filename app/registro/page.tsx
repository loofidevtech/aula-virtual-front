"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { AuthModal } from "@/components/auth-modal"
import type { User as UserType } from "@/app/page"

export default function RegistroPage() {
  const router = useRouter()
  // Mock state for prototyping layout
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  const handleRegister = (name: string, email: string, _password: string) => {
    setIsLoggedIn(true)
    setUser({ name, email })
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
