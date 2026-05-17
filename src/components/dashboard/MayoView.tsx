"use client"

import { useState } from "react"
import { 
  CalendarDays, 
  FileText, 
  PlaySquare, 
  Lightbulb, 
  ClipboardCheck,
  Download,
  Play,
  Edit3,
  BookOpen,
  Users
} from "lucide-react"

const NIVELES = [
  {
    id: "nivel-1",
    name: "Nivel 1",
    desc: "Primer nivel de competición",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-400",
    lightBg: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    hoverBorder: "hover:border-emerald-400/50",
  },
  {
    id: "nivel-2",
    name: "Nivel 2",
    desc: "Segundo nivel de competición",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500",
    lightBg: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/50",
  }
]

const YEARS = [2024, 2023, 2022, 2021, 2020]

const SUMMARY_ITEMS = [
  { icon: CalendarDays, text: "Colección por años" },
  { icon: FileText, text: "Examen oficial" },
  { icon: PlaySquare, text: "Solución en video" },
  { icon: Lightbulb, text: "Estrategias y observaciones" },
  { icon: ClipboardCheck, text: "Simulacro" }
]

export function MayoView({ logo }: { logo?: string }) {
  const [selectedLevel, setSelectedLevel] = useState(NIVELES[0])
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  
  const finalLogo = logo || "/assets/logos/solucionarios/olimpiada_mayo.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-10 rounded-[2.5rem] border border-[#1e293b] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-0" />
        
        <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-[2rem] p-4 border border-border/50 shadow-sm flex items-center justify-center z-10">
          <img
            src={finalLogo}
            alt="Olimpiada de Mayo"
            className="object-contain w-full h-full drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10 space-y-4 flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none">
            Olimpiada<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">de Mayo</span>
          </h1>
          <p className="text-sm md:text-base font-medium text-muted-foreground max-w-xl mx-auto md:mx-0">
            Competencia internacional que fomenta el desarrollo de habilidades matemáticas a través de problemas desafiantes y creativos.
          </p>
        </div>
      </div>

      {/* SUMMARY ICONS BAR (From Ref Image 1) */}
      <div className="bg-card rounded-3xl border border-border/50 p-4 shadow-sm overflow-x-auto hidden md:block">
        <div className="flex items-center justify-between min-w-[700px] px-4">
          {SUMMARY_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full border-2 border-amber-500/30 bg-[#0f172a] flex items-center justify-center shrink-0 shadow-sm">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-bold text-foreground max-w-[100px] leading-tight">
                  {item.text}
                </span>
              </div>
              {/* Diamond separator except for last item */}
              {index < SUMMARY_ITEMS.length - 1 && (
                <div className="ml-4 h-1.5 w-1.5 rotate-45 bg-amber-500/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NIVELES */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Selecciona el Nivel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {NIVELES.map(nivel => {
            const isActive = selectedLevel.id === nivel.id
            return (
              <button
                key={nivel.id}
                onClick={() => setSelectedLevel(nivel)}
                className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isActive 
                    ? `${nivel.borderColor} ${nivel.lightBg} shadow-md scale-[1.02]` 
                    : "border-border/50 bg-card hover:border-border hover:bg-card/80 shadow-sm"
                }`}
              >
                <div className={`shrink-0 ${isActive ? nivel.colorClass : "text-muted-foreground"}`}>
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${isActive ? nivel.colorClass : "text-foreground"}`}>
                    {nivel.name}
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground mt-1 leading-tight">
                    {nivel.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* YEAR SELECTOR (From Ref Image 2) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Colección por años</h3>
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          {YEARS.map((year, index) => {
            const isActive = selectedYear === year
            return (
              <div key={year} className="flex items-center gap-3 md:gap-5">
                <button
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-[#0f172a] text-white border border-[#1e293b] shadow-md scale-105"
                      : "bg-card text-muted-foreground border border-border/50 hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
                {/* Diamond Separator */}
                {index < YEARS.length - 1 && (
                  <div className="h-1.5 w-1.5 rotate-45 bg-amber-500/50" />
                )}
              </div>
            )
          })}
          {/* Ellipsis */}
          <div className="flex items-center gap-5">
            <div className="h-1.5 w-1.5 rotate-45 bg-amber-500/50 hidden md:block" />
            <div className="px-5 py-2.5 rounded-xl font-bold bg-card text-muted-foreground border border-border/50 hidden md:block">
              ...
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* CONTENT CARDS FOR ACTIVE YEAR */}
      <div className="bg-card/50 rounded-3xl border border-border/50 p-6 md:p-8 shadow-sm">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-foreground">
              Año {selectedYear}
            </h2>
            <p className={`text-sm font-bold ${selectedLevel.colorClass}`}>
              {selectedLevel.name} – {selectedLevel.desc}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Examen Oficial */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-emerald-400/30 transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-foreground mb-1 group-hover:text-emerald-400 transition-colors">Examen Oficial</h4>
                <p className="text-xs text-muted-foreground font-medium">Descarga el PDF original del examen.</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-emerald-500/20 hover:border-emerald-500">
              <Download className="h-4 w-4" />
              Descargar PDF
            </button>
          </div>

          {/* Solución en video */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <PlaySquare className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-foreground mb-1 group-hover:text-blue-500 transition-colors">Solución en Video</h4>
                <p className="text-xs text-muted-foreground font-medium">Mira el paso a paso detallado.</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-600 text-blue-500 hover:text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-blue-500/20 hover:border-blue-600">
              <Play className="h-4 w-4" />
              Ver Video
            </button>
          </div>

          {/* Estrategias */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-foreground mb-1 group-hover:text-amber-500 transition-colors">Estrategias</h4>
                <p className="text-xs text-muted-foreground font-medium">Observaciones y tips del jurado.</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-amber-500/20 hover:border-amber-500">
              <BookOpen className="h-4 w-4" />
              Leer Documento
            </button>
          </div>

          {/* Simulacro */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-purple-500/30 transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-foreground mb-1 group-hover:text-purple-500 transition-colors">Simulacro</h4>
                <p className="text-xs text-muted-foreground font-medium">Practica con tiempo limitado.</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-purple-500/10 hover:bg-purple-600 text-purple-500 hover:text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-purple-500/20 hover:border-purple-600">
              <Edit3 className="h-4 w-4" />
              Realizar
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
