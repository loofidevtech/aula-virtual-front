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
  onRegister: (data: any) => void
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
  const [schoolType, setSchoolType] = useState("")
  const [grade, setGrade] = useState("")
  const [department, setDepartment] = useState("")
  const [district, setDistrict] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (!type) return null

  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass)
    const hasNumber = /[0-9]/.test(pass)
    const isLongEnough = pass.length >= 6
    return hasUpperCase && hasNumber && isLongEnough
  }

  const validatePhone = (num: string) => {
    return /^[0-9]{9}$/.test(num)
  }

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (type === "login") {
      onLogin(email, password)
    } else {
      // Validaciones
      if (!validateEmail(email)) {
        setError("El correo electrónico no es válido.")
        return
      }
      if (!validatePhone(phone)) {
        setError("El celular debe tener 9 dígitos numéricos.")
        return
      }
      if (!validatePassword(password)) {
        setError("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.")
        return
      }

      onRegister({
        name: `${name} ${lastName}`,
        email,
        password,
        phone,
        school,
        schoolType,
        grade,
        department,
        district
      })
    }
  }

  const isEmailInvalid = email.length > 0 && !validateEmail(email)
  const isPhoneInvalid = phone.length > 0 && phone.length < 9

  const departamentosPeru = [
    "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", 
    "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", 
    "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ]

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Info */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              {type === "login" 
                ? "Inicia sesión con tu cuenta de prueba para acceder a la plataforma." 
                : "Regístrate ahora y únete a nuestra comunidad de pruebas hoy mismo."}
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-muted-foreground font-medium">Beneficio de prueba número uno</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-muted-foreground font-medium">Acceso a datos de ejemplo ilimitados</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-muted-foreground font-medium">Soporte técnico para usuarios beta</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[10px]">✓</div>
                <p className="text-muted-foreground font-medium">Actualizaciones de sistema frecuentes</p>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl border-4 border-card shadow-xl">
               <Image 
                src="/placeholder.jpg" 
                alt="Students" 
                fill 
                className="object-cover opacity-80"
               />
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-700">
            <div className="w-full max-w-lg bg-card rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border/50 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 border-[12px] border-primary/5 rounded-full" />
              
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-8 leading-tight">
                Prepárate gratis para postular a la universidad.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Nombres*"
                      className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Apellidos*"
                      className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-1">
                  <Input
                    type="email"
                    placeholder="Correo electrónico*"
                    className={`h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all ${
                      isEmailInvalid ? "ring-2 ring-destructive/50" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {isEmailInvalid && (
                    <p className="text-[10px] text-destructive font-bold ml-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      Formato de correo inválido (ejemplo@correo.com)
                    </p>
                  )}
                </div>

                {type === "register" && (
                  <>
                <div className="space-y-1">
                  <Input
                    placeholder="Celular*"
                    className={`h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all ${
                      isPhoneInvalid ? "ring-2 ring-destructive/50" : ""
                    }`}
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "") // Solo números
                      if (val.length <= 9) setPhone(val) // Máximo 9 cifras
                    }}
                    required
                  />
                  {isPhoneInvalid && (
                    <p className="text-[10px] text-destructive font-bold ml-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      El número debe tener exactamente 9 dígitos
                    </p>
                  )}
                </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Nombre del colegio*"
                        className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        required
                      />
                      <select
                        className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground appearance-none cursor-pointer outline-none"
                        value={schoolType}
                        onChange={(e) => setSchoolType(e.target.value)}
                        required
                      >
                        <option value="" disabled>Tipo de colegio*</option>
                        <option value="publico">Público</option>
                        <option value="privado">Privado</option>
                      </select>
                    </div>

                    <select
                      className="w-full h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground appearance-none cursor-pointer outline-none"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                    >
                      <option value="" disabled>Seleccione el grado*</option>
                      <option value="1sec">1ro Secundaria</option>
                      <option value="2sec">2do Secundaria</option>
                      <option value="3sec">3ro Secundaria</option>
                      <option value="4sec">4to Secundaria</option>
                      <option value="5sec">5to Secundaria</option>
                      <option value="pre">Postulo, soy Pre-universitario</option>
                      <option value="uni">Soy universitario</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <select
                        className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground appearance-none cursor-pointer outline-none"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      >
                        <option value="" disabled>Departamento*</option>
                        {departamentosPeru.map(dept => (
                          <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                        ))}
                        <option value="fuera_peru">No me encuentro en Perú</option>
                      </select>
                      <Input
                        placeholder="Distrito*"
                        className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <Input
                  type="password"
                  placeholder="Contraseña*"
                  className="h-12 rounded-2xl bg-muted border-none px-6 focus-visible:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold text-center animate-in fade-in zoom-in duration-300">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 mt-4"
                >
                  {type === "login" ? "Iniciar sesión" : "Registrarte"}
                </Button>
              </form>

              <div className="mt-8 space-y-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  {type === "login" ? "¿Aún no tienes una cuenta?" : "¿Ya tienes una cuenta?"} {" "}
                  <button 
                    onClick={type === "login" ? onSwitchToRegister : onSwitchToLogin}
                    className="text-primary font-bold hover:underline"
                  >
                    {type === "login" ? "Quiero registrarme" : "Quiero ingresar"}
                  </button>
                </p>
                {type === "login" && (
                  <p className="text-sm font-medium text-foreground">
                    Olvidé mi contraseña {" "}
                    <button className="text-primary font-bold hover:underline">
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

