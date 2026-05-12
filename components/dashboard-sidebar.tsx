"use client"

import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  Star,
  FileQuestion,
  BookMarked,
  X,
} from "lucide-react"
import type { View } from "@/app/page"

interface DashboardSidebarProps {
  currentView: View
  onNavigate: (view: View) => void
  isOpen: boolean
  onClose: () => void
}

import Image from "next/image"

export function DashboardSidebar({
  currentView,
  onNavigate,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" as View },
    { icon: Calendar, label: "Cronograma", view: "dashboard" as View },
    { icon: ClipboardList, label: "Simulacros", view: "exam" as View },
    { icon: Users, label: "Aulas", view: "dashboard" as View },
    { icon: Star, label: "Empoderarte", view: "dashboard" as View },
    { icon: FileQuestion, label: "Test vocacional", view: "dashboard" as View },
    { icon: BookMarked, label: "Cursos teóricos", view: "dashboard" as View },
  ]

  const courseItems = [
    "Aritmética", "Álgebra", "Trigonometría", "Geometría", "Razonamiento Matemático",
    "Física", "Química", "Anatomía", "Biología",
    "Redacción", "Aptitud Lectora", "Literatura", "Lenguaje"
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-sidebar-accent lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sidebar Header */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 px-6 gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/20 p-2">
              <Image
                src="/logo_principal.png"
                alt="Logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold tracking-tight text-sidebar-foreground">
              Albert Math <span className="text-primary italic">Academy</span>
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
              VIRTUAL CAMPUS
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-4 py-6 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive =
              item.view === currentView ||
              (item.label === "Dashboard" && currentView === "dashboard")
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 relative group ${isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground/40 hover:bg-white/5 hover:text-sidebar-foreground"
                  }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-sidebar-foreground/20 group-hover:text-primary transition-colors"}`} />
                {item.label}
                {isActive && <div className="absolute right-3 h-1 w-1 rounded-full bg-white animate-pulse" />}
              </button>
            )
          })}

          <div className="mt-8 mb-3 px-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/20">Cursos</p>
            <div className="h-[1px] flex-1 ml-4 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 gap-1 px-1">
            {courseItems.slice(0, 8).map((course) => (
              <button
                key={course}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-[10px] font-semibold text-sidebar-foreground/40 hover:bg-white/5 hover:text-primary transition-all group"
              >
                <div className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                <span className="truncate">{course}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Progress Card */}
        <div className="p-4">
          <div className="rounded-xl bg-white/5 border border-white/5 p-4 backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-wider text-sidebar-foreground/40 mb-3">Progreso General</p>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[62%] rounded-full bg-sidebar-primary shadow-[0_0_10px_rgba(217,92,20,0.3)]" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[9px] font-bold text-sidebar-foreground/50">62% COMPLETADO</p>
              <div className="h-4 w-4 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-sidebar-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
