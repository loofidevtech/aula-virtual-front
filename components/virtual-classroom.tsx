"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Menu,
  PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import type { View, Course } from "@/app/page"

interface VirtualClassroomProps {
  course: Course
  onBack: () => void
  onNavigate: (view: View) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

interface Material {
  id: string
  title: string
  type: string
  size: string
}

export function VirtualClassroom({
  course,
  onBack,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
}: VirtualClassroomProps) {
  const [currentLesson, setCurrentLesson] = useState(0)

  const lessons: Lesson[] = [
    { id: "1", title: "Introducción al curso", duration: "15:30", completed: true },
    { id: "2", title: "Conceptos fundamentales", duration: "22:45", completed: true },
    { id: "3", title: "Ejercicios básicos", duration: "18:20", completed: true },
    { id: "4", title: "Problemas intermedios", duration: "25:10", completed: false },
    { id: "5", title: "Aplicaciones prácticas", duration: "20:00", completed: false },
    { id: "6", title: "Repaso general", duration: "12:30", completed: false },
  ]

  const materials: Material[] = [
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
          <h1 className="truncate font-semibold">{course.title}</h1>
        </div>

        <div className="p-4 lg:p-8">
          {/* Back Button and Title */}
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold md:text-2xl">{course.title}</h1>
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
            </div>
          </div>

          {/* Video Player */}
          <Card className="mb-6 overflow-hidden border-border bg-card">
            <div className="aspect-video w-full bg-black">
              <div className="flex h-full items-center justify-center">
                <button className="group flex flex-col items-center gap-3 transition-transform hover:scale-105">
                  <div className="rounded-full bg-primary/90 p-6">
                    <PlayCircle className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {lessons[currentLesson]?.title || "Selecciona una clase"}
                  </span>
                </button>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="content">Contenido del Curso</TabsTrigger>
              <TabsTrigger value="materials">Material de Clase</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Temario</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border">
                    {lessons.map((lesson, index) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => setCurrentLesson(index)}
                          className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-secondary/50 ${
                            currentLesson === index ? "bg-secondary" : ""
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              lesson.completed
                                ? "bg-chart-2/20 text-chart-2"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`truncate font-medium ${
                                currentLesson === index
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {lesson.title}
                            </p>
                          </div>
                          <span className="shrink-0 text-sm text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
    </div>
  )
}
