"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCourse, getLevel } from "@/lib/data/courses"
import { VirtualClassroom } from "@/components/virtual-classroom"
import { freemiumService, UserProfile } from "@/lib/freemium-service"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ModuleClassroomPage() {
  const params = useParams()
  const router = useRouter()
  
  const cursoId = params.cursoId as string
  const etapaId = params.etapaId as string
  const nivelId = params.nivelId as string
  const moduloId = params.moduloId as string

  const [user, setUser] = useState<UserProfile | null>(null)
  const [watchedVideos, setWatchedVideos] = useState<string[]>([])
  
  useEffect(() => {
    // Load current user and watched videos list on the client side
    setUser(freemiumService.getCurrentUser())
    setWatchedVideos(freemiumService.getWatchedVideos(cursoId))
  }, [cursoId])

  const courseData = getCourse(cursoId)
  const levelData = getLevel(cursoId, etapaId, nivelId)

  if (!courseData || !levelData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-black text-foreground">Curso o Nivel no encontrado</h2>
        <Button onClick={() => router.back()} variant="outline" className="rounded-2xl gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </Button>
      </div>
    )
  }

  // Find target module
  const currentModule = levelData.modules.find((m) => m.id === moduloId)
  if (!currentModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-black text-foreground">Módulo no encontrado</h2>
        <Button onClick={() => router.back()} variant="outline" className="rounded-2xl gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </Button>
      </div>
    )
  }

  // Clone modules of this level and populate each with 5 mock video lessons
  const classroomModules = levelData.modules.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: [
      { id: `${m.id}_v1`, title: `Clase 1: Introducción a ${m.title}`, duration: "15:40", completed: false },
      { id: `${m.id}_v2`, title: `Clase 2: Fundamentos y Teoremas de ${m.title}`, duration: "22:15", completed: false },
      { id: `${m.id}_v3`, title: `Clase 3: Ejercicios de Entrenamiento Nivel 1`, duration: "18:50", completed: false },
      { id: `${m.id}_v4`, title: `Clase 4: Problemas Selectivos de ${m.title} (Olimpiadas)`, duration: "29:10", completed: false },
      { id: `${m.id}_v5`, title: `Clase 5: Simulacro Avanzado Contrarreloj`, duration: "25:35", completed: false },
    ],
  }))

  const classroomCourse = {
    ...courseData,
    modules: classroomModules,
    progress: 0,
    lessons: classroomModules.reduce((acc, m) => acc + m.lessons.length, 0),
    completedLessons: 0,
    icon: "book",
  }

  const handleVideoWatch = (videoId: string) => {
    // Save view in local persistence
    const updated = freemiumService.trackVideoWatch(cursoId, videoId)
    setWatchedVideos(updated)
  }

  const handleBack = () => {
    router.push(`/dashboard/cursos/${cursoId}/etapas/${etapaId}/niveles/${nivelId}`)
  }

  const handleNavigate = (view: string) => {
    if (view === "dashboard") {
      router.push("/dashboard")
    } else {
      router.push(`/dashboard/cursos/${cursoId}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  // Map user profile to VirtualClassroom user prop structure
  const classroomUser = user ? { name: user.name, email: user.email || "" } : null

  return (
    <VirtualClassroom
      course={classroomCourse}
      user={classroomUser}
      onBack={handleBack}
      onNavigate={handleNavigate as any}
      onLogout={handleLogout}
      sidebarOpen={false}
      setSidebarOpen={() => {}}
      watchedVideos={watchedVideos}
      onVideoWatch={handleVideoWatch}
      userRole={(user?.role as any) || "student"}
      hideLayout={true}
    />
  )
}
