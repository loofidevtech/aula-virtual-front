"use client"

import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Settings,
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
    { icon: BookOpen, label: "Mis Cursos", view: "dashboard" as View },
    { icon: ClipboardList, label: "Simulacros", view: "exam" as View },
    { icon: Calendar, label: "Cronograma", view: "dashboard" as View },
    { icon: Settings, label: "Configuración", view: "dashboard" as View },
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
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:sticky lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
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
        <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5 p-1">
            <Image
              src="/logo_principal.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold tracking-tight text-sidebar-foreground">
              Panel Academy
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
              LoofiDev Academy
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-3">
          {menuItems.map((item) => {
            const isActive =
              item.view === currentView ||
              (item.label === "Mis Cursos" && currentView === "classroom")
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Progress Card */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-4">
            <p className="text-sm font-medium text-sidebar-foreground">
              Progreso General
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-sidebar-border">
              <div className="h-full w-[62%] rounded-full bg-sidebar-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              62% del curso completado
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
