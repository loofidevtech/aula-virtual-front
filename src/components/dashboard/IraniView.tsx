"use client"

import { useState } from "react"
import { 
  Trophy, 
  Calendar, 
  FileText, 
  PlayCircle, 
  ClipboardCheck,
  Folder,
  Play
} from "lucide-react"

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025]

export function IraniView({ logo }: { logo?: string }) {
  const [selectedYearElemental, setSelectedYearElemental] = useState<number>(2025)
  const [selectedYearAvanzado, setSelectedYearAvanzado] = useState<number>(2025)
  
  const finalLogo = logo || "/assets/logos/solucionarios/irani_combinatoria.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Logo */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-3xl p-4 border border-border/50 shadow-sm flex items-center justify-center">
            <img
              src={finalLogo}
              alt="Olimpiada Iraní de Combinatoria"
              className="object-contain w-full h-full drop-shadow-xl"
            />
          </div>

          <div className="space-y-3 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
              Olimpiada Iraní de<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Combinatoria</span>
            </h1>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-purple-400 mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Estructura de contenidos por niveles y colecciones anuales.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto">
          <div className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 flex-1 xl:flex-none xl:w-36 shadow-sm hover:border-purple-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-sm font-bold text-foreground text-center leading-none">2<br/>niveles</span>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 flex-1 xl:flex-none xl:w-36 shadow-sm hover:border-blue-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-sm font-bold text-foreground text-center leading-none">Por<br/>años</span>
          </div>

          <div className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 flex-1 xl:flex-none xl:w-36 shadow-sm hover:border-cyan-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-cyan-500" />
            </div>
            <span className="text-sm font-bold text-foreground text-center leading-none">2020 –<br/>2025</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMNS (NIVEL ELEMENTAL & NIVEL AVANZADO) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* NIVEL ELEMENTAL (PURPLE) */}
        <div className="bg-card/50 backdrop-blur-sm rounded-[2.5rem] border border-purple-500/20 p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10" />
          
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-purple-500 tracking-tight uppercase mb-2">Nivel Elemental</h3>
            <p className="text-sm font-medium text-muted-foreground">
              equipos de estudiantes de 2° y/o 3° de secundaria
            </p>
          </div>

          {/* Years Selector (Elemental) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
            {YEARS.map(year => (
              <button
                key={`elem-${year}`}
                onClick={() => setSelectedYearElemental(year)}
                className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                  selectedYearElemental === year
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20 scale-105"
                    : "bg-background border border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border/50" />
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <span className="text-[10px]">✦</span>
              Contenido del año {selectedYearElemental}
              <span className="text-[10px]">✦</span>
            </div>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          {/* Resource Cards (Elemental) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-purple-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300">
                <FileText className="h-8 w-8 text-purple-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-purple-400 transition-colors">Examen original</h4>
                <div className="h-1 w-6 bg-purple-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-purple-500 transition-all" />
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-purple-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300">
                <PlayCircle className="h-8 w-8 text-purple-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-purple-400 transition-colors">Solución en video</h4>
                <div className="h-1 w-6 bg-purple-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-purple-500 transition-all" />
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-purple-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300">
                <ClipboardCheck className="h-8 w-8 text-purple-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-purple-400 transition-colors">Simulacro tipo examen</h4>
                <div className="h-1 w-6 bg-purple-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-purple-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* NIVEL AVANZADO (BLUE) */}
        <div className="bg-card/50 backdrop-blur-sm rounded-[2.5rem] border border-blue-500/20 p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />
          
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-blue-500 tracking-tight uppercase mb-2">Nivel Avanzado</h3>
            <p className="text-sm font-medium text-muted-foreground">
              equipos de estudiantes de 4° y/o 5° de secundaria
            </p>
          </div>

          {/* Years Selector (Avanzado) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
            {YEARS.map(year => (
              <button
                key={`avanz-${year}`}
                onClick={() => setSelectedYearAvanzado(year)}
                className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                  selectedYearAvanzado === year
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105"
                    : "bg-background border border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border/50" />
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
              <span className="text-[10px]">✦</span>
              Contenido del año {selectedYearAvanzado}
              <span className="text-[10px]">✦</span>
            </div>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          {/* Resource Cards (Avanzado) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <FileText className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-blue-400 transition-colors">Examen original</h4>
                <div className="h-1 w-6 bg-blue-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-blue-500 transition-all" />
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <Play className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-blue-400 transition-colors">Solución en video</h4>
                <div className="h-1 w-6 bg-blue-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-blue-500 transition-all" />
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border/50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-500/40 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <ClipboardCheck className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-blue-400 transition-colors">Simulacro tipo examen</h4>
                <div className="h-1 w-6 bg-blue-500/30 mx-auto rounded-full group-hover:w-10 group-hover:bg-blue-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BAR (From Ref Image bottom) */}
      <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[800px] px-4">
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Folder className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-sm font-bold text-foreground">Colección<br/>por años</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-sm font-bold text-foreground">Examen<br/>original</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-md">
              <Play className="h-5 w-5 text-white ml-1" />
            </div>
            <span className="text-sm font-bold text-foreground">Solución<br/>en video</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
              <ClipboardCheck className="h-6 w-6 text-cyan-500" />
            </div>
            <span className="text-sm font-bold text-foreground">Simulacro<br/>tipo examen</span>
          </div>

        </div>
      </div>

    </div>
  )
}
