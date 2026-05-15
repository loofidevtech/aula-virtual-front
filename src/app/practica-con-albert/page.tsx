"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ExamModule } from "@/components/exam-module"
import type { View, User as UserType } from "@/app/page"

export default function PracticaConAlbertPage() {
  const router = useRouter()
  // Mock state for prototyping layout
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    router.push("/")
  }

  const handleNavigate = (view: View) => {
    setSidebarOpen(false)
    switch(view) {
      case "landing": router.push("/"); break;
      case "exam": router.push("/practica-con-albert"); break;
      case "dashboard": router.push("/dashboard"); break;
      case "classroom": router.push("/classroom"); break;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        <ExamModule
          onFinish={() => router.push("/dashboard")}
          onNavigate={handleNavigate}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </main>
    </div>
  )
}
