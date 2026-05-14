"use client"

import {
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  FlaskConical,
  GraduationCap,
  Menu,
  PlayCircle,
  Trophy,
  Star,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { View, User, Course } from "@/app/page"

interface DashboardProps {
  user: User | null
  courses: Course[]
  onCourseSelect: (course: Course) => void
  onNavigate: (view: View) => void
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const courseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  calculator: Calculator,
  flask: FlaskConical,
  book: BookOpen,
}

export function Dashboard({
  user,
  courses,
  onCourseSelect,
  onNavigate,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
}: DashboardProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar
        currentView="dashboard"
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#F8FAFC]">
        {/* Integrated Top Header */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-secondary/5 bg-white/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:block group">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Buscar recursos, temas..."
                className="h-9 w-72 rounded-xl bg-secondary/5 pl-10 pr-4 text-xs font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none border border-transparent focus:border-primary/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-xl p-2 text-secondary/40 hover:bg-secondary/5 hover:text-primary transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary border border-white" />
            </button>

            <div className="h-6 w-[1px] bg-secondary/10 hidden md:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-xl p-1 pr-2 transition-all hover:bg-secondary/5 group">
                  <Avatar className="h-8 w-8 border border-primary/20 transition-transform group-hover:scale-105">
                    <AvatarFallback className="bg-primary text-white text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="text-[11px] font-bold text-secondary leading-none">{user?.name || "Adrian"}</p>
                    <p className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-primary/60">Estudiante</p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-secondary/20 hidden md:block" />
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
          {/* Welcome Card - Refined */}
          <div className="mb-8 relative overflow-hidden bg-white p-6 md:p-8 rounded-3xl border border-secondary/5 shadow-lg shadow-secondary/5">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-xl shadow-primary/20 shrink-0">
                  <GraduationCap className="h-10 w-10" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
                      ¡Hola, {user?.name?.split(' ')[0] || "Adrian"}!
                    </h1>
                    <span className="text-3xl animate-bounce">👋</span>
                  </div>
                  <p className="text-base font-medium text-secondary/60">
                    Es un excelente día para <span className="text-primary font-bold">dominar las matemáticas</span>.
                  </p>
                </div>
              </div>
              <div className="bg-secondary/5 p-5 rounded-2xl border border-secondary/5 flex flex-col items-end">
                <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest mb-2 text-right">Tu actividad hoy</p>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-xl font-black text-secondary">85%</p>
                    <p className="text-[9px] font-bold text-primary uppercase">Asistencia</p>
                  </div>
                  <div className="h-8 w-[1px] bg-secondary/10" />
                  <div className="text-right">
                    <p className="text-xl font-black text-secondary">12</p>
                    <p className="text-[9px] font-bold text-primary uppercase">Simulacros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cronograma Section */}
              <Card className="overflow-hidden border-none shadow-lg shadow-secondary/5 rounded-3xl bg-white">
                <CardHeader className="bg-primary/5 py-6 px-8 flex flex-row items-center justify-between border-b border-secondary/5">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-secondary">Cronograma <span className="text-primary font-semibold">— Lunes</span></CardTitle>
                    <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-wider">Sigue tu ritmo de estudio diario</p>
                  </div>
                  <Calendar className="h-6 w-6 text-primary/40" />
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-5">
                    {[
                      { time: "03:45 PM", subject: "Recetas para el Alma" },
                      { time: "04:00 PM", subject: "Inglés" },
                      { time: "05:00 PM", subject: "Geografía" },
                      { time: "06:00 PM", subject: "Literatura" },
                      { time: "07:00 PM", subject: "Literatura" },
                      { time: "08:00 PM", subject: "Geometría" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <Clock className="h-3.5 w-3.5 text-primary group-hover:scale-125 transition-transform" />
                          <span className="text-xs font-bold text-secondary">{item.time}</span>
                        </div>
                        <div className="h-[1px] flex-1 bg-secondary/10 group-hover:bg-primary/20 transition-colors" />
                        <span className="text-xs font-semibold text-secondary/70 group-hover:text-primary transition-colors cursor-pointer">{item.subject}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Banners Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-[2/1] rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-white shadow-lg relative overflow-hidden group p-6 flex flex-col justify-end cursor-pointer">
                  <div className="absolute top-0 right-0 p-6">
                    <Trophy className="h-12 w-12 text-primary/10 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-black text-secondary leading-none mb-1.5">SIMULACRO <span className="text-primary italic">FIN DE CICLO</span></h3>
                  <p className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest">Verano 2026</p>
                </div>
                
                <div className="aspect-[2/1] rounded-3xl bg-gradient-to-br from-[#22c55e]/15 to-[#22c55e]/5 border-2 border-white shadow-lg relative overflow-hidden group p-6 flex flex-col justify-end cursor-pointer">
                  <div className="absolute top-0 right-0 p-6">
                    <Star className="h-12 w-12 text-[#22c55e]/10 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-black text-secondary leading-none mb-1.5">LAS <span className="text-[#22c55e] italic">FIJAS</span></h3>
                  <p className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest">De Beca 18</p>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Stats & Quick Access */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-secondary tracking-tight">Mis Cursos</h2>
              <div className="grid gap-2">
                {courses.map((course) => {
                  const IconComponent = courseIcons[course.icon] || BookOpen
                  return (
                    <Card
                      key={course.id}
                      className="group cursor-pointer border border-transparent bg-white rounded-xl shadow-sm hover:shadow-md hover:border-primary/5 transition-all active:scale-[0.98] p-3"
                      onClick={() => onCourseSelect(course)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[11px] text-secondary truncate">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1 bg-secondary/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                            <span className="text-[8px] font-bold text-primary">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Progress Summary Card */}
              <Card className="rounded-3xl bg-secondary p-6 text-white relative overflow-hidden shadow-lg shadow-secondary/20">
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/5 rounded-full" />
                <div className="relative z-10 space-y-5">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">Progreso Total</p>
                    <p className="text-3xl font-black italic">62% <span className="text-primary font-bold not-italic text-2xl">Completado</span></p>
                  </div>
                  <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-[10px] transition-all">Continuar Estudiando</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
