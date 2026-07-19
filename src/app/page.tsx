"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { AuthModal } from "@/components/auth-modal"
import { Dashboard } from "@/components/dashboard"
import { VirtualClassroom } from "@/components/virtual-classroom"
import { ExamModule } from "@/components/exam-module"

export type View = "landing" | "dashboard" | "classroom" | "exam"
export type AuthModalType = "login" | "register" | null

export interface User {
  name: string
  email: string
}

export interface Course {
  id: string
  title: string
  description: string
  progress: number
  lessons: number
  completedLessons: number
  icon: string
}

export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser")
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr))
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    sessionStorage.removeItem("adminUser")
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isLoggedIn={!!currentUser}
        user={currentUser}
        onLogout={handleLogout}
      />

      <main>
        <LandingPage onGetStarted={() => router.push("/registro")} />
      </main>
    </div>
  )
}
