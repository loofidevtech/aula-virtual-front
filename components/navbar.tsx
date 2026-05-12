"use client"

import { GraduationCap, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { View, User as UserType } from "@/app/page"

interface NavbarProps {
  isLoggedIn: boolean
  user: UserType | null
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
  onNavigate: (view: View) => void
  currentView: View
}

import { useState, useEffect } from "react"
import Image from "next/image"

export function Navbar({
  isLoggedIn,
  user,
  onLoginClick,
  onRegisterClick,
  onLogout,
  onNavigate,
  currentView,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Inicio", view: "landing" as View },
    { label: "Practica con Albert", view: "exam" as View },
  ]

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-500 flex items-center ${isScrolled
        ? "h-16 bg-white/95 backdrop-blur-xl shadow-lg border-b border-secondary/5"
        : "h-20 bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => onNavigate(isLoggedIn ? "dashboard" : "landing")}
          className="relative transition-all duration-300 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-left duration-700 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        >
          <Image
            src="/logo_principal.png"
            alt="LoofiDev Academy Logo"
            width={600}
            height={200}
            className={`h-auto object-contain transition-all duration-500 ${isScrolled
              ? "w-28 md:w-32 lg:w-36"
              : "w-36 md:w-44 lg:w-52"
              }`}
            priority
          />
        </button>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-2 md:flex animate-in fade-in slide-in-from-top duration-700 delay-150">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`group relative rounded-2xl px-6 py-3 text-sm font-black uppercase tracking-wider transition-all duration-300 overflow-hidden ${currentView === item.view
                ? "text-primary bg-primary/5"
                : "text-secondary hover:text-primary"
                }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className={`absolute bottom-0 left-0 h-1 w-full bg-primary transition-all duration-300 ${currentView === item.view ? "opacity-100" : "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100"
                }`} />
            </button>
          ))}
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right duration-700 delay-300">
          {!isLoggedIn ? (
            <>
              <button
                onClick={onLoginClick}
                className="hidden text-sm font-bold text-secondary hover:text-primary transition-colors sm:inline-flex lg:px-6"
              >
                Ingresar
              </button>
              <Button
                onClick={onRegisterClick}
                className="h-12 rounded-2xl bg-primary px-8 font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
              >
                Registrarte
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-2xl border-2 border-secondary/10 hover:bg-secondary/5 transition-all"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-2xl border-none mt-2" align="end">
                <div className="flex flex-col space-y-1 p-3 bg-secondary/5 rounded-xl mb-2">
                  <p className="text-sm font-black text-secondary leading-none">{user?.name}</p>
                  <p className="text-xs font-medium leading-none text-muted-foreground pt-1">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-secondary/5" />
                <DropdownMenuItem onClick={() => onNavigate("dashboard")} className="rounded-xl font-bold text-secondary focus:bg-primary focus:text-white transition-colors cursor-pointer py-3">
                  <User className="mr-3 h-5 w-5" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-secondary/5" />
                <DropdownMenuItem onClick={onLogout} className="rounded-xl font-bold text-destructive focus:bg-destructive focus:text-white transition-colors cursor-pointer py-3">
                  <LogOut className="mr-3 h-5 w-5" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
