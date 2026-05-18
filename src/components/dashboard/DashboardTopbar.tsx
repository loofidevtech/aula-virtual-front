// components/dashboard/DashboardTopbar.tsx
"use client"

import { useState } from "react"
import { Search, Bell, Crown, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DashboardSidebar } from "./DashboardSidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

import { LogOut, User as UserIcon, Settings } from "lucide-react"

interface DashboardTopbarProps {
  userName?: string
}

export function DashboardTopbar({ userName = "Estudiante" }: DashboardTopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    router.push("/login")
  }

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 z-10">
            <DashboardSidebar />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-[100] flex h-16 items-center justify-between gap-4 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 md:px-6 shrink-0">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar cursos, temas o retos..."
            className="h-10 rounded-2xl bg-muted border-none pl-10 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/30"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Premium badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1.5">
            <Crown className="h-4 w-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-black">Premium</span>
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-black">
              5
            </span>
          </button>

          {/* User avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2.5 cursor-pointer group outline-none">
                <Avatar className="h-10 w-10 border-2 border-primary/30 group-hover:border-primary transition-colors">
                  <AvatarFallback className="bg-primary text-white font-black text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-foreground font-bold text-sm leading-tight">
                    {userName.split(" ")[0]} C.
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-2xl border-border/50 mt-2" align="end">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mi Cuenta</p>
              </div>
              <DropdownMenuItem className="rounded-xl font-bold text-foreground focus:bg-primary focus:text-white transition-colors cursor-pointer py-2.5">
                <UserIcon className="mr-3 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl font-bold text-foreground focus:bg-primary focus:text-white transition-colors cursor-pointer py-2.5">
                <Settings className="mr-3 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 my-1" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="rounded-xl font-bold text-destructive focus:bg-destructive focus:text-white transition-colors cursor-pointer py-2.5"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}
