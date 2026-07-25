"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Sparkles, BookOpen, FileText } from "lucide-react"

export interface CarouselItem {
  id: string
  title: string
  subtitle?: string
  logo?: string
  banner?: string
  type: "programa" | "solucionario"
  href: string
  accentColor?: string
}

interface InfiniteCarouselProps {
  items: CarouselItem[]
  speedSeconds?: number
  reverse?: boolean
}

export function InfiniteCarousel({ items, speedSeconds = 35, reverse = false }: InfiniteCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  // Duplicar los ítems para garantizar el bucle infinito sin saltos
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div 
      className="relative w-full overflow-hidden py-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Máscara de desvanecimiento en los bordes izquierdo y derecho */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[#040d21] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[#040d21] to-transparent z-20 pointer-events-none" />

      {/* Contenedor animado de tarjetas */}
      <div 
        className="flex gap-5 w-max animate-infinite-scroll cursor-grab active:cursor-grabbing"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running"
        }}
      >
        {duplicatedItems.map((item, index) => {
          const logoSrc = item.logo || item.banner || "/logo_principal.png"
          
          return (
            <Link
              key={`${item.id}-${index}`}
              href={item.href}
              className="group shrink-0 w-[290px] sm:w-[320px] rounded-[2rem] overflow-hidden bg-[#0c162d] border border-white/10 shadow-2xl flex flex-col hover:border-amber-500/50 hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Imagen/Logo de Fondo en la parte superior */}
              <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                {/* Logo o Imagen de fondo */}
                <Image
                  src={logoSrc}
                  alt={item.title}
                  fill
                  className="object-contain p-5 group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                />
                
                {/* Degradado sobrepuesto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c162d] via-[#0c162d]/40 to-transparent" />

                {/* Badge Superior Estilo Etiqueta */}
                <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-amber-300/40">
                  {item.type === "programa" ? "PROGRAMA DE ENTRENAMIENTO" : "SOLUCIONARIO OFICIAL"}
                </div>
              </div>

              {/* Zona Inferior con Título y Botón Estilo Cotización */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4 bg-[#0c162d]">
                <div>
                  <h3 className="font-black text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-semibold mt-1.5 line-clamp-2 leading-relaxed">
                    {item.subtitle || (item.type === "programa" ? "Entrenamiento olímpico estructurado por etapas." : "Resolución oficial en video y PDF detallado.")}
                  </p>
                </div>

                {/* Botón Inferior Ancho Fiel a la Foto del Usuario */}
                <div className="w-full py-3 rounded-xl bg-slate-800/80 border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:shadow-amber-500/30">
                  <span>{item.type === "programa" ? "INGRESAR AL PROGRAMA" : "VER SOLUCIONARIO"}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
