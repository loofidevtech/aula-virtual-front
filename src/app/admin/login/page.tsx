"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ShieldAlert, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { adminService } from "@/lib/admin-service"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Usar servicio simulado para validar admin
      const adminUser = await adminService.login(email, password)
      
      if (adminUser) {
        // En una app real, aquí guardarías el token en cookies/sessionStorage
        sessionStorage.setItem("adminUser", JSON.stringify(adminUser))
        router.push("/admin/dashboard")
      } else {
        setError("Credenciales de administrador incorrectas.")
      }
    } catch (err) {
      setError("Error de conexión al servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 bg-background rounded-2xl flex items-center justify-center shadow-inner shadow-black/50 mb-6 p-2 border border-border/50">
               <Image 
                src="/logo_principal.png" 
                alt="Logo Admin" 
                width={60} 
                height={60} 
                className="object-contain drop-shadow-md"
              />
            </div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Panel Administrativo</h1>
            <p className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">
              Acceso Restringido
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1 relative">
              <Input
                type="email"
                placeholder="Correo corporativo"
                className="h-14 rounded-2xl bg-muted/50 border-none px-6 focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-1 relative">
              <Input
                type="password"
                placeholder="Contraseña"
                className="h-14 rounded-2xl bg-muted/50 border-none px-6 focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-bold animate-in slide-in-from-top-2">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-base hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] group mt-6"
            >
              {loading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  Ingresar al Sistema
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span>Sistema protegido. Solo personal autorizado.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
