"use client"

import { useState } from "react"
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

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isLoggedIn={false}
        user={null}
        onLogout={handleLogout}
      />

      <main>
        <LandingPage onGetStarted={() => router.push("/registro")} />
      </main>
    </div>
  )
}
