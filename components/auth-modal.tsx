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

import Image from "next/image"

export function AuthModal({
  type,
  onClose,
  onLogin,
  onRegister,
  onSwitchToRegister,
  onSwitchToLogin,
}: AuthModalProps) {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [school, setSchool] = useState("")

  if (!type) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === "login") {
      onLogin(email, password)
    } else {
      onRegister(`${name} ${lastName}`, email, password)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto">
      {/* Header Academika Style */}
      <header className="flex h-16 w-full items-center justify-between bg-secondary px-4 md:px-8 shrink-0">
        <div className="flex items-center gap-4">
          <Image
            src="/logo_principal.png"
            alt="Logo"
            width={180}
            height={45}
            className="h-10 w-auto brightness-0 invert"
          />
          <nav className="hidden md:flex gap-6 ml-8">
            <button onClick={onClose} className="text-sm font-bold text-white uppercase hover:text-primary transition-colors">Inicio</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 font-bold uppercase text-xs"
            onClick={type === "login" ? onSwitchToRegister : onSwitchToLogin}
          >
            {type === "login" ? "Registro" : "Ingresar"}
          </Button>
          <button onClick={onClose} className="text-white hover:text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Top Info Bar */}
      <div className="bg-[#f3f4f6] py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs text-secondary font-medium">
        <div className="flex items-center gap-2">
          <span className="text-primary">📍</span> Lima, Perú
        </div>
        <div className="flex gap-4">
          <span>Facebook</span>
          <span>Instagram</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Info */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-3xl md:text-5xl font-extrabold text-secondary leading-tight">
              {type === "login" 
                ? "Inicia sesión con tu cuenta de prueba para acceder a la plataforma." 
                : "Regístrate ahora y únete a nuestra comunidad de pruebas hoy mismo."}
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-secondary font-medium">Beneficio de prueba número uno</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-secondary font-medium">Acceso a datos de ejemplo ilimitados</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-secondary font-medium">Soporte técnico para usuarios beta</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-secondary font-medium">Actualizaciones de sistema frecuentes</p>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl border-4 border-gray-100 shadow-xl">
               <Image 
                src="/placeholder.jpg" 
                alt="Students" 
                fill 
                className="object-cover"
               />
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-700">
            <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 border-[12px] border-primary/5 rounded-full" />
              
              <h2 className="text-2xl md:text-3xl font-black text-secondary mb-8 leading-tight">
                Prepárate gratis para postular a la universidad.
              </h2>

              <Button 
                variant="secondary" 
                className="w-full mb-8 h-14 rounded-2xl bg-secondary text-white font-black text-lg hover:bg-secondary/90 transition-transform active:scale-95"
                onClick={type === "login" ? onSwitchToLogin : onSwitchToRegister}
              >
                {type === "login" ? "Ingresar" : "Crear un cuenta"}
              </Button>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === "register" && (
                  <>
                    <Input
                      placeholder="Nombres*"
                      className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Apellidos*"
                      className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </>
                )}
                
                <Input
                  type="email"
                  placeholder="Correo electrónico*"
                  className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {type === "register" && (
                  <>
                    <Input
                      placeholder="Celular*"
                      className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Nombre del colegio*"
                      className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      required
                    />
                  </>
                )}

                <Input
                  type="password"
                  placeholder="Contraseña*"
                  className="h-12 rounded-2xl bg-[#f9fafb] border-none px-6 focus-visible:ring-primary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 mt-4"
                >
                  {type === "login" ? "Iniciar sesión" : "Registrarte"}
                </Button>
              </form>

              <div className="mt-8 space-y-4 text-center">
                <p className="text-sm font-medium text-secondary">
                  {type === "login" ? "¿Aún no tienes una cuenta?" : "¿Ya tienes una cuenta?"} {" "}
                  <button 
                    onClick={type === "login" ? onSwitchToRegister : onSwitchToLogin}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    {type === "login" ? "Quiero registrarme" : "Quiero ingresar"}
                  </button>
                </p>
                {type === "login" && (
                  <p className="text-sm font-medium text-secondary">
                    Olvidé mi contraseña {" "}
                    <button className="text-blue-600 font-bold hover:underline">
                      Quiero recuperar contraseña
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

