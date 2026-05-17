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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LockModal } from "@/components/lock-modal"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { adminService } from "@/lib/admin-service"
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
}

interface Material {
  id: string
  title: string
  type: string
  size: string
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
}: VirtualClassroomProps) {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(
    course.modules?.[0]?.lessons?.[0]?.id || null
  )
  const [isLockModalOpen, setIsLockModalOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Fetch subscription status
  useEffect(() => {
    if (user?.email && course?.id) {
      adminService.isUserSubscribed(user.email, course.id).then(setIsSubscribed)
    }
  }, [user?.email, course?.id])

  // Flatten lessons from modules or use course.lessons placeholder
  const allLessons: Lesson[] = course.modules 
    ? course.modules.flatMap(m => m.lessons)
    : []

  const currentLesson = allLessons.find(l => l.id === currentLessonId)

  const isVideoLocked = (lessonId: string) => {
    if (userRole === "admin") return false
    if (isSubscribed) return false // Premium unlock
    if (watchedVideos.includes(lessonId)) return false
    return watchedVideos.length >= 3 // Free tier limits to 3 videos
  }

  const handleLessonClick = (lessonId: string) => {
    if (isVideoLocked(lessonId)) {
      setIsLockModalOpen(true)
    } else {
      setCurrentLessonId(lessonId)
      onVideoWatch(lessonId)
    }
  }

  const materials = [
    { id: "1", title: "Guía de estudio - Unidad 1", type: "PDF", size: "2.4 MB" },
    { id: "2", title: "Ejercicios resueltos", type: "PDF", size: "1.8 MB" },
    { id: "3", title: "Fórmulas y teoremas", type: "PDF", size: "850 KB" },
    { id: "4", title: "Problemas de práctica", type: "PDF", size: "3.2 MB" },
  ]

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
                  onClick={() => currentLesson && onVideoWatch(currentLesson.id)}
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
                          const isLocked = isVideoLocked(lesson.id)
                          const active = currentLesson?.id === lesson.id
                          return (
                            <div
                              key={lesson.id}
                              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 transition-colors ${
                                isLocked 
                                  ? "bg-secondary/5 grayscale cursor-not-allowed" 
                                  : active 
                                    ? "bg-primary/5"
                                    : "hover:bg-primary/5 cursor-pointer"
                              }`}
                              onClick={() => !isLocked && handleLessonClick(lesson.id)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                                  lesson.completed 
                                    ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]" 
                                    : isLocked
                                      ? "border-secondary/20 bg-secondary/10 text-secondary/40"
                                      : active
                                        ? "border-primary bg-primary text-white"
                                        : "border-primary/20 bg-primary/10 text-primary"
                                }`}>
                                  {lesson.completed ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                  ) : isLocked ? (
                                    <Lock className="h-5 w-5" />
                                  ) : (
                                    <PlayCircle className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <p className={`font-semibold text-sm ${isLocked ? "text-secondary/50" : "text-secondary"}`}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{lesson.duration}</span>
                                    {isLocked && (
                                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">Premium</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                variant={isLocked ? "outline" : "default"} 
                                size="sm" 
                                className={`rounded-lg font-bold text-[10px] uppercase tracking-wider ${
                                  isLocked ? "border-secondary/20 text-secondary/40 pointer-events-none" : "bg-primary hover:bg-primary/90 text-white"
                                }`}
                              >
                                {isLocked ? "Bloqueado" : lesson.completed ? "Repasar" : "Ver Clase"}
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
        </div>
      </div>

      {/* Lock Modal */}
      <LockModal 
        isOpen={isLockModalOpen} 
        onClose={() => setIsLockModalOpen(false)} 
        courseName={course.title}
      />
    </div>
  )
}
