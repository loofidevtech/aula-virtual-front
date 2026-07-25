"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Sparkles, X, Film, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IntroVideoCardProps {
  userName?: string
}

export function IntroVideoCard({ userName = "Estudiante" }: IntroVideoCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      {/* ── CARD HORIZONTAL DESTACADO DEL VIDEO DE BIENVENIDA (UBICADO ABAJO DEL BANNER) ── */}
      <div 
        onClick={() => setIsVideoOpen(true)}
        className="group relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-slate-900/90 via-secondary/40 to-slate-950 border border-white/15 p-6 md:p-8 shadow-2xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)] cursor-pointer"
      >
        {/* Glows de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          
          {/* LADO IZQUIERDO: Previsualización Directa y Reproductor de Video Incrustado */}
          <div className="relative aspect-video w-full md:w-[440px] shrink-0 rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Video de Introducción Albert Math Academy"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* LADO DERECHO: Información, Capítulos y Botón de Inicio */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5 fill-current" /> Tour Inicial Recomendado
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                Indispensable para nuevos alumnos
              </span>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight">
                ¿Cómo aprovechar al máximo tu plataforma olímpica?
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-medium leading-relaxed mt-2 max-w-xl">
                En solo 3 minutos te mostramos cómo navegar por tus cursos, descargar los solucionarios oficiales en PDF y entrenar con la Inteligencia Artificial de Albert.
              </p>
            </div>

            {/* Capítulos rápidos */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-bold text-slate-300">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10">0:00 Presentación</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10">1:15 Cursos y Etapas</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10">2:30 Solucionarios PDF</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10">3:10 Albert AI</span>
            </div>

            {/* Botón de reproducción */}
            <div className="pt-2">
              <Button className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider px-8 h-12 gap-2.5 shadow-xl shadow-amber-500/20 group-hover:scale-105 active:scale-95 transition-all cursor-pointer">
                <Play className="h-4 w-4 fill-current ml-0.5" />
                Reproducir Video de Introducción (3:45 min)
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL REPRODUCTOR DE VIDEO PERFECTAMENTE RECTIFICADO Y RESPONSIVO ── */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop con Blur y Cierre al clickear fuera */}
          <div 
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-300"
            onClick={() => setIsVideoOpen(false)}
          />
          
          {/* Card Modal con max-height ajustado para evitar desbordes en cualquier resolución */}
          <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b132b] border border-white/15 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] animate-in zoom-in-95 duration-300">
            
            {/* Cabecera Fija */}
            <div className="shrink-0 p-4 md:px-6 md:py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <Film className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-tight truncate">
                    Video de Introducción — Albert Math Academy
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/60 font-medium truncate">
                    Guía de inicio rápido para {userName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Cerrar video"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Contenedor Adaptativo de Video (Ratio 16:9 Limpio) */}
            <div className="relative w-full aspect-video max-h-[55vh] bg-black shrink-0 flex items-center justify-center overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video de Introducción Albert Math Academy"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer de Capítulos y Acciones (Con Scrollbar Interno si el alto es reducido) */}
            <div className="shrink-0 p-4 md:p-6 bg-slate-950/95 border-t border-white/10 space-y-3.5 overflow-y-auto max-h-[160px] md:max-h-none">
              
              {/* Lista de Capítulos */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Capítulos:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 whitespace-nowrap">0:00 Presentación</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 whitespace-nowrap">1:15 Cursos</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 whitespace-nowrap">2:30 Solucionarios PDF</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 whitespace-nowrap">3:10 Albert AI</span>
                </div>
              </div>

              {/* Botón de Cierre / Continuar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-0.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 text-center sm:text-left">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>¿Listo para resolver tus primeros ejercicios?</span>
                </div>

                <Button 
                  onClick={() => setIsVideoOpen(false)}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider px-6 h-10 gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
                >
                  Comenzar a estudiar <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  )
}
