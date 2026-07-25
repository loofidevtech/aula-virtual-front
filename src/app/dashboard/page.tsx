// app/dashboard/page.tsx — Inicio del Dashboard con Bucle Infinito Marquee
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Play, ChevronRight, Sparkles, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IntroVideoCard } from "@/components/dashboard/IntroVideoCard"
import { InfiniteCarousel, CarouselItem } from "@/components/dashboard/InfiniteCarousel"
import catalog from "@/lib/data/academy_catalog.json"
import { freemiumService } from "@/lib/freemium-service"

export default function DashboardHomePage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email?: string; role?: string } | null>(null)

  useEffect(() => {
    const user = freemiumService.getCurrentUser()
    setCurrentUser(user)
  }, [])

  const activeName = currentUser?.name || "Estudiante"

  // 1. Mapear los Programas de Entrenamiento desde el catálogo
  const programasItems: CarouselItem[] = catalog.programas.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: (p as any).type ? `Categoría ${ (p as any).type }` : "Programa Oficial de Preparación",
    logo: p.logos?.[0],
    banner: p.banners?.[0],
    type: "programa",
    href: `/dashboard/cursos/${p.id}`,
    accentColor: p.accentColor
  }))

  // 2. Mapear los Solucionarios Oficiales desde el catálogo
  const solucionariosItems: CarouselItem[] = catalog.solucionarios.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: "Centro de Resolución y Exámenes Oficiales",
    logo: s.logos?.[0],
    banner: s.banners?.[0],
    type: "solucionario",
    href: `/dashboard/solucionarios/${s.id}`,
    accentColor: s.accentColor
  }))

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12">
      
      {/* ── HERO BANNER PRINCIPAL LIMPIO Y ESPACIOSO ───────────────────────── */}
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-secondary via-blue-950 to-slate-950 border border-border/50 shadow-2xl p-8 md:p-12 text-center md:text-left">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
        
        {/* Glows de acento */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest rounded-full">
              <Sparkles className="h-3.5 w-3.5 fill-current" /> ¡Bienvenido, {activeName}!
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest rounded-full">
              🏆 Plataforma N°1
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Tu plataforma de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Olimpiadas
            </span>{" "}
            Matemáticas
          </h1>
          <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed">
            Explora nuestros programas de entrenamiento y solucionarios oficiales en movimiento continuo.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <Link href="/dashboard/cursos">
              <Button className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black px-8 h-12 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all gap-2 cursor-pointer">
                <Play className="h-4 w-4 fill-current ml-0.5" />
                Explorar todos los programas
              </Button>
            </Link>

            <Link href="/dashboard/solucionarios">
              <Button
                variant="outline"
                className="rounded-2xl border-white/20 text-white font-black px-6 h-12 hover:bg-white/10 hover:border-white/40 transition-all gap-2 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                Solucionarios
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── VIDEO DE INTRODUCCIÓN UBICADO ABAJO DEL HERO BANNER ─────────────── */}
      <section>
        <IntroVideoCard userName={activeName} />
      </section>

      {/* ── SECCIÓN 1: PROGRAMAS DE ENTRENAMIENTO (MARQUEE INFINITO DERECHA A IZQUIERDA) ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-amber-400" />
              Programas de Entrenamiento
            </h2>
            <p className="text-xs text-white/60 font-semibold mt-0.5">
              Cursos de nivelación y competencia olímpica en constante movimiento.
            </p>
          </div>
          <Link
            href="/dashboard/cursos"
            className="flex items-center gap-1 text-amber-400 text-xs font-black uppercase tracking-wider hover:underline"
          >
            Ver catálogo completo <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Carrusel Marquee Infinito de Programas */}
        <InfiniteCarousel items={programasItems} speedSeconds={75} />
      </section>

      {/* ── SECCIÓN 2: SOLUCIONARIOS OFICIALES (MARQUEE INFINITO DERECHA A IZQUIERDA) ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Solucionarios Oficiales
            </h2>
            <p className="text-xs text-white/60 font-semibold mt-0.5">
              Resoluciones de exámenes y olimpiadas matemáticas nacionales e internacionales.
            </p>
          </div>
          <Link
            href="/dashboard/solucionarios"
            className="flex items-center gap-1 text-primary text-xs font-black uppercase tracking-wider hover:underline"
          >
            Ver todos los solucionarios <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Carrusel Marquee Infinito de Solucionarios (Velocidad idéntica a Programas: 75s) */}
        <InfiniteCarousel items={solucionariosItems} speedSeconds={75} reverse={false} />
      </section>

    </div>
  )
}
