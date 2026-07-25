"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  LogOut,
  Gamepad2,
  Video,
  FileText,
  GraduationCap
} from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"

function SidebarContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTab = searchParams.get("tab") || (pathname === "/admin/dashboard" ? "users" : "")

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", tab: "users", href: "/admin/dashboard?tab=users" },
    { id: "users", icon: Users, label: "Usuarios y Suscripciones", tab: "users", href: "/admin/dashboard?tab=users" },
    { id: "solucionarios", icon: GraduationCap, label: "Gestión de Solucionarios", tab: "solucionarios", href: "/admin/dashboard?tab=solucionarios" },
    { id: "courses", icon: BookOpen, label: "Gestión de Cursos", tab: "courses", href: "/admin/dashboard?tab=courses" },
    { id: "materials", icon: FileText, label: "Gestionar Material PDF", tab: "materials", href: "/admin/dashboard?tab=materials" },
    { id: "videos", icon: Video, label: "Gestión de Videos", tab: "videos", href: "/admin/dashboard?tab=videos" },
    { id: "games", icon: Gamepad2, label: "Juegos Interactivos", tab: "games", href: "/admin/dashboard?tab=games" },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("adminUser")
    localStorage.removeItem("currentUser")
    router.push("/admin/login")
  }

  const handleNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-border/50 bg-card text-card-foreground flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6 px-6 border-b border-border/50">
        <div className="relative group cursor-pointer mb-3">
          <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-background shadow-xl shadow-black/20 p-2 border border-border/50">
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
          <p className="text-sm font-bold tracking-tight text-foreground">
            Panel <span className="text-primary italic">Admin</span>
          </p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-1">
            Gestión Total
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 px-2">Menú Principal</p>
        
        {menuItems.map((item) => {
          const isActive = currentTab === item.tab || (item.id === "dashboard" && currentTab === "users")
          
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavigate(e, item.href)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}`} />
              {item.label}
              {isActive && <div className="absolute right-3 h-4 w-1 rounded-full bg-primary" />}
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}

export function AdminSidebar() {
  return (
    <Suspense fallback={<div className="fixed left-0 top-0 h-screen w-[260px] bg-card border-r border-border/50" />}>
      <SidebarContent />
    </Suspense>
  )
}
