"use client"

import { useState } from "react"
import { GraduationCap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AuthModalType } from "@/app/page"

interface AuthModalProps {
  type: AuthModalType
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onRegister: (name: string, email: string, password: string) => void
  onSwitchToRegister: () => void
  onSwitchToLogin: () => void
}

export function AuthModal({
  type,
  onClose,
  onLogin,
  onRegister,
  onSwitchToRegister,
  onSwitchToLogin,
}: AuthModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!type) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === "login") {
      onLogin(email, password)
    } else {
      onRegister(name, email, password)
    }
    // Reset form
    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">
            LoofiDev <span className="text-primary">Academy</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold">
          {type === "login" ? "Bienvenido de vuelta" : "Crear cuenta"}
        </h2>
        <p className="mb-6 text-center text-muted-foreground">
          {type === "login"
            ? "Ingresa tus credenciales para continuar"
            : "Regístrate para acceder a todo el contenido"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            {type === "login" ? "Entrar" : "Crear cuenta"}
          </Button>
        </form>

        {/* Switch Auth Type */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {type === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button
                onClick={onSwitchToRegister}
                className="font-medium text-primary hover:underline"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={onSwitchToLogin}
                className="font-medium text-primary hover:underline"
              >
                Ingresar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
