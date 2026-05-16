"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, FileText } from "lucide-react"
import catalog from "@/lib/data/academy_catalog.json"

export default function SolucionariosPage() {
  const { solucionarios } = catalog

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground tracking-tight">Solucionarios</h1>
        <p className="text-muted-foreground font-medium">Explora las resoluciones detalladas de las mejores olimpiadas matemáticas.</p>
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Buscar olimpiada..."
          className="w-full h-12 bg-card border border-border/50 rounded-2xl pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solucionarios.map((s) => {
            // Función simple para determinar si un color es claro o oscuro
            const isLightColor = (hex: string) => {
              if (!hex) return false
              const r = parseInt(hex.slice(1, 3), 16)
              const g = parseInt(hex.slice(3, 5), 16)
              const b = parseInt(hex.slice(5, 7), 16)
              const brightness = (r * 299 + g * 587 + b * 114) / 1000
              return brightness > 155 // Umbral de claridad
            }

            const lightTheme = isLightColor((s as any).accentColor)
            const textColor = lightTheme ? "text-[#0F172A]" : "text-white"
            const subTextColor = lightTheme ? "text-[#0F172A]/60" : "text-white/60"
            const borderColor = lightTheme ? "border-[#0F172A]/10" : "border-white/10"

            return (
              <Link
                key={s.id}
                href={`/dashboard/solucionarios/${s.id}`}
                className="group relative flex flex-col rounded-[2rem] border border-white/10 overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${(s as any).accentColor || "#1e293b"} 0%, ${(s as any).accentColor ? (s as any).accentColor + 'CC' : "#0f172a"} 100%)` 
                }}
              >
                {/* Banner Image */}
                <div className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src={s.banners?.[0] || "/placeholder.jpg"}
                    alt={s.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Type Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 ${lightTheme ? "bg-black/20 text-[#0F172A]" : "bg-white/20 text-white"} backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-lg border ${lightTheme ? "border-black/10" : "border-white/20"}`}>
                    Solucionario
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 relative">
                  {/* Logo Overlay */}
                  <div className="absolute -top-10 right-6 w-16 h-16 bg-white rounded-2xl shadow-xl p-2 border border-border/50 flex items-center justify-center">
                    <Image
                      src={s.logos?.[0] || "/logo_principal.png"}
                      alt="Logo"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  <div className="pr-16">
                    <h3 className={`font-black text-lg ${textColor} leading-tight line-clamp-1`}>
                      {s.title}
                    </h3>
                    <p className={`text-xs font-bold ${subTextColor} uppercase tracking-widest`}>
                      Centro de Resolución
                    </p>
                  </div>

                  <div className={`pt-4 flex items-center justify-between border-t ${borderColor}`}>
                    <div className={`flex items-center gap-2 font-black text-xs ${textColor}`}>
                      <FileText className="h-4 w-4" />
                      <span>RESOLUCIONES</span>
                    </div>
                    <div className={`h-8 w-8 rounded-full ${lightTheme ? "bg-black/10" : "bg-white/10"} flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all`}>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
