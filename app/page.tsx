"use client"

import { useState } from "react"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<View>("landing")
  const [authModal, setAuthModal] = useState<AuthModalType>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const courses: Course[] = [
    {
      id: "1",
      title: "Matemáticas",
      description: "Álgebra, Geometría y Trigonometría",
      progress: 65,
      lessons: 24,
      completedLessons: 16,
      icon: "calculator",
    },
    {
      id: "2",
      title: "Ciencias",
      description: "Física, Química y Biología",
      progress: 40,
      lessons: 30,
      completedLessons: 12,
      icon: "flask",
    },
    {
      id: "3",
      title: "Letras",
      description: "Lenguaje, Literatura e Historia",
      progress: 80,
      lessons: 20,
      completedLessons: 16,
      icon: "book",
    },
  ]

  const handleLogin = (email: string, _password: string) => {
    setIsLoggedIn(true)
    setUser({ name: "Estudiante", email })
    setAuthModal(null)
    setCurrentView("dashboard")
  }

  const handleRegister = (name: string, email: string, _password: string) => {
    setIsLoggedIn(true)
    setUser({ name, email })
    setAuthModal(null)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentView("landing")
    setSidebarOpen(false)
  }

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setCurrentView("classroom")
  }

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => setAuthModal("login")}
        onRegisterClick={() => setAuthModal("register")}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      <main>
        {currentView === "landing" && (
          <LandingPage onGetStarted={() => setAuthModal("register")} />
        )}

        {currentView === "dashboard" && (
          <Dashboard
            user={user}
            courses={courses}
            onCourseSelect={handleCourseSelect}
            onNavigate={handleNavigate}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {currentView === "classroom" && selectedCourse && (
          <VirtualClassroom
            course={selectedCourse}
            onBack={() => setCurrentView("dashboard")}
            onNavigate={handleNavigate}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {currentView === "exam" && (
          <ExamModule
            onFinish={() => setCurrentView("dashboard")}
            onNavigate={handleNavigate}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      </main>

      <AuthModal
        type={authModal}
        onClose={() => setAuthModal(null)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSwitchToRegister={() => setAuthModal("register")}
        onSwitchToLogin={() => setAuthModal("login")}
      />
    </div>
  )
}
