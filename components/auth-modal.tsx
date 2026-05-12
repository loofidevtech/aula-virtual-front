"use client"

import { useState } from "react"
import { X, Mail, Lock, User as UserIcon, Phone, GraduationCap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AuthModalType } from "@/app/page"
import Image from "next/image"

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
    <div className="fixed inset-0 z-[1000] flex bg-white overflow-hidden">
      {/* Background/Visual Side (Hidden on mobile) */}
      <div className="relative hidden lg:flex lg:w-[55%] xl:w-[60%] flex-col justify-between p-12 bg-[#0F172A] overflow-hidden">
        {/* Abstract Background Image */}
        <Image
          src="/auth_background_premium_1778564456138.png"
          alt="Auth Background"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
        />
        
        <div className="relative z-10">
          <Image
            src="/logo_principal.png"
            alt="Logo"
            width={180}
            height={50}
            className="h-10 w-auto brightness-0 invert"
          />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Impulsa tu <br />
            <span className="text-primary italic">potencial</span> académico.
          </h1>
          <p className="text-lg text-white/60 font-medium leading-relaxed">
            Únete a la plataforma de preparación universitaria más avanzada y asegura tu futuro hoy mismo.
          </p>
          
          <div className="flex gap-8 pt-8">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">+500</p>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Alumnos</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Ingresantes</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/30 text-xs font-bold uppercase tracking-widest">
          <span>Lima, Perú</span>
          <div className="h-1 w-1 rounded-full bg-white/20" />
          <span>© 2026 Albert Math Academy</span>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md text-secondary hover:text-primary transition-all z-20 active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
          <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right duration-700">
            {/* Header for Mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <Image src="/logo_principal.png" alt="Logo" width={140} height={40} className="h-8 w-auto" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
                {type === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
              </h2>
              <p className="text-secondary/50 font-medium">
                {type === "login" 
                  ? "Ingresa tus credenciales para acceder a tu campus virtual." 
                  : "Regístrate para comenzar tu camino al éxito universitario."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === "register" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Nombres"
                      className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Apellidos"
                      className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {type === "register" && (
                <>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="WhatsApp / Celular"
                      className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Nombre del colegio"
                      className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="Contraseña"
                  className="h-12 pl-12 rounded-2xl bg-white border-transparent shadow-sm focus:border-primary/20 focus:ring-primary/10 transition-all text-sm font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {type === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-bold text-primary hover:underline">¿Olvidaste tu contraseña?</button>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-95 group"
              >
                {type === "login" ? "Iniciar Sesión" : "Crear mi cuenta"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="pt-8 border-t border-secondary/5 flex flex-col items-center gap-4">
              <p className="text-sm font-medium text-secondary/40">
                {type === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
              </p>
              <Button 
                variant="outline" 
                onClick={type === "login" ? onSwitchToRegister : onSwitchToLogin}
                className="w-full h-12 rounded-2xl border-2 border-secondary/5 bg-white text-secondary font-bold text-sm hover:bg-secondary hover:text-white transition-all active:scale-95"
              >
                {type === "login" ? "Regístrate ahora" : "Ingresa con tu cuenta"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
