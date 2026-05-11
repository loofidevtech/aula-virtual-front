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
  const navItems = [
    { label: "Inicio", view: "landing" as View },
    { label: "Pruebas", view: "exam" as View },
    { label: "Documentos", view: "dashboard" as View },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate(isLoggedIn ? "dashboard" : "landing")}
          className="flex items-center transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Image
            src="/logo_principal.jpg"
            alt="LoofiDev Academy Logo"
            width={220}
            height={56}
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </button>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                if (item.view === "exam" && !isLoggedIn) {
                  onLoginClick()
                } else if (item.view === "dashboard" && !isLoggedIn) {
                  onLoginClick()
                } else {
                  onNavigate(item.view)
                }
              }}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentView === item.view
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                onClick={onLoginClick}
                className="hidden sm:inline-flex"
              >
                Ingresar
              </Button>
              <Button onClick={onRegisterClick}>Registrarte</Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
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
