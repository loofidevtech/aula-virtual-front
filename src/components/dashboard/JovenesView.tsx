"use client"

import { useState } from "react"
import { 
  BarChart2, 
  ClipboardCheck, 
  Calendar,
  FileText,
  PlaySquare,
  ClipboardList,
  BookOpen,
  ChevronRight,
  Info,
  Trophy,
  Globe
} from "lucide-react"

const YEARS = [2021, 2022, 2023, 2024, 2025]
const ROUNDS = [
  { id: "regional", name: "Prueba regional" },
  { id: "nacional", name: "Ronda nacional" },
  { id: "internacional", name: "Ronda internacional" }
]

export function JovenesView({ logo }: { logo?: string }) {
  // Years state
  const [selectedYear1, setSelectedYear1] = useState<number>(2025)
  const [selectedYear2, setSelectedYear2] = useState<number>(2025)
  const [selectedYear3, setSelectedYear3] = useState<number>(2025)
  const [selectedYear4, setSelectedYear4] = useState<number>(2025)

  // Rounds state
  const [round1, setRound1] = useState<string>("nacional")
  const [round2, setRound2] = useState<string>("nacional")
  const [round3, setRound3] = useState<string>("nacional")
  const [round4, setRound4] = useState<string>("nacional")
  
  const finalLogo = logo || "/assets/logos/solucionarios/torneo_jovenes_matematicos.png"

  const getRoundName = (id: string) => ROUNDS.find(r => r.id === id)?.name

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-0" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full xl:w-auto">
          {/* Logo */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-3xl p-4 border border-white/10 shadow-lg flex items-center justify-center">
            <img
              src={finalLogo}
              alt="Torneo de Jóvenes Matemáticos"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Torneo de Jóvenes Matemáticos
            </h1>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-cyan-400 mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm font-medium text-muted-foreground">
                Estructura de contenidos por niveles, pruebas y colecciones anuales.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto relative z-10">
          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-cyan-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-cyan-500" />
            </div>
            <span className="text-xs font-bold text-cyan-500 text-center leading-tight">4<br/>niveles</span>
          </div>
          
          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-amber-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-amber-500" />
            </div>
            <span className="text-xs font-bold text-amber-500 text-center leading-tight">3<br/>pruebas</span>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 flex-1 xl:flex-none xl:w-32 shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 text-center leading-tight">Por<br/>años</span>
          </div>
        </div>
      </div>

      {/* MAIN 2x2 GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* NIVEL 1 (Dark Blue) */}
        <div className="bg-card rounded-[2rem] border border-[#1e293b] shadow-sm flex flex-col relative overflow-hidden group">
          {/* Header Bar */}
          <div className="bg-[#1e293b] p-4 flex items-center gap-4 border-b border-white/5">
            <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="h-4 w-4 text-[#1e293b]" />
            </div>
            <h3 className="text-xl font-black text-white tracking-wide uppercase">Nivel 1</h3>
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {YEARS.map(year => (
                <button
                  key={`1-${year}`}
                  onClick={() => setSelectedYear1(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                    selectedYear1 === year
                      ? "bg-cyan-500 border-cyan-500 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Rounds Tabs */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-6 border border-border/50 relative">
              {ROUNDS.map(r => {
                const isActive = round1 === r.id
                return (
                  <button
                    key={`r1-${r.id}`}
                    onClick={() => setRound1(r.id)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all relative ${
                      isActive ? "bg-[#1e293b] text-white shadow-md" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {r.name}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1e293b]" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Contenido Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 bg-cyan-500/30" />
              <span className="text-xs font-bold text-[#1e293b] dark:text-blue-400 uppercase tracking-wide">
                Contenido de la {getRoundName(round1)} {selectedYear1}
              </span>
              <div className="h-px flex-1 bg-cyan-500/30" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 mb-4">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Examen<br/>oficial</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
              
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-blue-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-blue-500/30">
                    <PlaySquare className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Simulacro</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-cyan-500/5 rounded-xl py-2 px-4 flex items-center justify-center gap-2 border border-cyan-500/10">
              <Info className="h-4 w-4 text-cyan-500" />
              <p className="text-[11px] text-muted-foreground font-medium">
                Cada ronda incluye: <span className="text-cyan-500 font-bold">examen oficial</span>, <span className="text-cyan-500 font-bold">solución en video</span> y <span className="text-cyan-500 font-bold">simulacro</span>.
              </p>
            </div>

          </div>
        </div>

        {/* NIVEL 2 (Cyan) */}
        <div className="bg-card rounded-[2rem] border border-cyan-500/30 shadow-sm flex flex-col relative overflow-hidden group">
          {/* Header Bar */}
          <div className="bg-cyan-500 p-4 flex items-center gap-4 border-b border-cyan-400">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-cyan-600">2</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-wide uppercase">Nivel 2</h3>
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {YEARS.map(year => (
                <button
                  key={`2-${year}`}
                  onClick={() => setSelectedYear2(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                    selectedYear2 === year
                      ? "bg-cyan-500 border-cyan-500 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Rounds Tabs */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-6 border border-border/50 relative">
              {ROUNDS.map(r => {
                const isActive = round2 === r.id
                return (
                  <button
                    key={`r2-${r.id}`}
                    onClick={() => setRound2(r.id)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all relative ${
                      isActive ? "bg-cyan-500 text-white shadow-md" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {r.name}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-cyan-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Contenido Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 bg-cyan-500/30" />
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-wide">
                Contenido de la {getRoundName(round2)} {selectedYear2}
              </span>
              <div className="h-px flex-1 bg-cyan-500/30" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 mb-4">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Examen<br/>oficial</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
              
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-blue-500/30">
                    <PlaySquare className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Simulacro</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-cyan-500/5 rounded-xl py-2 px-4 flex items-center justify-center gap-2 border border-cyan-500/10">
              <Info className="h-4 w-4 text-cyan-500" />
              <p className="text-[11px] text-muted-foreground font-medium">
                Cada ronda incluye: <span className="text-cyan-500 font-bold">examen oficial</span>, <span className="text-cyan-500 font-bold">solución en video</span> y <span className="text-cyan-500 font-bold">simulacro</span>.
              </p>
            </div>

          </div>
        </div>

        {/* NIVEL 3 (Amber) */}
        <div className="bg-card rounded-[2rem] border border-amber-500/30 shadow-sm flex flex-col relative overflow-hidden group">
          {/* Header Bar */}
          <div className="bg-amber-400 p-4 flex items-center gap-4 border-b border-amber-300">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-amber-600">3</span>
            </div>
            <h3 className="text-xl font-black text-black tracking-wide uppercase">Nivel 3</h3>
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {YEARS.map(year => (
                <button
                  key={`3-${year}`}
                  onClick={() => setSelectedYear3(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                    selectedYear3 === year
                      ? "bg-amber-500 border-amber-500 text-black shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Rounds Tabs */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-6 border border-border/50 relative">
              {ROUNDS.map(r => {
                const isActive = round3 === r.id
                return (
                  <button
                    key={`r3-${r.id}`}
                    onClick={() => setRound3(r.id)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all relative ${
                      isActive ? "bg-amber-500 text-black shadow-md" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {r.name}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Contenido Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 bg-cyan-500/30" />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">
                Contenido de la {getRoundName(round3)} {selectedYear3}
              </span>
              <div className="h-px flex-1 bg-cyan-500/30" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 mb-4">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Examen<br/>oficial</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
              
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-blue-500/30">
                    <PlaySquare className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Simulacro</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-cyan-500/5 rounded-xl py-2 px-4 flex items-center justify-center gap-2 border border-cyan-500/10">
              <Info className="h-4 w-4 text-cyan-500" />
              <p className="text-[11px] text-muted-foreground font-medium">
                Cada ronda incluye: <span className="text-cyan-500 font-bold">examen oficial</span>, <span className="text-cyan-500 font-bold">solución en video</span> y <span className="text-cyan-500 font-bold">simulacro</span>.
              </p>
            </div>

          </div>
        </div>

        {/* NIVEL 4 (Red) */}
        <div className="bg-card rounded-[2rem] border border-red-500/30 shadow-sm flex flex-col relative overflow-hidden group">
          {/* Header Bar */}
          <div className="bg-red-500 p-4 flex items-center gap-4 border-b border-red-400">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-red-600">4</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-wide uppercase">Nivel 4</h3>
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {YEARS.map(year => (
                <button
                  key={`4-${year}`}
                  onClick={() => setSelectedYear4(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                    selectedYear4 === year
                      ? "bg-red-500 border-red-500 text-white shadow-md scale-105"
                      : "bg-transparent border-border/50 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Rounds Tabs */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-6 border border-border/50 relative">
              {ROUNDS.map(r => {
                const isActive = round4 === r.id
                return (
                  <button
                    key={`r4-${r.id}`}
                    onClick={() => setRound4(r.id)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all relative ${
                      isActive ? "bg-red-500 text-white shadow-md" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {r.name}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Contenido Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 bg-cyan-500/30" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
                Contenido de la {getRoundName(round4)} {selectedYear4}
              </span>
              <div className="h-px flex-1 bg-cyan-500/30" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 mb-4">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Examen<br/>oficial</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
              
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-blue-500/30">
                    <PlaySquare className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Solución<br/>en video</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center justify-between hover:border-cyan-500/40 hover:shadow-sm transition-all group/btn cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground leading-tight">Simulacro</span>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-500 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-cyan-500/5 rounded-xl py-2 px-4 flex items-center justify-center gap-2 border border-cyan-500/10">
              <Info className="h-4 w-4 text-cyan-500" />
              <p className="text-[11px] text-muted-foreground font-medium">
                Cada ronda incluye: <span className="text-cyan-500 font-bold">examen oficial</span>, <span className="text-cyan-500 font-bold">solución en video</span> y <span className="text-cyan-500 font-bold">simulacro</span>.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="bg-card rounded-[2rem] border border-border/50 p-5 shadow-sm overflow-x-auto relative">
        <div className="flex items-center justify-between min-w-max px-4">
          
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-black text-foreground uppercase tracking-wide">Qué incluye<br/>cada nivel</span>
          </div>

          <div className="flex items-center gap-8 pl-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground">Colección<br/>por años</span>
            </div>

            <div className="w-px h-8 bg-border/50" />

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground">Prueba<br/>regional</span>
            </div>

            <div className="w-px h-8 bg-border/50" />

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center shadow-md">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground">Ronda<br/>nacional</span>
            </div>

            <div className="w-px h-8 bg-border/50" />

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground">Ronda<br/>internacional</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
