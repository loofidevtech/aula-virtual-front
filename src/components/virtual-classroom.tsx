"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Menu,
  PlayCircle,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
  BookOpen,
  Lock,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LockModal } from "@/components/lock-modal"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { adminService } from "@/lib/admin-service"
import { freemiumService } from "@/lib/freemium-service"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { View, Course as BaseCourse, User } from "@/app/page"

interface Lesson {
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

export interface Course extends BaseCourse {
  modules?: Module[]
}

interface VirtualClassroomProps {
  course: Course
  user: User | null
  onBack: () => void
  onNavigate: (view: View) => void
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  watchedVideos: string[]
  onVideoWatch: (videoId: string) => void
  userRole: "student" | "admin"
  hideLayout?: boolean
}

export function VirtualClassroom({
  course,
  user,
  onBack,
  onNavigate,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
  watchedVideos,
  onVideoWatch,
  userRole,
  hideLayout = false,
}: VirtualClassroomProps) {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(
    course.modules?.[0]?.lessons?.[0]?.id || null
  )
  const [isLockModalOpen, setIsLockModalOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedLockedLesson, setSelectedLockedLesson] = useState<Lesson | null>(null)
  
  const [localWatchedList, setLocalWatchedList] = useState<string[]>(watchedVideos)

  // First access animation states
  const [showWelcome, setShowWelcome] = useState(false)
  const [unlockingVideos, setUnlockingVideos] = useState<string[]>([])

  useEffect(() => {
    const list = freemiumService.getWatchedVideos(course.id)
    setLocalWatchedList(list)

    if (user?.email && course?.id) {
      adminService.isUserSubscribed(user.email, course.id).then(setIsSubscribed)
    }

    // Trigger first-time welcome and staggered unlocking of free videos
    const isFirstAccess = freemiumService.checkAndClearFirstAccess(course.id)
    if (isFirstAccess) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`first_access_running_${course.id}`, "true")
      }
      setShowWelcome(true)
      
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(false)
        
        // Fetch the first 3 lessons across modules to unlock them progressively
        const first3Free = course.modules?.[0]?.lessons.slice(0, 3).map(l => l.id) || []
        first3Free.forEach((id, idx) => {
          setTimeout(() => {
            setUnlockingVideos(prev => {
              const updated = [...prev, id]
              if (updated.length === first3Free.length && typeof window !== "undefined") {
                localStorage.removeItem(`first_access_running_${course.id}`)
              }
              return updated
            })
          }, (idx + 1) * 600) // Staggered reveal every 600ms
        })
      }, 2500)

      return () => clearTimeout(welcomeTimer)
    }
  }, [user?.email, course?.id])

  // Flatten lessons from modules
  const allLessons: Lesson[] = course.modules 
    ? course.modules.flatMap(m => m.lessons)
    : []

  const currentLesson = allLessons.find(l => l.id === currentLessonId)

  // Centralized access permission checker
  const isVideoLocked = (lessonId: string) => {
    const check = freemiumService.checkVideoAccess(course.id, lessonId, userRole)
    return !check.hasAccess
  }

  // Determines whether a video is visually locked (e.g. during staggered reveal animation)
  const isVideoVisuallyLocked = (lessonId: string) => {
    // If it's a premium lesson (4th or 5th), it's locked
    if (isVideoLocked(lessonId)) return true
    
    // Staggered unlocking of the first 3 free videos
    if (typeof window !== "undefined" && localStorage.getItem(`first_access_running_${course.id}`) === "true") {
      const first3Free = course.modules?.[0]?.lessons.slice(0, 3).map(l => l.id) || []
      if (first3Free.includes(lessonId) && !unlockingVideos.includes(lessonId)) {
        return true
      }
    }
    return false
  }

  const handleLessonClick = (lesson: Lesson) => {
    if (isVideoLocked(lesson.id)) {
      setSelectedLockedLesson(lesson)
      setIsLockModalOpen(true)
    } else {
      setCurrentLessonId(lesson.id)
      const updatedList = freemiumService.trackVideoWatch(course.id, lesson.id)
      setLocalWatchedList(updatedList)
      onVideoWatch(lesson.id)
    }
  }

  const materials = [
    { id: "1", title: "Guía de estudio - Unidad 1", type: "PDF", size: "2.4 MB" },
    { id: "2", title: "Ejercicios resueltos", type: "PDF", size: "1.8 MB" },
    { id: "3", title: "Fórmulas y teoremas", type: "PDF", size: "850 KB" },
    { id: "4", title: "Problemas de práctica", type: "PDF", size: "3.2 MB" },
  ]

  const activeModule = course.modules?.find(m =>
    m.lessons.some(l => l.id === (selectedLockedLesson?.id || currentLessonId))
  )

  const classroomContent = (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Back Button and Title */}
      <div className="mb-6 flex items-center gap-4 animate-in fade-in slide-in-from-left duration-500">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 rounded-xl bg-white shadow-sm hover:shadow-md transition-all text-secondary shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary tracking-tight">{course.title}</h1>
          <p className="text-xs font-medium text-secondary/60 uppercase tracking-widest mt-0.5">
            {course.description}
          </p>
        </div>
      </div>

      {/* Video Player */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg rounded-3xl">
        <div className="aspect-video w-full bg-slate-900 relative">
          <div className="absolute inset-0 flex h-full items-center justify-center">
            <button 
              className="group flex flex-col items-center gap-4 transition-all hover:scale-105 active:scale-95"
              onClick={() => currentLesson && handleLessonClick(currentLesson)}
            >
              <div className="rounded-full bg-primary p-6 shadow-xl shadow-primary/40 group-hover:bg-primary/90">
                <PlayCircle className="h-12 w-12 text-white fill-current" />
              </div>
              <div className="text-center">
                <span className="block text-lg font-bold text-white mb-1">
                  {currentLesson?.title || "Selecciona una clase"}
                </span>
                <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                  Albert Math Academy
                </span>
              </div>
            </button>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="mb-6 h-auto p-1 bg-white border border-secondary/5 shadow-sm rounded-xl inline-flex w-full sm:w-auto">
          <TabsTrigger value="modules" className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white">
            Módulos
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white">
            Materiales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-6">
            {course.modules?.map((module, index) => (
              <Card key={module.id} className="overflow-hidden border-none shadow-md shadow-secondary/5 rounded-3xl bg-white transition-all hover:shadow-lg">
                <CardHeader className="bg-secondary/5 py-5 px-6 border-b border-secondary/5 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-secondary shadow-sm font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg font-bold text-secondary">{module.title}</CardTitle>
                  </div>
                  <span className="text-xs font-bold text-secondary/40 uppercase tracking-widest">{module.lessons.length} Temas</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-secondary/5">
                    {module.lessons.map((lesson) => {
                      const isPremiumLocked = isVideoLocked(lesson.id)
                      const isVisuallyLocked = isVideoVisuallyLocked(lesson.id)
                      const active = currentLesson?.id === lesson.id
                      
                      return (
                        <div
                          key={lesson.id}
                          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 transition-all duration-300 cursor-pointer border-l-4 ${
                            isVisuallyLocked 
                              ? "bg-slate-50/50 hover:bg-amber-50/20 border-l-transparent hover:border-l-amber-500" 
                              : active 
                                ? "bg-primary/5 border-l-primary"
                                : "hover:bg-primary/5 border-l-transparent"
                          }`}
                          onClick={() => handleLessonClick(lesson)}
                        >
                          <div className="flex items-center gap-4">
                            {/* Unlock lock animation badge */}
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                              lesson.completed 
                                ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]" 
                                : isVisuallyLocked
                                  ? "border-amber-500/20 bg-amber-500/5 text-amber-500 shadow-inner transform rotate-180"
                                  : active
                                    ? "border-primary bg-primary text-white scale-115 rotate-0"
                                    : "border-primary/20 bg-primary/10 text-primary scale-100 rotate-0"
                            }`}>
                              {lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : isVisuallyLocked ? (
                                <Lock className="h-4.5 w-4.5" />
                              ) : (
                                <PlayCircle className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className={`font-semibold text-sm transition-all duration-300 ${isVisuallyLocked ? "text-slate-500 font-medium" : "text-secondary font-bold"}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{lesson.duration}</span>
                                {isPremiumLocked ? (
                                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200/50 animate-pulse">Premium</span>
                                ) : (
                                  !isVisuallyLocked && (
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200/50">Gratuito</span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant={isPremiumLocked ? "outline" : "default"} 
                            size="sm" 
                            className={`rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 ${
                              isPremiumLocked 
                                ? "border-amber-500/30 bg-amber-500/5 text-amber-600 hover:bg-amber-500 hover:text-white" 
                                : "bg-primary hover:bg-primary/90 text-white hover:scale-105"
                            }`}
                          >
                            {isPremiumLocked ? "Desbloquear ⚡" : lesson.completed ? "Repasar" : "Ver Clase"}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Archivos de descarga</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {materials.map((material) => (
                  <li key={material.id}>
                    <div className="flex items-center justify-between gap-4 px-6 py-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                          <FileText className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.type} • {material.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0 gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Descargar</span>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lock Modal */}
      <LockModal 
        isOpen={isLockModalOpen} 
        onClose={() => {
          setIsLockModalOpen(false)
          setSelectedLockedLesson(null)
        }} 
        courseName={course.title}
        userName={user?.name}
        userEmail={user?.email}
        moduleName={activeModule?.title || "Módulo del Curso"}
        videoTitle={selectedLockedLesson?.title || currentLesson?.title || "Video Premium"}
      />
    </div>
  )

  if (hideLayout) {
    return (
      <>
        {classroomContent}
        
        {/* First access welcome overlay */}
        {showWelcome && (
          <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-md p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
              
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto shadow-xl shadow-primary/10 animate-bounce">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                ¡Bienvenido al Aula Virtual! 🎓
              </h2>
              <p className="text-xs font-semibold text-slate-400">
                Iniciando tu plan de estudio olímpico para <span className="text-primary font-black">{course.title}</span>. Preparando clases gratuitas...
              </p>
              <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-primary to-amber-500 w-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar
        currentView="classroom"
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#F8FAFC]">
        {/* Integrated Top Header */}
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-secondary/5 bg-white/80 px-4 backdrop-blur-md lg:px-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2 text-sm font-bold text-secondary/40">
              <BookOpen className="h-4 w-4" />
              <span>Cursos</span>
              <span>/</span>
              <span className="text-primary">{course.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative rounded-xl p-2 text-secondary/60 hover:bg-secondary/5 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary border-2 border-white" />
            </button>

            <div className="h-8 w-[1px] bg-secondary/10 hidden md:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-2xl p-1 pr-3 transition-all hover:bg-secondary/5">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-black text-secondary leading-none">{user?.name || "Adrian"}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-primary">Estudiante</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-secondary/40 hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-2xl border-none mt-2" align="end">
                <DropdownMenuItem onClick={() => onNavigate("dashboard")} className="rounded-xl font-bold text-secondary focus:bg-primary focus:text-white transition-colors cursor-pointer py-3">
                  <UserIcon className="mr-3 h-5 w-5" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-secondary/5" />
                <DropdownMenuItem onClick={onLogout} className="rounded-xl font-bold text-destructive focus:bg-destructive focus:text-white transition-colors cursor-pointer py-3">
                  <LogOut className="mr-3 h-5 w-5" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {classroomContent}
      </div>
    </div>
  )
}
