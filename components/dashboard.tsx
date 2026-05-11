"use client"

import {
  BookOpen,
  Calculator,
  FlaskConical,
  Menu,
  PlayCircle,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import type { View, User, Course } from "@/app/page"

interface DashboardProps {
  user: User | null
  courses: Course[]
  onCourseSelect: (course: Course) => void
  onNavigate: (view: View) => void
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
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="flex items-center gap-4 border-b border-border p-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Dashboard</h1>
        </div>

        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold md:text-3xl">
              ¡Hola, {user?.name || "Estudiante"}!
            </h1>
            <p className="text-muted-foreground">
              Continúa donde lo dejaste y alcanza tus metas.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Cursos activos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                  <PlayCircle className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">44</p>
                  <p className="text-sm text-muted-foreground">
                    Clases completadas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                  <Trophy className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">
                    Simulacros rendidos
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
                  <Calculator className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">
                    Promedio general
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Mis Cursos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                const IconComponent = courseIcons[course.icon] || BookOpen
                return (
                  <Card
                    key={course.id}
                    className="group cursor-pointer border-border bg-card transition-colors hover:border-primary/50"
                    onClick={() => onCourseSelect(course)}
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons} de {course.lessons} clases
                        </span>
                        <Button size="sm" variant="secondary">
                          Continuar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
