"use client"

import { useState } from "react"
import { 
  Trophy, 
  Calendar, 
  Clock,
  FileText, 
  PlayCircle, 
  ClipboardCheck,
  Backpack,
  User,
  Star,
  Folder,
  Play
} from "lucide-react"

const YEARS = [2021, 2022, 2023, 2024, 2025]

export function NavidenaView({ logo }: { logo?: string }) {
  const [selectedYearA, setSelectedYearA] = useState<number>(2025)
  const [selectedYear1, setSelectedYear1] = useState<number>(2025)
  const [selectedYear2, setSelectedYear2] = useState<number>(2025)
  
  const finalLogo = logo || "/assets/logos/solucionarios/olimpiada_navidena.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-xl">
        {/* Subtle festive glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -z-0" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full xl:w-auto">
          {/* Logo */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 bg-white/5 rounded-full p-4 border border-white/10 shadow-lg flex items-center justify-center">
            <img
              src={finalLogo}
              alt="Olimpiada Navideña de Matemáticas"
              className="object-contain w-full h-full drop-shadow-xl"
            />
          </div>

          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-emerald-500">
              Olimpiada Navideña<br/>
              <span className="text-white">de Matemáticas</span>
            </h1>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-red-500 mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm font-medium text-muted-foreground">
                Estructura de contenidos por niveles y colecciones anuales
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto relative z-10">
          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-emerald-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-emerald-500" />
            </div>
            <span className="text-xs font-bold text-emerald-500 text-center">3 niveles</span>
          </div>
          
          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-red-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-xs font-bold text-red-500 text-center">Por años</span>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-amber-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-500" />
            </div>
            <span className="text-xs font-bold text-amber-500 text-center">2021 – 2025</span>
          </div>
        </div>
      </div>

      {/* MAIN THREE COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* NIVEL A (EMERALD) */}
        <div className="bg-card rounded-[2rem] border border-emerald-500/20 p-6 flex flex-col shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
              <Backpack className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-500 tracking-tight">NIVEL A</h3>
              <p className="text-xs text-muted-foreground leading-tight">
                Estudiantes que en el 2024<br/>cursaron 5° o 6° de primaria
              </p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs text-muted-foreground mb-2 block">Selecciona el año</span>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(year => (
                <button
                  key={`a-${year}`}
                  onClick={() => setSelectedYearA(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedYearA === year
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:border-emerald-500/50 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex-1 flex flex-col">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-emerald-500">Contenido del año {selectedYearA}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-500/30 transition-all cursor-pointer">
                <FileText className="h-6 w-6 text-emerald-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Examen<br/>original</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-red-500/30 transition-all cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-all cursor-pointer">
                <ClipboardCheck className="h-6 w-6 text-amber-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Simulacro</span>
              </div>
            </div>
          </div>
        </div>

        {/* NIVEL 1 (RED) */}
        <div className="bg-card rounded-[2rem] border border-red-500/20 p-6 flex flex-col shadow-sm relative overflow-hidden group hover:border-red-500/40 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-lg">
              <Backpack className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-red-500 tracking-tight">NIVEL 1</h3>
              <p className="text-xs text-muted-foreground leading-tight">
                Estudiantes que en el 2024<br/>cursaron 1° o 2° de secundaria
              </p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs text-muted-foreground mb-2 block">Selecciona el año</span>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(year => (
                <button
                  key={`1-${year}`}
                  onClick={() => setSelectedYear1(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedYear1 === year
                      ? "bg-red-500 border-red-500 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:border-red-500/50 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex-1 flex flex-col">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-red-500">Contenido del año {selectedYear1}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-500/30 transition-all cursor-pointer">
                <FileText className="h-6 w-6 text-emerald-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Examen<br/>original</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-red-500/30 transition-all cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-all cursor-pointer">
                <ClipboardCheck className="h-6 w-6 text-amber-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Simulacro</span>
              </div>
            </div>
          </div>
        </div>

        {/* NIVEL 2 (EMERALD) */}
        <div className="bg-card rounded-[2rem] border border-emerald-500/20 p-6 flex flex-col shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-600 tracking-tight">NIVEL 2</h3>
              <p className="text-xs text-muted-foreground leading-tight">
                Estudiantes que en el 2024<br/>cursaron 3°, 4° o 5° de secundaria
              </p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs text-muted-foreground mb-2 block">Selecciona el año</span>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(year => (
                <button
                  key={`2-${year}`}
                  onClick={() => setSelectedYear2(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedYear2 === year
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:border-emerald-600/50 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-2xl p-4 flex-1 flex flex-col">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-emerald-600">Contenido del año {selectedYear2}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-500/30 transition-all cursor-pointer">
                <FileText className="h-6 w-6 text-emerald-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Examen<br/>original</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-red-500/30 transition-all cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-all cursor-pointer">
                <ClipboardCheck className="h-6 w-6 text-amber-500" />
                <span className="text-[10px] font-bold text-foreground leading-tight">Simulacro</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ALERT */}
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="h-px w-16 md:w-32 bg-amber-500/30 rounded-full" />
        <div className="h-8 w-8 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-500/10 text-amber-500 shrink-0">
          <Star className="h-4 w-4" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Cada año contiene su examen original, solución en video y simulacro.
        </p>
        <div className="h-px w-16 md:w-32 bg-amber-500/30 rounded-full" />
      </div>

      {/* FOOTER BAR */}
      <div className="bg-[#064e3b] rounded-3xl p-5 shadow-sm overflow-x-auto relative overflow-hidden border border-emerald-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent -z-0" />
        <div className="flex items-center justify-center gap-6 md:gap-12 min-w-max px-4 relative z-10">
          
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-amber-400" />
            <span className="text-sm font-bold text-emerald-50">Colección<br/>por años</span>
          </div>

          <div className="w-px h-8 bg-emerald-700" />

          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-emerald-100" />
            <span className="text-sm font-bold text-emerald-50">Examen<br/>original</span>
          </div>

          <div className="w-px h-8 bg-emerald-700" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center shadow-md border border-red-500">
              <Play className="h-5 w-5 text-white ml-0.5" />
            </div>
            <span className="text-sm font-bold text-emerald-50">Solución<br/>en video</span>
          </div>

          <div className="w-px h-8 bg-emerald-700" />

          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-amber-400" />
            <span className="text-sm font-bold text-emerald-50">Simulacro<br/>tipo examen</span>
          </div>

        </div>
      </div>

    </div>
  )
}
