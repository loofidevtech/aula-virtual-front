"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  Users,
  ChevronRight,
  Download,
  Play,
  Edit3,
  Info,
  ChevronDown
} from "lucide-react"

const NIVELES = [
  {
    id: "nivel-a",
    name: "NIVEL A",
    desc: "Estudiantes de quinto y sexto de primaria.",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500",
    lightBg: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    id: "nivel-1",
    name: "NIVEL 1",
    desc: "Estudiantes de primero y segundo de secundaria.",
    colorClass: "text-green-600",
    bgClass: "bg-green-600",
    lightBg: "bg-green-600/10",
    borderColor: "border-green-600/30",
    hoverBorder: "hover:border-green-600/50",
  },
  {
    id: "nivel-2",
    name: "NIVEL 2",
    desc: "Estudiantes de tercero y cuarto de secundaria.",
    colorClass: "text-purple-600",
    bgClass: "bg-purple-600",
    lightBg: "bg-purple-600/10",
    borderColor: "border-purple-600/30",
    hoverBorder: "hover:border-purple-600/50",
  },
  {
    id: "nivel-3",
    name: "NIVEL 3",
    desc: "Estudiantes de quinto de secundaria.",
    colorClass: "text-orange-500",
    bgClass: "bg-orange-500",
    lightBg: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    hoverBorder: "hover:border-orange-500/50",
  }
]

const YEARS = [2026, 2025, 2024]

export function GeometriaView({ logo }: { logo?: string }) {
  const [selectedLevel, setSelectedLevel] = useState(NIVELES[0])
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  
  const finalLogo = logo || "/assets/logos/solucionarios/olimpiada_de_geometria_julio_origuela.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-[#0f172a] p-6 md:p-8 rounded-[2.5rem] border border-[#1e293b] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-0" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          {/* Logo */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <Image
              src={finalLogo}
              alt="Olimpiada Nacional de Geometría"
              fill
              className="object-contain drop-shadow-2xl brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight leading-none mb-2">
              Olimpiada Nacional<br/>de Geometría
            </h1>
            <h2 className="text-sm md:text-base font-medium tracking-[0.3em] text-white/70 uppercase">
              More Ouchi and Sons
            </h2>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-xl relative z-10 max-w-sm">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-white/90 leading-relaxed">
            Una competencia que desafía tu mente y desarrolla tu potencial.
          </p>
        </div>
      </div>

      {/* NIVELES */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Niveles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                  <h4 className={`text-sm font-black ${isActive ? nivel.colorClass : "text-foreground"}`}>
                    {nivel.name}
                  </h4>
                  <p className="text-[11px] font-medium text-muted-foreground mt-1 leading-tight">
                    {nivel.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA: Sidebar + Content */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Años */}
        <div className="w-full md:w-48 shrink-0 flex flex-col gap-2">
          <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">Años</h3>
          <div className="bg-card rounded-2xl border border-border/50 p-2 shadow-sm">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold ${
                  selectedYear === year 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span>{year}</span>
                <ChevronRight className={`h-4 w-4 transition-opacity ${selectedYear === year ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card rounded-3xl border border-border/50 p-6 md:p-8 shadow-sm">
          
          {/* Header Dynamic */}
          <div className="mb-8">
            <h2 className={`text-2xl font-black ${selectedLevel.colorClass} flex items-center gap-2`}>
              {selectedLevel.name} <span className="text-muted-foreground font-medium text-lg hidden sm:inline">– {selectedLevel.desc}</span>
            </h2>
            <p className="text-muted-foreground font-medium text-sm sm:hidden mt-1">{selectedLevel.desc}</p>
          </div>

          {/* 3 Overview Tabs (Decorative) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/30 bg-blue-500/5">
              <FileText className="h-5 w-5 text-blue-500 shrink-0" />
              <span className="text-xs font-black text-blue-500 uppercase">Examen Original</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-green-500/30 bg-green-500/5">
              <PlayCircle className="h-5 w-5 text-green-500 shrink-0" />
              <span className="text-xs font-black text-green-500 uppercase">Solución en Video</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-orange-500/30 bg-orange-500/5">
              <ClipboardCheck className="h-5 w-5 text-orange-500 shrink-0" />
              <span className="text-xs font-black text-orange-500 uppercase">Simulacro Tipo Examen</span>
            </div>
          </div>

          {/* Cards for active year */}
          <div className="border border-border/50 rounded-2xl p-6 bg-background/30 shadow-inner">
            <h3 className="text-lg font-black text-foreground mb-6">AÑO {selectedYear}</h3>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Examen */}
              <div className="bg-card rounded-xl border border-blue-500/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-blue-500 uppercase mb-1">Examen Original</h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                      Descarga el examen original de la Olimpiada Nacional de Geometría {selectedYear} – {selectedLevel.name}.
                    </p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </button>
              </div>

              {/* Video */}
              <div className="bg-card rounded-xl border border-green-600/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-green-600/40 transition-all group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center text-green-600 shrink-0">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-green-600 uppercase mb-1">Solución en Video</h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                      Mira la solución detallada del examen {selectedYear} – {selectedLevel.name} explicada paso a paso.
                    </p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  <Play className="h-4 w-4" />
                  Ver Video
                </button>
              </div>

              {/* Simulacro */}
              <div className="bg-card rounded-xl border border-orange-500/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-orange-500 uppercase mb-1">Simulacro Tipo Examen</h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                      Pon a prueba tus conocimientos con un simulacro similar al examen oficial {selectedYear} – {selectedLevel.name}.
                    </p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  <Edit3 className="h-4 w-4" />
                  Realizar Simulacro
                </button>
              </div>

            </div>
          </div>

          {/* Inactive Years Accordions */}
          <div className="mt-4 space-y-3">
            {YEARS.filter(y => y !== selectedYear).map(y => (
              <button 
                key={y}
                onClick={() => setSelectedYear(y)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-white/5 transition-colors group"
              >
                <span className="font-bold text-sm text-foreground">AÑO {y}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER INFO ALERT */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3">
        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Info className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium text-blue-400">
          Cada año contiene su examen original, solución en video y simulacro tipo examen.
        </p>
      </div>

    </div>
  )
}
