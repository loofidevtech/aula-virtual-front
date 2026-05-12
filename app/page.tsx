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
  role: "student" | "admin"
}

export interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  description: string
  progress: number
  lessons: number
  completedLessons: number
  icon: string
  modules?: Module[]
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<View>("landing")
  const [authModal, setAuthModal] = useState<AuthModalType>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState<Record<string, string[]>>({})

  const courses: Course[] = [
    {
      id: "arithmetic",
      title: "Aritmética",
      description: "Números reales, razones y proporciones, lógica.",
      progress: 0,
      lessons: 18,
      completedLessons: 0,
      icon: "calculator",
      modules: [
        {
          id: "m1",
          title: "Lógica Proposicional",
          lessons: [
            { id: "v1", title: "Introducción a la Lógica", duration: "10:30", completed: false },
            { id: "v2", title: "Tablas de Verdad", duration: "15:45", completed: false },
            { id: "v3", title: "Leyes Lógicas", duration: "12:20", completed: false },
            { id: "v4", title: "Circuitos Lógicos", duration: "20:10", completed: false },
          ]
        },
        {
          id: "m2",
          title: "Teoría de Conjuntos",
          lessons: [
            { id: "v5", title: "Definición y Determinación", duration: "18:30", completed: false },
            { id: "v6", title: "Relaciones entre Conjuntos", duration: "22:15", completed: false },
            { id: "v7", title: "Operaciones con Conjuntos", duration: "25:00", completed: false },
          ]
        },
        {
          id: "m3",
          title: "Sistemas de Numeración",
          lessons: [
            { id: "v8", title: "Principios Fundamentales", duration: "14:50", completed: false },
            { id: "v9", title: "Cambios de Base", duration: "19:30", completed: false },
          ]
        }
      ]
    },
    {
      id: "algebra",
      title: "Álgebra",
      description: "Polinomios, ecuaciones, funciones.",
      progress: 0,
      lessons: 24,
      completedLessons: 0,
      icon: "calculator",
    },
    {
      id: "geometry",
      title: "Geometría",
      description: "Triángulos, polígonos, circunferencias.",
      progress: 0,
      lessons: 30,
      completedLessons: 0,
      icon: "flask",
    },
  ]

  const handleLogin = (email: string, _password: string) => {
    setIsLoggedIn(true)
    const isAdmin = email === "admin@albertmath.com"
    setUser({
      name: isAdmin ? "Admin" : "Adrian",
      email,
      role: isAdmin ? "admin" : "student"
    })
    setAuthModal(null)
    setCurrentView("dashboard")
  }

  const handleRegister = (name: string, email: string, _password: string) => {
    setIsLoggedIn(true)
    setUser({ name, email, role: "student" })
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

  const handleVideoWatch = (courseId: string, videoId: string) => {
    setWatchedVideos(prev => {
      const courseWatched = prev[courseId] || []
      if (courseWatched.includes(videoId)) return prev
      return {
        ...prev,
        [courseId]: [...courseWatched, videoId]
      }
    })
  }

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {((!isLoggedIn || currentView === "landing") && !authModal) && (
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          onLoginClick={() => setAuthModal("login")}
          onRegisterClick={() => setAuthModal("register")}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          currentView={currentView}
        />
      )}

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
            onLogout={handleLogout}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {currentView === "classroom" && selectedCourse && (
          <VirtualClassroom
            course={selectedCourse}
            user={user}
            onBack={() => setCurrentView("dashboard")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            watchedVideos={watchedVideos[selectedCourse.id] || []}
            onVideoWatch={(videoId) => handleVideoWatch(selectedCourse.id, videoId)}
            userRole={user?.role || "student"}
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
