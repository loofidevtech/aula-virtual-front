"use client"

import { useState } from "react"
import { 
  Calendar, 
  FileText, 
  PlayCircle, 
  ClipboardCheck,
  Users,
  GraduationCap,
  Leaf,
  MapMapPin, // close enough to a maple leaf or tour icon
  BarChart2,
  CalendarDays
} from "lucide-react"

const YEARS = [2021, 2022, 2023, 2024, 2025]

export function CiudadesView({ logo }: { logo?: string }) {
  const [selectedYearJuvenil, setSelectedYearJuvenil] = useState<number>(2025)
  const [selectedYearMayor, setSelectedYearMayor] = useState<number>(2025)
  
  const finalLogo = logo || "/assets/logos/solucionarios/torneo_ciudades.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-8 rounded-[2.5rem] border border-blue-900/50 relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a] -z-0" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full xl:w-auto">
          {/* Logo */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-3xl p-4 border border-blue-500/10 shadow-lg flex items-center justify-center backdrop-blur-sm">
            <img
              src={finalLogo}
              alt="Torneo de las Ciudades"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-blue-500">
              Torneo de las Ciudades
            </h1>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-blue-400 mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm font-medium text-muted-foreground">
                Estructura de contenidos por niveles, años y giras.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto relative z-10">
          <div className="bg-card/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 text-center leading-tight">2<br/>niveles</span>
          </div>
          
          <div className="bg-card/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 text-center leading-tight">2<br/>giras por año</span>
          </div>

          <div className="bg-card/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 text-center leading-tight">Por<br/>años</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMNS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* NIVEL JUVENIL */}
        <div className="bg-card rounded-[2rem] border border-blue-600/30 p-6 shadow-lg shadow-blue-900/10 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10" />

          {/* Header Nivel */}
          <div className="flex items-center justify-center gap-4 mb-6 text-center">
            <div className="h-14 w-14 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
              <Users className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-blue-500 tracking-tight uppercase">Nivel Juvenil</h3>
              <p className="text-xs text-muted-foreground font-medium">
                2° y 3° de secundaria - Grados 8–9
              </p>
            </div>
          </div>

          {/* Year Selector */}
          <div className="flex items-center justify-center gap-2 mb-8 bg-[#0f172a] p-1.5 rounded-2xl border border-border/50">
            {YEARS.map(year => (
              <button
                key={`juv-${year}`}
                onClick={() => setSelectedYearJuvenil(year)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedYearJuvenil === year
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="space-y-4 flex-1">
            {/* Gira Primavera */}
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <h4 className="text-sm font-bold text-green-500">Gira de Primavera</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <FileText className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Examen original</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <PlayCircle className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Solución en video</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <ClipboardCheck className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Simulacro</span>
                </div>
              </div>
            </div>

            {/* Gira Otoño */}
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                {/* Fall leaf representation using icon */}
                <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
                <h4 className="text-sm font-bold text-orange-500">Gira de Otoño</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <FileText className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Examen original</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <PlayCircle className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Solución en video</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <ClipboardCheck className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Simulacro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NIVEL MAYOR */}
        <div className="bg-card rounded-[2rem] border border-blue-600/30 p-6 shadow-lg shadow-blue-900/10 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10" />

          {/* Header Nivel */}
          <div className="flex items-center justify-center gap-4 mb-6 text-center">
            <div className="h-14 w-14 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
              <GraduationCap className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-blue-500 tracking-tight uppercase">Nivel Mayor</h3>
              <p className="text-xs text-muted-foreground font-medium">
                4° y 5° de secundaria - Grados 10–11
              </p>
            </div>
          </div>

          {/* Year Selector */}
          <div className="flex items-center justify-center gap-2 mb-8 bg-[#0f172a] p-1.5 rounded-2xl border border-border/50">
            {YEARS.map(year => (
              <button
                key={`may-${year}`}
                onClick={() => setSelectedYearMayor(year)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedYearMayor === year
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="space-y-4 flex-1">
            {/* Gira Primavera */}
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <h4 className="text-sm font-bold text-green-500">Gira de Primavera</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <FileText className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Examen original</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <PlayCircle className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Solución en video</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-green-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <ClipboardCheck className="h-6 w-6 text-green-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Simulacro</span>
                </div>
              </div>
            </div>

            {/* Gira Otoño */}
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                {/* Fall leaf representation using icon */}
                <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 12"/>
                </svg>
                <h4 className="text-sm font-bold text-orange-500">Gira de Otoño</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <FileText className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Examen original</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <PlayCircle className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Solución en video</span>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-orange-500/50 hover:shadow-sm transition-all group/btn cursor-pointer">
                  <ClipboardCheck className="h-6 w-6 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-foreground">Simulacro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="bg-card rounded-3xl p-5 shadow-sm overflow-x-auto relative overflow-hidden border border-border/50">
        <div className="flex items-center justify-center gap-6 md:gap-12 min-w-max px-4 relative z-10">
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-xs font-bold text-foreground">Colección<br/>por años</span>
          </div>
          <div className="w-px h-6 bg-border/50" />
          
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-green-500" />
            <span className="text-xs font-bold text-foreground">Gira de<br/>Primavera</span>
          </div>
          <div className="w-px h-6 bg-border/50" />
          
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 12"/>
            </svg>
            <span className="text-xs font-bold text-foreground">Gira de<br/>Otoño</span>
          </div>
          <div className="w-px h-6 bg-border/50" />

          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-600" />
            <span className="text-xs font-bold text-foreground">Examen<br/>original</span>
          </div>
          <div className="w-px h-6 bg-border/50" />

          <div className="flex items-center gap-3">
            <PlayCircle className="h-5 w-5 text-green-600" />
            <span className="text-xs font-bold text-foreground">Solución<br/>en video</span>
          </div>
          <div className="w-px h-6 bg-border/50" />

          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-5 w-5 text-green-600" />
            <span className="text-xs font-bold text-foreground">Simulacro</span>
          </div>

        </div>
      </div>

    </div>
  )
}
