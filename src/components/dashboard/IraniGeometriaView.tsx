"use client"

import { useState } from "react"
import { 
  Layers, 
  Calendar, 
  Clock,
  FileText, 
  PlayCircle, 
  ClipboardCheck,
  Play,
  Hexagon,
  Triangle,
  Pentagon
} from "lucide-react"

const YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

export function IraniGeometriaView({ logo }: { logo?: string }) {
  const [selectedYearElemental, setSelectedYearElemental] = useState<number>(2025)
  const [selectedYearIntermedio, setSelectedYearIntermedio] = useState<number>(2025)
  const [selectedYearAvanzado, setSelectedYearAvanzado] = useState<number>(2025)
  
  const finalLogo = logo || "/assets/logos/solucionarios/irani_geometria.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 bg-[#020617] rounded-3xl p-4 md:p-8 border border-white/5">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Logo */}
          <div className="relative w-36 h-36 md:w-40 md:h-40 shrink-0 flex items-center justify-center">
            {/* Optional neon glow behind logo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-amber-500 rounded-full blur-[40px] opacity-20 -z-10" />
            <img
              src={finalLogo}
              alt="Iranian Geometry Olympiad"
              className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>

          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              <span className="text-fuchsia-500">Iranian</span> <span className="text-white">Geometry</span> <span className="text-amber-500">Olympiad</span>
            </h1>
            <div>
              <h2 className="text-lg md:text-xl font-medium text-indigo-400 mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm text-muted-foreground">
                Estructura de contenidos por niveles y colecciones anuales
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto">
          <div className="bg-transparent border border-cyan-500/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
            <Layers className="h-7 w-7 text-cyan-400" />
            <span className="text-xs font-bold text-white text-center leading-tight">3<br/>niveles</span>
          </div>
          
          <div className="bg-transparent border border-fuchsia-500/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-[0_0_15px_rgba(217,70,239,0.1)] hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all">
            <Calendar className="h-7 w-7 text-fuchsia-500" />
            <span className="text-xs font-bold text-white text-center leading-tight">Por<br/>años</span>
          </div>

          <div className="bg-transparent border border-amber-500/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">
            <Clock className="h-7 w-7 text-amber-500" />
            <span className="text-xs font-bold text-white text-center leading-tight">2014 –<br/>2025</span>
          </div>
        </div>
      </div>

      {/* MAIN THREE COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* NIVEL ELEMENTAL (CYAN) */}
        <div className="bg-[#020617] rounded-3xl border border-cyan-500/30 p-6 shadow-[0_0_20px_rgba(6,182,212,0.05)] relative overflow-hidden flex flex-col">
          <div className="absolute top-1/2 left-0 w-2 h-32 bg-cyan-500/50 blur-[10px] -translate-y-1/2" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full border border-cyan-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Triangle className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-cyan-400 uppercase tracking-wide">Nivel Elemental</h3>
              <p className="text-xs text-muted-foreground">1° y 2° de secundaria</p>
            </div>
          </div>

          {/* Years Grid */}
          <div className="grid grid-cols-6 gap-2 mb-6">
            {YEARS.map(year => (
              <button
                key={`elem-${year}`}
                onClick={() => setSelectedYearElemental(year)}
                className={`col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1 py-1.5 rounded-md text-[10px] font-bold border transition-all ${
                  selectedYearElemental === year
                    ? "bg-cyan-500 border-cyan-400 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)] scale-110 z-10"
                    : "bg-transparent border-white/10 text-white/50 hover:border-cyan-500/50 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-cyan-900/50" />
            <span className="text-[10px] font-medium text-cyan-400/80 uppercase">Contenido del año {selectedYearElemental}</span>
            <div className="h-px flex-1 bg-cyan-900/50" />
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
              <FileText className="h-6 w-6 text-cyan-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Examen original</span>
              <div className="h-0.5 w-4 bg-cyan-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
              <Play className="h-6 w-6 text-cyan-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Solución en video</span>
              <div className="h-0.5 w-4 bg-cyan-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
              <ClipboardCheck className="h-6 w-6 text-cyan-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Simulacro tipo examen</span>
              <div className="h-0.5 w-4 bg-cyan-500/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* NIVEL INTERMEDIO (FUCHSIA) */}
        <div className="bg-[#020617] rounded-3xl border border-fuchsia-500/30 p-6 shadow-[0_0_20px_rgba(217,70,239,0.05)] relative overflow-hidden flex flex-col">
          <div className="absolute top-1/2 left-0 w-2 h-32 bg-fuchsia-500/50 blur-[10px] -translate-y-1/2" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full border border-fuchsia-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
              <Hexagon className="h-6 w-6 text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-fuchsia-400 uppercase tracking-wide">Nivel Intermedio</h3>
              <p className="text-xs text-muted-foreground">3° y 4° de secundaria</p>
            </div>
          </div>

          {/* Years Grid */}
          <div className="grid grid-cols-6 gap-2 mb-6">
            {YEARS.map(year => (
              <button
                key={`inter-${year}`}
                onClick={() => setSelectedYearIntermedio(year)}
                className={`col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1 py-1.5 rounded-md text-[10px] font-bold border transition-all ${
                  selectedYearIntermedio === year
                    ? "bg-fuchsia-500 border-fuchsia-400 text-white shadow-[0_0_10px_rgba(217,70,239,0.5)] scale-110 z-10"
                    : "bg-transparent border-white/10 text-white/50 hover:border-fuchsia-500/50 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-fuchsia-900/50" />
            <span className="text-[10px] font-medium text-fuchsia-400/80 uppercase">Contenido del año {selectedYearIntermedio}</span>
            <div className="h-px flex-1 bg-fuchsia-900/50" />
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 transition-all group">
              <FileText className="h-6 w-6 text-fuchsia-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Examen original</span>
              <div className="h-0.5 w-4 bg-fuchsia-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 transition-all group">
              <Play className="h-6 w-6 text-fuchsia-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Solución en video</span>
              <div className="h-0.5 w-4 bg-fuchsia-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 transition-all group">
              <ClipboardCheck className="h-6 w-6 text-fuchsia-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Simulacro tipo examen</span>
              <div className="h-0.5 w-4 bg-fuchsia-500/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* NIVEL AVANZADO (AMBER) */}
        <div className="bg-[#020617] rounded-3xl border border-amber-500/30 p-6 shadow-[0_0_20px_rgba(245,158,11,0.05)] relative overflow-hidden flex flex-col">
          <div className="absolute top-1/2 left-0 w-2 h-32 bg-amber-500/50 blur-[10px] -translate-y-1/2" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full border border-amber-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Pentagon className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-amber-400 uppercase tracking-wide">Nivel Avanzado</h3>
              <p className="text-xs text-muted-foreground">5° de secundaria</p>
            </div>
          </div>

          {/* Years Grid */}
          <div className="grid grid-cols-6 gap-2 mb-6">
            {YEARS.map(year => (
              <button
                key={`avan-${year}`}
                onClick={() => setSelectedYearAvanzado(year)}
                className={`col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1 py-1.5 rounded-md text-[10px] font-bold border transition-all ${
                  selectedYearAvanzado === year
                    ? "bg-amber-500 border-amber-400 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)] scale-110 z-10"
                    : "bg-transparent border-white/10 text-white/50 hover:border-amber-500/50 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-amber-900/50" />
            <span className="text-[10px] font-medium text-amber-400/80 uppercase">Contenido del año {selectedYearAvanzado}</span>
            <div className="h-px flex-1 bg-amber-900/50" />
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
              <FileText className="h-6 w-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Examen original</span>
              <div className="h-0.5 w-4 bg-amber-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
              <Play className="h-6 w-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Solución en video</span>
              <div className="h-0.5 w-4 bg-amber-500/50 rounded-full" />
            </div>
            <div className="bg-transparent rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
              <ClipboardCheck className="h-6 w-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold text-white/70 group-hover:text-white">Simulacro tipo examen</span>
              <div className="h-0.5 w-4 bg-amber-500/50 rounded-full" />
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="bg-[#020617] rounded-3xl border border-white/10 p-5 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-center gap-6 md:gap-12 min-w-max px-4">
          
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-emerald-400" />
            <span className="text-sm font-bold text-white/80">Colección<br/>por años</span>
          </div>

          <div className="w-px h-8 bg-white/10" />

          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-cyan-400" />
            <span className="text-sm font-bold text-white/80">Examen<br/>original</span>
          </div>

          <div className="w-px h-8 bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl border border-fuchsia-500/30 flex items-center justify-center bg-fuchsia-500/5">
              <Play className="h-5 w-5 text-fuchsia-500 ml-0.5" />
            </div>
            <span className="text-sm font-bold text-white/80">Solución<br/>en video</span>
          </div>

          <div className="w-px h-8 bg-white/10" />

          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-amber-500" />
            <span className="text-sm font-bold text-white/80">Simulacro<br/>tipo examen</span>
          </div>

        </div>
      </div>

    </div>
  )
}
