"use client"

import { useState } from "react"
import { 
  FileText, 
  PlayCircle, 
  Users,
  ChevronRight,
  Download,
  Play,
  Globe,
  BookOpen
} from "lucide-react"

const NIVELES = [
  {
    id: "nivel-1",
    name: "Nivel 1",
    desc: "Categoría Junior / Key Stage 2",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500",
    lightBg: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    id: "nivel-2",
    name: "Nivel 2",
    desc: "Categoría Senior / Key Stage 3",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500",
    lightBg: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/50",
  }
]

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

export function ImcView({ logo }: { logo?: string }) {
  const [selectedLevel, setSelectedLevel] = useState(NIVELES[0])
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  
  const finalLogo = logo || "/assets/logos/solucionarios/olimpiada_imc_de_matematicas.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-10 rounded-[2.5rem] border border-[#1e293b] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -z-0" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full">
          {/* Logo */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-full p-4 border border-white/10 shadow-xl flex items-center justify-center backdrop-blur-sm">
            <img
              src={finalLogo}
              alt="Olimpiada IMC de Matemáticas"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Globe className="h-4 w-4" /> International Mathematics Competition
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Olimpiada <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">IMC</span>
            </h1>
            <p className="text-sm md:text-lg font-medium text-muted-foreground max-w-2xl">
              "Desafiando fronteras, inspirando a la próxima generación de mentes matemáticas globales."
            </p>
          </div>
        </div>
      </div>

      {/* NIVELES */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Selecciona una Categoría</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {NIVELES.map(nivel => {
            const isActive = selectedLevel.id === nivel.id
            return (
              <button
                key={nivel.id}
                onClick={() => setSelectedLevel(nivel)}
                className={`flex items-start gap-4 p-5 rounded-3xl border text-left transition-all duration-300 ${
                  isActive 
                    ? `${nivel.borderColor} ${nivel.lightBg} shadow-lg scale-[1.02]` 
                    : "border-border/50 bg-card hover:border-border hover:bg-card/80 shadow-sm"
                }`}
              >
                <div className={`shrink-0 ${isActive ? nivel.colorClass : "text-muted-foreground"}`}>
                  <Users className="h-10 w-10" />
                </div>
                <div>
                  <h4 className={`text-xl font-black ${isActive ? nivel.colorClass : "text-foreground"}`}>
                    {nivel.name}
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground mt-1 leading-tight">
                    {nivel.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA: Sidebar + Content */}
      <div className="flex flex-col md:flex-row gap-6 pt-4">
        
        {/* Sidebar Años */}
        <div className="w-full md:w-56 shrink-0 flex flex-col gap-2">
          <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">Ediciones</h3>
          <div className="bg-card rounded-3xl border border-border/50 p-3 shadow-sm flex flex-col gap-1">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold ${
                  selectedYear === year 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span className="text-base">Edición {year}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${selectedYear === year ? "translate-x-1 opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card/40 backdrop-blur-sm rounded-[2.5rem] border border-border/50 p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle background glow for the active level */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 -z-10 ${selectedLevel.bgClass}`} />

          {/* Header Dynamic */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-foreground mb-2">
              Año {selectedYear}
            </h2>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${selectedLevel.lightBg} border ${selectedLevel.borderColor}`}>
              <span className={`text-sm font-bold ${selectedLevel.colorClass}`}>{selectedLevel.name}</span>
              <span className={`text-sm text-muted-foreground hidden sm:inline`}>– {selectedLevel.desc}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Examen Oficial */}
            <div className="bg-card rounded-3xl border border-blue-500/20 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-2 group-hover:text-blue-500 transition-colors">Examen Oficial</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Problemas oficiales de la edición {selectedYear}.
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow-md">
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </div>

            {/* Solucionario (Escrito) */}
            <div className="bg-card rounded-3xl border border-emerald-500/20 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-2 group-hover:text-emerald-500 transition-colors">Solucionario</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Respuestas y desarrollo escrito en formato PDF.
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow-md">
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </div>

            {/* Solución en video */}
            <div className="bg-card rounded-3xl border border-amber-500/20 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <PlayCircle className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-2 group-hover:text-amber-500 transition-colors">Clase en Video</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Análisis profundo y trucos explicados paso a paso.
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow-md">
                <Play className="h-4 w-4" />
                Ver Video
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
