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
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar({
  isLoggedIn,
  user,
  onLogout,
}: Omit<NavbarProps, "onLoginClick" | "onRegisterClick" | "onNavigate" | "currentView">) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Practica con Albert", path: "/practica-con-albert" },
  ]

  return (
    <header
      className={`sticky top-0 z-[100] w-full flex items-center transition-all duration-300 ${isScrolled
        ? "h-24 bg-card/95 backdrop-blur-xl shadow-2xl border-b border-border/50"
        : "h-32 bg-card border-b border-white/5"
        }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="relative transition-all duration-500 hover:scale-105 active:scale-95 drop-shadow-[0_0_30px_rgba(240,118,41,0.2)]"
        >
          <Image
            src="/logo_principal.png"
            alt="LoofiDev Academy Logo"
            width={800}
            height={250}
            className={`h-auto object-contain transition-all duration-500 ${isScrolled
              ? "w-48 md:w-56"
              : "w-64 md:w-80"
              }`}
            priority
          />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`group relative px-2 py-2 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 ${pathname === item.path
                ? "text-primary"
                : "text-foreground/80 hover:text-white"
                }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className={`absolute -bottom-1 left-0 h-1 w-full bg-primary transition-all duration-300 ${pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
            </Link>
          ))}
        </nav>

        {/* Right Section: Contact & Auth */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex flex-col items-end gap-1">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest">Soporte 24/7</span>
             <span className="text-sm font-black text-foreground">+51 992 350 023</span>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="hidden text-xs font-black uppercase tracking-widest text-foreground/70 hover:text-white transition-colors sm:inline-flex"
                >
                  Ingresar
                </Link>
                <Button
                  asChild
                  className="h-14 rounded-full bg-primary px-10 font-black text-white shadow-[0_10px_30px_rgba(240,118,41,0.3)] hover:bg-primary/90 hover:scale-105 hover:shadow-primary/40 active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  <Link href="/registro">Registrarte</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-14 w-14 rounded-full border-2 border-primary/20 hover:bg-primary/5 transition-all p-0 overflow-hidden"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="bg-primary text-primary-foreground font-black text-xl">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-3xl p-3 bg-card shadow-3xl border border-border mt-4" align="end">
                  <div className="flex flex-col space-y-1 p-4 bg-muted rounded-2xl mb-2">
                    <p className="text-base font-black text-foreground leading-none">{user?.name}</p>
                    <p className="text-xs font-medium leading-none text-muted-foreground pt-2">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50 my-2" />
                  <DropdownMenuItem asChild className="rounded-xl font-bold text-foreground focus:bg-primary focus:text-white transition-all cursor-pointer py-4 px-4">
                    <Link href="/dashboard">
                      <User className="mr-3 h-5 w-5" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50 my-2" />
                  <DropdownMenuItem onClick={onLogout} className="rounded-xl font-bold text-destructive focus:bg-destructive focus:text-white transition-all cursor-pointer py-4 px-4">
                    <LogOut className="mr-3 h-5 w-5" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
